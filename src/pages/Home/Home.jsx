import'./Home.css'
import Navbar from '../../components/Navbar/Navbar'
import text from '../../assets/movies/text1.png'
import hero from '../../assets/movies/John-Wick-3.jpg'
import TiltleCards from '../../components/TitleCards/TiltleCards'
import Footer from '../../components/Footer/Footer'
const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={hero} alt="" className='banner-img'/>
        <div className="hero-caption">
          <img src={text} alt=""className='caption-img' />
          <p>در فیلم جان ویک 3 : بعد از این که جان ویک ماموریتش را به پایان می رساند برای سرش جایزه سنگی میگذارند . همین امر سبب می شود جانش در خطر باشد ...</p>
          <div className="hero-btns">
            <button  className='btn'><img src="data:image/svg+xml,%3csvg width='24' height='24' fill='%23810dc3' viewBox='0 0 24 24' transform='' xmlns='http://www.w3.org/2000/svg'%3e%3c!--Boxicons v3.0.8 https://boxicons.com %7c License https://docs.boxicons.com/free--%3e%3cpath d='M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8'%3e%3c/path%3e%3cpath d='m9 17 8-5-8-5z'%3e%3c/path%3e%3c/svg%3e" alt="" />پخش</button>
            <button className='btn dark-btn'><img src="data:image/svg+xml,%3csvg width='24' height='24' fill='%23810dc3' viewBox='0 0 24 24' transform='' xmlns='http://www.w3.org/2000/svg'%3e%3c!--Boxicons v3.0.8 https://boxicons.com %7c License https://docs.boxicons.com/free--%3e%3cpath d='M11 11h2v6h-2zm0-4h2v2h-2z'%3e%3c/path%3e%3cpath d='M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10m0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8'%3e%3c/path%3e%3c/svg%3e" alt="" />اطلاعات بیشتر</button>
          </div>
          <TiltleCards className='title-cards1' category={'popular'}/>
        </div>
      </div>
      <div className="more-cards">
        <TiltleCards key="action-top_rated" title={"پرفروش ها"}category={'top_rated'}/>
        <TiltleCards key="comedy-popular" title={"ویژه ها"}category={'fantasy'}/>
        <TiltleCards title={"فیلم ها با بیشترین دانلود"}category={'now_playing'}/>
        <TiltleCards title={"پیشنهادی"} category={["action", "comedy", "adventure"]} />
        <TiltleCards title=" اکشن" category="action" />
        <TiltleCards title=" کمدی" category="comedy" />
        <TiltleCards title=" ترسناک" category="horror" />
        <TiltleCards title=" علمی-تخیلی" category="sci-fi" />
        <TiltleCards title="فانتزی" category="fantasy" />
        <TiltleCards title="جنایی" category="crime" />
      </div>
      <Footer/>
    </div>
  )
}

export default Home
