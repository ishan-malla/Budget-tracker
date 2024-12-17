import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Category from "@/components/Category";
type AddTransactionProp = {
  visibility: "hidden" | "";
};

const categoryList = [
  {
    category: "HOME",
    items: [
      { emoji: "🏠", title: "Rent", checked: true },
      { emoji: "🛒", title: "Groceries", checked: false },
    ],
  },
  {
    category: "LESIURE",
    items: [
      { emoji: "🍿", title: "streaming", checked: false },
      { emoji: "🍜", title: "Resturant", checked: false },
      { emoji: "🍵", title: "Coffee", checked: false },
      { emoji: "✈️", title: "Travel", checked: false },
    ],
  },
];

const AddCategory = ({ visibility }: AddTransactionProp) => {
  const [category, setCategory] = useState("");

  return (
    <div
      className={`min-h-[48vh]  h-auto border-2 w-[17vw] flex flex-col  p-2 rounded-sm ${visibility} abolute shadow-md shadow-gray-200 absolute z-10 right-48 bg-white  top-[4.6rem]   `}
    >
      <input
        type="text"
        placeholder="Search ..."
        className="border pl-2 text-sm h-7 w-[96%] font border-gray-400 rounded-xl mt-1 mx-auto outline-none "
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <ScrollArea className="pt-4 h-[30vh] text-xs p-1 w-full mt-3">
        <Category categoryObjectArray={categoryList} />
      </ScrollArea>
      <div className="mt-auto font-semibold  flex flex-col items-start  border-t-2 text-sm p-1 gap-3 text-gray-600 max-h-[200px] w-full  ">
        <button className="mt-2 w-full hover:bg-gray-100 text-left h-5">
          View all categories
        </button>
        <button className=" w-full hover:bg-gray-100 text-left h-5">
          Add new category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;

//In category there should be a category like home and lesiure
//and on click of the type add option of income expense investement savings  and amount

//reaserch for icon libarys
