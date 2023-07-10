import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import { ProductInfo } from './types';
import ProductsDetails from './pages/ProductsDetails';
import PagePayments from './pages/PagePayments';

function App() {
  const [purchasedItens, setPurchasedItens] = useState<ProductInfo[]>([]);
  const [firstLoading, setFirstLoading] = useState(true);

  const productsQuantity = purchasedItens.reduce((soma, quantity) => {
    return soma + quantity.quantity;
  }, 0);

  useEffect(() => {
    if (firstLoading) {
      const localStorageItens = JSON
        .parse(localStorage.getItem('purchasedItens') || '{}');
      if (localStorageItens.length) {
        setPurchasedItens(localStorageItens);
      }
      setFirstLoading(false);
    } else {
      localStorage.setItem('purchasedItens', JSON.stringify(purchasedItens));
    }
  }, [purchasedItens]);

  return (
    <>
      <nav>
        <Link
          to="/shoppingcart"
          data-testid="shopping-cart-button"
        >
          <p
            data-testid="shopping-cart-size"
          >
            { productsQuantity }
          </p>
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={ <Home
            purchasedItens={ purchasedItens }
            setPurchased={ setPurchasedItens }
          /> }
        />
        <Route
          path="/shoppingcart"
          element={ <ShoppingCart
            purchasedItens={ purchasedItens }
            setPurchased={ setPurchasedItens }
          /> }
        />
        <Route
          path="/shoppingcart/checkout"
          element={ <PagePayments
            setPurchased={ setPurchasedItens }
            purchasedItens={ purchasedItens }
          /> }
        />
        <Route
          path="/details/:id"
          element={ <ProductsDetails
            purchasedItens={ purchasedItens }
            setPurchased={ setPurchasedItens }
          /> }
        />
      </Routes>
    </>
  );
}

export default App;
