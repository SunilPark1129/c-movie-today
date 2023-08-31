import React from "react";
import { useLists } from "../../hooks/useReducer";
import { SearchHomePage } from "../../components/CatchPage";

export default function Tip() {
  const { lists, isLoading, error } = useLists();

  return !error && lists.length === 0 && !isLoading ? <SearchHomePage /> : null;
}
