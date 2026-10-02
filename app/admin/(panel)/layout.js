import { redirect } from "next/navigation";
import Shell from "@/components/admin/Shell";
import { isAdmin } from "@/lib/auth";
import { getDb } from "@/lib/mongo";

export default async function Panel({ children }) {
  if (!(await isAdmin())) redirect("/admin/login");
  let unread = 0;
  try {
    unread = await (await getDb()).collection("messages").countDocuments({ read: false });
  } catch {}
  return <Shell unread={unread}>{children}</Shell>;
}
