import { useLocation, useNavigate } from 'react-router-dom';
import { ProductInfo } from '../types';
import trash from '../images/trash.png';
import styles from '../styles/productsResume.module.css';
import closeIcon from '../images/close.png';

type ProductsResumeProps = {
  purchasedItens: ProductInfo[],
  setPurchased: (arg: ProductInfo[]) => void,
  quantityTotal: number,
  setQuantity: (arg: number) => void,
  showResume: boolean,
  setShowResume: (arg: boolean) => void,
};

function ProductsResume({
  purchasedItens,
  setPurchased,
  quantityTotal,
  setQuantity,
  showResume,
  setShowResume,
}
: ProductsResumeProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isCheckoutPage = location.pathname === '/shoppingcart/checkout';

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
      alterItem.quantity += 1;
      setPurchased([...purchasedItens]);
      setQuantity(quantityTotal + 1);
    }
    console.log(purchasedItens);
  };

  const handleDecrease = (itemName: string) => {
    const alterItemIndex = purchasedItens.findIndex((item) => item.title === itemName);
    if (purchasedItens[alterItemIndex].quantity > 1) {
      purchasedItens[alterItemIndex].quantity -= 1;
      setPurchased([...purchasedItens]);
      setQuantity(quantityTotal - 1);
    }
  };

  const total = purchasedItens.reduce((acc, curr) => {
    return (acc + curr.quantity * curr.price);
  }, 0);

  const resumeContainerClass = showResume && !isCheckoutPage
    ? styles.resumeContainer : styles.noResume;

  return (
    <div className={ resumeContainerClass }>
      <button
        className={ styles.closeBtn }
        onClick={ () => setShowResume(false) }
      >
        <img src={ closeIcon } alt="Close Icon" />
      </button>
      <h5>Carrinho de compras</h5>
      {purchasedItens.map((iten: ProductInfo) => {
        return (
          <div
            className={ styles.product }
            key={ iten.title }
          >
            <button onClick={ () => handleDelete(iten.title) }>
              <img src={ trash } alt="Trash Can" />
            </button>
            <img src={ iten.thumbnail } alt="Foto do produto" />
            <div>
              <button onClick={ () => handleIncrease(iten.title) }>
                +
              </button>
              <span>{ iten.quantity }</span>
              <button
                onClick={ () => handleDecrease(iten.title) }
              >
                -
              </button>
            </div>
          </div>
        );
      })}
      <h5 className={ styles.totalValue }>
        Valor total da compra:
        <span>{ ` R$ ${total.toFixed(2)}` }</span>
      </h5>
      <button
        className={ styles.finish }
        onClick={ () => navigate('shoppingcart/checkout') }
      >
        Finalizar Compra
      </button>
    </div>
  );
}

export default ProductsResume;
