import { Component } from '@angular/core';
import { Property } from '../properties';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyService } from '../properties.service';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-properties.component.html',
  styleUrls: ['./update-properties.component.css']
})
export class UpdatePropertyComponent {
  id: number;
  property: Property = new Property();

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.propertyService.getPropertyById(this.id).subscribe(data => {
      this.property = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.propertyService.updateProperty(this.id, this.property).subscribe(data => {
      this.goToPropertyList();
    }, error => console.log(error));
  }

  goToPropertyList() {
    this.router.navigate(['/show-all-properties']);
  }
}