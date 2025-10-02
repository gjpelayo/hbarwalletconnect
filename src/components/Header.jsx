import React from "react";
import ConnectWallet from "./ConnectWallet";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>🚀 Hedera dApp</h1>
      </div>

      <div className="header-center">
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Dashboard</a>
          <a href="#">About</a>
        </nav>
      </div>

      <div className="header-right">
        <ConnectWallet />
      </div>
    </header>
  );
}
