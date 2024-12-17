import Currency from "../../components/Currency";

const TotalAmount = () => {
  return (
    <>
      <div className="total-amount-div">
        <h2 className="text-green-500 text-md font-semibold">Income</h2>
        <span className="number-text flex">
          135780.47
          <Currency></Currency>
        </span>
      </div>
      <div className="total-amount-div">
        <h2 className="text-red-500 text-md font-semibold">Expenses</h2>
        <span className="number-text flex">
          87600.34
          <Currency></Currency>
        </span>
      </div>
      <div className="total-amount-div">
        <h2 className="text-violet-700 text-md font-semibold">Investment</h2>
        <span className="number-text flex ">
          48500.01
          <Currency></Currency>
        </span>
      </div>
      <div className="total-amount-div">
        <h2 className="text-yellow-500 text-md font-semibold">Savings</h2>
        <span className="number-text flex">
          23345.05
          <Currency></Currency>
        </span>
      </div>
    </>
  );
};
export default TotalAmount;
