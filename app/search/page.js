import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";
import PageBanner from "@/components/PageBanner";

export const metadata = { title: "Search | Sree Sivani Jewellers" };

export default function Search() {
  return (
    <main>
      <PageBanner title="Search" crumbs={[{ label: "Search" }]} />
      <div className="container" style={{ paddingBottom: 60 }}>
        <Suspense fallback={null}><SearchResults /></Suspense>
      </div>
    </main>
  );
}
