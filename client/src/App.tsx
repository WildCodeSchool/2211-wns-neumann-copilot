import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profil from "./screens/Profil";
import "./App.css";
import Home from "./screens/Home";
// import Edit from "./screens/Edit";
import Trajet from "./screens/Trajet";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LeftMenuPC from "./Components/LeftMenuPC";

function App() {
  return (
    <div className="App">
      <Header />
      <LeftMenuPC />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trajet" element={<Trajet />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
        {/* <Route path="/update_profil" element={<Edit />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
