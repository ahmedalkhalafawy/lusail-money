# Contributing

Use Node.js 22.18+ and run `npm test` before proposing a change. No dependencies
are required. Include a regression test for changed behavior and update the
TypeScript declarations whenever the public API changes.

Keep the library portable and framework-independent. Document any change to
coercion, rounding, or Unicode isolation. Use synthetic examples, not production
receipts or customer data. Avoid adding database or application dependencies.

An initial useful roadmap:

1. Verify Arabic mixed-direction text on target browsers and receipt printers.
2. Discuss configurable zero thresholds without breaking the inherited API.
3. Add an explicit strict-input API if users need validation rather than coercion.

This roadmap describes future work, not implemented capabilities.
