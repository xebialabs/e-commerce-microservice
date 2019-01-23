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

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  async setSizeSelect(size) {
    await this.sizeSelect.sendKeys(size);
  }

  async getSizeSelect() {
    return this.sizeSelect.element(by.css('option:checked')).getText();
  }

  async sizeSelectLastOption() {
    await this.sizeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return this.imageInput.getAttribute('value');
  }

  async productCategorySelectLastOption() {
    await this.productCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productCategorySelectOption(option) {
    await this.productCategorySelect.sendKeys(option);
  }

  getProductCategorySelect() {
    return this.productCategorySelect;
  }

  async getProductCategorySelectedOption() {
    return this.productCategorySelect.element(by.css('option:checked')).getText();
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
