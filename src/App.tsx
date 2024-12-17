// import IncomeExpense from "./components/IncomeExpense";
import TotalBalance from "./features/AmountViewer/TotalBalance";
import Transactions from "./features/Transaction/Transactions";
import TotalAmount from "./features/AmountViewer/TotalAmount";
const App = () => {
  return (
    <div className=" h-auto min-h-screen w-screen flex  flex-col justify-center pt-20 overflow-hidden items-center">
      <h1 className="text-3xl font-extrabold  mb-8 self-start px-60 ">
        Summary
      </h1>
      <div className=" h-[80vh] w-[70vw] rounded-md">
        <TotalBalance></TotalBalance>
        <div className="flex w-full justify-between border-b mt-4 ">
          <TotalAmount></TotalAmount>
        </div>
        <Transactions></Transactions>
      </div>
    </div>
  );
};
export default App;
