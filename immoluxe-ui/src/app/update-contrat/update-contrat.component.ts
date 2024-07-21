import { Component } from '@angular/core';
import {Contrat, TypeContrat} from "../contrats";
import {contratService} from "../contrat.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-contrat',
  templateUrl: './update-contrat.component.html',
  styleUrls: ['./update-contrat.component.css']
})
export class UpdateContratComponent {
  id: number;
  contrat: Contrat = new Contrat();

  constructor(
    private contratService: contratService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.contratService.getContratById(this.id).subscribe(data => {
      this.contrat = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.contratService.updateContrat(this.id, this.contrat).subscribe(data => {
      this.goToContratList();
    }, error => console.log(error));
  }

  goToContratList() {
    this.router.navigate(['/show-all-contrats']);
  }

    protected readonly TypeContrat = TypeContrat;
}
