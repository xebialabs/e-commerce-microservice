import { element, by, ElementFinder } from 'protractor';

export default class InvoiceUpdatePage {
  pageTitle: ElementFinder = element(by.id('storeApp.invoiceInvoice.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateInput: ElementFinder = element(by.css('input#invoice-date'));
  detailsInput: ElementFinder = element(by.css('input#invoice-details'));
  statusSelect: ElementFinder = element(by.css('select#invoice-status'));
  paymentMethodSelect: ElementFinder = element(by.css('select#invoice-paymentMethod'));
  paymentDateInput: ElementFinder = element(by.css('input#invoice-paymentDate'));
  paymentAmountInput: ElementFinder = element(by.css('input#invoice-paymentAmount'));

  getPageTitle() {
    return this.pageTitle;
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

  setStatusSelect(status) {
    this.statusSelect.sendKeys(status);
  }

  getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  statusSelectLastOption() {
    this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setPaymentMethodSelect(paymentMethod) {
    this.paymentMethodSelect.sendKeys(paymentMethod);
  }

  getPaymentMethodSelect() {
    return this.paymentMethodSelect.element(by.css('option:checked')).getText();
  }

  paymentMethodSelectLastOption() {
    this.paymentMethodSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setPaymentDateInput(paymentDate) {
    this.paymentDateInput.sendKeys(paymentDate);
  }

  getPaymentDateInput() {
    return this.paymentDateInput.getAttribute('value');
  }

  setPaymentAmountInput(paymentAmount) {
    this.paymentAmountInput.sendKeys(paymentAmount);
  }

  getPaymentAmountInput() {
    return this.paymentAmountInput.getAttribute('value');
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
