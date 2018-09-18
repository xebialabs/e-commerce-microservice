import { Moment } from 'moment';

export const enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PARCEL = 'PARCEL'
}

export interface INotification {
  id?: number;
  date?: Moment;
  details?: string;
  sentDate?: Moment;
  format?: NotificationType;
  userId?: number;
  productId?: number;
}

export const defaultValue: Readonly<INotification> = {};
