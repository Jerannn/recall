import Sidebar from "@/components/layout/Sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid h-screen grid-cols-[240px_1fr]">
      <Sidebar />
      {children}
    </div>
  );
}
