import { draftMode, headers } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const draft = await draftMode();
  const h = await headers();

  const params = await searchParams;

  console.log("====================================");
  console.log("DRAFT MODE:", draft.isEnabled);

  // Next.js parsed query
  console.log("SEARCH PARAMS (Next):", params);

  // Raw request info
  console.log("RAW HOST:", h.get("host"));
  console.log("RAW URL HEADER (x-url):", h.get("x-url"));
  console.log("FORWARDED URI:", h.get("x-forwarded-uri"));
  console.log("FORWARDED QUERY:", h.get("x-forwarded-query"));

  console.log("HAS QUERY KEYS:", Object.keys(params || {}).length);

  console.log("====================================");

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