"use client";

import Link from "next/link";
import { SubmitEvent, useState } from "react";
import { signUp } from "../actions";
import { signupSchema } from "../schema";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) =>
        setErrors((prevErrors) => ({
          ...prevErrors,
          [issue.path[0]]: issue.message,
        })),
      );
      return;
    }

    try {
      const result = await signUp(formData);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <button type="submit">Sign Up</button>

        <Link href="/auth/signin">Sign in</Link>
      </form>
    </div>
  );
}
