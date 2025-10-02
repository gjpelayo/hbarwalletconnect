import React from "react";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <main className="main-container" style={{ marginTop: "80px" }}>
        <h2>👋 Welcome to your Hedera dApp!</h2>
        <p>This is where your main app content will go.</p>
      </main>
    </div>
  );
}

export default App;
