import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
<<<<<<< HEAD
import SignUp from "./screens/SignUp";
=======
import Register from "./screens/Register";
>>>>>>> develop
import Profil from "./screens/Profil";
import "./App.css";
import { useGetUsersQuery } from "./gql/generated/schema";
import Home from "./screens/Home";
import Trajet from "./screens/Trajet";

function App() {
  const { data } = useGetUsersQuery();
  const users = data?.getUsers || [];
  console.log(users);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trajet" element={<Trajet />} />
<<<<<<< HEAD
        <Route path="/signUp" element={<SignUp />} />
=======
        <Route path="/register" element={<Register />} />
>>>>>>> develop
        <Route path="/Profil" element={<Profil />} />
      </Routes>
      {/* <p>
          {users.map((user) => {
            return user.id;
          })}
        </p> */}
    </div>
  );
}
export default App;