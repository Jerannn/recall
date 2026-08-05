import Navbar from "@/components/layout/Navbar";

export default async function Home() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Landing Page</h1>
    </div>
  );
}
