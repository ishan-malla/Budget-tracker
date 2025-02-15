import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

type DescriptionType = {
  title: string;
  amount: number;
  details: string;
};

type CategoryType = {
  id: string;
  name: string;
};

export type TransactionState = {
  id: string;
  transactionType: "income" | "expense" | "investment" | "";
  date: Date | "";
  description: DescriptionType;
  category: CategoryType;
  isRecuring: boolean;
};

type CreateType = {
  totalAmount: number;
  transactions: TransactionState[];
  calculateTotalAmount: () => void;
  calculateTransactionType: () => void;
  income: number;
  expense: number;
  investment: number;
  savings: number;
  incomeCount: number;
  expenseCount: number;
  transactionData: TransactionState;
  categoryList: CategoryType[];
  isEditingTransaction: boolean;
  isEditingCategory: boolean;
  selectedCategory: CategoryType;
  isSubmiting: boolean;
  setTransactionType: (type: "income" | "expense" | "investment" | "") => void;
  setAmount: (amount: number) => void;
  setDate: (date: Date) => void;
  setDescription: (description: DescriptionType) => void;
  setCategory: (category: CategoryType) => void;
  setIsRecuring: (isRecuring: boolean) => void;
  addTransaction: () => void;
  deleteTransaction: (id: string) => void;
  editType: (id: string) => void;
  addCategory: (category: string) => void;
  editCategory: (id: string) => void;
  deleteCategory: () => void;
  setSelectedCategory: (category: CategoryType) => void;
  setIsSubmiting: (isSubmitting: boolean) => void;
};

const initialTransactionData: TransactionState = {
  id: uuid(),
  transactionType: "",
  date: "",
  description: { title: "", amount: 0, details: "" },
  category: { id: "", name: "" },
  isRecuring: false,
};

export const useTransactionStore = create(
  persist<CreateType>(
    (set) => ({
      totalAmount: 0,
      savings: 0,
      investment: 0,
      income: 0,
      expense: 0,
      incomeCount: 0,
      expenseCount: 0,
      transactions: [],
      isEditingTransaction: false,
      isEditingCategory: false,
      transactionData: initialTransactionData,
      selectedCategory: { id: "", name: "" },
      isSubmiting: false,
      categoryList: [
        { id: "1", name: "🏠 Rent" },
        { id: "2", name: "🛒 Groceries" },
        { id: "3", name: "📺 Subscriptions" },
        { id: "4", name: "🍽️ Dining" },
        { id: "5", name: "☕ Coffee" },
        { id: "6", name: "✈️ Travel" },
        { id: "7", name: "💡 Utilities" },
        { id: "8", name: "🚗 Transportation" },
        { id: "9", name: "🛡️ Insurance" },
        { id: "10", name: "👗 Clothing" },
        { id: "11", name: "💊 Healthcare" },
        { id: "12", name: "🎉 Entertainment" },
      ],

      // Setters for updating transaction data
      setTransactionType: (type) =>
        set((state) => ({
          transactionData: {
            ...state.transactionData,
            transactionType: type,
          },
        })),

      setAmount: (amount) =>
        set((state) => ({
          transactionData: {
            ...state.transactionData,
            description: { ...state.transactionData.description, amount },
          },
        })),

      setDate: (date) =>
        set((state) => ({
          transactionData: { ...state.transactionData, date },
        })),

      setDescription: (description) =>
        set((state) => ({
          transactionData: { ...state.transactionData, description },
        })),

      setCategory: (category) =>
        set((state) => ({
          transactionData: {
            ...state.transactionData,
            category,
          },
          selectedCategory: category,
        })),

      setIsRecuring: (isRecuring) =>
        set((state) => ({
          transactionData: { ...state.transactionData, isRecuring },
        })),

      setSelectedCategory: (category) =>
        set(() => ({
          selectedCategory: category,
        })),

      addTransaction: () =>
        set((state) => {
          const {
            transactionData,
            isEditingTransaction,
            isEditingCategory,
            transactions,
          } = state;
          const {
            id,
            transactionType,
            date,
            description,
            category,
            isRecuring,
          } = transactionData;

          if (
            !date ||
            !description.details ||
            !transactionType ||
            !category.name
          ) {
            alert(
              "Please fill all required fields before adding a transaction."
            );
            return state;
          }

          if (isEditingTransaction || isEditingCategory) {
            const updatedTransactions = transactions.map((transaction) =>
              transaction.id === id
                ? {
                    ...transaction,
                    category,
                    description,
                    date,
                    transactionType,
                    isRecuring,
                  }
                : transaction
            );

            return {
              ...state,
              transactions: updatedTransactions,
              isEditingTransaction: false,
              isEditingCategory: false,
              transactionData: initialTransactionData,
              selectedCategory: { id: "", name: "" },
              isSubmiting: false,
            };
          }

          const newTransaction: TransactionState = {
            id: uuid(),
            transactionType,
            date,
            description,
            category: state.selectedCategory,
            isRecuring,
          };

          return {
            ...state,
            transactions: [...state.transactions, newTransaction],
            transactionData: initialTransactionData,
            selectedCategory: { id: "", name: "" },
            isSubmiting: false,
          };
        }),

      calculateTotalAmount: () =>
        set((state) => ({
          totalAmount: state.transactions.reduce(
            (sum, transaction) => sum + transaction.description.amount,
            0
          ),
        })),

      calculateTransactionType: () =>
        set((state) => {
          let income = 0;
          let expense = 0;
          let investment = 0;
          let incomeCount = 0;
          let expenseCount = 0;

          state.transactions.forEach((transaction) => {
            const amount = transaction.description.amount;
            switch (transaction.transactionType) {
              case "income":
                income += amount;
                incomeCount++;
                break;
              case "expense":
                expense += amount;
                expenseCount++;
                break;
              case "investment":
                investment += amount;
                break;
            }
          });

          const savings = income - (expense + investment);

          return {
            income,
            expense,
            investment,
            savings,
            incomeCount,
            expenseCount,
          };
        }),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== id
          ),
        })),

      editType: (id) =>
        set((state) => {
          const transactionToEdit = state.transactions.find(
            (transaction) => transaction.id === id
          );

          if (!transactionToEdit) {
            alert("Transaction not found.");
            return { ...state, isSubmiting: false };
          }

          return {
            ...state,
            isEditingTransaction: true,
            transactionData: transactionToEdit,
            selectedCategory: transactionToEdit.category,
            isSubmiting: true,
          };
        }),

      editCategory: (id) =>
        set((state) => {
          const transactionToEdit = state.transactions.find(
            (transaction) => transaction.id === id
          );

          if (!transactionToEdit) {
            alert("Transaction not found.");
            return { ...state, isSubmiting: false };
          }

          return {
            ...state,
            isEditingCategory: true,
            transactionData: transactionToEdit,
            selectedCategory: transactionToEdit.category,
            isSubmiting: true,
          };
        }),

      addCategory: (category: string) =>
        set((state) => ({
          categoryList: [...state.categoryList, { id: uuid(), name: category }],
        })),

      deleteCategory: () =>
        set((state) => {
          const { categoryList, selectedCategory, transactions } = state;
          const isInUse = transactions.some(
            (transaction) => transaction.category.id === selectedCategory.id
          );

          if (isInUse) {
            alert("Category is in use");
            return state;
          }

          return {
            ...state,
            categoryList: categoryList.filter(
              (cat) => cat.id !== selectedCategory.id
            ),
            selectedCategory: { id: "", name: "" },
          };
        }),

      setIsSubmiting: (isSubmitting) =>
        set(() => ({
          isSubmiting: isSubmitting,
        })),
    }),
    { name: "transaction-store" }
  )
);
