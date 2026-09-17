import Navbar from "@/components/layout/Navbar";
import SigninForm from "@/features/auth/components/SigninForm";

export default async function SigninPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <SigninForm />
      </div>
    </div>
  );
}
