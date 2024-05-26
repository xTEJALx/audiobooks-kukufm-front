import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';

function BookDetail({ books, updateBook }) {
  const { id } = useParams();
  const book = books.find(book => book._id === id);

  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);

  if (!book) {
    return <p className="text-red-500">Book not found</p>;
  }

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('https://audiobooks-kukufm-server.onrender.com/audiobooks/review', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: book.name, review: newReview })
    });

    if (response.ok) {
      book.reviews.push(newReview);
      updateBook(book);
      setNewReview('');
    } else {
      console.error('Error adding review');
    }
  };

  const handleRatingSubmit = async (event) => {
    event.preventDefault();

    if (newRating < 1 || newRating > 5) {
      alert("Please enter a valid rating between 1 and 5.");
      return;
    }

    const response = await fetch('https://audiobooks-kukufm-server.onrender.com/audiobooks/rate', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: book.name, rating: newRating })
    });

    if (response.ok) {
      book.ratings.push(newRating);
      updateBook(book);
      setNewRating(0);
    } else {
      console.error('Error adding rating');
    }
  };

  const calculateAverageRating = (ratings) => {
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return (total / ratings.length).toFixed(2);
  };

  return (
    <div className="book-detail max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
      <img className="w-full h-64 object-cover rounded-md mb-4" src={book.cover_image_link} alt={`${book.name} cover`} />
      <h2 className="text-3xl font-bold mb-2">{book.name}</h2>
      <h3 className="text-xl font-medium text-gray-700 mb-4">by {book.author}</h3>
      <p className="text-gray-600 mb-4"><strong>Genre:</strong> {book.genre}</p>
      <div className="mb-4 w-full">
        <strong>Reviews:</strong>
        <ul className="list-disc pl-5 text-left w-full mx-auto">
          {book.reviews.map((review, index) => (
            <li key={index} className="text-gray-700 mb-1">{review}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4 w-full text-left">
        <p className="text-yellow-500"><span className='text-black'><strong>Rating:</strong></span> {calculateAverageRating(book.ratings)}</p>
      </div>
      <form onSubmit={handleReviewSubmit} className="mb-6 w-full">
        <h4 className="text-lg font-medium mb-2">Add a Review:</h4>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          required
        />
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          type="submit"
        >
          Submit Review
        </button>
      </form>
      <form onSubmit={handleRatingSubmit} className="w-full text-left">
        <h4 className="text-lg font-medium mb-2">Add a Rating:</h4>
        <StarRating rating={newRating} onRatingChange={setNewRating} />
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          type="submit"
        >
          Submit Rating
        </button>
      </form>
    </div>
  );
}

export default BookDetail;
