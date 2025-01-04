import Currency from "@/components/Currency";

type AmountProps = {
  textColour: string;
  amountType: "Income" | "Expenses" | "Savings" | "Investment";
  amount: number;
};
const Amount = ({ textColour, amountType, amount }: AmountProps) => {
  return (
    <div className="total-amount-div">
      <h2 className={`text-${textColour} text-md font-semibold`}>
        {amountType}
      </h2>
      <span className="number-text flex">
        {amount}
        <Currency size="sm"></Currency>
      </span>
    </div>
  );
};
export default Amount;
