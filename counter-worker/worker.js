const COUNTER_ID = "portfolio";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method !== "GET" || url.pathname !== "/api/count") {
      return new Response("Not found", {
        status: 404,
        headers: { "Cache-Control": "no-store" }
      });
    }

    try {
      // Atomic increment: every request to /api/count adds exactly 1.
      await env.DB
        .prepare("UPDATE counters SET value = value + 1 WHERE id = ?")
        .bind(COUNTER_ID)
        .run();

      const row = await env.DB
        .prepare("SELECT value FROM counters WHERE id = ?")
        .bind(COUNTER_ID)
        .first();

      const value = Number(row?.value ?? 240);

      return Response.json(
        { value },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        }
      );
    } catch (error) {
      return Response.json(
        { error: "Counter unavailable" },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
  }
};
