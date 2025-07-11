import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const stars = [1, 2, 3, 4, 5].map((i) => {
    if (rating >= i) {
      return <FaStar key={i} className="text-warning fs-5" />;
    } else if (rating >= i - 0.5) {
      return <FaStarHalfAlt key={i} className="text-warning fs-5" />;
    } else {
      return <FaRegStar key={i} className="text-warning fs-5  " />;
    }
  });

  return <div className="d-flex gap-1">{stars}</div>;
};

export default StarRating;
