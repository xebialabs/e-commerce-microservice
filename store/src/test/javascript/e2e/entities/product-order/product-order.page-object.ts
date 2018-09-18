import { element, by, ElementFinder } from 'protractor';

import { waitUntilCount, waitUntilDisplayed } from '../../util/utils';

export default class ProductOrderComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('product-order-heading'));

  clickOnCreateButton() {
    return this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  getTitle() {
    return this.title;
  }

  waitUntilLoaded() {
    waitUntilDisplayed(this.deleteButtons.first());
  }

  waitUntilDeleteButtonsLength(length) {
    waitUntilCount(this.deleteButtons, length);
  }
}

export class ProductOrderDeleteDialog {
  private dialogTitle: ElementFinder = element(by.id('storeApp.productOrder.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-productOrder'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
