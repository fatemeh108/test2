/* eslint-disable react-hooks/set-state-in-effect */
import './Player.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movieData, setMovieData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [writer, setWriter] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'ec7d19131f2b191eec780e0896ac34ad';
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
  const BACKDROP_URL = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    if (!id) {
      setError('شناسه فیلم یافت نشد');
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [movieResponse, videoResponse, creditsResponse] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fa-US`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
        ]);

        if (!movieResponse.ok) {
          throw new Error(`خطا در دریافت فیلم: ${movieResponse.status}`);
        }

        const movieData = await movieResponse.json();
        
        let trailer = null;
        if (videoResponse.ok) {
          const videoData = await videoResponse.json();
          trailer = videoData.results?.find(
            video => video.type === 'Trailer' && video.site === 'YouTube'
          ) || videoData.results?.[0];
        }

        let castData = [];
        let directorData = null;
        let writerData = null;
        if (creditsResponse.ok) {
          const creditsData = await creditsResponse.json();
          castData = creditsData.cast?.slice(0, 10) || [];
          directorData = creditsData.crew?.find(person => person.job === 'Director');
          writerData = creditsData.crew?.find(person => person.job === 'Writer' || person.job === 'Screenplay');
        }

        setMovieData(movieData);
        setTrailerKey(trailer?.key || null);
        setCast(castData);
        setDirector(directorData);
        setWriter(writerData);
        
      } catch (err) {
        console.error('❌ خطا:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  const { 
    title, 
    release_date, 
    genres, 
    overview, 
    poster_path, 
    backdrop_path,
    vote_average,
    vote_count,
    runtime,
    tagline
  } = movieData || {};

  const year = release_date?.split('-')[0] || 'نامشخص';
  const genreNames = genres?.map(g => g.name).join(' • ') || 'نامشخص';
  const rating = vote_average?.toFixed(1) || '0';
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const runtimeText = runtime ? `${hours} ساعت ${minutes} دقیقه` : 'نامشخص';

  const trailerUrl = trailerKey 
    ? `https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&showinfo=0`
    : null;

  if (loading) {
    return (
      <div className="player-loading">
        <div className="loading-spinner"></div>
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (error || !movieData) {
    return (
      <div className="player-error">
        <p>❌ {error || 'فیلم یافت نشد'}</p>
        <button onClick={() => navigate('/')}>بازگشت به خانه</button>
      </div>
    );
  }

  return (
    <div className="player-container">
      <button className="close-btn" onClick={() => navigate(-1)}>✕</button>

      <div className="player-wrapper">
        <div className="video-container">
          {trailerUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={trailerUrl}
              title={`تریلر فیلم ${title}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="no-trailer">
              <div className="no-trailer-content">
                <span className="no-trailer-icon">🎬</span>
                <h3>تریلم برای این فیلم موجود نیست</h3>
                <p>با عرض پوزش، تریلری برای این فیلم در دسترس نمی‌باشد</p>
                {backdrop_path && (
                  <img 
                    src={`${BACKDROP_URL}${backdrop_path}`} 
                    alt={title}
                    className="no-trailer-bg"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        <div className="player-info">
          <div className="movie-poster">
            <img 
              src={poster_path ? `${IMAGE_URL}${poster_path}` : '/no-image.jpg'} 
              alt={title}
              onError={(e) => { e.target.src = '/no-image.jpg'; }}
            />
          </div>
          
          <div className="movie-details">
            <h1>{title}</h1>
            
            {tagline && (
              <p className="movie-tagline">"{tagline}"</p>
            )}

            <div className="movie-meta">
              <span>📅 {year}</span>
              <span>🎬 {genreNames}</span>
              <span>⏱️ {runtimeText}</span>
              <span className="rating-star">⭐ {rating}</span>
              <span className="vote-count">({vote_count} رأی)</span>
            </div>

            {/* خلاصه داستان */}
            <p className="movie-overview">{overview || 'خلاصه‌ای برای این فیلم موجود نیست'}</p>

            <div className="movie-actions">
              <a 
                href={trailerUrl || `https://www.youtube.com/results?search_query=${title}+trailer`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="watch-btn"
              >
                ▶ تماشا
              </a>
              
              <button 
                className={`info-btn ${showMoreInfo ? 'active' : ''}`}
                onClick={() => setShowMoreInfo(!showMoreInfo)}
              >
                {showMoreInfo ? '📕 بستن داستان' : '📖 داستان کامل'}
              </button>
            </div>

            {/* بخش اطلاعات بیشتر (داستان کامل + بازیگران) */}
            {showMoreInfo && (
              <div className="more-info-content">
                {/* داستان کامل (اگر overview کامل‌تر باشد) */}
                <div className="story-section">
                  <h4>📖 داستان فیلم</h4>
                  <p className="full-story">{overview || 'خلاصه‌ای برای این فیلم موجود نیست'}</p>
                </div>

                {/* کارگردان و نویسنده */}
                <div className="crew-section">
                  {director && (
                    <div className="info-row">
                      <span className="info-label">🎯 کارگردان</span>
                      <span className="info-value">{director.name}</span>
                    </div>
                  )}
                  {writer && (
                    <div className="info-row">
                      <span className="info-label">✍️ نویسنده</span>
                      <span className="info-value">{writer.name}</span>
                    </div>
                  )}
                </div>
                

                  {/* بازیگران */}
                {cast.length > 0 && (
                  <div className="cast-section">
                    <h4>🎭 بازیگران اصلی</h4>
                    <div className="cast-list-horizontal">
                      {cast.map(actor => (
                        <div key={actor.id} className="cast-item-horizontal">
                          <img 
                            src={actor.profile_path ? `${IMAGE_URL}${actor.profile_path}` : '/no-image.jpg'} 
                            alt={actor.name}
                            onError={(e) => { e.target.src = '/no-image.jpg'; }}
                          />
                          <div className="cast-info-horizontal">
                            <span className="cast-name">{actor.name}</span>
                            <span className="cast-character">{actor.character}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;