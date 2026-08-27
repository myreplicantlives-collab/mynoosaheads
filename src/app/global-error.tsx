"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

// global-error.tsx — top-level error boundary for the App Router.
// Per Next.js docs, this is the only place to catch errors that escape
// the root layout. Sentry's Next.js SDK hooks it to capture the event.

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en-AU">
      <body>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
