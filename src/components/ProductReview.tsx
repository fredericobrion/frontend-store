import { Review } from '../types';
import styles from '../styles/productReview.module.css';
import emptyStar from '../images/emptyStar.svg';
import filledStar from '../images/filledStar.svg';

type ProductReviewProps = {
  reviewInfo: Review
};

function ProductReview({ reviewInfo }: ProductReviewProps) {
  const { email, rating, text } = reviewInfo;
  return (
    <div className={ styles.container }>
      <p data-testid="review-card-email">{ email }</p>
      <div className={ styles.ratingContainer }>
        <span data-testid="review-card-rating">{ rating }</span>
        <img src={ filledStar } alt="" />
        <img src={ Number(rating) >= 2 ? filledStar : emptyStar } alt="" />
        <img src={ Number(rating) >= 3 ? filledStar : emptyStar } alt="" />
        <img src={ Number(rating) >= 4 ? filledStar : emptyStar } alt="" />
        <img src={ Number(rating) === 5 ? filledStar : emptyStar } alt="" />
      </div>
      <span data-testid="review-card-evaluation">{ text }</span>
    </div>
  );
}

export default ProductReview;
