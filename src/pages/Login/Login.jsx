import './Login.css'
import logo from '../../assets/movies/logo.jpg' 
import { useState } from 'react'

const Login = () => {
  const [SignState, setSignState] = useState("ورود")

  return (
    <div className="Login">
      <img src={logo} className='login-logo' alt="Logo" />
      <div className="login-form">
        <h1>{SignState}</h1>
        <form className='form'>
          <div className={`registerBox ${SignState === 'ثبت نام در سایت' ? 'open' : ''}`}>
            <div className="inputbox">
              <input type="text" placeholder='نام' />
            </div>
          </div>

          <div className="inputbox">
            <input type="email" placeholder='ایمیل' />
          </div>
          
          <div className="inputbox">
            <input type="password" placeholder='رمز خود را وارد کنید' />
          </div>

          <button type="button">{SignState}</button>
          
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">من را به خاطر داشته باش</label>
            </div>
            <p>به کمک نیاز داری؟</p>
          </div>
        </form>

        <div className="form-switch">
          {SignState === 'ورود' ? (
            <p>
              تازه اومدی؟
              <span className="switch-link" onClick={() => setSignState('ثبت نام در سایت')}>
                همین الان ثبت نام کن
              </span>
            </p>
          ) : (
            <p>
              حساب دارم 
              <span className="switch-link" onClick={() => setSignState('ورود')}>
                همین الان وارد شو
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login