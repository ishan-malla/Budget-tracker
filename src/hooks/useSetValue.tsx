import { useTransactionStore } from "@/store/store";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

type UseSetValueProps<T> = {
  name: string;
  value: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
};

const useSetValue = <T,>({ name, value, setValue }: UseSetValueProps<T>) => {
  const { isEditingTransaction, transactionData } = useTransactionStore();

  useEffect(() => {
    if (isEditingTransaction) {
      setValue(name, value);
    }
  }, [isEditingTransaction, transactionData, setValue, name, value]);
};

export default useSetValue;
