import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import {Contrat, TypeContrat} from "../contrats";
import {Router} from "@angular/router";
import {contratService} from "../contrat.service"

@Component({
  selector: 'app-stat-contrat',
  templateUrl: './stat-contrat.component.html',
  styleUrls: ['./stat-contrat.component.css']
})
export class StatContratComponent implements OnInit {
  contrats: Contrat[];
  contratVenteToday: number = 0;
  contratVenteWeek: number = 0;
  contratVenteMonth: number = 0;
  contratLocationToday: number = 0;
  contratLocationWeek: number = 0;
  contratLocationMonth: number = 0;
  constructor( private router: Router,private contratService: contratService) {
    this.contrats = [];

  }
  public chartWeek: any;
  public chartMonth: any;

  createChartWeek() {

    this.chartWeek = new Chart("MyChartWeek", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Vente', 'Location'],
        datasets: [{
          label: 'Week',
          data: [this.contratVenteWeek, this.contratLocationWeek],
          backgroundColor: [
            'red',
            'pink',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5
      }

    });

  }

  createChartMonth() {

    this.chartMonth = new Chart("MyChartMonth", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Vente', 'Location'],
        datasets: [{
          label: 'Month',
          data: [this.contratVenteMonth, this.contratLocationMonth],
          backgroundColor: [
            'red',
            'pink',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5
      }

    });

  }

  ngOnInit(): void {
    this.getContrats();

  }

   getContrats() {
     this.contratService.getContratsList().subscribe(data => {
       this.contrats = data;
       this.calculateStats();
       this.createChartWeek();
       this.createChartMonth();
     });
   }

  calculateStats() {
    this.contrats.forEach(contrat => {
      let dateDebut = new Date(contrat.createdDate);
      let dateFin = new Date();
      let timeDifference = Math.abs(dateDebut.getTime() - dateFin.getTime());
      let dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
      if (contrat.typeContrat === TypeContrat.Vente) {
        if (dayDifference===0) {
          this.contratVenteToday++;
        }
        if (dayDifference >= 1 && dayDifference <= 7) {
          this.contratVenteWeek++;
        }
        if (dayDifference >= 1 && dayDifference <= 30) {
          this.contratVenteMonth++;
        }
      } else if (contrat.typeContrat === TypeContrat.Location) {
        if (dayDifference ===0 ){
          this.contratLocationToday++;
        }
        if (dayDifference >= 1 && dayDifference <= 7) {
          this.contratLocationWeek++;
        }
        if (dayDifference >= 1 && dayDifference <= 30) {
          this.contratLocationMonth++;
        }
      }
    });
  }

}
