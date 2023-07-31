import { useState, useEffect } from "react";

export default function useDebounce(query) {
  const [data, setData] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      setData(query);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return data;
}
