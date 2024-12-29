import { X } from "lucide-react";
import { useTransactionStore } from "@/store/store";

type DescriptionViewerProps = {
  visibility: string;
  toggleVisibility: () => void;
};

const DescriptionViewer = ({
  visibility,
  toggleVisibility,
}: DescriptionViewerProps) => {
  const {
    transactionData: { description },
  } = useTransactionStore();

  return (
    <div
      className={`border w-[25vw] absolute z-20 top-20 min-h-[30vh] bg-white p-2  shadow-lg ${visibility}`}
    >
      <div className="w-full flex min-h-5 px-2 overflow-visible h-auto ">
        <X
          size={20}
          color="#000000"
          strokeWidth={2}
          className="hover:cursor-pointer hover:bg-gray-50"
          absoluteStrokeWidth
          onClick={toggleVisibility}
        />
        <div className="flex flex-col gap-4 mx-auto w-full ">
          <h1 className="font-bold mx-auto">Description</h1>
          <div className="font-bold  mt-5   min-h-[25vh] text-black  text-base  ">
            <h1>{description?.title || "Description title"}</h1>
            <p className="mt-4 flex flex-col font-medium  text-zinc-700 text-sm  tracking-tighter">
              {description?.details || "Details"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionViewer;
