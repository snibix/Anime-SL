import { useState } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import AnimeDetails from "./pages/AnimeDetails";
import Home from "./pages/Home";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <NavBar
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home selectedCategory={selectedCategory} searchTerm={searchTerm} />
          }
        />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
