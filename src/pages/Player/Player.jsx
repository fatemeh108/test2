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

  // وضعیت‌های بخش نظرات
  const [comments, setComments] = useState([
    { id: 1, email: 'user1@example.com', text: 'فوق‌العاده بود! کارگردانی و بازیگری حرف نداشت.', date: '۱۴۰۵/۰۴/۱۵' },
    { id: 2, email: 'cinema.fan@example.com', text: 'جلوه‌های بصری خوبی داشت ولی فیلمنامه‌اش می‌تونست قوی‌تر باشه.', date: '۱۴۰۵/۰۴/۱۸' }
  ]);
  const [newEmail, setNewEmail] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newEmail.trim() || !newCommentText.trim()) return;

    const newComment = {
      id: Date.now(),
      email: newEmail,
      text: newCommentText,
      date: new Date().toLocaleDateString('fa-IR')
    };

    setComments([newComment, ...comments]);
    setNewEmail('');
    setNewCommentText('');
  };

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
      <div className="fixed inset-0 bg-[#0a0a0f] flex flex-col justify-center items-center text-white gap-4">
        <div className="w-12 h-12 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
        <p className="text-lg">در حال بارگذاری...</p>
      </div>
    );
  }

  if (error || !movieData) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] flex flex-col justify-center items-center text-white gap-4 p-4 text-center">
        <p className="text-xl text-red-500">❌ {error || 'فیلم یافت نشد'}</p>
        <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all" onClick={() => navigate('/')}>بازگشت به خانه</button>
      </div>
    );
  }

  return (
    <div className="player-container text-white font-sans" dir="rtl">
      <button className="close-btn" onClick={() => navigate(-1)}>✕</button>

      <div className="player-wrapper">
        {/* بخش ویدیو / تریلر */}
        <div className="video-container">
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              title={`تریلر فیلم ${title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="no-trailer">
              <div className="no-trailer-content">
                <span className="no-trailer-icon">🎬</span>
                <h3>تریلر برای این فیلم موجود نیست</h3>
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

        {/* بخش جزئیات فیلم */}
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
              <p className="text-purple-500 italic text-[15px] mb-1">"{tagline}"</p>
            )}

            <div className="movie-meta">
              <span>📅 {year}</span>
              <span>🎬 {genreNames}</span>
              <span>⏱️ {runtimeText}</span>
              <span className="text-yellow-400 font-bold">⭐ {rating}</span>
              <span className="text-white/40">({vote_count} رأی)</span>
            </div>

            {/* خلاصه داستان اولیه */}
            <p className="text-white/70 text-sm leading-relaxed max-w-[600px] text-justify md:text-right">
              {overview || 'خلاصه‌ای برای این فیلم موجود نیست'}
            </p>

            {/* دکمه‌های اکشن */}
            <div className="movie-actions">
              <a 
                href={trailerUrl || `https://www.youtube.com/results?search_query=${title}+trailer`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="watch-btn text-base font-semibold"
              >
                ▶ تماشا
              </a>
              
              <button 
                className={`info-btn text-base font-semibold ${showMoreInfo ? 'active' : ''}`}
                onClick={() => setShowMoreInfo(!showMoreInfo)}
              >
                {showMoreInfo ? '📕 بستن داستان' : '📖 داستان کامل'}
              </button>
            </div>

            {/* بخش اطلاعات بیشتر (داستان کامل + عوامل + بازیگران) */}
            {showMoreInfo && (
              <div className="mt-6 pt-6 border-t border-purple-500/20 flex flex-col gap-6 w-full max-w-full">
                {/* داستان کامل */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold text-purple-400">📖 داستان فیلم</h4>
                  <p className="text-white/70 text-sm leading-relaxed text-justify">{overview || 'خلاصه‌ای برای این فیلم موجود نیست'}</p>
                </div>

                {/* کارگردان و نویسنده */}
                <div className="flex flex-col gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  {director && (
                    <div className="flex gap-2 text-sm">
                      <span className="text-white/50 min-w-[90px]">🎯 کارگردان:</span>
                      <span className="text-white font-medium">{director.name}</span>
                    </div>
                  )}
                  {writer && (
                    <div className="flex gap-2 text-sm">
                      <span className="text-white/50 min-w-[90px]">✍️ نویسنده:</span>
                      <span className="text-white font-medium">{writer.name}</span>
                    </div>
                  )}
                </div>
                

                {/* بازیگران اصلی همراه با اسکرول اصلاح شده */}
                {cast.length > 0 && (
                  <div className="flex flex-col gap-3 w-full max-w-full overflow-hidden">
                    <h4 className="text-lg font-bold text-purple-400">🎭 بازیگران اصلی</h4>
                    <div className="cast-list-horizontal w-full">
                      {cast.map(actor => (
                        <div key={actor.id} className="cast-item-horizontal">
                          <img 
                            src={actor.profile_path ? `${IMAGE_URL}${actor.profile_path}` : '/no-image.jpg'} 
                            alt={actor.name}
                            onError={(e) => { e.target.src = '/no-image.jpg'; }}
                          />
                          <div className="flex flex-col gap-1 mt-2 text-center">
                            <span className="text-xs font-semibold text-white block truncate max-w-[120px]" title={actor.name}>
                              {actor.name}
                            </span>
                            <span className="text-[10px] text-white/50 block truncate max-w-[120px]" title={actor.character}>
                              {actor.character}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* بخش نظرسنجی و نظرات کاربران */}
            <div className="comments-section mt-10 pt-8 border-t border-purple-500/20 w-full">
              <h3 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                💬 نظرات کاربران راجع به فیلم
              </h3>

              {/* فرم ثبت نظر */}
              <form onSubmit={handleCommentSubmit} className="comment-form flex flex-col gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 mb-8">
                <h4 className="text-sm font-semibold text-white/80">دیدگاه خود را به اشتراک بگذارید:</h4>
                
                <div className=" form flex flex-col md:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="ایمیل شما (مثال: name@example.com)" 
                    className="comment-input flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                    dir="ltr"
                  />
                </div>

                <textarea 
                  placeholder="نظر شما درباره این فیلم..." 
                  rows="4"
                  className="comment-input w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  required
                ></textarea>

                <button 
                  type="submit" 
                  className="submit-comment-btn self-start px-6 py-3 text-white font-medium rounded-xl transition-all shadow-lg shadow-purple-600/20"
                >
                  ثبت نظر
                </button>
              </form>

              {/* لیست نظرات */}
              <div className="comments-list flex flex-col gap-4">
                {comments.length === 0 ? (
                  <p className="text-white/40 text-sm italic">هنوز نظری ثبت نشده است. اولین نظر را شما بنویسید!</p>
                ) : (
                  comments.map(comment => (
                    <div key={comment.id} className="comment-card bg-white/[0.02] p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-purple-400 font-mono" dir="ltr">{comment.email}</span>
                        <span className="text-white/40">{comment.date}</span>
                      </div>
                      <p className="text-white/85 text-sm leading-relaxed text-justify md:text-right">
                        {comment.text}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;