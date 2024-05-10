import { del } from "@vercel/blob";

export const runtime = "edge";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log("delete route", searchParams);
  const urlToDelete = searchParams.get("url") as string;
  await del(urlToDelete);

  return new Response();
}
