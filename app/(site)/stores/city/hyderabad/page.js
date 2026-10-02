import { redirect } from "next/navigation";

// Mirrors the original URL structure: /stores/city/hyderabad
export default function Legacy() {
  redirect("/stores/hyderabad");
}
