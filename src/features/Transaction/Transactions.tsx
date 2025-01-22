import { Plus, ChevronDown } from "lucide-react";
import AddCategory from "./category/AddCategory";
import { useEffect, useState } from "react";
import Type from "./Type";
import Transaction from "./Transaction";
import { useTransactionStore } from "@/store/store";

type type = "TYPE";
type catgory = "CATEGORY";
type dropDown = type | catgory | null;

const Transactions = () => {
  const [dropDown, setDropDown] = useState<dropDown>(null);

  const toggleCategory = () => {
    if (dropDown != "CATEGORY") {
      setDropDown("CATEGORY");
    } else {
      setDropDown(null);
    }
  };

  const toggleType = () => {
    if (dropDown != "TYPE") {
      setDropDown("TYPE");
    } else {
      setDropDown(null);
    }
  };

  const categoryVisibility = dropDown == "CATEGORY" ? "" : "hidden";
  const typeVisibility = dropDown == "TYPE" ? "fade-in" : "fade-out hidden ";

  const {
    addTransaction,
    transactions,
    calculateTotalAmount,
    calculateTransactionType,
    isEditing,
    setCategory,
    selectedCategory,
    incomeCount,
    expenseCount,
  } = useTransactionStore();

  useEffect(() => {
    console.log("Transactions state in component:", transactions);
  }, [transactions]);

  const handleAction = () => {
    addTransaction();
    calculateTotalAmount();
    calculateTransactionType();
    setCategory(selectedCategory);
  };

  const makeTransactionTypePlural = (transactionCount: number) =>
    transactionCount !== 1 ? "s" : "";

  return (
    <div className="h-auto min-h-[50vh] relative ">
      <div className="w-full flex items-center justify-between p-4 ">
        <div className="tracking-tight">
          <h1 className="font-bold text-xl mt-2">Transactions</h1>
          <p className="text-gray-500 text-xs font-medium">
            You had {incomeCount} income{makeTransactionTypePlural(incomeCount)}{" "}
            and {expenseCount} expense{makeTransactionTypePlural(expenseCount)}{" "}
            this week
          </p>
        </div>
        <div className="flex gap-4 font-semibold text-sm ">
          <button
            className={`h-10 w-16 rounded-xl flex-center gap-1 ${
              dropDown === "TYPE" ? "bg-gray-100" : ""
            }  hover:bg-gray-100`}
            onClick={toggleType}
          >
            Type
            <ChevronDown
              size={16}
              color="#000000"
              strokeWidth={3}
              absoluteStrokeWidth
            />
          </button>
          <button
            className={`rounded-xl w-24 flex-center ${
              dropDown === "CATEGORY" ? "bg-gray-100" : ""
            } gap-2 hover:bg-gray-100`}
            onClick={toggleCategory}
          >
            Category
            <ChevronDown
              size={16}
              color="#000000"
              strokeWidth={3}
              absoluteStrokeWidth
            />
          </button>
          <div className="w-16 relative">
            <button
              className={`w-16 h-full text-white bg-neutral-900 rounded-2xl flex-center gap-1 hover:bg-zinc-700 hover:text-gray-100`}
              onClick={handleAction}
            >
              {!isEditing ? (
                <>
                  <Plus size={16} color="#ffffff" /> Add
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="h-[40vh] w-full mt-2">
        <AddCategory
          visibility={categoryVisibility}
          toggleCategory={toggleCategory}
        />
        <Type visibility={typeVisibility} toggleType={toggleType} />
        <Transaction />
      </div>
    </div>
  );
};

export default Transactions;
