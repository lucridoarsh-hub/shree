"use client";
import Link from "next/link";
import { useShop } from "./ShopProvider";

export default function ProductActions({ id }) {
  const { cart, wish, addCart, toggleWish } = useShop();
  const inCart = cart.includes(id);
  return (
    <div className="btns">
      {inCart ? (
        <Link className="btn solid" href="/cart">Go to Cart</Link>
      ) : (
        <button className="btn solid" onClick={() => addCart(id)}>Add to Cart</button>
      )}
      <button className="btn" onClick={() => toggleWish(id)}>{wish.includes(id) ? "♥ Wishlisted" : "♡ Add to Wishlist"}</button>
    </div>
  );
}
