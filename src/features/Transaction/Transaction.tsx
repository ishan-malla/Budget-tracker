import {
  EllipsisVertical,
  RotateCw,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import DescriptionViewer from "../DescriptionViewer";
import { useTransactionStore } from "@/store/store";
import { format } from "date-fns";

const Transaction = () => {
  const { transactions, deleteTransaction, editType, editCategory } =
    useTransactionStore();
  const [visibility, setVisibility] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  const toggleVisibility = () => setVisibility(!visibility);

  const transactionIcon = (transactionType: string) => {
    switch (transactionType) {
      case "expense":
        return <ArrowDownLeft size={18} color="#ef4444" strokeWidth={3} />;
      case "income":
        return <ArrowUpRight size={18} color="#22c55e" strokeWidth={3} />;
      case "investment":
        return <TrendingUp size={18} color="#6d28d9" strokeWidth={3} />;
      default:
        return <ArrowDownLeft size={18} color="#ef4444" strokeWidth={3} />;
    }
  };

  const handleDescriptionClick = (transactionId: string) => {
    if (selectedTransactionId === transactionId && visibility) {
      setVisibility(false);
      setSelectedTransactionId(null);
    } else {
      setSelectedTransactionId(transactionId);
      setVisibility(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 ">
      {transactions.map((transaction) => (
        <div
          className="grid grid-cols-[1fr_auto_auto_auto_3rem] items-center h-16 px-4 mt-6 gap-4 border-y-[2px] border-gray-100"
          key={transaction.id}
        >
          <div className="flex gap-2 items-center w-60 ml-2">
            {transaction.isRecuring ? (
              <RotateCw size={18} color="#ff5c5c" strokeWidth={3} />
            ) : (
              transactionIcon(transaction.transactionType)
            )}
            <button
              onClick={() => handleDescriptionClick(transaction.id)}
              className="border h-7 min-w-20 px-3 rounded-2xl gap-1 flex items-center justify-center text-sm font-semibold w-auto max-w-72 hover:bg-gray-100 hover:scale-105"
            >
              {transaction.description.title || "Untitled"}
            </button>
          </div>

          <div className="w-[50vw] flex justify-between">
            <span className="border h-7 min-w-20 px-3 rounded-2xl gap-1 flex items-center justify-center text-sm font-semibold w-auto max-w-72">
              {transaction.category.name}
            </span>
            <span className="text-sm font-medium">
              {transaction.date
                ? format(new Date(transaction.date), "MMM dd, yyyy")
                : "No date"}
            </span>

            <span
              className={`text-sm font-semibold ${
                transaction.transactionType === "expense"
                  ? "text-red-500"
                  : transaction.transactionType === "income"
                  ? "text-green-500"
                  : "text-violet-700"
              }`}
            >
              {transaction.transactionType === "expense" ? "-" : "+"}
              {transaction.description.amount} $
            </span>
          </div>

          <Popover>
            <PopoverTrigger>
              <EllipsisVertical
                size={22}
                color="#787878"
                strokeWidth={2}
                className="hover:cursor-pointer hover:bg-gray-50"
              />
            </PopoverTrigger>
            <PopoverContent className="w-[17vh] flex flex-col gap-2 h-[11vh] p-1 text-sm font-semibold">
              <button
                className="hover:bg-gray-100"
                onClick={() => {
                  editType(transaction.id);
                }}
              >
                Edit Type
              </button>
              <button
                className="hover:bg-gray-100"
                onClick={() => {
                  editCategory(transaction.id);
                }}
              >
                Edit Category
              </button>
              <button
                className="hover:bg-gray-100"
                onClick={() => {
                  deleteTransaction(transaction.id);
                }}
              >
                Delete
              </button>
            </PopoverContent>
          </Popover>
        </div>
      ))}
      <DescriptionViewer
        visibility={visibility}
        toggleVisibility={toggleVisibility}
        selectedTransactionId={selectedTransactionId}
      />
    </div>
  );
};

export default Transaction;
