"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import useEmailAuth from "../hooks/use-email-auth";
import useSocialAuth from "../hooks/use-social-auth";

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
    <Card className="w-full max-w-md border-border/70 shadow-lg">
      <CardHeader className="space-y-1 text-center pb-4">
        <CardTitle className="text-xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-xs">
          Sign in to access your recall queue and library
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Google OAuth Button */}
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialAuth("google")}
          disabled={isSocialAuthLoading || isSigningIn}
          className="w-full h-10 text-xs font-medium gap-2 shadow-xs"
        >
          {isSocialAuthLoading ? (
            <div className="flex items-center gap-2">
              <Spinner className="h-3.5 w-3.5" />
              <span>Connecting to Google...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </div>
          )}
        </Button>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-border/60" />
          <span className="absolute bg-card px-2 text-[11px] uppercase tracking-wider text-muted-foreground font-mono">
            or
          </span>
        </div>

        {/* Email Form */}
        <form
          onSubmit={(e) => handleSubmit(e, formData)}
          noValidate
          className="space-y-3.5"
        >
          {serverError && (
            <div className="rounded-md border border-destructive/20 bg-destructive/10 p-2.5 text-xs text-destructive">
              {serverError}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSigningIn}
              className="h-9 text-xs"
            />
            {fieldErrors.email && (
              <p className="text-[11px] text-destructive">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-medium">
                Password
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isSigningIn}
              className="h-9 text-xs"
            />
            {fieldErrors.password && (
              <p className="text-[11px] text-destructive">{fieldErrors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSigningIn}
            className="w-full h-9 text-xs font-medium gap-1.5 shadow-xs"
          >
            {isSigningIn ? (
              <div className="flex items-center gap-1.5">
                <Spinner className="h-3.5 w-3.5" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span>Sign In</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            )}
          </Button>
        </form>

        <div className="text-center pt-2 text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-foreground hover:underline font-medium">
            Create account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
