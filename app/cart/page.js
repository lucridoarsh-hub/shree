"use client";
import Link from "next/link";
import { useState } from "react";
import PageBanner from "@/components/PageBanner";
import { useShop } from "@/components/ShopProvider";
import { products, inr } from "@/data/catalog";

export default function Cart() {
  const { cart, removeCart } = useShop();
  const [placed, setPlaced] = useState(false);
  const items = products.filter((p) => cart.includes(p.id));
  const total = items.reduce((s, p) => s + p.price, 0);
  return (
    <main>
      <PageBanner title="Shopping Bag" crumbs={[{ label: "Cart" }]} />
      <div className="container" style={{ paddingBottom: 60 }}>
        {placed ? (
          <div className="emptybox"><p>Demo only: no order was placed. Visit a Sree Sivani Jewellers store to purchase.</p><Link className="btn solid" href="/stores/hyderabad">Find a Store</Link></div>
        ) : items.length ? (
          <div className="cartwrap">
            <div>
              {items.map((p) => (
                <div className="cartrow" key={p.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} />
                  <div>
                    <Link href={`/products/${p.id}`}><b>{p.name}</b></Link>
                    <small>{p.metal} · {p.weight}</small>
                    <button className="link" onClick={() => removeCart(p.id)}>Remove</button>
                  </div>
                  <b>{inr(p.price)}</b>
                </div>
              ))}
            </div>
            <aside className="summary">
              <h3>Order Summary</h3>
              <p><span>Subtotal</span><b>{inr(total)}</b></p>
              <p><span>Delivery</span><b>Free</b></p>
              <p className="tot"><span>Total</span><b>{inr(total)}</b></p>
              <button className="btn solid" style={{ width: "100%", justifyContent: "center" }} onClick={() => setPlaced(true)}>Proceed to Checkout</button>
            </aside>
          </div>
        ) : (
          <div className="emptybox"><p>Your bag is empty.</p><Link className="btn solid" href="/collections/new-arrivals">Start Shopping</Link></div>
        )}
      </div>
    </main>
  );
}
