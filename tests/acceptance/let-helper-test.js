/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: let helper', function() {
  let application;

  beforeEach(function() {
    application = startApp();
    visit('/');
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('binds basic values', () => {
    andThen(() => {
      expect(find('ul.basic li:first').text()).to.equal('abc');
      expect(find('ul.basic li:last').text()).to.equal('123');
    });
  });

  it('binds nested values', () => {
    andThen(() => {
      let expected = ['first', 'second', 'third'];

      find('ul.with-hash li').each((i, v) => {
        expect($(v).text()).to.equal(expected[i]);
      });
    });
  });

  it('binds class instances', () => {
    andThen(() => {
      expect(find('.with-helper-object #bool-value').text()).to.equal('false');
    });

    click('button#toggle-bool');

    andThen(() => {
      expect(find('.with-helper-object #bool-value').text()).to.equal('true');
    });
  });

  it('will yield its block even when the value is falsey', () => {
    let expected = ['this is undefined', 'this is null', 'this is an empty array'];

    andThen(() => {
      find('.missing-values li').each((i, v) => {
        expect($(v).text()).to.equal(expected[i]);
      });
    });
  });
});
