import { EllipsisVertical, RotateCw } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useToggleVisibility from "@/hooks/useToggleVisibilty";
import DescriptionViewer from "../DescriptionViewer";
const transactions = [
  {
    date: "Today",
    transactions: [
      {
        id: 1,
        name: "Netflix",
        category: "Streaming",
        type: "Leisure",
        amount: -17.99,
      },
      {
        id: 2,
        name: "Amazon",
        category: "Shopping",
        type: "Essentials",
        amount: 45.5,
      },
    ],
  },
  {
    date: "Yesterday",
    transactions: [
      {
        id: 2,
        name: "Spotify",
        category: "Music",
        type: "Entertainment",
        amount: 9.99,
      },
    ],
  },
  {
    date: "Last Week",
    transactions: [
      {
        id: 3,
        name: "Amazon",
        category: "Shopping",
        type: "Essentials",
        amount: -45.5,
      },
    ],
  },
];

const Transaction = () => {
  const { toggleVisibility, visibility } = useToggleVisibility();
  return (
    <div className="w-full flex flex-col gap-4">
      {transactions.map((group) => (
        <div key={group.date} className="flex flex-col justify-center">
          <span className="font-medium pl-4 text-gray-500">{group.date}</span>
          {group.transactions.map((transaction) => (
            <div
              className="grid grid-cols-[1fr_auto_auto_auto_3rem] items-center h-16 px-4 mt-6 gap-4 border-y-[2px]  border-gray-100"
              key={transaction.id}
            >
              <div className="flex gap-2 items-center  w-60 ml-2">
                <RotateCw size={16} color="#ff5c5c" strokeWidth={3} />
                <button
                  onClick={toggleVisibility}
                  className="border h-7 min-w-20 px-3 rounded-2xl gap-1 flex items-center justify-center text-sm font-semibold w-auto max-w-72 hover:bg-gray-100 hover:scale-105 "
                >
                  {transaction.name}
                </button>
                <DescriptionViewer
                  visibility={visibility}
                  toggleVisibility={toggleVisibility}
                />
              </div>
              <div className="w-[50vw] flex justify-between ">
                <span className="border h-7 min-w-20 px-3 rounded-2xl gap-1 flex items-center justify-center text-sm font-semibold w-auto max-w-72 ">
                  {transaction.category}
                </span>
                <span className="text-sm font-medium ">{transaction.type}</span>
                <span className="text-sm font-medium">
                  {transaction.amount} $
                </span>
              </div>
              <Popover>
                <PopoverContent className="w-[17vh] flex flex-col gap-2 h-[11vh] p-1 text-sm font-semibold ">
                  <button className="hover:bg-gray-100">Edit Type</button>
                  <button className="hover:bg-gray-100">Edit Category</button>
                  <button className="hover:bg-gray-100">Delete</button>
                </PopoverContent>
                <PopoverTrigger>
                  <EllipsisVertical
                    size={22}
                    color="#787878"
                    strokeWidth={2}
                    className="hover:cursor-pointer hover:bg-gray-50 "
                  />
                </PopoverTrigger>
              </Popover>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Transaction;
