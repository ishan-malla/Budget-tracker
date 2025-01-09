// import IncomeExpense from "./components/IncomeExpense";
import TotalBalance from "./features/AmountViewer/TotalBalance";
import Transactions from "./features/Transaction/Transactions";
import TotalAmount from "./features/AmountViewer/TotalAmount";

const App = () => {
  return (
    <div className=" h-auto min-h-[90%] w-screen flex  flex-col justify-center pt-20 overflow-x-hidden items-center scroll-smooth ">
      <h1 className="text-3xl font-extrabold  mb-8 self-start mx-[15vw] ">
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
