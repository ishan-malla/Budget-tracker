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

type TransactionState = {
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
  transactionData: TransactionState;
  categoryList: CategoryType[];

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
};

export const useTransactionStore = create(
  persist<CreateType>(
    (set) => ({
      totalAmount: 0,
      savings: 0,
      investment: 0,
      income: 0,
      expense: 0,
      transactions: [],

      transactionData: {
        id: uuid(),
        transactionType: "",
        date: "",
        description: { title: "", amount: 0, details: "" },
        category: { id: "", name: "" },
        isRecuring: false,
      },

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
          transactionData: { ...state.transactionData, category },
        })),

      setIsRecuring: (isRecuring) =>
        set((state) => ({
          transactionData: { ...state.transactionData, isRecuring },
        })),

      addTransaction: () =>
        set((state) => {
          const { transactionData } = state;
          const {
            id,
            transactionType,
            date,
            description,
            category,
            isRecuring,
          } = transactionData;

          if (
            !id ||
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

          const newTransaction: TransactionState = {
            id: uuid(),
            transactionType,
            date,
            description,
            category,
            isRecuring,
          };

          return {
            ...state,
            transactions: [...state.transactions, newTransaction],
            transactionData: {
              id: uuid(),
              transactionType: "",
              date: "",
              description: { title: "", amount: 0, details: "" },
              category: { id: "", name: "" },
              isRecuring: false,
            },
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

          state.transactions.forEach((transaction) => {
            if (transaction.transactionType === "income") {
              income += transaction.description.amount;
            } else if (transaction.transactionType === "expense") {
              expense += transaction.description.amount;
            } else if (transaction.transactionType === "investment") {
              investment += transaction.description.amount;
            }
          });
          const savings = income - (expense + investment);
          return {
            income: income,
            expense: expense,
            investment: investment,
            savings: savings,
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
            return state;
          }

          return {
            ...state,
            description: transactionToEdit.description,
            isRecuring: transactionToEdit.isRecuring,
            category: transactionToEdit.category,
            date: transactionToEdit.date,
            transactionType: transactionToEdit.transactionType,
          };
        }),

      addCategory: (category: string) => {
        set((state) => ({
          categoryList: [...state.categoryList, { id: uuid(), name: category }],
        }));
      },
    }),

    { name: "transaction-store" }
  )
);
