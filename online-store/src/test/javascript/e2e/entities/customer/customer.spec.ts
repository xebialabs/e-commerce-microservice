/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import CustomerComponentsPage from './customer.page-object';
import { CustomerDeleteDialog } from './customer.page-object';
import CustomerUpdatePage from './customer-update.page-object';

const expect = chai.expect;

describe('Customer e2e test', () => {
  let navBarPage: NavBarPage;
  let customerUpdatePage: CustomerUpdatePage;
  let customerComponentsPage: CustomerComponentsPage;
  /*let customerDeleteDialog: CustomerDeleteDialog;*/

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Customers', async () => {
    navBarPage.getEntityPage('customer');
    customerComponentsPage = new CustomerComponentsPage();
    expect(await customerComponentsPage.getTitle().getText()).to.match(/Customers/);
  });

  it('should load create Customer page', async () => {
    customerComponentsPage.clickOnCreateButton();
    customerUpdatePage = new CustomerUpdatePage();
    expect(await customerUpdatePage.getPageTitle().getAttribute('id')).to.match(/storeApp.customer.home.createOrEditLabel/);
  });

  /* it('should create and save Customers', async () => {
        const nbButtonsBeforeCreate = await customerComponentsPage.countDeleteButtons();

        customerUpdatePage.setFirstNameInput('firstName');
        expect(await customerUpdatePage.getFirstNameInput()).to.match(/firstName/);
        customerUpdatePage.setLastNameInput('lastName');
        expect(await customerUpdatePage.getLastNameInput()).to.match(/lastName/);
        customerUpdatePage.genderSelectLastOption();
        customerUpdatePage.setEmailInput('email');
        expect(await customerUpdatePage.getEmailInput()).to.match(/email/);
        customerUpdatePage.setPhoneInput('phone');
        expect(await customerUpdatePage.getPhoneInput()).to.match(/phone/);
        customerUpdatePage.setAddressLine1Input('addressLine1');
        expect(await customerUpdatePage.getAddressLine1Input()).to.match(/addressLine1/);
        customerUpdatePage.setAddressLine2Input('addressLine2');
        expect(await customerUpdatePage.getAddressLine2Input()).to.match(/addressLine2/);
        customerUpdatePage.setCityInput('city');
        expect(await customerUpdatePage.getCityInput()).to.match(/city/);
        customerUpdatePage.setCountryInput('country');
        expect(await customerUpdatePage.getCountryInput()).to.match(/country/);
        customerUpdatePage.userSelectLastOption();
        await customerUpdatePage.save();
        expect(await customerUpdatePage.getSaveButton().isPresent()).to.be.false;

        customerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

  /* it('should delete last Customer', async () => {
        customerComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await customerComponentsPage.countDeleteButtons();
        await customerComponentsPage.clickOnLastDeleteButton();

        customerDeleteDialog = new CustomerDeleteDialog();
        expect(await customerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/storeApp.customer.delete.question/);
        await customerDeleteDialog.clickOnConfirmButton();

        customerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(() => {
    navBarPage.autoSignOut();
  });
});
