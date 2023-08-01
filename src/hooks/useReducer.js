import { useSelector } from "react-redux";

export function useLists() {
  const { lists, data, error, isLoading } = useSelector(
    (state) => state.movieFetchReducer
  );
  return { lists, data, error, isLoading };
}

export function useQueries() {
  const { queries, histories, error } = useSelector(
    (state) => state.queryFetchReducer
  );
  return { queries, histories, error };
}

export function useSelected() {
  const { selectedMovie, currentLocation } = useSelector(
    (state) => state.selectedReducer
  );
  return { selectedMovie, currentLocation };
}
