/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import NotificationComponentsPage from './notification.page-object';
import { NotificationDeleteDialog } from './notification.page-object';
import NotificationUpdatePage from './notification-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Notification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let notificationUpdatePage: NotificationUpdatePage;
  let notificationComponentsPage: NotificationComponentsPage;
  let notificationDeleteDialog: NotificationDeleteDialog;

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

  it('should load Notifications', async () => {
    await navBarPage.getEntityPage('notification');
    notificationComponentsPage = new NotificationComponentsPage();
    expect(await notificationComponentsPage.getTitle().getText()).to.match(/Notifications/);
  });

  it('should load create Notification page', async () => {
    await notificationComponentsPage.clickOnCreateButton();
    notificationUpdatePage = new NotificationUpdatePage();
    expect(await notificationUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /storeApp.notificationNotification.home.createOrEditLabel/
    );
  });

  it('should create and save Notifications', async () => {
    const nbButtonsBeforeCreate = await notificationComponentsPage.countDeleteButtons();

    await notificationUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await notificationUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
    await notificationUpdatePage.setDetailsInput('details');
    expect(await notificationUpdatePage.getDetailsInput()).to.match(/details/);
    await notificationUpdatePage.setSentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await notificationUpdatePage.getSentDateInput()).to.contain('2001-01-01T02:30');
    await notificationUpdatePage.formatSelectLastOption();
    await notificationUpdatePage.setUserIdInput('5');
    expect(await notificationUpdatePage.getUserIdInput()).to.eq('5');
    await notificationUpdatePage.setProductIdInput('5');
    expect(await notificationUpdatePage.getProductIdInput()).to.eq('5');
    await waitUntilDisplayed(notificationUpdatePage.getSaveButton());
    await notificationUpdatePage.save();
    await waitUntilHidden(notificationUpdatePage.getSaveButton());
    expect(await notificationUpdatePage.getSaveButton().isPresent()).to.be.false;

    await notificationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await notificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Notification', async () => {
    await notificationComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await notificationComponentsPage.countDeleteButtons();
    await notificationComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    notificationDeleteDialog = new NotificationDeleteDialog();
    expect(await notificationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /storeApp.notificationNotification.delete.question/
    );
    await notificationDeleteDialog.clickOnConfirmButton();

    await notificationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await notificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
