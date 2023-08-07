import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ProductInfo } from '../types';
import styles from '../styles/productCard.module.css';

type ProductCardProps = {
  id: string,
  name: string,
  price: number,
  image: string,
  available: number,
  shipping: boolean,
  purchasedItens?: ProductInfo[]
  setPurchased?: (arg: ProductInfo[]) => void,
  setQuantityTotal: (arg: number) => void,
  quantityTotal: number,
};

function ProductCard({ name, id, available, shipping, quantityTotal, setQuantityTotal,
  price, image, purchasedItens = [], setPurchased = () => {} }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const handleClick = () => {
    setQuantityTotal(quantityTotal + 1);
    setQuantity(quantity + 1);
    const foundItenIndex = purchasedItens.findIndex((iten) => iten.title === name);
    if (foundItenIndex === -1) {
      setPurchased([...purchasedItens, {
        title: name,
        thumbnail: image,
        price,
        quantity,
        available_quantity: available,
        shipping,
      }]);
    } else {
      purchasedItens.splice(foundItenIndex, 1);
      setPurchased([...purchasedItens, {
        title: name,
        price,
        thumbnail: image,
        quantity,
        available_quantity: available,
        shipping,
      }]);
    }
  };

  const isPurchased = purchasedItens.some((iten) => iten.title === name);
  const classContainer = isPurchased
    ? `${styles.container} ${styles.purchased}` : styles.container;

  return (
    <div data-testid="product" className={ classContainer }>
      <Link to={ `/details/${id} ` } data-testid="product-detail-link">
        <img src={ image } alt="Foto do produto" />
        <h4>{name}</h4>
        <p>
          R$
          <strong>{` ${price}`}</strong>
        </p>
      </Link>
      {shipping && (
        <span
          className={ styles.shipping }
          data-testid="free-shipping"
        >
          Frete grátis
        </span>)}
      <button
        data-testid="product-add-to-cart"
        onClick={ handleClick }
      >
        Comprar
      </button>
    </div>
  );
}

export default ProductCard;
