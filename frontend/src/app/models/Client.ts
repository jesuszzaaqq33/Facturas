export interface Client {
  _id: string;
  name: string;
  email: string;
  cif: string;
  phone: number;
  address: string;
  postalCode?: number;
}
