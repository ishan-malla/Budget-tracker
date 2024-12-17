import BalanceBar from "@/components/BalanceBar";
import { useTransactionStore } from "@/store/store";

const TotalBalance = () => {
  const { totalAmount } = useTransactionStore();

  return (
    <div className="flex  font-semibold px-4 pt-2  justify-between   ">
      <div>
        <h3 className="text-zinc-700 ">Net Total</h3>
        <p className="number-text">{totalAmount}</p>
      </div>

      <BalanceBar></BalanceBar>
    </div>
  );
};
export default TotalBalance;
