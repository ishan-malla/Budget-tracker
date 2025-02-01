import { useEffect, useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Category from "@/features/Transaction/category/Category";
import AddNewCategory from "./AddNewCategory";
import useToggleVisibility from "@/hooks/useToggleVisibilty";
import { useTransactionStore } from "@/store/store";
type AddTransactionProp = {
  visibility: "hidden" | "";
  toggleCategory: () => void;
};

const AddCategory = ({ visibility, toggleCategory }: AddTransactionProp) => {
  const [category, setCategory] = useState("");
  const { visibility: AddNewCategoryVis, toggleVisibility } =
    useToggleVisibility();

  const { categoryList, deleteCategory, isEditingCategory } =
    useTransactionStore();
  console.log(category);

  useEffect(() => {
    if (isEditingCategory) {
      toggleCategory();
    }
  }, [isEditingCategory]);

  const filteredItems = useMemo(() => {
    if (!category) {
      return categoryList;
    }

    return categoryList.filter((item) =>
      item.name.toLowerCase().includes(category.toLowerCase())
    );
  }, [category, categoryList]);

  return (
    <div
      className={`min-h-[48vh]  h-auto border-2 w-[17vw] flex flex-col  p-2 rounded-sm ${visibility} abolute shadow-md shadow-gray-200 absolute z-10 right-48 bg-white  top-[4.6rem]   `}
    >
      <AddNewCategory
        visibility={AddNewCategoryVis}
        toggleVisibility={toggleVisibility}
      ></AddNewCategory>
      <input
        type="text"
        placeholder="Search ..."
        className="border pl-2 text-sm h-7 w-[96%] font border-gray-400 rounded-xl mt-1 mx-auto outline-none "
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <ScrollArea className="pt-4 h-[30vh] text-xs p-1 w-full mt-3">
        <Category filteredItems={filteredItems} />
      </ScrollArea>
      <div className="mt-auto font-semibold  grid items-center  border-t-2  text-[0.825rem] p-1 gap-2 text-gray-600 w-full  h-11 ">
        <button
          className=" w-full hover:bg-gray-100 text-left h-4 "
          onClick={toggleVisibility}
        >
          Add new category
        </button>
        <button
          className="w-full hover:bg-gray-100 text-left h-3 pd-1 "
          onClick={deleteCategory}
        >
          Delete category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
