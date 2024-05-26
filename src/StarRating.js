import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index) => setHoverRating(index);
  const handleMouseOut = () => setHoverRating(0);
  const handleClick = (index) => onRatingChange(index);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <svg
          key={index}
          className={`w-8 h-8 cursor-pointer ${
            (hoverRating || rating) >= index ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={handleMouseOut}
          onClick={() => handleClick(index)}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927C9.3 2.365 9.979 2.365 10.231 2.927l1.357 2.74 3.025.439c.67.097.937.925.451 1.404l-2.188 2.134.516 3.007c.114.663-.582 1.169-1.17.86L10 12.347l-2.703 1.423c-.589.31-1.284-.197-1.17-.86l.516-3.007-2.188-2.134c-.486-.479-.218-1.307.451-1.404l3.025-.439 1.357-2.74z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
