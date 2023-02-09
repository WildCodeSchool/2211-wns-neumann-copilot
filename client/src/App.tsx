import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css";


function App() {
function Create1User() {
  const Create_Users = gql`
    mutation Mutation($data: UserInput!) {
      createUser(data: $data) {
        email
        id
      }
    }
  `;
  const { data } = useQuery(Create_Users);
}
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
