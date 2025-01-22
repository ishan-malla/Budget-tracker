import { Checkbox } from "@/components/ui/checkbox";
import { useTransactionStore } from "@/store/store";
import { useEffect, useState } from "react";

type CategoryObject = {
  id: string;
  name: string;
};

type CategoryProps = {
  filteredItems: CategoryObject[];
};

const Category = ({ filteredItems }: CategoryProps) => {
  const { setSelectedCategory } = useTransactionStore();
  const [checkboxStates, setCheckboxStates] = useState(
    filteredItems.map(() => false)
  );

  useEffect(() => {
    setCheckboxStates(filteredItems.map(() => false));
  }, [filteredItems]);

  const handleCheckboxToggle = (index: number) => {
    setCheckboxStates((prev) => prev.map((_, i) => i === index));
  };

  useEffect(() => {
    const selectedCategory = filteredItems[checkboxStates.indexOf(true)];
    if (selectedCategory) {
      setSelectedCategory(selectedCategory);
    }
  }, [checkboxStates, filteredItems, setSelectedCategory]);

  return (
    <>
      {filteredItems.map((categoryObject, index) => (
        <div key={categoryObject.id} className="mb-2">
          <div className="w-full font-semibold flex h-7 text-sm items-center hover:bg-gray-100 justify-between p-2">
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
