import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { ProductInfo, Review } from '../types';
import ProductReview from '../components/ProductReview';

type DetailsInfo = {
  title: string,
  condition: string,
  price: number,
  thumbnail: string
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
};

const INITIAL_REVIEW = {
  email: '',
  text: '',
  rating: '0',
};

function ProductsDetails({ purchasedItens, setPurchased }: ProductDetailsProps) {
  console.log('renderizou');
  const paransPage = useParams();
  const [details, setDetails] = useState<DetailsInfo>(INITIAL_OBJECT);
  const { id: productId = '' } = paransPage;

  const localStorageItens = JSON.parse(localStorage.getItem(productId) || '[]');

  const [firstLoading, setFirstLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [review, setReview] = useState(INITIAL_REVIEW);
  const [reviewList, setReviewList] = useState<Review[]>(localStorageItens);

  useEffect(() => {
    const requestDataApi = async () => {
      const data = await getProductById(productId);
      const { title, price, thumbnail, condition } = data;
      const filterDetails = {
        title,
        price,
        thumbnail,
        condition,
      };
      setDetails(filterDetails);
    };
    requestDataApi();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleClickReview = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const { value } = e.target;
    setReview({
      ...review,
      rating: value,
    });
  };

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmitReview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const isEmailValid = regexEmail.test(review.email);
    const isRatingchecked = review.rating !== '0';
    if (isEmailValid && isRatingchecked) {
      setReviewList([
        ...reviewList,
        review,
      ]);
      setReview(INITIAL_REVIEW);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

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
      }]);
    }
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
      <form>
        <input
          value={ review.email }
          data-testid="product-detail-email"
          type="text"
          name="email"
          placeholder="Seu E-mail"
          onChange={ handleChange }
        />

        <label htmlFor="1-rating">
          <input
            data-testid="1-rating"
            id="1-rating"
            name="rating"
            type="radio"
            value="1"
            checked={ review.rating === '1' }
            onClick={ handleClickReview }
          />
          1
        </label>
        <label htmlFor="2-rating">
          <input
            data-testid="2-rating"
            id="2-rating"
            name="rating"
            type="radio"
            value="2"
            checked={ review.rating === '2' }
            onClick={ handleClickReview }
          />
          2
        </label>
        <label htmlFor="3-rating">
          <input
            data-testid="3-rating"
            id="3-rating"
            name="rating"
            type="radio"
            value="3"
            checked={ review.rating === '3' }
            onClick={ handleClickReview }
          />
          3
        </label>
        <label htmlFor="4-rating">
          <input
            data-testid="4-rating"
            id="4-rating"
            name="rating"
            type="radio"
            value="4"
            checked={ review.rating === '4' }
            onClick={ handleClickReview }
          />
          4
        </label>
        <label htmlFor="5-rating">
          <input
            data-testid="5-rating"
            id="5-rating"
            name="rating"
            type="radio"
            value="5"
            checked={ review.rating === '5' }
            onClick={ handleClickReview }
          />
          5
        </label>

        <textarea
          data-testid="product-detail-evaluation"
          name="text"
          value={ review.text }
          onChange={ handleChange }
        />

        <button
          type="submit"
          data-testid="submit-review-btn"
          onClick={ handleSubmitReview }
        >
          Enviar avaliação
        </button>
      </form>
      <button
        onClick={ handleClick }
        data-testid="product-detail-add-to-cart"
      >
        Adicionar ao carrinho
      </button>

      { !isValid && <span data-testid="error-msg">Campos inválidos</span> }

      {reviewList.length > 0 && reviewList.map((reviewIten: Review, index: number) => {
        return (
          <ProductReview key={ index } reviewInfo={ reviewIten } />
        );
      })}
    </div>
  );
}

export default ProductsDetails;
