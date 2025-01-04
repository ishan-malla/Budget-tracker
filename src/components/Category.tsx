import { Checkbox } from "@/components/ui/checkbox";
import { useTransactionStore } from "@/store/store";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
type CategoryObject = {
  name: string;
  isChecked: boolean;
};

type CategoryProps = {
  filteredItems: CategoryObject[];
};

const Category = ({ filteredItems }: CategoryProps) => {
  const { setCategory } = useTransactionStore();
  const [checkboxStates, setCheckboxStates] = useState(
    filteredItems.map((category) => category.isChecked)
  );

  const handleCheckboxToggle = (index: number) => {
    setCheckboxStates((prevStates) => prevStates.map((_, i) => i === index));
  };

  useEffect(() => {
    const selectedCategory = filteredItems[checkboxStates.indexOf(true)]?.name;

    setCategory({ id: uuid(), name: selectedCategory, isChecked: true });
    console.log(selectedCategory);
  }, [checkboxStates, filteredItems, setCategory]);

  return (
    <>
      {filteredItems.map((categoryObject, index) => (
        <div key={categoryObject.name} className="mb-2">
          <div className="w-full font-semibold flex h-7 text-sm items-center hover:bg-gray-100 justify-between mt-[2%] p-2">
            <h1>{categoryObject.name}</h1>
            <Checkbox
              checked={checkboxStates[index]}
              onClick={() => handleCheckboxToggle(index)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Category;
