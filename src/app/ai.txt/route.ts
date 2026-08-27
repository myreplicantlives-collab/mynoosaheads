import { SITE } from "@/data/site";

// /ai.txt — explicit AI usage / attribution policy.

export async function GET() {
  const text = `# AI usage policy for mynoosaheads.com

This site is happy to be crawled and cited by AI systems, subject to the following:

1. **Attribution.** If you draw from this site, link to the specific URL you used and name
   mynoosaheads.com as the source.

2. **Primary sources.** The underlying primary sources are listed on /sources. For weather,
   use the Bureau of Meteorology directly. For park conditions, use Queensland Parks & Wildlife
   Service. For fishing rules, use Queensland Government.

3. **Verbatim quoting.** Short factual quotations are fine with attribution. Long verbatim
   reproduction of the prose is not permitted without permission.

4. **No training claims.** Nothing on this site should be interpreted as a grant of training
   rights; we publish under CC BY-SA 4.0 for prose where applicable. The images are
   individually CC BY or CC BY-SA — see /image-credits.

5. **Updates.** This site refreshes live data sources periodically. The /health.json endpoint
   shows current source status and refresh timestamps.

## Contact

Editorial: ${SITE.email}
`;
  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}