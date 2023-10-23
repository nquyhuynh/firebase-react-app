import logo from './logo.svg';
import './App.css';
import {rtdb_and_local_fs_presence} from "./firebase";
import React, { useState, useEffect } from "react";

function App() {

  useEffect(() => {
    rtdb_and_local_fs_presence('576eaab3-1459-4427-ac6a-9dae3a5d9c87');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
