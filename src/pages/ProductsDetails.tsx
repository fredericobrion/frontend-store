import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';

type DetailsInfo = {
  title: string,
  condition: string,
  price: number,
  thumbnail: string
};

function ProductsDetails() {
  const paransPage = useParams();
  const [details, setDetails] = useState<DetailsInfo>();
  const { id: productId = '' } = paransPage;

  useEffect(() => {
    const requestDataApi = async () => {
      const data = await getProductById(productId);
      const filterDetails = {
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
        condition: data.condition,
      };
      setDetails(filterDetails);
    };
    requestDataApi();
  }, []);

  return (
    <div>
      <h4 data-testid="product-detail-name">{ details?.title }</h4>
      <img
        data-testid="product-detail-image"
        src={ details?.thumbnail }
        alt="product-img"
      />
      <p data-testid="product-detail-price">{ details?.price }</p>
      <p>{ details?.condition }</p>
    </div>
  );
}

export default ProductsDetails;
