import PageBanner from "@/components/PageBanner";
import Faq from "@/components/Faq";

export const metadata = { title: "FAQ's | Sree Sivani Jewellers" };

export default function FaqPage() {
  return (
    <main>
      <PageBanner title="Have Some Questions?" sub="Answers to the questions we hear most." crumbs={[{ label: "FAQ's" }]} />
      <div style={{ paddingTop: 30 }}><Faq /></div>
    </main>
  );
}
