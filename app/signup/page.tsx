import Navbar from "@/components/layout/Navbar";
import SignupForm from "@/features/auth/components/SignupForm";

export default async function SignupPage() {
  return (
    <>
      <Navbar />
      <SignupForm />;
    </>
  );
}
