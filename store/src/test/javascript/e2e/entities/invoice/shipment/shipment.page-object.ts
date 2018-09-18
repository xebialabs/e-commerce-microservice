import { element, by, ElementFinder } from 'protractor';

import { waitUntilCount, waitUntilDisplayed } from '../../../util/utils';

export default class ShipmentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('shipment-heading'));

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

export class ShipmentDeleteDialog {
  private dialogTitle: ElementFinder = element(by.id('storeApp.invoiceShipment.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-shipment'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
