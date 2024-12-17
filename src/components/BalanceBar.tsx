const BalanceBar = () => {
  return (
    <div className="h-2 w-[55%]  mt-auto mb-2 rounded-lg flex gap-[2px] cursor-pointer">
      <div className="bg-red-500 w-[60%] h-full rounded-l-lg"></div>
      <div className="bg-violet-700 w-[20%] h-full "></div>
      <div className="bg-yellow-500 w-[20%] h-full rounded-r-lg "></div>
    </div>
  );
};
export default BalanceBar;
