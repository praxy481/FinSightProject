import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

const NavLinks = async () => {
  await checkUser();

  return (
    <>
      {/* Navigation Links - Different for signed in/out users */}
      <SignedOut>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/#features">Features</Link>
        </Button>
      </SignedOut>

      {/* Action Buttons */}
      <SignedIn>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start gap-2"
        >
          <Link href="/dashboard">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
        </Button>
        <Button asChild className="w-full justify-start gap-2">
          <a href="/transaction/create">
            <PenBox size={18} />
            <span>Add Transaction</span>
          </a>
        </Button>
      </SignedIn>
      <SignedOut>
        <SignInButton forceRedirectUrl="/dashboard">
          <Button variant="outline" className="w-full">
            Login
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4 pl-2">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
          <span className="text-sm font-medium">Profile</span>
        </div>
      </SignedIn>
    </>
  );
};

export default NavLinks;