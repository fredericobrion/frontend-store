import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Categories from './components/Categorias';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
    </Routes>
  );
}

export default App;
