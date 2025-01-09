import { useTransactionStore } from "@/store/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BalanceBar = () => {
  const { income, expense, investment, savings } = useTransactionStore();

  const convertToPercentage = (amountType: number) => {
    return income > 0 ? (amountType / income) * 100 : 0;
  };

  const expenseInPercentage = convertToPercentage(expense);
  const investmentInPercentage = convertToPercentage(investment);
  const savingsInPercentage = convertToPercentage(savings);

  const showExpense = expenseInPercentage > 0;
  const showInvestment = investmentInPercentage > 0;
  const showSavings = savingsInPercentage > 0;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-2 w-[55%] mt-auto mb-2 rounded-lg flex gap-[2px] cursor-pointer overflow-hidden">
        {/* Expense Bar */}
        {showExpense && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`h-full bg-red-500 transition-all duration-1000 ease-out
                  ${
                    !showInvestment && !showSavings
                      ? "rounded-lg"
                      : "rounded-l-lg"
                  }`}
                style={{
                  width: `${expenseInPercentage}%`,
                  animation: "slideIn 1s ease-out",
                }}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-red-500 text-white border-none">
              <p>Expense: {expenseInPercentage.toFixed(1)} %</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Investment Bar */}
        {showInvestment && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`h-full bg-violet-700 transition-all duration-1000 ease-out delay-200
                  ${
                    !showExpense && !showSavings
                      ? "rounded-lg"
                      : !showExpense
                      ? "rounded-l-lg"
                      : !showSavings
                      ? "rounded-r-lg"
                      : ""
                  }`}
                style={{
                  width: `${investmentInPercentage}%`,
                  animation: "slideIn 1s ease-out",
                }}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-violet-700 text-white border-none">
              <p>Investment: {investmentInPercentage.toFixed(1)} %</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Savings Bar */}
        {showSavings && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`h-full bg-yellow-500 transition-all duration-1000 ease-out delay-400
                  ${
                    !showExpense && !showInvestment
                      ? "rounded-lg"
                      : "rounded-r-lg"
                  }`}
                style={{
                  width: `${savingsInPercentage}%`,
                  animation: "slideIn 1s ease-out",
                }}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-yellow-500 text-white border-none">
              <p>Savings: {savingsInPercentage.toFixed(1)} %</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default BalanceBar;
