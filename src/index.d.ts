/** Left-to-right isolate (U+2066). */
export declare const LRI = "\u2066";
/** Pop directional isolate (U+2069). */
export declare const PDI = "\u2069";
export declare function isolateMoney(text: string): string;
export declare function moneyText(amount: string, currency: string): string;
export declare function signedMoneyText(amount: string, currency: string, negative: boolean): string;
export declare const MONEY_ZERO_EPSILON = 0.005;
export declare function normalizeMoney(value: unknown): number;
export declare function normalizeMoneyRounded(value: unknown, fractionDigits?: number): number;
