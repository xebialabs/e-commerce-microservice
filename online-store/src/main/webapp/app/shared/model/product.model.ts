import { IProductCategory } from 'app/shared/model//product-category.model';

export const enum Size {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL'
}

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  size?: Size;
  imageContentType?: string;
  image?: any;
  productCategory?: IProductCategory;
}

export const defaultValue: Readonly<IProduct> = {};
