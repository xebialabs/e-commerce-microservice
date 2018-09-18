import { Moment } from 'moment';
import { IOrderItem } from 'app/shared/model//order-item.model';
import { ICustomer } from 'app/shared/model//customer.model';

export const enum OrderStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED'
}

export interface IProductOrder {
  id?: number;
  placedDate?: Moment;
  status?: OrderStatus;
  code?: string;
  invoiceId?: number;
  orderItems?: IOrderItem[];
  customer?: ICustomer;
}

export const defaultValue: Readonly<IProductOrder> = {};
