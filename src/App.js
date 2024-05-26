import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import BookDetail from './BookDetail';

function App() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [minRating, setMinRating] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('https://audiobooks-kukufm-server.onrender.com/audiobooks')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const updateBook = (updatedBook) => {
    setBooks(books.map(book => (book._id === updatedBook._id ? updatedBook : book)));
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleMinRatingChange = (event) => {
    setMinRating(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const filteredBooks = books.filter(book => {
    const averageRating = book.ratings.reduce((acc, rating) => acc + rating, 0) / book.ratings.length;
    return (
      (genre ? book.genre.toLowerCase().includes(genre.toLowerCase()) : true) &&
      (author ? book.author.toLowerCase().includes(author.toLowerCase()) : true) &&
      (minRating ? averageRating >= parseFloat(minRating) : true) &&
      (name ? book.name.toLowerCase().includes(name.toLowerCase()) : true)
    );
  });


  const genres = [...new Set(books.map(book => book.genre))];

  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen">
        <header className="App-header bg-blue-600 text-white p-4">
          <h1 className="text-3xl font-bold">Audiobooks.</h1>
        </header>
        
        <Routes>
          <Route
            path="/"
            element={
            
<div>

<div className="filters p-4 bg-white shadow-md rounded-lg m-4">

<input
            type="text"
            placeholder="Book Name"
            value={name}
            onChange={handleNameChange}
            className="p-2 border border-gray-300 rounded-md"
          />

<input
            type="text"
            placeholder="Author"
            value={author}
            onChange={handleAuthorChange}
            className="p-2 border border-gray-300 rounded-md mr-2"
          />

          <select 
            value={genre} 
            onChange={handleGenreChange} 
            className="p-2 border border-gray-300 rounded-md mr-2"
          >
            <option value="">All Genres</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </select>
          
          <select 
            value={minRating} 
            onChange={handleMinRatingChange} 
            className="p-2 border border-gray-300 rounded-md mr-2"
          >
            <option value="">Min Rating</option>
            {[1, 2, 3, 4, 5].map(rating => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>


          
        </div>

              



              <div className="book-list p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map(book => (
                    <Link to={`/book/${book._id}`} key={book._id} className="book-card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <img className="w-full h-48 object-cover rounded-md mb-4" src={book.cover_image_link} alt={`${book.name} cover`} />
                      <h2 className="text-xl font-bold">{book.name}</h2>
                      <h3 className="text-md text-gray-600">by {book.author}</h3>
                    </Link>
                  ))
                ) : (
                  <p className="text-red-500">No books found</p>
                )}
              </div>


</div>
            }
          />
          <Route
            path="/book/:id"
            element={<BookDetail books={books} updateBook={updateBook} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
