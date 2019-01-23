/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import InvoiceComponentsPage from './invoice.page-object';
import { InvoiceDeleteDialog } from './invoice.page-object';
import InvoiceUpdatePage from './invoice-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Invoice e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let invoiceUpdatePage: InvoiceUpdatePage;
  let invoiceComponentsPage: InvoiceComponentsPage;
  let invoiceDeleteDialog: InvoiceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();

    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Invoices', async () => {
    await navBarPage.getEntityPage('invoice');
    invoiceComponentsPage = new InvoiceComponentsPage();
    expect(await invoiceComponentsPage.getTitle().getText()).to.match(/Invoices/);
  });

  it('should load create Invoice page', async () => {
    await invoiceComponentsPage.clickOnCreateButton();
    invoiceUpdatePage = new InvoiceUpdatePage();
    expect(await invoiceUpdatePage.getPageTitle().getAttribute('id')).to.match(/storeApp.invoiceInvoice.home.createOrEditLabel/);
  });

  it('should create and save Invoices', async () => {
    const nbButtonsBeforeCreate = await invoiceComponentsPage.countDeleteButtons();

    await invoiceUpdatePage.setCodeInput('code');
    expect(await invoiceUpdatePage.getCodeInput()).to.match(/code/);
    await invoiceUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await invoiceUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
    await invoiceUpdatePage.setDetailsInput('details');
    expect(await invoiceUpdatePage.getDetailsInput()).to.match(/details/);
    await invoiceUpdatePage.statusSelectLastOption();
    await invoiceUpdatePage.paymentMethodSelectLastOption();
    await invoiceUpdatePage.setPaymentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await invoiceUpdatePage.getPaymentDateInput()).to.contain('2001-01-01T02:30');
    await invoiceUpdatePage.setPaymentAmountInput('5');
    expect(await invoiceUpdatePage.getPaymentAmountInput()).to.eq('5');
    await waitUntilDisplayed(invoiceUpdatePage.getSaveButton());
    await invoiceUpdatePage.save();
    await waitUntilHidden(invoiceUpdatePage.getSaveButton());
    expect(await invoiceUpdatePage.getSaveButton().isPresent()).to.be.false;

    await invoiceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Invoice', async () => {
    await invoiceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await invoiceComponentsPage.countDeleteButtons();
    await invoiceComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    invoiceDeleteDialog = new InvoiceDeleteDialog();
    expect(await invoiceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/storeApp.invoiceInvoice.delete.question/);
    await invoiceDeleteDialog.clickOnConfirmButton();

    await invoiceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
