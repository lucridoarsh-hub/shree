"use client";
import { useShop } from "./ShopProvider";
import { inr } from "@/lib/format";

export default function Price({ p, large }) {
  const { site } = useShop();
  if (!site.showPrice || !p.price) return <div className="price"><b>Price on request</b></div>;
  return (
    <div className={`price${large ? " lg" : ""}`}>
      <b>{inr(p.price)}</b>
      {p.mrp > p.price && <> <s>{inr(p.mrp)}</s>{large && <> <span className="save">Save {inr(p.mrp - p.price)}</span></>}</>}
    </div>
  );
}
