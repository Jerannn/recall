"use server";

import { auth } from "@/lib/auth";
import { SigninInput, SignupInput } from "./types";
import { headers } from "next/headers";

export const signUp = async ({ name, email, password }: SignupInput) => {
  const res = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      callbackURL: "/dashboard",
    },
  });

  return res;
};

export const signIn = async ({ email, password }: SigninInput) => {
  const res = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/dashboard",
    },
  });

  return res;
};

export const signOut = async () => {
  const res = await auth.api.signOut({ headers: await headers() });

  return res;
};
