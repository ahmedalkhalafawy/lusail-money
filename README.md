# lusail-money

Small, dependency-free helpers for displaying money inside Arabic and other
right-to-left text. Extracted from the Lusail POS codebase.

**Status:** initial extraction, version 0.1.0. Source available on
[GitHub](https://github.com/ahmedalkhalafawy/lusail-money); not published to npm.
No independent adoption, downloads, or community maintenance are claimed.

## What it does

Wraps the full amount and currency label in Unicode left-to-right isolation
(`U+2066` and `U+2069`). This keeps the amount and currency together as a unit
inside mixed-direction plain text. Includes the original POS display helpers
for suppressing negative zero and handling non-finite numeric values.

There are no framework, database, network, or runtime package dependencies.

## Build and test

Requires Node.js 22.18+ for the build tool. No dependency installation needed.

```sh
npm test
npm run build
npm pack --dry-run
```

Without npm on PATH:

```sh
node scripts/build.mjs
node --test tests/*.test.mjs
```

The generated JavaScript uses ordinary ESM and does not require TypeScript at
runtime. TypeScript declarations are included in `dist/index.d.ts`.

## Use locally

This package name has not been reserved or published on npm. Clone and build:

```sh
git clone https://github.com/ahmedalkhalafawy/lusail-money.git
cd lusail-money
node scripts/build.mjs
```

Then, from another local project:

```sh
npm install /absolute/path/to/lusail-money
```

Build the library first. Then import:

```js
import { moneyText, normalizeMoney, signedMoneyText } from 'lusail-money';

const amount = new Intl.NumberFormat('en', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(normalizeMoney(171));

const receiptLine = `الإجمالي: ${moneyText(amount, 'ج.م')}`;
const refund = signedMoneyText('45.00', 'EGP', true);
```

Use `textContent` when inserting plain strings into HTML. These helpers do not
sanitize HTML, escape untrusted content, or strip caller-supplied bidi controls.
HTML applications can also use a semantic `<bdi dir="ltr">` container.

## API

| Export | Behavior |
| --- | --- |
| `isolateMoney(text)` | Wraps a string in LRI/PDI; does not detect existing isolation. |
| `moneyText(amount, currency)` | Joins preformatted strings with a space, then isolates the full string. |
| `signedMoneyText(amount, currency, negative)` | Prepends U+2212 when `negative` is true; pass an unsigned amount string. |
| `normalizeMoney(value)` | Converts with `Number`, maps non-finite values and magnitudes below 0.005 to positive zero. |
| `normalizeMoneyRounded(value, fractionDigits = 2)` | Normalizes first, then applies JavaScript `Math.round` at the selected precision. |
| `LRI`, `PDI` | Unicode isolation boundary characters. |
| `MONEY_ZERO_EPSILON` | The inherited fixed threshold: 0.005. |

## Boundaries

- Display helpers, not an accounting or decimal arithmetic engine. They do not
  calculate tax, settle payments, convert currency, or replace server validation.
- The 0.005 threshold is fixed even when `fractionDigits` is 0 or 3. It is
  inherited from two-decimal POS displays, so use another normalization policy
  for currencies or measurements requiring smaller values.
- `Math.round` and binary floating-point behavior are preserved. For example,
  negative ties round toward positive infinity; no banking-rounding guarantee.
- Numeric coercion follows JavaScript: `null` becomes 0, `true` becomes 1, and
  Symbols or objects whose conversion throws will throw. Validate external input
  before calling. Use sensible integer fraction digits (normally 0 through 3).
- Unicode isolation is a presentation hint. Printers and renderers vary; test
  the actual target. Automated tests verify code points and numeric behavior,
  not physical printer output or every browser's visual rendering.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and
[PROVENANCE.md](PROVENANCE.md). Contributions should stay focused on portable
money display. The original Lusail application remains separate.

MIT licensed. See [LICENSE](LICENSE).
