import { element, by, ElementFinder } from 'protractor';

export default class ShipmentUpdatePage {
  pageTitle: ElementFinder = element(by.id('storeApp.invoiceShipment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  trackingCodeInput: ElementFinder = element(by.css('input#shipment-trackingCode'));
  dateInput: ElementFinder = element(by.css('input#shipment-date'));
  detailsInput: ElementFinder = element(by.css('input#shipment-details'));
  invoiceSelect: ElementFinder = element(by.css('select#shipment-invoice'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTrackingCodeInput(trackingCode) {
    await this.trackingCodeInput.sendKeys(trackingCode);
  }

  async getTrackingCodeInput() {
    return this.trackingCodeInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setDetailsInput(details) {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput() {
    return this.detailsInput.getAttribute('value');
  }

  async invoiceSelectLastOption() {
    await this.invoiceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async invoiceSelectOption(option) {
    await this.invoiceSelect.sendKeys(option);
  }

  getInvoiceSelect() {
    return this.invoiceSelect;
  }

  async getInvoiceSelectedOption() {
    return this.invoiceSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
