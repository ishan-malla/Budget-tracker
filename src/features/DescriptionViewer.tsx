import { X } from "lucide-react";
import { useTransactionStore } from "@/store/store";

type DescriptionViewerProps = {
  visibility: boolean;
  toggleVisibility: () => void;
  selectedTransactionId: string | null;
};

const DescriptionViewer = ({
  visibility,
  toggleVisibility,
  selectedTransactionId,
}: DescriptionViewerProps) => {
  const { transactions } = useTransactionStore();

  const selectedTransaction = transactions.find(
    (transaction) => transaction.id === selectedTransactionId
  );

  if (!visibility || !selectedTransaction) return null;

  return (
    <div className="border w-[30vw] fixed z-20 bg-white p-4 shadow-lg top-96 right-96 min-h-[40vh] h-auto">
      <div className="w-full flex min-h-5 px-2 overflow-visible h-auto">
        <X
          size={20}
          color="#000000"
          strokeWidth={2}
          className="hover:cursor-pointer hover:bg-gray-50"
          absoluteStrokeWidth
          onClick={toggleVisibility}
        />
        <div className="flex flex-col gap-4 mx-auto w-full">
          <h1 className="font-bold mx-auto">Description</h1>
          <div className="font-bold mt-5 min-h-[30vh] text-black text-base">
            <h1>
              {selectedTransaction.description?.title || "Description title"}
            </h1>
            <p className="mt-4 flex flex-col font-medium text-zinc-700 text-sm tracking-tighter">
              {selectedTransaction.description?.details || "Details"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionViewer;
