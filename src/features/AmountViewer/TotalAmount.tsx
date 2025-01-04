import Amount from "./Amount";

const TotalAmount = () => {
  return (
    <>
      <Amount textColour="green-500" amountType="Income" amount={135780.47} />
      <Amount textColour="red-500" amountType="Expenses" amount={87600.34} />
      <Amount
        textColour="violet-700"
        amountType="Investment"
        amount={48500.01}
      />
      <Amount textColour="yellow-500" amountType="Savings" amount={23345.05} />
    </>
  );
};

export default TotalAmount;
