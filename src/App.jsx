import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AnimeDetails from "./pages/AnimeDetails";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
