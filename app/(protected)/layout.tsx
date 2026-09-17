import ProtectedLayoutShell from "@/components/layout/ProtectedLayoutShell";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ProtectedLayoutShell>{children}</ProtectedLayoutShell>;
}
