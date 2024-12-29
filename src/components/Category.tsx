import { Checkbox } from "@/components/ui/checkbox";
import { useTransactionStore } from "@/store/store";
import { useState } from "react";
type CategoryObject = {
  category: string;
  items: Item[];
};

type Item = {
  emoji: string;
  title: string;
  checked: boolean;
};

type CategoryProps = {
  categoryObjectArray: CategoryObject[];
  getCategory: () => Item[];
};

const Category = ({ categoryObjectArray, getCategory }: CategoryProps) => {
  const [checkbox, setCheckbox] = useState(false);
  // const { useCheckBoxVisiblity } = useTransactionStore();
  // useCheckBoxVisiblity(checkbox);
  // console.log(getCategory);
  return (
    <>
      {categoryObjectArray.map((categoryObject: CategoryObject) => (
        <div key={categoryObject.category} className="mb-2">
          <h1 className="font-semibold text-xs text-gray-400">
            {categoryObject.category}
          </h1>
          {categoryObject.items.map((item, index) => (
            <div
              key={index}
              className="w-full font-semibold flex h-7 text-sm items-center hover:bg-gray-100   justify-between  mt-[2%] p-2"
            >
              <div>
                <span className="text-base "> {item.emoji}</span>
                <span className="text-sm  font-medium px-1 ">{item.title}</span>
              </div>
              <Checkbox
                onClick={() => {
                  setCheckbox((prevState) => !prevState);
                }}
                checked={checkbox}
              ></Checkbox>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
export default Category;

// remove category group and make is a single array of objects
