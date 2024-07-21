
export class client {
  id!: number;
  firstName !: String;
  lastName !: String;
  email!: String;
  role !: Role

  constructor() {
    this.email = "" ;
    this.firstName ="";
    this.lastName ="";
    this.role = Role.default;
  }

}

export enum Role {
  default,
  Client,
  Proprietaire
}
