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

  setTrackingCodeInput(trackingCode) {
    this.trackingCodeInput.sendKeys(trackingCode);
  }

  getTrackingCodeInput() {
    return this.trackingCodeInput.getAttribute('value');
  }

  setDateInput(date) {
    this.dateInput.sendKeys(date);
  }

  getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  setDetailsInput(details) {
    this.detailsInput.sendKeys(details);
  }

  getDetailsInput() {
    return this.detailsInput.getAttribute('value');
  }

  invoiceSelectLastOption() {
    this.invoiceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  invoiceSelectOption(option) {
    this.invoiceSelect.sendKeys(option);
  }

  getInvoiceSelect() {
    return this.invoiceSelect;
  }

  getInvoiceSelectedOption() {
    return this.invoiceSelect.element(by.css('option:checked')).getText();
  }

  save() {
    return this.saveButton.click();
  }

  cancel() {
    this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
