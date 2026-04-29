import { draftMode, headers } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 🟢 ==== Lambda Entry Logging ====
  console.log('[Lambda Entry] Start of page function');
  const h = await headers();
  console.log('[Lambda Entry] x-vercel-url:', h.get('x-vercel-url'));
  console.log('[Lambda Entry] x-vercel-query:', h.get('x-vercel-query'));
  console.log('[Lambda Entry] x-forwarded-query:', h.get('x-forwarded-query'));
  console.log('[Lambda Entry] x-debug-searchparams:', h.get('x-debug-searchparams'));
  // =================================

  const draft = await draftMode();
  let params = undefined;

  if (draft.isEnabled) {
    params = await searchParams;
    console.log('[Page Handler] In draft mode with search params:', params);
  } else {
    console.log('[Page Handler] Not in draft mode');
  }

  console.log('[Page Handler] Final params sent to render:', params);

  return (
    <div>
      <p>Draft mode is {draft.isEnabled ? "enabled" : "disabled"}</p>
      <p>Search params: {JSON.stringify(params)}</p>
    </div>
  );
}

export const generateStaticParams = async () => {
  return [
    { path: [] },
    { path: ["test"] },
  ];
};