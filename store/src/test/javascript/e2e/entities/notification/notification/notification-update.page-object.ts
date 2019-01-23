import { element, by, ElementFinder } from 'protractor';

export default class NotificationUpdatePage {
  pageTitle: ElementFinder = element(by.id('storeApp.notificationNotification.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateInput: ElementFinder = element(by.css('input#notification-date'));
  detailsInput: ElementFinder = element(by.css('input#notification-details'));
  sentDateInput: ElementFinder = element(by.css('input#notification-sentDate'));
  formatSelect: ElementFinder = element(by.css('select#notification-format'));
  userIdInput: ElementFinder = element(by.css('input#notification-userId'));
  productIdInput: ElementFinder = element(by.css('input#notification-productId'));

  getPageTitle() {
    return this.pageTitle;
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

  async setSentDateInput(sentDate) {
    await this.sentDateInput.sendKeys(sentDate);
  }

  async getSentDateInput() {
    return this.sentDateInput.getAttribute('value');
  }

  async setFormatSelect(format) {
    await this.formatSelect.sendKeys(format);
  }

  async getFormatSelect() {
    return this.formatSelect.element(by.css('option:checked')).getText();
  }

  async formatSelectLastOption() {
    await this.formatSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setUserIdInput(userId) {
    await this.userIdInput.sendKeys(userId);
  }

  async getUserIdInput() {
    return this.userIdInput.getAttribute('value');
  }

  async setProductIdInput(productId) {
    await this.productIdInput.sendKeys(productId);
  }

  async getProductIdInput() {
    return this.productIdInput.getAttribute('value');
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
