import React from "react";
import "./App.css";
import LoginPage from "./Page/LoginPage/LoginPage";
import Playground from "./Playground/useState/loginPage";

function App() {
  return (
    <div>
      <h1>Mi App</h1>
      <LoginPage />
      <Playground />
    </div>
  );
}

export default App;