import { Injectable } from '@angular/core';
import {client, Role} from "./client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clients: client[] = [];

  constructor() {

  }

  setClients(clients: client[]) {
    this.clients = clients;
  }

  getClient(id: number): client | undefined {
    return this.clients.find(client => client.id === id);
  }
  getClients(): client[] {

    return this.clients;
  }
}
