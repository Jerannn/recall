"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserDropdownProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function UserDropdown({ user: propUser }: UserDropdownProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
    setIsSigningOut(false);
  };

  const user = propUser || session?.user;
  const name = user?.name || "User";
  const email = user?.email || "";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition-colors hover:bg-muted/80 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {user?.image ? (
            <div className="relative mx-auto h-8 w-8">
              <Image
                src={user.image}
                alt={name}
                fill
                sizes="100%"
                className="rounded-full object-cover grayscale-30"
              />
            </div>
          ) : initials ? (
            <span>{initials}</span>
          ) : (
            <UserIcon className="h-4 w-4" />
          )}
        </div>
        <div className="min-w-0 flex-1 truncate">
          <p className="truncate text-xs font-medium text-foreground">{name}</p>
          <p className="truncate text-[11px] text-muted-foreground">{email}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="mb-1 w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-xs leading-none font-medium text-foreground">
                {name}
              </p>
              <p className="text-[11px] leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="cursor-pointer text-xs"
        >
          <LogOut className="mr-2 h-3.5 w-3.5" />
          <span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
