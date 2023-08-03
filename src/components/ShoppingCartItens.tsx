import { ProductInfo } from '../types';
import styles from '../styles/shoppingCartItens.module.css';
import trash from '../images/trash.png';

type ShoppingCartItensProps = {
  name: string,
  price: number,
  image: string,
  quantity?: number,
  purchasedItens: ProductInfo[],
  setPurchased: (arg: ProductInfo[]) => void,
  quantityTotal: number,
  setQuantity: (arg: number) => void,
};

function ShoppingCartItens({
  name,
  price,
  image,
  quantity = 0,
  purchasedItens,
  setPurchased,
  setQuantity,
  quantityTotal }
: ShoppingCartItensProps) {
  const handleDelete = (itemName: string) => {
    const deletedItemIndex = purchasedItens.findIndex((item) => item.title === itemName);
    setQuantity(quantityTotal - purchasedItens[deletedItemIndex].quantity);
    purchasedItens.splice(deletedItemIndex, 1);
    setPurchased([...purchasedItens]);
  };

  const handleIncrease = (itemName: string) => {
    const alterItemIndex = purchasedItens.findIndex((item) => item.title === itemName);
    const alterItem = purchasedItens[alterItemIndex];
    if (alterItem.quantity < alterItem.available_quantity) {
      alterItem.quantity = quantity + 1;
      setPurchased([...purchasedItens]);
      setQuantity(quantityTotal + 1);
    }
  };

  const handleDecrease = (itemName: string) => {
    const alterItemIndex = purchasedItens.findIndex((item) => item.title === itemName);
    if (quantity > 1) {
      purchasedItens[alterItemIndex].quantity = quantity - 1;
      setPurchased([...purchasedItens]);
      setQuantity(quantityTotal - 1);
    }
  };

  return (
    <div data-testid="product" className={ styles.container }>
      <button
        data-testid="remove-product"
        onClick={ () => handleDelete(name) }
      >
        <img src={ trash } alt="Trash Can" />
      </button>
      <img src={ image } alt="Foto do produto" />
      <h4 data-testid="shopping-cart-product-name">{name}</h4>
      <div className={ styles.quantity }>
        <button
          data-testid="product-increase-quantity"
          onClick={ () => handleIncrease(name) }
        >
          +
        </button>
        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
        <button
          data-testid="product-decrease-quantity"
          onClick={ () => handleDecrease(name) }
        >
          -
        </button>
      </div>
      <p>
        R$
        <span>{` ${price.toFixed(2)}`}</span>
      </p>
    </div>
  );
}

export default ShoppingCartItens;
