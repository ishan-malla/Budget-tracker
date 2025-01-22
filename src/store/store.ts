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
  incomeCount: number;
  expenseCount: number;
  transactionData: TransactionState;
  categoryList: CategoryType[];
  isEditing: boolean;
  selectedCategory: CategoryType;
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
  setIsEditing: () => void;
  deleteCategory: () => void;
  setSelectedCategory: (category: CategoryType) => void;
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
      isEditing: false,
      transactionData: {
        id: uuid(),
        transactionType: "",
        date: "",
        description: { title: "", amount: 0, details: "" },
        category: { id: "", name: "" },
        isRecuring: false,
      },
      selectedCategory: { id: "", name: "" },
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
      setIsEditing: () =>
        set((state) => ({
          isEditing: !state.isEditing,
        })),
      setSelectedCategory: (category) =>
        set((state) => ({
          ...state,
          selectedCategory: category,
        })),
      addTransaction: () =>
        set((state) => {
          const { transactionData, isEditing, transactions } = state;
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
          if (isEditing) {
            const updatedTransactions = transactions.map((transaction) =>
              transaction.id === id
                ? {
                    id,
                    transactionType,
                    date,
                    description,
                    category,
                    isRecuring,
                  }
                : transaction
            );
            return {
              ...state,
              transactions: updatedTransactions,
              isEditing: false,
              transactionData: {
                id: uuid(),
                transactionType: "",
                date: "",
                description: { title: "", amount: 0, details: "" },
                category: { id: "", name: "" },
                isRecuring: false,
              },
            };
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
          let incomeCount = 0;
          let expenseCount = 0;
          state.transactions.forEach((transaction) => {
            if (transaction.transactionType === "income") {
              income += transaction.description.amount;
              incomeCount += 1;
            } else if (transaction.transactionType === "expense") {
              expense += transaction.description.amount;
              expenseCount += 1;
            } else if (transaction.transactionType === "investment") {
              investment += transaction.description.amount;
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
            return state;
          }
          return {
            ...state,
            isEditing: true,
            transactionData: {
              id: transactionToEdit.id,
              transactionType: transactionToEdit.transactionType,
              date: transactionToEdit.date,
              description: transactionToEdit.description,
              category: transactionToEdit.category,
              isRecuring: transactionToEdit.isRecuring,
            },
          };
        }),
      editCategory: (id) =>
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
            transactionData: {
              ...state.transactionData,
              category: transactionToEdit.category,
            },
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
          };
        }),
    }),
    { name: "transaction-store" }
  )
);
