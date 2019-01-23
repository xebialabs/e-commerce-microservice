import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import product, {
  ProductState
} from 'app/entities/product/product.reducer';
// prettier-ignore
import productCategory, {
  ProductCategoryState
} from 'app/entities/product-category/product-category.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import productOrder, {
  ProductOrderState
} from 'app/entities/product-order/product-order.reducer';
// prettier-ignore
import orderItem, {
  OrderItemState
} from 'app/entities/order-item/order-item.reducer';
// prettier-ignore
import invoice, {
  InvoiceState
} from 'app/entities/invoice/invoice/invoice.reducer';
// prettier-ignore
import shipment, {
  ShipmentState
} from 'app/entities/invoice/shipment/shipment.reducer';
// prettier-ignore
import notification, {
  NotificationState
} from 'app/entities/notification/notification/notification.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly product: ProductState;
  readonly productCategory: ProductCategoryState;
  readonly customer: CustomerState;
  readonly productOrder: ProductOrderState;
  readonly orderItem: OrderItemState;
  readonly invoice: InvoiceState;
  readonly shipment: ShipmentState;
  readonly notification: NotificationState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  product,
  productCategory,
  customer,
  productOrder,
  orderItem,
  invoice,
  shipment,
  notification,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
