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

  setSentDateInput(sentDate) {
    this.sentDateInput.sendKeys(sentDate);
  }

  getSentDateInput() {
    return this.sentDateInput.getAttribute('value');
  }

  setFormatSelect(format) {
    this.formatSelect.sendKeys(format);
  }

  getFormatSelect() {
    return this.formatSelect.element(by.css('option:checked')).getText();
  }

  formatSelectLastOption() {
    this.formatSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setUserIdInput(userId) {
    this.userIdInput.sendKeys(userId);
  }

  getUserIdInput() {
    return this.userIdInput.getAttribute('value');
  }

  setProductIdInput(productId) {
    this.productIdInput.sendKeys(productId);
  }

  getProductIdInput() {
    return this.productIdInput.getAttribute('value');
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
