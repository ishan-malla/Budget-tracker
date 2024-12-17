import { EllipsisVertical, RotateCw } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTransactionStore } from "@/store/store";
const Transaction = () => {
  useTransactionStore();
  return (
    <div className="w-full flex flex-col  gap-4 mb-10 ">
      <span className="font-semibold pl-4 text-gray-500">Today</span>
      <div className="flex items-center">
        <div className="h-16  flex items-center justify-between text-sm font-bold px-4 flex-grow border-y-[3px] border-gray-100">
          <div className="flex gap-2 items-center">
            <RotateCw size={16} color="#ff5c5c" strokeWidth={3} />
            Netflix
          </div>
          <div className="border h-7 w-auto flex items-center px-3 rounded-2xl gap-1">
            {/* <span>🍿</span> */}
            Streaming
          </div>
          <span>Leisure</span>
          <span>-17.99 $</span>
        </div>
        <Popover>
          <PopoverContent className="w-[17vh] flex flex-col gap-2 h-[12vh] p-1 text-sm font-semibold text-gray-00  space-y-1">
            <button className="hover:bg-gray-100">Edit Type</button>
            <button className="hover:bg-gray-100">Edit Category</button>
            <button className="hover:bg-gray-100">Delete</button>
          </PopoverContent>
          <PopoverTrigger>
            <EllipsisVertical
              size={22}
              color="#787878"
              strokeWidth={2}
              className="hover:cursor-pointer hover:bg-gray-50"
            />
          </PopoverTrigger>
        </Popover>
      </div>
    </div>
  );
};
export default Transaction;

//use down and up arrow for all income and expenses
//use the zustand to get those arrows and the logic off the arrows will depend on the type component which will pass the type to zustand
//make the custom hook so both type and category can't be opened at the same time
//ib the eleipsisvertical(edit)component add options like edit type,category
