import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profil from "./screens/Profil";
import "./App.css";
import { useGetUsersQuery } from "./gql/generated/schema";
import Home from "./screens/Home";
import Trajet from "./screens/Trajet";

function App() {
  const { data } = useGetUsersQuery();
  const users = data?.getUsers || [];
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trajet" element={<Trajet />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </div>
  );
}
export default App;
