import { BetaAnalyticsDataClient } from "@google-analytics/data";

export type GaStats = {
  totals: { views: number; users: number; sessions: number };
  daily: { day: string; views: number }[];
  topPages: { path: string; views: number }[];
};

/** Pull live stats from the GA4 Data API. Returns null if not configured/erroring. */
export async function getGaStats(): Promise<GaStats | null> {
  const propertyId = process.env.GA_PROPERTY_ID;
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!propertyId || !clientEmail || !privateKey) return null;

  try {
    const client = new BetaAnalyticsDataClient({
      credentials: { client_email: clientEmail, private_key: privateKey },
    });
    const property = `properties/${propertyId}`;

    const [daily] = await client.runReport({
      property,
      dateRanges: [{ startDate: "13daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }, { name: "sessions" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    });

    const [pages] = await client.runReport({
      property,
      dateRanges: [{ startDate: "13daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 6,
    });

    const rows = daily.rows || [];
    const num = (v?: string | null) => Number(v || 0);
    const totals = { views: 0, users: 0, sessions: 0 };
    const dailyOut = rows.map((r) => {
      const d = r.dimensionValues?.[0]?.value || "";
      const views = num(r.metricValues?.[0]?.value);
      totals.views += views;
      totals.users += num(r.metricValues?.[1]?.value);
      totals.sessions += num(r.metricValues?.[2]?.value);
      return { day: d.length === 8 ? `${d.slice(4, 6)}/${d.slice(6, 8)}` : d, views };
    });

    const topPages = (pages.rows || []).map((r) => ({
      path: r.dimensionValues?.[0]?.value || "/",
      views: num(r.metricValues?.[0]?.value),
    }));

    return { totals, daily: dailyOut, topPages };
  } catch {
    return null;
  }
}

export const gaConfigured = Boolean(
  process.env.GA_PROPERTY_ID && process.env.GA_CLIENT_EMAIL && process.env.GA_PRIVATE_KEY
);
