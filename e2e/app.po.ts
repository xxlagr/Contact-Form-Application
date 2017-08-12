import { browser, by, element } from 'protractor';

export class TestAppPage {
  navigateTo() {
    return browser.get('/');
  }

  fillFormWithCorrectData() {
    element(by.name('fio')).sendKeys('Петров-Сидоров Алексей Д');
    element(by.name('email')).sendKeys('petrov-sidorov@yandex.by');
    element(by.name('phone')).sendKeys('9901001030');
  }

  clearForm() {
    element(by.name('fio')).clear();
    element(by.name('email')).clear()
    element(by.name('phone')).clear();
  }

  fillFormWithIncorrectData() {
    element(by.name('fio')).sendKeys('Петров-Сидоров');
    element(by.name('email')).sendKeys('petrov-sidorov@yandex');
    element(by.name('phone')).sendKeys('+7(990)100-10-39');
  }

  submitForm() {
    element(by.id('submitButton')).click();
  }

  getFioWithError() {
    return element(by.css('input[name="fio"].error')).isPresent();
  }

  getEmailWithError() {
    return element(by.css('input[name="email"].error')).isPresent();
  }

  getPhoneWithError() {
    return element(by.css('input[name="phone"].error')).isPresent();
  }
}
