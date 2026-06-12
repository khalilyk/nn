import { NextRequest, NextResponse } from "next/server";

const SPARQL_ENDPOINT = "https://data.getty.edu/museum/collection/sparql";
const OBJECT_BASE = "https://data.getty.edu/museum/collection/object/";

// Accession prefix → category mapping
const CATEGORY_PREFIXES: Record<string, string[]> = {
  Paintings:   [".PA."],
  Drawings:    [".PC.", ".GD.", ".GG.", ".GB.", ".GA."],
  Photographs: [".XP.", ".XM.", ".XO.", ".XA.", ".XB.", ".XC.", ".XH."],
  Antiquities: [".AE.", ".AH.", ".AI.", ".AC."],
};

type GettyObject = {
  id: string;
  label: string;
  imageUrl: string | null;
  category: string;
};

async function fetchObject(id: string): Promise<GettyObject | null> {
  try {
    const res = await fetch(`${OBJECT_BASE}${id}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();

    const label = data._label ?? "Untitled";
    const rep = data.representation?.[0];
    const imageUrl = rep?.id?.includes("media.getty") ? rep.id : null;
    if (!imageUrl) return null;

    const category =
      (data.classified_as ?? []).find((c: { classified_as?: { _label: string }[]; _label?: string }) =>
        c.classified_as?.some((s) => s._label === "Classification (Category)")
      )?._label ?? "Other";

    return { id, label, imageUrl, category };
  } catch {
    return null;
  }
}

function buildQuery(category: string | null, offset: number): string {
  const prefixes =
    category && CATEGORY_PREFIXES[category]
      ? CATEGORY_PREFIXES[category]
      : Object.values(CATEGORY_PREFIXES).flat();

  const filters = prefixes
    .map((p) => `CONTAINS(?accession, "${p}")`)
    .join(" || ");

  return `PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
SELECT ?obj WHERE {
  ?obj a crm:E22_Human-Made_Object .
  ?obj crm:P1_is_identified_by ?idNode .
  ?idNode crm:P190_has_symbolic_content ?accession .
  FILTER(${filters})
} LIMIT 40 OFFSET ${offset}`;
}

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category") || null;
  const offset = Math.floor(Math.random() * 500);

  const sparqlRes = await fetch(
    `${SPARQL_ENDPOINT}?query=${encodeURIComponent(buildQuery(category, offset))}`,
    { headers: { Accept: "application/sparql-results+json" } }
  );

  if (!sparqlRes.ok) {
    return NextResponse.json({ error: "SPARQL fetch failed" }, { status: 502 });
  }

  const sparqlData = await sparqlRes.json();
  const ids: string[] = (sparqlData.results?.bindings ?? [])
    .map((b: { obj: { value: string } }) => b.obj.value.split("/").pop())
    .filter(Boolean);

  // Shuffle so we don't always get the same order
  ids.sort(() => Math.random() - 0.5);

  const results: GettyObject[] = [];
  await Promise.all(
    ids.slice(0, 20).map(async (id) => {
      const obj = await fetchObject(id);
      if (obj) results.push(obj);
    })
  );

  return NextResponse.json(results.slice(0, 12));
}
