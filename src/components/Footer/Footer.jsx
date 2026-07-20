import './Footer.css'
import f_icon from '../../assets/movies/icons8-facebook-50 (1).png'
import i_icon from '../../assets/movies/icons8-instagram-50.png'
import t_icon from '../../assets/movies/icons8-twitter-50.png'
import y_icon from '../../assets/movies/icons8-youtube-50.png'

function Footer() {
  return (
    <div className='Footer'>
      <div className="footer-icons">
        <img src={f_icon} alt="" />
        <img src={i_icon} alt="" />
        <img src={t_icon} alt="" />
        <img src={y_icon} alt="" />
      </div>
      <ul>
        <li>راهنمای سایت</li>
        <li>فرصت های شغلی</li>
        <li>حریم خصوصی</li>
        <li>تماس با ما</li>
      </ul>
      <p className='copyright-text'>© تمام حقوق محفوظ است</p>
    </div>
  )
}

export default Footer
