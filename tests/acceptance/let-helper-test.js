import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | let helper');

test('let binds basic values', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(find('ul.basic li:first').text(), 'abc');
    assert.equal(find('ul.basic li:last').text(), '123');
  });
});

test('let binds nested values', function(assert) {
  visit('/');

  andThen(() => {
    let expected = ['first', 'second', 'third'];
    find('ul.with-hash li').each((i, v) => {
      assert.equal($(v).text(), expected[i], `should equal ${expected[i]}`);
    });
  });
});

test('let binds class instances', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(find('.with-helper-object #bool-value').text(), 'false', 'bool.value should start as false');
  });

  click('button#toggle-bool');

  andThen(() => {
    assert.equal(find('.with-helper-object #bool-value').text(), 'true', 'bool.value should be false after the toggle method is called');
  });
});

test('let will yield its block even when the value is undefined/null/[]', function(assert) {
  visit('/');

  let expected = ['this is undefined', 'this is null', 'this is an empty array'];

  andThen(() => {
    find('.missing-values li').each((i, v) => {
      assert.equal($(v).text(), expected[i], "should bind the variables even if they're falsey values");
    })
  })
})
