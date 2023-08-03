import { Route, Routes, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ProductInfo } from './types';
import ProductsDetails from './pages/ProductsDetails';
import ShoppingCart from './pages/ShoppingCart';
import PagePayments from './pages/PagePayments';
import Home from './pages/Home';
import './App.css';
import styles from './styles/shoppingCartButton.module.css';
import shoppingCartIcon from './images/shoppingCart.svg';

function App() {
  const [purchasedItens, setPurchasedItens] = useState<ProductInfo[]>([]);
  const [firstLoading, setFirstLoading] = useState(true);

  const localStorageTotalQuantity = JSON
    .parse(localStorage.getItem('quantityTotal') || '0');
  const [quantityTotal, setQuantityTotal] = useState(localStorageTotalQuantity);

  const [oldQuantity, setOldQuantity] = useState(quantityTotal);
  const [shoppigCartButtonClass,
    setShoppigCartButtonClass] = useState(styles.shoppingCartButton);

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

  useEffect(() => {
    setShoppigCartButtonClass(styles.shoppingCartButton);
  }, [quantityTotal]);

  useEffect(() => {
    localStorage.setItem('quantityTotal', JSON.stringify(quantityTotal));
    if (oldQuantity < quantityTotal) {
      setTimeout(() => {
        setShoppigCartButtonClass(styles.shoppingCartButton);
      }, 401);
      setShoppigCartButtonClass(`${styles.shoppingCartButton} ${styles.increaseScale}`);
      setOldQuantity(quantityTotal);
    }
    if (oldQuantity > quantityTotal) {
      setShoppigCartButtonClass(`${styles.shoppingCartButton} ${styles.decreaseScale}`);
      setOldQuantity(quantityTotal);
    }
  }, [quantityTotal]);

  return (
    <>
      <nav className={ shoppigCartButtonClass }>
        <Link
          className={ styles.link }
          to="/shoppingcart"
          data-testid="shopping-cart-button"
        >
          <img src={ shoppingCartIcon } alt="" />
          <p
            data-testid="shopping-cart-size"
          >
            { quantityTotal }
          </p>
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={ <Home
            purchasedItens={ purchasedItens }
            setPurchased={ setPurchasedItens }
            quantityTotal={ quantityTotal }
            setQuantity={ setQuantityTotal }
          /> }
        />
        <Route
          path="/shoppingcart"
          element={ <ShoppingCart
            quantityTotal={ quantityTotal }
            setQuantity={ setQuantityTotal }
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
            quantityTotal={ quantityTotal }
            setQuantity={ setQuantityTotal }
          /> }
        />
      </Routes>
    </>
  );
}

export default App;
