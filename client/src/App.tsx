import React from "react";
import "./App.css";
import { useGetUsersQuery } from "./gql/generated/schema";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Profil from "./screens/Profil";

function App() {
  const { data } = useGetUsersQuery();
  const users = data?.getUsers || [];
  console.log(users);
  return (
    <>
      <div className="App">
        <p>
          {users.map((user) => {
            return user.id;
          })}
        </p>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Profil" element={<Profil />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
