import { element, by, ElementFinder } from 'protractor';

export default class CustomerUpdatePage {
  pageTitle: ElementFinder = element(by.id('storeApp.customer.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#customer-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#customer-lastName'));
  genderSelect: ElementFinder = element(by.css('select#customer-gender'));
  emailInput: ElementFinder = element(by.css('input#customer-email'));
  phoneInput: ElementFinder = element(by.css('input#customer-phone'));
  addressLine1Input: ElementFinder = element(by.css('input#customer-addressLine1'));
  addressLine2Input: ElementFinder = element(by.css('input#customer-addressLine2'));
  cityInput: ElementFinder = element(by.css('input#customer-city'));
  countryInput: ElementFinder = element(by.css('input#customer-country'));
  userSelect: ElementFinder = element(by.css('select#customer-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  setFirstNameInput(firstName) {
    this.firstNameInput.sendKeys(firstName);
  }

  getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  setLastNameInput(lastName) {
    this.lastNameInput.sendKeys(lastName);
  }

  getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  setGenderSelect(gender) {
    this.genderSelect.sendKeys(gender);
  }

  getGenderSelect() {
    return this.genderSelect.element(by.css('option:checked')).getText();
  }

  genderSelectLastOption() {
    this.genderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setEmailInput(email) {
    this.emailInput.sendKeys(email);
  }

  getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  setPhoneInput(phone) {
    this.phoneInput.sendKeys(phone);
  }

  getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  setAddressLine1Input(addressLine1) {
    this.addressLine1Input.sendKeys(addressLine1);
  }

  getAddressLine1Input() {
    return this.addressLine1Input.getAttribute('value');
  }

  setAddressLine2Input(addressLine2) {
    this.addressLine2Input.sendKeys(addressLine2);
  }

  getAddressLine2Input() {
    return this.addressLine2Input.getAttribute('value');
  }

  setCityInput(city) {
    this.cityInput.sendKeys(city);
  }

  getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  setCountryInput(country) {
    this.countryInput.sendKeys(country);
  }

  getCountryInput() {
    return this.countryInput.getAttribute('value');
  }

  userSelectLastOption() {
    this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  userSelectOption(option) {
    this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
