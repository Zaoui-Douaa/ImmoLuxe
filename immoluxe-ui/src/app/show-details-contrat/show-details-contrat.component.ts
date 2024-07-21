import { Component } from '@angular/core';
import {Contrat} from "../contrats";
import {ActivatedRoute} from "@angular/router";
import {contratService} from "../contrat.service";

@Component({
  selector: 'app-show-details-contrat',
  templateUrl: './show-details-contrat.component.html',
  styleUrls: ['./show-details-contrat.component.css']
})
export class ShowDetailsContratComponent {
  id: number
  contrat!: Contrat
  constructor(private route: ActivatedRoute, private contratService: contratService) {

    this.id=0
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.contrat = new Contrat();
    this.contratService.getContratById(this.id).subscribe( data => {
      this.contrat = data;
    });
  }

}
