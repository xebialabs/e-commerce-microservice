/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import ShipmentComponentsPage from './shipment.page-object';
import ShipmentUpdatePage from './shipment-update.page-object';

const expect = chai.expect;

describe('Shipment e2e test', () => {
  let navBarPage: NavBarPage;
  let shipmentUpdatePage: ShipmentUpdatePage;
  let shipmentComponentsPage: ShipmentComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Shipments', async () => {
    navBarPage.getEntityPage('shipment');
    shipmentComponentsPage = new ShipmentComponentsPage();
    expect(await shipmentComponentsPage.getTitle().getText()).to.match(/Shipments/);
  });

  it('should load create Shipment page', async () => {
    shipmentComponentsPage.clickOnCreateButton();
    shipmentUpdatePage = new ShipmentUpdatePage();
    expect(await shipmentUpdatePage.getPageTitle().getAttribute('id')).to.match(/storeApp.invoiceShipment.home.createOrEditLabel/);
  });

  it('should create and save Shipments', async () => {
    shipmentUpdatePage.setTrackingCodeInput('trackingCode');
    expect(await shipmentUpdatePage.getTrackingCodeInput()).to.match(/trackingCode/);
    shipmentUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await shipmentUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
    shipmentUpdatePage.setDetailsInput('details');
    expect(await shipmentUpdatePage.getDetailsInput()).to.match(/details/);
    shipmentUpdatePage.invoiceSelectLastOption();
    await shipmentUpdatePage.save();
    expect(await shipmentUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
