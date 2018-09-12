import { element, by, ElementFinder } from 'protractor';

export default class OrderItemUpdatePage {
  pageTitle: ElementFinder = element(by.id('storeApp.orderItem.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantityInput: ElementFinder = element(by.css('input#order-item-quantity'));
  totalPriceInput: ElementFinder = element(by.css('input#order-item-totalPrice'));
  statusSelect: ElementFinder = element(by.css('select#order-item-status'));
  productSelect: ElementFinder = element(by.css('select#order-item-product'));
  orderSelect: ElementFinder = element(by.css('select#order-item-order'));

  getPageTitle() {
    return this.pageTitle;
  }

  setQuantityInput(quantity) {
    this.quantityInput.sendKeys(quantity);
  }

  getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  setTotalPriceInput(totalPrice) {
    this.totalPriceInput.sendKeys(totalPrice);
  }

  getTotalPriceInput() {
    return this.totalPriceInput.getAttribute('value');
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
  productSelectLastOption() {
    this.productSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  productSelectOption(option) {
    this.productSelect.sendKeys(option);
  }

  getProductSelect() {
    return this.productSelect;
  }

  getProductSelectedOption() {
    return this.productSelect.element(by.css('option:checked')).getText();
  }

  orderSelectLastOption() {
    this.orderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  orderSelectOption(option) {
    this.orderSelect.sendKeys(option);
  }

  getOrderSelect() {
    return this.orderSelect;
  }

  getOrderSelectedOption() {
    return this.orderSelect.element(by.css('option:checked')).getText();
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
