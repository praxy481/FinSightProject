import { Suspense } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Import Button
import { Plus, PlusCircle } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";
import Link from "next/link"; // Import Link

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    /* NEW: 2-Column Asymmetrical Layout */
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* --- MAIN CONTENT (Left) --- */}
      <div className="lg:col-span-2 space-y-8">
        {/* Dashboard Overview */}
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />

        {/* Accounts Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Accounts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <CreateAccountDrawer>
              <Card className="glass-card h-full cursor-pointer group hover:border-[hsl(var(--border)/0.5)] transition-colors">
                <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                  <Plus className="h-10 w-10 mb-2 transition-colors group-hover:text-primary" />
                  <p className="text-sm font-medium text-gradient">
                    Add New Account
                  </p>
                </CardContent>
              </Card>
            </CreateAccountDrawer>
            {accounts.length > 0 &&
              accounts?.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
          </div>
        </div>
      </div>

      {/* --- SIDEBAR (Right) --- */}
      <div className="lg:col-span-1 space-y-8">
        {/* Budget Progress */}
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />

        {/* NEW: Quick Actions Card */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            <Button asChild>
              <Link href="/transaction/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Transaction
              </Link>
            </Button>
            {/* You can add more buttons here, e.g., "Request Payout", "Transfer Funds" */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}