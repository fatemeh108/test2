import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TitleCards.css";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardsRef = useRef();
  const navigate = useNavigate();

  const API_KEY = 'ec7d19131f2b191eec780e0896ac34ad';

  const genreMap = {
    'action': 28,
    'adventure': 12,
    'animation': 16,
    'comedy': 35,
    'crime': 80,
    'documentary': 99,
    'drama': 18,
    'family': 10751,
    'fantasy': 14,
    'history': 36,
    'horror': 27,
    'music': 10402,
    'mystery': 9648,
    'romance': 10749,
    'sci-fi': 878,
    'thriller': 53,
    'war': 10752,
    'western': 37
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        let url;
        
        if (Array.isArray(category)) {
          const genreIds = category
            .map(genre => genreMap[genre])
            .filter(id => id !== undefined)
            .join(',');
          
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}&language=fa-US&page=1&sort_by=popularity.desc`;
        } 
        else if (genreMap[category]) {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreMap[category]}&language=fa-US&page=1&sort_by=popularity.desc`;
        } 
        else {
          url = `https://api.themoviedb.org/3/movie/${category || 'now_playing'}?api_key=${API_KEY}&language=fa-US&page=1`;
        }
        
        console.log('Fetching URL:', url);
        
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`خطا: ${response.status}`);
        }

        const data = await response.json();
        setApiData(data.results || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('خطا در دریافت داده:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const handleMovieClick = (movieId) => {
    console.log('🎬 کلیک روی فیلم با ID:', movieId);
    navigate(`/player/${movieId}`);
  };

  if (loading) return (
    <div className="flex justify-center items-center py-10 text-white text-lg">
      در حال بارگذاری...
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center py-10 text-red-500 text-lg">
      خطا: {error}
    </div>
  );
  
  if (apiData.length === 0) return (
    <div className="flex justify-center items-center py-10 text-white text-lg">
      فیلمی یافت نشد
    </div>
  );

  return (
    <div className="title-cards">
      <h2 className="text-2xl sm:text-3xl px-2 sm:px-4 py-2 sm:py-3 mb-2 sm:mb-4">
        {title || 'محبوب‌ترین فیلم‌ها'}
      </h2>
      
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <div 
            className="card"
            key={card.id}
            onClick={() => handleMovieClick(card.id)}
          >
            <img
              src={
                card.poster_path
                  ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                  : '/no-image.jpg'
              }
              alt={card.title || card.original_title}
              className="w-full h-[200px] sm:h-[240px] md:h-[270px] object-cover block"
              onError={(e) => {
                e.target.src = '/no-image.jpg';
              }}
            />
            <p className="px-3 py-2 text-sm font-medium text-center text-inherit truncate">
              {card.title || card.original_title}
            </p>
            <span className="block px-3 pb-3 text-xs sm:text-sm text-yellow-400 text-center">
              ⭐ {card.vote_average?.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;