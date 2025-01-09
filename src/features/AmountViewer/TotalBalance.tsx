import BalanceBar from "@/components/BalanceBar";
import Currency from "@/components/Currency";
import { useTransactionStore } from "@/store/store";

const TotalBalance = () => {
  const { totalAmount } = useTransactionStore();

  return (
    <div className="flex  font-semibold px-4 pt-2  justify-between   ">
      <div>
        <h3 className="text-zinc-700 ">Net Total</h3>
        <div className="flex">
          <p className="number-text">{totalAmount}</p>
          <Currency size="sm"></Currency>
        </div>
      </div>

      <BalanceBar></BalanceBar>
    </div>
  );
};
export default TotalBalance;
