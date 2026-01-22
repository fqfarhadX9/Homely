import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex gap-2">
      {[1,2,3,4,5].map((star) => (
        <FaStar
          key={star}
          size={28}
          className={`cursor-pointer ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
