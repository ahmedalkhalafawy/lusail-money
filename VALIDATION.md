# Validation record

Local validation on 2026-10-21 using Node.js v24.19.0 on Windows:

- Built ESM JavaScript and declarations successfully.
- Passed 10 behavior tests with Node's built-in test runner.
- Packed the distributable successfully using bundled pnpm.
- Extracted the tarball into a separate scratch directory and verified package
  self-reference import plus formatting and rounding behavior.
- Verified the copied source's Git blob hash matches upstream exactly:
  `51d82c3fe979438d288a80ba88c3001886398b7b`.
- Scanned the 17 library files present before this record was added for selected
  secret patterns and environment filenames; no findings. This is a limited
  check, not a comprehensive audit or guarantee of publication safety.

CI for Node 22.18 and 24 is prepared but has not run on GitHub. Type declarations
were supplied and reviewed, but no TypeScript compiler check was run. No npm or
GitHub publication, grant submission, browser visual validation, or physical
printer test was performed.

The Node build API currently emits an experimental-feature warning; the build
completed successfully. Generated library JavaScript does not use this API.
