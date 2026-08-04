"use client";

import Link from "next/link";
import { useState, ChangeEvent } from "react";
import useSocialAuth from "../hooks/use-social-auth";
import useEmailAuth from "../hooks/use-email-auth";

const initialFormData = {
  email: "",
  password: "",
};

export default function SigninForm() {
  const [formData, setFormData] = useState(initialFormData);

  const { handleSocialAuth, isSocialAuthLoading } = useSocialAuth();
  const {
    isLoading: isSigningIn,
    fieldErrors,
    serverError,
    handleSubmit,
  } = useEmailAuth({
    mode: "signin",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2 max-w-2xl mx-auto"
        onSubmit={(e) => handleSubmit(e, formData)}
        noValidate
      >
        <h1>Login to you account</h1>
        {serverError && <p className="text-red-500">{serverError}</p>}

        <button
          type="button"
          onClick={() => handleSocialAuth("google")}
          disabled={isSocialAuthLoading}
        >
          {isSocialAuthLoading ? "Signing In..." : "Sign In with Google"}
        </button>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSigningIn}
        />
        {fieldErrors.email && (
          <p className="text-red-500">{fieldErrors.email}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={isSigningIn}
        />
        {fieldErrors.password && (
          <p className="text-red-500">{fieldErrors.password}</p>
        )}

        <button type="submit">
          {isSigningIn ? "Signing In..." : "Sign In"}
        </button>

        <Link href="/signup">Create account</Link>
      </form>
    </div>
  );
}
