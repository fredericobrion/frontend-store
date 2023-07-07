import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import { ProductInfo } from './types';
import ProductsDetails from './pages/ProductsDetails';

function App() {
  const [purchasedItens, setPurchasedItens] = useState<ProductInfo[]>([]);
  const [firstLoading, setFirstLoading] = useState(true);

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
          Carrinho de compras
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
        <Route path="/details/:id" element={ <ProductsDetails /> } />
      </Routes>
    </>
  );
}

export default App;
