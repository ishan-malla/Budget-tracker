import { Checkbox } from "@/components/ui/checkbox";

// type CategoryObject = { category: string; items: Items };
// type Items = Item[];
// type Item = {
//   emoji: string;
//   title: string;
//   checked: boolean;
// };
// type categoryObjectArray = { CategoryObjectArray: CategoryObject[] };
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
};

const Category = ({ categoryObjectArray }: CategoryProps) => {
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
              <Checkbox checked={item.checked}></Checkbox>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
export default Category;
