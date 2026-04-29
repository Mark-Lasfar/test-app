import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  console.log('[API Route] Request URL:', request.url);
  const url = new URL(request.url);
  console.log('[API Route] SearchParams in API:', Object.fromEntries(url.searchParams));
  
  const draft = await draftMode();
  draft.enable();
  
  redirect(`/test?language=en&timestamp=${Date.now()}`);
}