import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import text from '../../assets/movies/text1.png'
import hero from '../../assets/movies/John-Wick-3.jpg'
import TiltleCards from '../../components/TitleCards/TiltleCards'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero" id="home">
        <img src={hero} alt="" className='banner-img'/>
        <div className="hero-caption">
          <img src={text} alt="" className='caption-img' />
          <p>در فیلم جان ویک 3 : بعد از این که جان ویک ماموریتش را به پایان می رساند برای سرش جایزه سنگی میگذارند . همین امر سبب می شود جانش در خطر باشد ...</p>
          <div className="hero-btns">
            <button className='btn'>پخش</button>
            <button className='btn dark-btn'>اطلاعات بیشتر</button>
          </div>
          <TiltleCards className='title-cards1' category={'popular'}/>
        </div>
      </div>

      <div className="more-cards">
        {/* برای هر بخش یک id مشخص تعریف کردیم */}
        <div id="top_rated">
          <TiltleCards key="action-top_rated" title={"پرفروش ها"} category={'top_rated'}/>
        </div>
        <div id="fantasy">
          <TiltleCards key="comedy-popular" title={"ویژه ها"} category={'fantasy'}/>
        </div>
        <div id="now_playing">
          <TiltleCards title={"فیلم ها با بیشترین دانلود"} category={'now_playing'}/>
        </div>
        <div id="recommended">
          <TiltleCards title={"پیشنهادی"} category={["action", "comedy", "adventure"]} />
        </div>
        <div id="action">
          <TiltleCards title=" اکشن" category="action" />
        </div>
        <div id="comedy">
          <TiltleCards title=" کمدی" category="comedy" />
        </div>
        <div id="horror">
          <TiltleCards title=" ترسناک" category="horror" />
        </div>
        <div id="sci-fi">
          <TiltleCards title=" علمی-تخیلی" category="sci-fi" />
        </div>
        <div id="crime">
          <TiltleCards title="جنایی" category="crime" />
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export{Home} 