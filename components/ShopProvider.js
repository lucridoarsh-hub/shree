"use client";
import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);
export const useShop = () => useContext(Ctx);

const load = (k) => {
  try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; }
};

// Holds the wishlist (saved in the visitor's browser) and the public site settings
// that client components need (WhatsApp number, price visibility ...).
export default function ShopProvider({ site, children }) {
  const [wish, setWish] = useState([]);
  const [ready, setReady] = useState(false);

  // Read the saved wishlist after hydration (localStorage is not available on the server).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWish(load("ssj-wish"));
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem("ssj-wish", JSON.stringify(wish)); } catch {}
  }, [wish, ready]);

  const toggleWish = (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  return <Ctx.Provider value={{ wish, toggleWish, site }}>{children}</Ctx.Provider>;
}
