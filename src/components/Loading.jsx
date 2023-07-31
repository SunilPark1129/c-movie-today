import { useSelector } from "react-redux";
export default function Loading() {
  const { isLoading } = useSelector((state) => state.movieFetchReducer);
  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return null;
  }
}
