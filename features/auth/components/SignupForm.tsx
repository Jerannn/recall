"use client";

import Link from "next/link";
import { useState, ChangeEvent } from "react";
import useEmailAuth from "../hooks/use-email-auth";
import useSocialAuth from "../hooks/use-social-auth";

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

export default function SignupForm() {
  const [formData, setFormData] = useState(initialFormData);

  const { handleSocialAuth, isSocialAuthLoading } = useSocialAuth();
  const {
    isLoading: isSigningUp,
    fieldErrors,
    serverError,
    handleSubmit,
  } = useEmailAuth({
    mode: "signup",
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
        <h1>Sign Up</h1>
        <button
          type="button"
          onClick={() => handleSocialAuth("google")}
          disabled={isSocialAuthLoading}
        >
          {isSocialAuthLoading ? "Signing In..." : "Sign In with Google"}
        </button>

        {serverError && <p className="text-red-500">{serverError}</p>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {fieldErrors.name && <p className="text-red-500">{fieldErrors.name}</p>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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
        />
        {fieldErrors.password && (
          <p className="text-red-500">{fieldErrors.password}</p>
        )}

        <button type="submit">
          {isSigningUp ? "Signing up..." : "Sign up"}
        </button>

        <Link href="/signin">Sign in</Link>
      </form>
    </div>
  );
}
