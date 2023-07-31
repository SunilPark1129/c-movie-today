import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./page/main/Main";
import Search from "./page/search/Search";
import ErrorPage from "./page/error/ErrorPage";
import InfoPage from "./page/info/InfoPage";
import MovieModal from "./components/MovieModal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Navbar />
        </header>
        <div className="wrapper">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/search" element={<Search />}>
              <Route path=":id" element={<MovieModal />} />
            </Route>
            <Route path="/info" element={<InfoPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
