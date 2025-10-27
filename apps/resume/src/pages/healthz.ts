/**
 * Health check endpoint for network connectivity verification
 * Returns a simple "OK" response without any caching
 */
export async function GET() {
  return new Response("OK", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
