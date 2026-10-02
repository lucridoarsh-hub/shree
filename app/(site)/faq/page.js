import PageBanner from "@/components/PageBanner";
import Faq from "@/components/Faq";
import { getFaqs } from "@/lib/data";

export const metadata = { title: "FAQ's" };

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <main>
      <PageBanner title="Have Some Questions?" sub="Answers to the questions we hear most." crumbs={[{ label: "FAQ's" }]} />
      <div style={{ paddingTop: 30 }}>{faqs.length ? <Faq faqs={faqs} /> : <p className="empty">No questions yet.</p>}</div>
    </main>
  );
}
