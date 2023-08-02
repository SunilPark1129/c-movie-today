import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./page/main/Main";
import Search from "./page/search/Search";
import ErrorPage from "./page/error/ErrorPage";
import InfoPage from "./page/info/InfoPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ModalOpen from "./components/styles/ModalOpen";

// when refreshed, scroll to top
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="wrapper">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
          <ModalOpen />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
