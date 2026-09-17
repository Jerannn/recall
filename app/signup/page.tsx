import Navbar from "@/components/layout/Navbar";
import SignupForm from "@/features/auth/components/SignupForm";

export default async function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <SignupForm />
      </div>
    </div>
  );
}
