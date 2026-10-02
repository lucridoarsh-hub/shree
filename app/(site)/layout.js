import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopProvider from "@/components/ShopProvider";
import { getSettings, getCategories, getInfoPages } from "@/lib/data";

// Content comes from MongoDB and is edited from /admin, so render on every request.
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const s = await getSettings();
  return {
    metadataBase: s.siteUrl ? new URL(s.siteUrl) : undefined,
    title: { default: s.metaTitle, template: `%s | ${s.siteName}` },
    description: s.metaDescription,
  };
}

export default async function SiteLayout({ children }) {
  const [s, categories, pages] = await Promise.all([getSettings(), getCategories(), getInfoPages()]);
  const site = { siteName: s.siteName, siteUrl: s.siteUrl, whatsapp: s.whatsapp, whatsappCta: s.whatsappCta, showPrice: s.showPrice };
  return (
    <ShopProvider site={site}>
      <Header s={s} categories={categories} />
      {children}
      <Footer s={s} pages={pages} />
    </ShopProvider>
  );
}
