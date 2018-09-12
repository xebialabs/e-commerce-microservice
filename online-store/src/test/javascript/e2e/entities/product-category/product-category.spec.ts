/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import ProductCategoryComponentsPage from './product-category.page-object';
import ProductCategoryUpdatePage from './product-category-update.page-object';

const expect = chai.expect;

describe('ProductCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let productCategoryUpdatePage: ProductCategoryUpdatePage;
  let productCategoryComponentsPage: ProductCategoryComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load ProductCategories', async () => {
    navBarPage.getEntityPage('product-category');
    productCategoryComponentsPage = new ProductCategoryComponentsPage();
    expect(await productCategoryComponentsPage.getTitle().getText()).to.match(/Product Categories/);
  });

  it('should load create ProductCategory page', async () => {
    productCategoryComponentsPage.clickOnCreateButton();
    productCategoryUpdatePage = new ProductCategoryUpdatePage();
    expect(await productCategoryUpdatePage.getPageTitle().getAttribute('id')).to.match(/storeApp.productCategory.home.createOrEditLabel/);
  });

  it('should create and save ProductCategories', async () => {
    productCategoryUpdatePage.setNameInput('name');
    expect(await productCategoryUpdatePage.getNameInput()).to.match(/name/);
    productCategoryUpdatePage.setDescriptionInput('description');
    expect(await productCategoryUpdatePage.getDescriptionInput()).to.match(/description/);
    await productCategoryUpdatePage.save();
    expect(await productCategoryUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
