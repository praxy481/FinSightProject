"use client";

import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    /* NEW: Replaced <Card> with a <div> for the glass effect.
      Added group, relative, and overflow-hidden for the shine.
    */
    <div className="glass-card h-full overflow-hidden relative group">
      {/* NEW: Shine Effect Element */}
      <div className="absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Link is now relative to sit on top of the shine */}
      <Link
        href={`/account/${id}`}
        className="block p-5 rounded-lg h-full relative z-10"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>
        <CardContent className="p-0">
          {/* NEW: Gradient text for the balance */}
          <div className="text-3xl font-bold text-gradient my-2">
            ₹ {parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
      </Link>
    </div>
  );
}