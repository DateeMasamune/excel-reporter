import { useSearchValue } from "@/shared/hooks/use-search-value";
import { TextFieldStyled } from "./styled";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  callback?: (value: string) => void;
};

export const SearchInput = ({ callback }: Props) => {
  const { searchValue, handleSearchValue } = useSearchValue();

  return (
    <TextFieldStyled
      placeholder="Введите название блюда"
      fullWidth
      onChange={(event) => handleSearchValue(event, callback)}
      value={searchValue}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      variant="filled"
    />
  );
};
