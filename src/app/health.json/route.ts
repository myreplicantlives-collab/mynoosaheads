import health from "@/data/live/_health.json";

export async function GET() {
  // Light cache: the refresh script writes the source-of-truth file;
  // this endpoint just serves it.
  return new Response(
    JSON.stringify({ ...health, servedAt: new Date().toISOString() }, null, 2),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    }
  );
}