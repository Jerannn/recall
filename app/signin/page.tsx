import Navbar from "@/components/layout/Navbar";
import SigninForm from "@/features/auth/components/SigninForm";

export default async function SigninPage() {
  return (
    <>
      <Navbar />
      <SigninForm />;
    </>
  );
}
