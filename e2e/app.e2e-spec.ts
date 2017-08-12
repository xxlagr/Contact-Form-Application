import { TestAppPage } from './app.po';

describe('test-app App', () => {
  let page: TestAppPage;

  beforeEach(() => {
    page = new TestAppPage();
  });

  it('Validation works', () => {
    page.navigateTo();
    page.fillFormWithIncorrectData();
    page.submitForm();
    expect(page.getFioWithError()).toBeTruthy();
    expect(page.getEmailWithError()).toBeTruthy();
    expect(page.getPhoneWithError()).toBeTruthy();
    page.clearForm();
    page.fillFormWithCorrectData();
    page.submitForm();
    expect(page.getFioWithError()).toBeFalsy();
    expect(page.getEmailWithError()).toBeFalsy();
    expect(page.getPhoneWithError()).toBeFalsy();
  });
});
