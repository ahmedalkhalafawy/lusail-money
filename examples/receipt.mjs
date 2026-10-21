import { moneyText, normalizeMoney } from 'lusail-money';

const amount = new Intl.NumberFormat('en', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(normalizeMoney(171));

console.log(`الإجمالي: ${moneyText(amount, 'ج.م')}`);
