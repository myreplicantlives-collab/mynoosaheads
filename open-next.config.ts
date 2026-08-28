// open-next.config.ts
// Configuration for @opennextjs/cloudflare.
//
// Default configuration works for most apps — we only override what
// is necessary. See:
//   https://opennext.js.org/cloudflare/config

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Default cache uses an in-memory implementation. For production we
  // recommend Cloudflare R2 — uncomment the `r2` block once an R2
  // bucket is provisioned in the Cloudflare account (name below is a
  // placeholder; replace with the bucket name after R2 is set up).
  //
  // cache: {
  //   mode: "r2",
  //   r2: { bucketName: "mynoosaheads-cache" },
  // },
});