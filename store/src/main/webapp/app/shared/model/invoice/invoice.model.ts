import { Moment } from 'moment';
import { IShipment } from 'app/shared/model/invoice/shipment.model';

export const enum InvoiceStatus {
  PAID = 'PAID',
  ISSUED = 'ISSUED',
  CANCELLED = 'CANCELLED'
}

export const enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  PAYPAL = 'PAYPAL'
}

export interface IInvoice {
  id?: number;
  code?: string;
  date?: Moment;
  details?: string;
  status?: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  paymentDate?: Moment;
  paymentAmount?: number;
  shipments?: IShipment[];
}

export const defaultValue: Readonly<IInvoice> = {};
