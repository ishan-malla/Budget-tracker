import { useState, useCallback } from "react";

type useToggleType = {
  toggleVisibility: () => void;
  visibility: string;
};

function useToggleVisibility(initialState: boolean = true): useToggleType {
  const [isVisible, setIsVisible] = useState<boolean>(initialState);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const visibility = isVisible ? " fade-out hidden " : " fade-in ";
  return { visibility, toggleVisibility };
}

export default useToggleVisibility;
