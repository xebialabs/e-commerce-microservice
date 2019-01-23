import { element, by, ElementFinder } from 'protractor';

export default class InvoiceUpdatePage {
  pageTitle: ElementFinder = element(by.id('storeApp.invoiceInvoice.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#invoice-code'));
  dateInput: ElementFinder = element(by.css('input#invoice-date'));
  detailsInput: ElementFinder = element(by.css('input#invoice-details'));
  statusSelect: ElementFinder = element(by.css('select#invoice-status'));
  paymentMethodSelect: ElementFinder = element(by.css('select#invoice-paymentMethod'));
  paymentDateInput: ElementFinder = element(by.css('input#invoice-paymentDate'));
  paymentAmountInput: ElementFinder = element(by.css('input#invoice-paymentAmount'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
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

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setPaymentMethodSelect(paymentMethod) {
    await this.paymentMethodSelect.sendKeys(paymentMethod);
  }

  async getPaymentMethodSelect() {
    return this.paymentMethodSelect.element(by.css('option:checked')).getText();
  }

  async paymentMethodSelectLastOption() {
    await this.paymentMethodSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setPaymentDateInput(paymentDate) {
    await this.paymentDateInput.sendKeys(paymentDate);
  }

  async getPaymentDateInput() {
    return this.paymentDateInput.getAttribute('value');
  }

  async setPaymentAmountInput(paymentAmount) {
    await this.paymentAmountInput.sendKeys(paymentAmount);
  }

  async getPaymentAmountInput() {
    return this.paymentAmountInput.getAttribute('value');
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
