export class Property {
  id!: number;
  address!: string;
  type!: string;
  price!: number;
  bedrooms!: number;
  bathrooms!: number;
  area!: number;
  description!: string;
  photoUrl?: string; // Add a photo property

  constructor() {
    this.address = '';
    this.type = '';
    this.price = 0;
    this.bedrooms = 0;
    this.bathrooms = 0;
    this.area = 0;
    this.description = '';
  }
}
