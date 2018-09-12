import { element, by, ElementFinder } from 'protractor';

export default class ProductUpdatePage {
  pageTitle: ElementFinder = element(by.id('storeApp.product.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#product-name'));
  descriptionInput: ElementFinder = element(by.css('input#product-description'));
  priceInput: ElementFinder = element(by.css('input#product-price'));
  sizeSelect: ElementFinder = element(by.css('select#product-size'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  productCategorySelect: ElementFinder = element(by.css('select#product-productCategory'));

  getPageTitle() {
    return this.pageTitle;
  }

  setNameInput(name) {
    this.nameInput.sendKeys(name);
  }

  getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  setDescriptionInput(description) {
    this.descriptionInput.sendKeys(description);
  }

  getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  setPriceInput(price) {
    this.priceInput.sendKeys(price);
  }

  getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  setSizeSelect(size) {
    this.sizeSelect.sendKeys(size);
  }

  getSizeSelect() {
    return this.sizeSelect.element(by.css('option:checked')).getText();
  }

  sizeSelectLastOption() {
    this.sizeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setImageInput(image) {
    this.imageInput.sendKeys(image);
  }

  getImageInput() {
    return this.imageInput.getAttribute('value');
  }

  productCategorySelectLastOption() {
    this.productCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  productCategorySelectOption(option) {
    this.productCategorySelect.sendKeys(option);
  }

  getProductCategorySelect() {
    return this.productCategorySelect;
  }

  getProductCategorySelectedOption() {
    return this.productCategorySelect.element(by.css('option:checked')).getText();
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
