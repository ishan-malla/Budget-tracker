import { useTransactionStore } from "@/store/store";
import { useEffect } from "react";

const useResetForms = (resetForm: () => void) => {
  const { isSubmiting, setIsSubmiting } = useTransactionStore();

  useEffect(() => {
    if (isSubmiting) {
      resetForm();
      setIsSubmiting(false);
    }
  }, [isSubmiting, resetForm, setIsSubmiting]);
};

export default useResetForms;
