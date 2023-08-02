/* eslint-disable react/jsx-max-depth */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { ProductInfo, Review } from '../types';
import ProductReview from '../components/ProductReview';
import Header from '../components/Header';
import styles from '../styles/productDetails.module.css';
import LabelAndRadioInput from '../components/LabelAndRadioInput';

type DetailsInfo = {
  title: string,
  condition: string,
  price: number,
  thumbnail: string
  available: number,
};

type ProductDetailsProps = {
  purchasedItens: ProductInfo[],
  setPurchased: (arg: ProductInfo[]) => void,
  setQuantity: (arg: number) => void,
  quantityTotal: number,
};

const INITIAL_OBJECT = {
  title: '',
  condition: '',
  price: 0,
  thumbnail: '',
  available: 0,
};

const INITIAL_REVIEW = {
  email: '',
  text: '',
  rating: '0',
};

function ProductsDetails({ purchasedItens,
  setPurchased,
  setQuantity,
  quantityTotal }: ProductDetailsProps) {
  const paransPage = useParams();
  const [details, setDetails] = useState<DetailsInfo>(INITIAL_OBJECT);
  const { id: productId = '' } = paransPage;

  const localStorageItens = JSON.parse(localStorage.getItem(productId) || '[{}, {}]');

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
        available: data.available_quantity,
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

  const handleClickReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
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
      localStorage.setItem(productId, JSON.stringify([
        ...reviewList,
        review,
      ]));
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleClick = () => {
    const foundIten = purchasedItens.some((iten) => iten.title === details.title);
    setQuantity(quantityTotal + 1);
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
  };

  return (
    <>
      <Header />
      <main className={ styles.main }>
        <section>
          <h4 data-testid="product-detail-name">{ details.title }</h4>
          <img
            data-testid="product-detail-image"
            src={ details.thumbnail }
            alt="product-img"
          />
          <p>
            R$
            <span data-testid="product-detail-price">{ ` ${details.price}` }</span>

          </p>
          <p>{ `Condiçaõ: ${details.condition}` }</p>
          <button
            onClick={ handleClick }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
        </section>
        <form className={ styles.form }>
          <h4>Avaliações</h4>
          <input
            value={ review.email }
            data-testid="product-detail-email"
            type="text"
            name="email"
            placeholder="Email"
            onChange={ handleChange }
          />

          <div className={ styles.ratingContainer }>
            <h5>Sua Nota</h5>
            <LabelAndRadioInput
              id="1-rating"
              value="1"
              checked={ review.rating === '1' }
              handleClickReview={ handleClickReview }
            />
            {/* <label htmlFor="1-rating">
              <input
                data-testid="1-rating"
                id="1-rating"
                name="rating"
                type="radio"
                value="1"
                checked={ review.rating === '1' }
                onChange={ handleClickReview }
              />
              1
            </label> */}

            <LabelAndRadioInput
              id="2-rating"
              value="2"
              checked={ review.rating === '2' }
              handleClickReview={ handleClickReview }
            />

            <LabelAndRadioInput
              id="3-rating"
              value="3"
              checked={ review.rating === '3' }
              handleClickReview={ handleClickReview }
            />

            <LabelAndRadioInput
              id="4-rating"
              value="4"
              checked={ review.rating === '4' }
              handleClickReview={ handleClickReview }
            />

            <LabelAndRadioInput
              id="5-rating"
              value="5"
              checked={ review.rating === '5' }
              handleClickReview={ handleClickReview }
            />
          </div>

          <textarea
            cols={ 30 }
            rows={ 10 }
            placeholder="Mensagem (Opcional)"
            data-testid="product-detail-evaluation"
            name="text"
            value={ review.text }
            onChange={ handleChange }
          />

          { !isValid && <span data-testid="error-msg">Campos inválidos</span> }

          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ handleSubmitReview }
          >
            Avaliar
          </button>
        </form>

        {reviewList.length > 0
        && reviewList.map((reviewIten: Review, index: number) => {
          return (
            <ProductReview key={ index } reviewInfo={ reviewIten } />
          );
        })}
      </main>
    </>
  );
}

export default ProductsDetails;
