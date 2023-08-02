import React from "react";
import MovieModal from "../MovieModal";
import { useSelected } from "../../hooks/useReducer";

export default function ModalOpen() {
  const { selectedMovie } = useSelected();

  if (selectedMovie) {
    return <MovieModal selectedMovie={selectedMovie} />;
  } else {
    return null;
  }
}
