import { createContext } from "react";

export const SearchDataContext = createContext({
  term: "",
  handleSearch: () => {},
});
