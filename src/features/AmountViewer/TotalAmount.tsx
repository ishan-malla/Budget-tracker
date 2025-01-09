import { useTransactionStore } from "@/store/store";
import Amount from "./Amount";
import { useEffect } from "react";

const TotalAmount = () => {
  const {
    income,
    expense,
    investment,
    transactions,
    savings,
    calculateTransactionType,
    calculateTotalAmount,
  } = useTransactionStore();

  useEffect(() => {
    calculateTotalAmount();
    calculateTransactionType();
  }, [calculateTotalAmount, calculateTransactionType, transactions]);

  return (
    <>
      <Amount textColour="green-500" amountType="Income" amount={income} />
      <Amount textColour="red-500" amountType="Expenses" amount={expense} />
      <Amount
        textColour="violet-700"
        amountType="Investment"
        amount={investment}
      />
      <Amount textColour="yellow-500" amountType="Savings" amount={savings} />
    </>
  );
};

export default TotalAmount;
