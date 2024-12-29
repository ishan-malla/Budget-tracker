import { create } from "zustand";

interface Category {
  categoryGroup: string;
  categoryName: string;
  checked: boolean; // Added checked property to the Category interface
}

type DescriptionType = { title: string; amount: number; details: string };

type TransactionState = {
  amount: number;
  transactionType: "income" | "expense" | "investment";
  title: string;
  date: Date;
  description: DescriptionType;
  category: Category;
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
    category: Category;
  };

  transactionType: "income" | "expense" | "investment" | "";

  setTransactionType: (type: "income" | "expense" | "investment" | "") => void;
  setTitle: (title: string) => void;
  setAmount: (amount: number) => void;
  setDate: (date: Date) => void;
  setDescription: (description: DescriptionType) => void;
  setCategory: (category: Category) => void;
  setCategoryCheckbox: (categoryName: string, checked: boolean) => void;
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
    category: { checked: false, categoryGroup: "", categoryName: "" },
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

  setCategoryCheckbox: (categoryName: string, checked: boolean) =>
    set((state) => {
      const updatedCategory = {
        ...state.transactionData.category,
        categoryName,
        checked,
      };
      return {
        transactionData: {
          ...state.transactionData,
          category: updatedCategory,
        },
      };
    }),

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
        !category.categoryName
      ) {
        console.error(
          "Please fill all the required fields before adding a transaction."
        );
        return state;
      }

      const newTransaction: TransactionState = {
        title,
        amount,
        date,
        description,
        category,
        transactionType,
      };

      return {
        ...state,
        transactions: [...state.transactions, newTransaction],
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
