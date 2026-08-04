import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useSocialAuth() {
  const router = useRouter();

  const [isSocialAuthLoading, setIsSocialAuthLoading] = useState(false);

  const handleSocialAuth = async (provider: "google" | "github") => {
    await authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
        disableRedirect: true,
      },
      {
        onRequest: () => setIsSocialAuthLoading(true),
        onSuccess: (ctx) => {
          setIsSocialAuthLoading(false);
          router.push(ctx.data?.url || "/dashboard");
        },
        onError: () => {
          setIsSocialAuthLoading(false);
        },
      },
    );
  };

  return {
    handleSocialAuth,
    isSocialAuthLoading,
  };
}
