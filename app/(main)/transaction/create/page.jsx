import { getUserAccounts } from "@/actions/account"; // CORRECTED: Changed from "@/actions/dashboard"
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
// REMOVED: import { getTransaction } from "@/actions/transaction";

// Removed: ({ searchParams }) from arguments as editing is no longer supported
export default async function AddTransactionPage() {
  // Line 8 (Error Line) will now successfully call the function
  const accounts = await getUserAccounts(); 
  
  // REMOVED: All editing logic (editId, if block, getTransaction call)
  
  const initialData = null; // Always null for a new transaction

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">Add Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={false} // Always false
        initialData={initialData}
      />
    </div>
  );
}