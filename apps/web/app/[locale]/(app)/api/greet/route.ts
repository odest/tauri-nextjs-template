export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body.name;

    if (!name || typeof name !== "string") {
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const sanitizedName = name.trim().slice(0, 100);
    const greeting = `Hello, ${sanitizedName}! You've been greeted from Next.js!`;

    return new Response(JSON.stringify({ greeting }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
