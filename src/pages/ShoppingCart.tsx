import { Link } from 'react-router-dom';
import { ProductInfo } from '../types';
import ShoppingCartItens from '../components/ShoppingCartItens';
import Header from '../components/Header';
import styles from '../styles/shoppingCart.module.css';

type ShoppingCardProps = {
  purchasedItens: ProductInfo[],
  setPurchased: (arg: ProductInfo[]) => void,
  setQuantity: (arg: number) => void,
  quantityTotal: number,
};

function ShoppingCart({ purchasedItens, setPurchased, setQuantity, quantityTotal }:
ShoppingCardProps) {
  const total = purchasedItens.reduce((acc, curr) => {
    return (acc + curr.quantity * curr.price);
  }, 0);

  if (!purchasedItens.length) {
    return (
      <>
        <Header />
        <h2
          data-testid="shopping-cart-empty-message"
          className={ styles.h2Title }
        >
          Seu carrinho está vazio.
        </h2>
      </>
    );
  }
  return (
    <>
      <Header />
      <main>
        <section className={ styles.productContainer }>
          {purchasedItens.map((iten: ProductInfo, index) => {
            return (
              <ShoppingCartItens
                key={ index }
                name={ iten.title }
                price={ iten.price }
                quantity={ iten.quantity }
                image={ iten.thumbnail }
                setPurchased={ setPurchased }
                purchasedItens={ purchasedItens }
                setQuantity={ setQuantity }
                quantityTotal={ quantityTotal }
              />
            );
          })}
        </section>
        <section className={ styles.totalContainer }>
          <h3>
            Valor total da compra
            <br />
            {`R$ ${total.toFixed(2)}`}
          </h3>
          <Link
            data-testid="checkout-products"
            to="/shoppingcart/checkout"
          >
            Finalizar Compra
          </Link>
        </section>
      </main>
    </>
  );
}
export default ShoppingCart;
