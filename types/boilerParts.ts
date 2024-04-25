export interface IBoilerPart {
  id: number;
  boiler_manufacturer: string;
  parts_manufacturer: string;
  price: number;
  name: string;
  description: string;
  images: string;
  in_stock: number;
  bestseller: boolean;
  new: boolean;
  popularity: number;
  compatibility: string;
  vendor_code: string;
}

export interface IBoilerParts {
  count: number;
  rows: IBoilerPart[]
}
