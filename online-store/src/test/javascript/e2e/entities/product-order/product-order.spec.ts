/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import ProductOrderComponentsPage from './product-order.page-object';
import { ProductOrderDeleteDialog } from './product-order.page-object';
import ProductOrderUpdatePage from './product-order-update.page-object';

const expect = chai.expect;

describe('ProductOrder e2e test', () => {
  let navBarPage: NavBarPage;
  let productOrderUpdatePage: ProductOrderUpdatePage;
  let productOrderComponentsPage: ProductOrderComponentsPage;
  /*let productOrderDeleteDialog: ProductOrderDeleteDialog;*/

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load ProductOrders', async () => {
    navBarPage.getEntityPage('product-order');
    productOrderComponentsPage = new ProductOrderComponentsPage();
    expect(await productOrderComponentsPage.getTitle().getText()).to.match(/Product Orders/);
  });

  it('should load create ProductOrder page', async () => {
    productOrderComponentsPage.clickOnCreateButton();
    productOrderUpdatePage = new ProductOrderUpdatePage();
    expect(await productOrderUpdatePage.getPageTitle().getAttribute('id')).to.match(/storeApp.productOrder.home.createOrEditLabel/);
  });

  /* it('should create and save ProductOrders', async () => {
        productOrderUpdatePage.setPlacedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await productOrderUpdatePage.getPlacedDateInput()).to.contain('2001-01-01T02:30');
        productOrderUpdatePage.statusSelectLastOption();
        productOrderUpdatePage.setCodeInput('code');
        expect(await productOrderUpdatePage.getCodeInput()).to.match(/code/);
        productOrderUpdatePage.setInvoiceIdInput('5');
        expect(await productOrderUpdatePage.getInvoiceIdInput()).to.eq('5');
        productOrderUpdatePage.customerSelectLastOption();
        await productOrderUpdatePage.save();
        expect(await productOrderUpdatePage.getSaveButton().isPresent()).to.be.false;
    });*/

  /* it('should delete last ProductOrder', async () => {
        productOrderComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await productOrderComponentsPage.countDeleteButtons();
        await productOrderComponentsPage.clickOnLastDeleteButton();

        productOrderDeleteDialog = new ProductOrderDeleteDialog();
        expect(await productOrderDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/storeApp.productOrder.delete.question/);
        await productOrderDeleteDialog.clickOnConfirmButton();

        productOrderComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await productOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(() => {
    navBarPage.autoSignOut();
  });
});
