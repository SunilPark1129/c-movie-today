import "./styles/loading.css";

// if fetching is still in pendding, display this content
export default function Loading() {
  return (
    <div className="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
