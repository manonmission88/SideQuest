import React from 'react';
import Header from './components/Header/Header';
import Dashboard from './components/Home/Home';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
};

export default App;
