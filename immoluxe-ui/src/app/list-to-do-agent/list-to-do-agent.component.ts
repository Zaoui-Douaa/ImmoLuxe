import {Component, OnInit} from '@angular/core';
import {Property} from "../properties";
import {PropertyService} from "../properties.service";
import {client, Role} from "../client";
import {TypeContrat} from "../contrats";
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from "../ClientService";

@Component({
  selector: 'app-list-to-do-agent',
  templateUrl: './list-to-do-agent.component.html',
  styleUrls: ['./list-to-do-agent.component.css']
})

export class ListToDoAgentComponent implements OnInit {

  properties: Property[] = [];
  clients: client[] = [];

  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute,
              private router : Router,
              private clientService: ClientService) {
    const Client1 = new client();
    Client1.id = 5;
    Client1.firstName = 'TEST';
    Client1.lastName = 'Naffeti';
    Client1.email = 'zaouidoa9@gmail.com';
    Client1.role = Role.Client;
    this.clients.push(Client1);

    const Client2 = new client();
    Client2.id = 3;
    Client2.firstName = 'Douaa';
    Client2.lastName = 'ZAOUI';
    Client2.email = 'zaouidoa9@gmail.com';
    Client2.role = Role.Proprietaire;
    this.clients.push(Client2);

  }


  ngOnInit(): void {
    this.getProperties();
  }

  getClientIds(clients: any[], role: Role): string {
    return clients.filter(client => client.role === role).map(client => client.id).join(', ');
  }

  getProperties(): void {
    this.propertyService.getPropertiesList().subscribe(data => { this.properties = data; });
  }

  getClient(id:number) : client | undefined {
    return this.clientService.getClient(id);
  }

  CreateContrat(){}

  protected readonly Role = Role;

  getProperty(id: number):Observable<Property>{
    return this.propertyService.getPropertyById(id);
  }

  getContratType(description: string): TypeContrat {
    const descriptionLower = description.toLowerCase();

    if (descriptionLower.includes('vente') ||
      descriptionLower.includes('facilité de paiement') ||
      /\d{4,}/.test(descriptionLower)) { // matches a number with 4 or more digits
      return TypeContrat.Vente;
    } else if (descriptionLower.includes('location') ||
      /\b\d{1,2} [a-z]+ \d{4}\b/.test(descriptionLower) || // matches a date format like "12 janvier 2022"
      /\b\d+ jours?\b/.test(descriptionLower) || // matches a number of days
      descriptionLower.includes('prix de nuité')) {
      return TypeContrat.Location;
    } else {
      return TypeContrat.None;
    }
  }

  protected readonly TypeContrat = TypeContrat;

  createContrat(property: any) {
    this.router.navigate(['/add-contrat', {
      id: property.id,
      clientId: this.getClientIds(this.clients, Role.Client),
      proprietaireId: this.getClientIds(this.clients, Role.Proprietaire),
      contratType: this.getContratType(property.description)
    }]);
  }

}
