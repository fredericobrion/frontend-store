import { ProductInfo } from '../types';
import styles from '../styles/checkoutItemCard.module.css';

function CheckoutItemCard({ title, thumbnail, price, quantity }: ProductInfo) {
  return (
    <div className={ styles.container }>
      <img src={ thumbnail } alt="Imagem do produto" />
      <h5>{title}</h5>
      <h5>{`R$ ${price}`}</h5>
      <p>
        Quantidade:
        <br />
        <strong>{quantity}</strong>
      </p>
    </div>
  );
}

export default CheckoutItemCard;
