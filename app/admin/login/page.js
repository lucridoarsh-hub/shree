import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function Login() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="loginwrap">
      <LoginForm />
    </div>
  );
}
