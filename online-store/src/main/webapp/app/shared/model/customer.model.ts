import { IUser } from './user.model';
import { IProductOrder } from 'app/shared/model//product-order.model';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface ICustomer {
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  user?: IUser;
  orders?: IProductOrder[];
}

export const defaultValue: Readonly<ICustomer> = {};
