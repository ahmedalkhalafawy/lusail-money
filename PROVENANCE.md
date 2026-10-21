# Source provenance

Prepared on 2026-10-21 at the project owner's request to extract a standalone
library from Lusail. This document is a transfer record, not a claim that the
entire upstream application is open source.

## Copied code

- Upstream: the owner's private Lusail POS application (kept private).
- Original path: `src/lib/money.ts`.
- Original Git blob: `51d82c3fe979438d288a80ba88c3001886398b7b`.
- Destination: `src/money.ts`.
- Behavior and source text preserved; no production integrations were copied.
- The file was fetched using the owner's connected GitHub access. This identifies
  the selected source precisely; it does not assert that it is the newest of all
  private Lusail deployments or branches.

## Added files

Packaging, declarations, Node test suite, build script, documentation, example,
CI definition, and MIT license were prepared for this extraction. The standalone
tests cover the reusable behavior instead of copying upstream screen-layout
tests that depend on the private application.

The source repository has no repository-level license declared in its metadata.
The included MIT license applies to this proposed standalone distribution on the
basis of the owner's extraction request. The owner should verify rights to this
selected source before public release; no third-party assets are included.

## Deliberately excluded

No Git history, environment files, credentials, database connections, migrations,
customer or employee records, private application screens, branding images,
fonts, deployment configuration, or proprietary service implementations.

## Grant application accuracy

At creation this library is local, unpublished, and has no demonstrated independent
adoption. Do not claim downloads, stars, external users, security approval, or
ecosystem importance without evidence. The private product's full maintenance
history is not the public library's history. No grant application was submitted.
