import { create } from "zustand";

type DescriptionType = { title: string; amount: number; details: string };
type TransactionState = {
  amount: number;
  transactionType: "income" | "expense" | "investment";
  title: string;
  date: Date;
  description: DescriptionType;
  category: string;
};

type CreateType = {
  totalAmount: number;
  transactions: TransactionState[];
  calculateTotalAmount: () => void;

  transactionData: {
    title: string;
    amount: number;
    date: Date;
    description: DescriptionType;
    category: string;
  };

  transactionType: "income" | "expense" | "investment" | "";

  setTransactionType: (type: "income" | "expense" | "investment" | "") => void;
  setTitle: (title: string) => void;
  setAmount: (amount: number) => void;
  setDate: (date: Date) => void;
  setDescription: (description: DescriptionType) => void;
  setCategory: (category: string) => void;

  addTransaction: () => void;
};

export const useTransactionStore = create<CreateType>((set) => ({
  totalAmount: 0,
  transactionType: "",
  transactionData: {
    title: "",
    amount: 0,
    date: new Date(),
    description: { title: "", amount: 0, details: "" },
    category: "",
  },
  transactions: [],

  setTransactionType: (type) => set({ transactionType: type }),
  setTitle: (title) =>
    set((state) => ({
      transactionData: { ...state.transactionData, title },
    })),
  setAmount: (amount) =>
    set((state) => ({
      transactionData: { ...state.transactionData, amount },
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

  addTransaction: () =>
    set((state) => {
      const { title, amount, date, description, category } =
        state.transactionData;
      const { transactionType } = state;

      if (
        !title ||
        !amount ||
        !date ||
        !description.details ||
        !transactionType ||
        !category
      ) {
        throw new Error(
          "Please fill all the required fields before adding a transaction."
        );
      }

      return {
        ...state,
        transactions: [
          ...state.transactions,
          { title, amount, date, description, category, transactionType },
        ],
      };
    }),

  calculateTotalAmount: () =>
    set((state) => ({
      totalAmount: state.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      ),
    })),
}));
