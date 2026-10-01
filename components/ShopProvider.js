"use client";
import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);
export const useShop = () => useContext(Ctx);

const load = (k) => {
  try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; }
};

export default function ShopProvider({ children }) {
  const [wish, setWish] = useState([]);
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWish(load("jl-wish"));
    setCart(load("jl-cart"));
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("jl-wish", JSON.stringify(wish));
      localStorage.setItem("jl-cart", JSON.stringify(cart));
    } catch {}
  }, [wish, cart, ready]);

  const toggleWish = (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const addCart = (id) => setCart((c) => (c.includes(id) ? c : [...c, id]));
  const removeCart = (id) => setCart((c) => c.filter((x) => x !== id));

  return <Ctx.Provider value={{ wish, cart, toggleWish, addCart, removeCart }}>{children}</Ctx.Provider>;
}
