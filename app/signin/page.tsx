import Navbar from "@/components/Navbar";
import SigninForm from "@/features/auth/components/SigninForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SigninPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navbar />
      <SigninForm />;
    </>
  );
}
