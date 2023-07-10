import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { ProductInfo } from '../types';

type DetailsInfo = {
  title: string,
  condition: string,
  price: number,
  thumbnail: string
  available: number,
};

type ProductDetailsProps = {
  purchasedItens: ProductInfo[],
  setPurchased: (arg: ProductInfo[]) => void
};

const INITIAL_OBJECT = {
  title: '',
  condition: '',
  price: 0,
  thumbnail: '',
  available: 0,
};

function ProductsDetails({ purchasedItens, setPurchased }: ProductDetailsProps) {
  const paransPage = useParams();
  const [details, setDetails] = useState<DetailsInfo>(INITIAL_OBJECT);
  const { id: productId = '' } = paransPage;

  useEffect(() => {
    const requestDataApi = async () => {
      const data = await getProductById(productId);
      const { title, price, thumbnail, condition } = data;
      const filterDetails = {
        title,
        price,
        thumbnail,
        condition,
        available: data.available_quantity,
      };
      setDetails(filterDetails);
    };
    requestDataApi();
  }, []);

  const handleClick = () => {
    const foundIten = purchasedItens.some((iten) => iten.title === details.title);
    if (foundIten) {
      const index = purchasedItens.findIndex((iten) => iten.title === details.title);
      purchasedItens[index].quantity += 1;
      setPurchased([...purchasedItens]);
    } else {
      setPurchased([...purchasedItens, {
        title: details.title,
        price: details.price,
        thumbnail: details.thumbnail,
        quantity: 1,
        available_quantity: details.available,
      }]);
    }
    console.log(purchasedItens);
  };

  return (
    <div>
      <h4 data-testid="product-detail-name">{ details.title }</h4>
      <img
        data-testid="product-detail-image"
        src={ details.thumbnail }
        alt="product-img"
      />
      <p data-testid="product-detail-price">{ details.price }</p>
      <p>{ details.condition }</p>
      <button
        onClick={ handleClick }
        data-testid="product-detail-add-to-cart"
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}

export default ProductsDetails;
