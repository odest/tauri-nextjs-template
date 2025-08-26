export async function POST(req: Request) {
  const { name } = await req.json();
  const greeting = `Hello, ${name}! You've been greeted from Next.js!`;
  return new Response(JSON.stringify({ greeting: greeting }));
}
