/**
 * Bidi-safe money rendering.
 *
 * In an RTL paragraph the string "171 ج.م" renders as "ج.م 171" because the
 * Arabic currency run reorders around the LTR numeral. Isolating the numeral
 * alone does not help — the numeral is still laid out inside an RTL base
 * direction. The fix is to isolate the WHOLE money string as one LTR run using
 * U+2066 LEFT-TO-RIGHT ISOLATE … U+2069 POP DIRECTIONAL ISOLATE, so the
 * currency stays glued to the right of the number and the unit as a whole
 * behaves as neutral content inside the surrounding Arabic text.
 */
export const LRI = "\u2066";
export const PDI = "\u2069";

/** Wrap an already-formatted "<amount> <currency>" string in an LTR isolate. */
export function isolateMoney(text: string): string {
  return `${LRI}${text}${PDI}`;
}

/** Compose an isolated money string from a formatted amount and a currency label. */
export function moneyText(amount: string, currency: string): string {
  return isolateMoney(`${amount} ${currency}`);
}

/** Signed money: the minus stays glued before the number, currency after («−45 ج.م»). */
export function signedMoneyText(amount: string, currency: string, negative: boolean): string {
  return isolateMoney(`${negative ? "\u2212" : ""}${amount} ${currency}`);
}

/**
 * Display normalisation for money.
 *
 * Two independent defects are fixed here, once, for every screen:
 *  - IEEE negative zero: `-0` (and any residue such as `-0.004`) must print
 *    as `0.00`, never as `-0.00`.
 *  - Non-finite values (NaN / Infinity from a failed read) must print as 0
 *    rather than leaking "NaN" into a financial figure.
 *
 * Rounding is deliberately NOT applied: callers choose their own fraction
 * digits through `Intl.NumberFormat`.
 */
export const MONEY_ZERO_EPSILON = 0.005;

export function normalizeMoney(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 0;
  if (Math.abs(n) < MONEY_ZERO_EPSILON) return 0;
  return n;
}

/** Signed variant: keeps the sign but never returns `-0`. */
export function normalizeMoneyRounded(value: unknown, fractionDigits = 2): number {
  const n = normalizeMoney(value);
  const factor = 10 ** fractionDigits;
  const r = Math.round(n * factor) / factor;
  return r === 0 ? 0 : r;
}
