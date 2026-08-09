import { desc } from "drizzle-orm";
import { db, hasDb } from "@/lib/db";
import { servicesCatalog } from "@/lib/db/schema";
import { DEFAULT_CATALOG, catalogToRateCard, type ServicesCatalog, type RateCard } from "./types";

/** The saved catalog, or the seed when no DB / no saved row / table missing. */
export async function getCatalog(): Promise<ServicesCatalog> {
  if (!hasDb) return DEFAULT_CATALOG;
  try {
    const [row] = await db.select().from(servicesCatalog).orderBy(desc(servicesCatalog.id)).limit(1);
    return row?.data && Array.isArray(row.data) && row.data.length ? row.data : DEFAULT_CATALOG;
  } catch {
    return DEFAULT_CATALOG;
  }
}

export async function saveCatalog(catalog: ServicesCatalog): Promise<boolean> {
  if (!hasDb) return false;
  try {
    // single-row store: overwrite the latest, else insert
    const [row] = await db.select({ id: servicesCatalog.id }).from(servicesCatalog).orderBy(desc(servicesCatalog.id)).limit(1);
    if (row) {
      const { eq } = await import("drizzle-orm");
      await db.update(servicesCatalog).set({ data: catalog, updatedAt: new Date() }).where(eq(servicesCatalog.id, row.id));
    } else {
      await db.insert(servicesCatalog).values({ data: catalog });
    }
    return true;
  } catch {
    return false;
  }
}

export async function getRateCard(): Promise<RateCard> {
  return catalogToRateCard(await getCatalog());
}
