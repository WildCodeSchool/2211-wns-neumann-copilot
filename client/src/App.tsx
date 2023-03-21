import React from "react";
import "./App.css";
import { useGetUsersQuery } from "./gql/generated/schema";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";

function App() {
  const { data } = useGetUsersQuery();
  const users = data?.getUsers || [];
  console.log(users);
  return (
    <>
      <div className="App">
        <header className="App-header"></header>
        <p>
          {users.map((user) => {
            return user.id;
          })}
        </p>
        <Routes>
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
