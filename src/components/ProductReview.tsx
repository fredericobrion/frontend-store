import { Review } from '../types';

type ProductReviewProps = {
  reviewInfo: Review
};

function ProductReview({ reviewInfo }: ProductReviewProps) {
  const { email, rating, text } = reviewInfo;
  return (
    <div>
      <span data-testid="review-card-email">{ email }</span>
      <span data-testid="review-card-rating">{ rating }</span>
      <span data-testid="review-card-evaluation">{ text }</span>
    </div>
  );
}

export default ProductReview;
