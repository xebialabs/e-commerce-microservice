/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import InvoiceComponentsPage from './invoice.page-object';
import { InvoiceDeleteDialog } from './invoice.page-object';
import InvoiceUpdatePage from './invoice-update.page-object';

const expect = chai.expect;

describe('Invoice e2e test', () => {
  let navBarPage: NavBarPage;
  let invoiceUpdatePage: InvoiceUpdatePage;
  let invoiceComponentsPage: InvoiceComponentsPage;
  let invoiceDeleteDialog: InvoiceDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Invoices', async () => {
    navBarPage.getEntityPage('invoice');
    invoiceComponentsPage = new InvoiceComponentsPage();
    expect(await invoiceComponentsPage.getTitle().getText()).to.match(/Invoices/);
  });

  it('should load create Invoice page', async () => {
    invoiceComponentsPage.clickOnCreateButton();
    invoiceUpdatePage = new InvoiceUpdatePage();
    expect(await invoiceUpdatePage.getPageTitle().getAttribute('id')).to.match(/storeApp.invoiceInvoice.home.createOrEditLabel/);
  });

  it('should create and save Invoices', async () => {
    const nbButtonsBeforeCreate = await invoiceComponentsPage.countDeleteButtons();

    invoiceUpdatePage.setCodeInput('code');
    expect(await invoiceUpdatePage.getCodeInput()).to.match(/code/);
    invoiceUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await invoiceUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
    invoiceUpdatePage.setDetailsInput('details');
    expect(await invoiceUpdatePage.getDetailsInput()).to.match(/details/);
    invoiceUpdatePage.statusSelectLastOption();
    invoiceUpdatePage.paymentMethodSelectLastOption();
    invoiceUpdatePage.setPaymentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await invoiceUpdatePage.getPaymentDateInput()).to.contain('2001-01-01T02:30');
    invoiceUpdatePage.setPaymentAmountInput('5');
    expect(await invoiceUpdatePage.getPaymentAmountInput()).to.eq('5');
    await invoiceUpdatePage.save();
    expect(await invoiceUpdatePage.getSaveButton().isPresent()).to.be.false;

    invoiceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Invoice', async () => {
    invoiceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await invoiceComponentsPage.countDeleteButtons();
    await invoiceComponentsPage.clickOnLastDeleteButton();

    invoiceDeleteDialog = new InvoiceDeleteDialog();
    expect(await invoiceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/storeApp.invoiceInvoice.delete.question/);
    await invoiceDeleteDialog.clickOnConfirmButton();

    invoiceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
