import React from "react";
import "./App.css";
import { useGetUsersQuery } from "./gql/generated/schema";

function App() {
  const { data } = useGetUsersQuery();
  const users = data?.getUsers || [];
  console.log(users);
  return (
    <div className="App">
      <header className="App-header"></header>
      <p>
        {users.map((user) => {
          return user.id;
        })}
      </p>
    </div>
  );
}
export default App;
