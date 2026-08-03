import Link from "next/link";

export default function SigninPage() {
  return (
    <div>
      <form className="flex flex-col gap-2 max-w-2xl mx-auto">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button type="submit">Sign In</button>

        <Link href="/auth/signup">Sign Up</Link>
      </form>
    </div>
  );
}
