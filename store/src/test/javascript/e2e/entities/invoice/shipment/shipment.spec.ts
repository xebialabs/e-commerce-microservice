/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ShipmentComponentsPage from './shipment.page-object';
import { ShipmentDeleteDialog } from './shipment.page-object';
import ShipmentUpdatePage from './shipment-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Shipment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let shipmentUpdatePage: ShipmentUpdatePage;
  let shipmentComponentsPage: ShipmentComponentsPage;
  /*let shipmentDeleteDialog: ShipmentDeleteDialog;*/

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

  it('should load Shipments', async () => {
    await navBarPage.getEntityPage('shipment');
    shipmentComponentsPage = new ShipmentComponentsPage();
    expect(await shipmentComponentsPage.getTitle().getText()).to.match(/Shipments/);
  });

  it('should load create Shipment page', async () => {
    await shipmentComponentsPage.clickOnCreateButton();
    shipmentUpdatePage = new ShipmentUpdatePage();
    expect(await shipmentUpdatePage.getPageTitle().getAttribute('id')).to.match(/storeApp.invoiceShipment.home.createOrEditLabel/);
  });

  /* it('should create and save Shipments', async () => {
        const nbButtonsBeforeCreate = await shipmentComponentsPage.countDeleteButtons();

        await shipmentUpdatePage.setTrackingCodeInput('trackingCode');
        expect(await shipmentUpdatePage.getTrackingCodeInput()).to.match(/trackingCode/);
        await shipmentUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await shipmentUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        await shipmentUpdatePage.setDetailsInput('details');
        expect(await shipmentUpdatePage.getDetailsInput()).to.match(/details/);
        await shipmentUpdatePage.invoiceSelectLastOption();
        await waitUntilDisplayed(shipmentUpdatePage.getSaveButton());
        await shipmentUpdatePage.save();
        await waitUntilHidden(shipmentUpdatePage.getSaveButton());
        expect(await shipmentUpdatePage.getSaveButton().isPresent()).to.be.false;

        await shipmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await shipmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

  /* it('should delete last Shipment', async () => {
        await shipmentComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await shipmentComponentsPage.countDeleteButtons();
        await shipmentComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        shipmentDeleteDialog = new ShipmentDeleteDialog();
        expect(await shipmentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/storeApp.invoiceShipment.delete.question/);
        await shipmentDeleteDialog.clickOnConfirmButton();

        await shipmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await shipmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
