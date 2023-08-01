import "./styles/loading.css";
import { useLists } from "../hooks/useReducer";

// if fetching is still in pendding, display this content
export default function Loading() {
  const { isLoading } = useLists();
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
