"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type HeaderProps = {
  title: string;
  actions?: ReactNode;
};

export default function Header({ title, actions }: HeaderProps) {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  return (
    <div className="flex w-full items-center justify-between border-b p-4">
      <h1 className="capitalize">{title}</h1>
      <div className="space-x-3">
        {actions}
        <button onClick={handleSignOut} className="cursor-pointer">
          Sign out
        </button>
      </div>
    </div>
  );
}
