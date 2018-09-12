import { Moment } from 'moment';
import { IInvoice } from 'app/shared/model/invoice/invoice.model';

export interface IShipment {
  id?: number;
  trackingCode?: string;
  date?: Moment;
  details?: string;
  invoice?: IInvoice;
}

export const defaultValue: Readonly<IShipment> = {};
