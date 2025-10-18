import { useState } from "react";

export const useSearchValue = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    callback?: (value: string) => void
  ) => {
    const {
      target: { value },
    } = event;
    setSearchValue(value);
    callback?.(value);
  };

  return {
    searchValue,
    handleSearchValue,
  };
};
