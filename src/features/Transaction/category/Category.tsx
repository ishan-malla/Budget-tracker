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
  const {
    setSelectedCategory,
    selectedCategory,
    isEditingCategory,
    setCategory,
  } = useTransactionStore();

  const [checkboxStates, setCheckboxStates] = useState(
    filteredItems.map((item) => item.id === selectedCategory.id)
  );

  useEffect(() => {
    setCheckboxStates(
      filteredItems.map((item) => item.id === selectedCategory.id)
    );
  }, [filteredItems, selectedCategory]);

  const handleCheckboxToggle = (index: number) => {
    const newStates = filteredItems.map((_, i) => i === index);
    setCheckboxStates(newStates);

    const selectedItem = filteredItems[index];

    if (isEditingCategory) {
      // When editing, update both selectedCategory and transactionData
      setSelectedCategory(selectedItem);
      setCategory(selectedItem);
    } else {
      // Normal selection
      if (selectedItem.id === selectedCategory.id) {
        setSelectedCategory({ id: "", name: "" });
      } else {
        setSelectedCategory(selectedItem);
      }
    }
  };

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
