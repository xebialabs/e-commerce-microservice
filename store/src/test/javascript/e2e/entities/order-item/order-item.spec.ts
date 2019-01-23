/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OrderItemComponentsPage from './order-item.page-object';
import { OrderItemDeleteDialog } from './order-item.page-object';
import OrderItemUpdatePage from './order-item-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('OrderItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orderItemUpdatePage: OrderItemUpdatePage;
  let orderItemComponentsPage: OrderItemComponentsPage;
  /*let orderItemDeleteDialog: OrderItemDeleteDialog;*/

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

  it('should load OrderItems', async () => {
    await navBarPage.getEntityPage('order-item');
    orderItemComponentsPage = new OrderItemComponentsPage();
    expect(await orderItemComponentsPage.getTitle().getText()).to.match(/Order Items/);
  });

  it('should load create OrderItem page', async () => {
    await orderItemComponentsPage.clickOnCreateButton();
    orderItemUpdatePage = new OrderItemUpdatePage();
    expect(await orderItemUpdatePage.getPageTitle().getAttribute('id')).to.match(/storeApp.orderItem.home.createOrEditLabel/);
  });

  /* it('should create and save OrderItems', async () => {
        const nbButtonsBeforeCreate = await orderItemComponentsPage.countDeleteButtons();

        await orderItemUpdatePage.setQuantityInput('5');
        expect(await orderItemUpdatePage.getQuantityInput()).to.eq('5');
        await orderItemUpdatePage.setTotalPriceInput('5');
        expect(await orderItemUpdatePage.getTotalPriceInput()).to.eq('5');
        await orderItemUpdatePage.statusSelectLastOption();
        await orderItemUpdatePage.productSelectLastOption();
        await orderItemUpdatePage.orderSelectLastOption();
        await waitUntilDisplayed(orderItemUpdatePage.getSaveButton());
        await orderItemUpdatePage.save();
        await waitUntilHidden(orderItemUpdatePage.getSaveButton());
        expect(await orderItemUpdatePage.getSaveButton().isPresent()).to.be.false;

        await orderItemComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await orderItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

  /* it('should delete last OrderItem', async () => {
        await orderItemComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await orderItemComponentsPage.countDeleteButtons();
        await orderItemComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        orderItemDeleteDialog = new OrderItemDeleteDialog();
        expect(await orderItemDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/storeApp.orderItem.delete.question/);
        await orderItemDeleteDialog.clickOnConfirmButton();

        await orderItemComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await orderItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
