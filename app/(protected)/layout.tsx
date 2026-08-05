import Sidebar from "@/components/layout/Sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="h-screen grid grid-cols-[240px_1fr]">
      <Sidebar />
      {children}
    </div>
  );
}
