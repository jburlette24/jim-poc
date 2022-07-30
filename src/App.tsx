import React from 'react';
import './App.css';
import { SearchPage } from './SearchPage/SearchPage';
import { Router, Route } from 'react-router'

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <main>
        <SearchPage />
      </main>
    </div>
  );
}

export default App;
