/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProductOrderComponentsPage from './product-order.page-object';
import { ProductOrderDeleteDialog } from './product-order.page-object';
import ProductOrderUpdatePage from './product-order-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ProductOrder e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productOrderUpdatePage: ProductOrderUpdatePage;
  let productOrderComponentsPage: ProductOrderComponentsPage;
  /*let productOrderDeleteDialog: ProductOrderDeleteDialog;*/

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

  it('should load ProductOrders', async () => {
    await navBarPage.getEntityPage('product-order');
    productOrderComponentsPage = new ProductOrderComponentsPage();
    expect(await productOrderComponentsPage.getTitle().getText()).to.match(/Product Orders/);
  });

  it('should load create ProductOrder page', async () => {
    await productOrderComponentsPage.clickOnCreateButton();
    productOrderUpdatePage = new ProductOrderUpdatePage();
    expect(await productOrderUpdatePage.getPageTitle().getAttribute('id')).to.match(/storeApp.productOrder.home.createOrEditLabel/);
  });

  /* it('should create and save ProductOrders', async () => {
        const nbButtonsBeforeCreate = await productOrderComponentsPage.countDeleteButtons();

        await productOrderUpdatePage.setPlacedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await productOrderUpdatePage.getPlacedDateInput()).to.contain('2001-01-01T02:30');
        await productOrderUpdatePage.statusSelectLastOption();
        await productOrderUpdatePage.setCodeInput('code');
        expect(await productOrderUpdatePage.getCodeInput()).to.match(/code/);
        await productOrderUpdatePage.setInvoiceIdInput('5');
        expect(await productOrderUpdatePage.getInvoiceIdInput()).to.eq('5');
        await productOrderUpdatePage.customerSelectLastOption();
        await waitUntilDisplayed(productOrderUpdatePage.getSaveButton());
        await productOrderUpdatePage.save();
        await waitUntilHidden(productOrderUpdatePage.getSaveButton());
        expect(await productOrderUpdatePage.getSaveButton().isPresent()).to.be.false;

        await productOrderComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await productOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

  /* it('should delete last ProductOrder', async () => {
        await productOrderComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await productOrderComponentsPage.countDeleteButtons();
        await productOrderComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        productOrderDeleteDialog = new ProductOrderDeleteDialog();
        expect(await productOrderDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/storeApp.productOrder.delete.question/);
        await productOrderDeleteDialog.clickOnConfirmButton();

        await productOrderComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await productOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
