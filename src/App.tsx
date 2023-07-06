import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <>
      <nav>
        <Link
          to="/shoppingcart"
          data-testid="shopping-cart-button"
        >
          Carrinho de compras
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route
          path="/shoppingcart"
          element={ <ShoppingCart /> }
        />
      </Routes>
    </>
  );
}

export default App;
