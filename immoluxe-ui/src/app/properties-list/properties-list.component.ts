import { Component } from '@angular/core';
import { Property } from '../properties';
import { PropertyService } from '../properties.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-property-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertyListComponent {

  properties: Property[];
  EnteredID!: number;
  baseUrl: string = 'http://localhost:8080'; // Base URL for the backend

  constructor(private propertyService: PropertyService, private router: Router, private http: HttpClient) {
    this.properties = [];
  }

  ngOnInit(): void {
    this.getProperties();
  }

  goToProperty() {
    console.log(this.EnteredID); 
    this.router.navigate(['details-of-properties', this.EnteredID]);
  }

  getProperties() {
    this.propertyService.getPropertiesList().subscribe(data => { this.properties = data; });
  }

  updateProperty(id: number) {
    this.router.navigate(['updating-by-id', id]);
  }

  deleteProperty(id: number) {
    if (confirm("Are you sure to delete Property ID: " + id)) {
      this.propertyService.deleteProperty(id).subscribe(data => {
        console.log(data);
        this.getProperties();
      });
    }
  }

  detailsOfProperty(id: number) {
    // http request to send clicks
    this.http.get<any>('http://localhost:8080/api/v1/clicks/add/' + id).subscribe(data => {
      console.log('Click sent:', data);
    }, error => {
      console.error('Error sending click:', error);
    });

    this.router.navigate(['details-of-properties', id]);
  }
}
