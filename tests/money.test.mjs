import test from 'node:test';
import assert from 'node:assert/strict';
import * as money from 'lusail-money';

test('isolates the complete Arabic amount and currency, including punctuation', () => {
  assert.equal(money.moneyText('1,234.50', 'ج.م'), '\u20661,234.50 ج.م\u2069');
  assert.equal(money.moneyText('١٢٣٫٤٥', 'ر.س'), '\u2066١٢٣٫٤٥ ر.س\u2069');
});
test('can be embedded between Arabic text without including the surrounding words', () => {
  assert.equal(`الإجمالي: ${money.moneyText('171', 'EGP')} فقط`, 'الإجمالي: \u2066171 EGP\u2069 فقط');
});
test('signed amounts use a mathematical minus inside the isolate', () => {
  assert.equal(money.signedMoneyText('45.00', 'ج.م', true), '\u2066−45.00 ج.م\u2069');
  assert.equal(money.signedMoneyText('45.00', 'EGP', false), '\u206645.00 EGP\u2069');
});
test('formatting helpers preserve caller-selected formatting', () => {
  assert.equal(money.isolateMoney(''), '\u2066\u2069');
  assert.equal(money.moneyText('1.234,50', 'EUR'), '\u20661.234,50 EUR\u2069');
});
test('normalization converts finite numeric input and numeric strings', () => {
  assert.equal(money.normalizeMoney('12.50'), 12.5);
  assert.equal(money.normalizeMoney(-12.5), -12.5);
  assert.equal(money.normalizeMoney(0.005), 0.005);
  assert.equal(money.normalizeMoney(-0.005), -0.005);
});
test('non-finite values normalize to zero', () => {
  for (const value of [NaN, Infinity, -Infinity, 'invalid', undefined]) {
    assert.equal(money.normalizeMoney(value), 0);
  }
});
test('negative zero and sub-half-cent residues normalize to positive zero', () => {
  for (const value of [-0, 0, -0.004, 0.004]) {
    assert.equal(Object.is(money.normalizeMoney(value), -0), false);
    assert.equal(money.normalizeMoney(value), 0);
  }
});
test('rounded values preserve normal signs and normalize rounded negative zero', () => {
  assert.equal(money.normalizeMoneyRounded(12.345), 12.35);
  assert.equal(money.normalizeMoneyRounded(-12.345), -12.34);
  assert.equal(money.normalizeMoneyRounded(-0.01, 0), 0);
  assert.equal(money.normalizeMoneyRounded(12.3456, 3), 12.346);
});
test('exports exactly the documented public API', () => {
  assert.deepEqual(Object.keys(money).sort(), [
    'LRI', 'PDI', 'MONEY_ZERO_EPSILON', 'isolateMoney', 'moneyText',
    'signedMoneyText', 'normalizeMoney', 'normalizeMoneyRounded',
  ].sort());
});
test('coercion limits remain explicit rather than silently claiming validation', () => {
  assert.equal(money.normalizeMoney(null), 0);
  assert.equal(money.normalizeMoney(true), 1);
  assert.throws(() => money.normalizeMoney(Symbol('unsupported')), TypeError);
});
