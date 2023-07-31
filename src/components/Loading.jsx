import { useSelector } from "react-redux";
import "./styles/loading.css";

export default function Loading() {
  const { isLoading } = useSelector((state) => state.movieFetchReducer);
  if (isLoading) {
    return (
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  } else {
    return null;
  }
}
