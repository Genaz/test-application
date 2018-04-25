import { Address } from "./address.model";

export class User {
  constructor(
    public id: number = 0,
    public name: string = 'New Name',
    public email: string = 'New Email',
    public address: Address = { city: 'New City'}) {
  }
}
