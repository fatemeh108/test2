import './Navbar.css'
import logo from '../../assets/movies/logo.jpg'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  // تابع اسکرول نرم به بخش مورد نظر
  const scrollToSection = (id) => {
    setMobileOpen(false); // بستن منوی موبایل پس از انتخاب

    // اگر کاربر در صفحه اصلی نبود، ابتدا به صفحه اصلی منتقل می‌شود
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <div className='Navbar text-lg fixed z-1 flex flex-row justify-between size-nav text-center sm:text-left'>
      <div className="navbar-right no-underline flex flex-row gap-4">
        <img src={logo} alt="" className='logo-icon cursor-pointer' onClick={() => scrollToSection('home')} />

        {/* Desktop links */}
        <ul className="nav-links">
          <li className="cursor-pointer" onClick={() => scrollToSection('home')}>خانه</li>
          <li className="cursor-pointer" onClick={() => scrollToSection('top_rated')}>فیلم ها</li>
          <li className='sh cursor-pointer' onClick={() => scrollToSection('now_playing')}>جدید و محبوب ها</li>
          <li className='list-mn cursor-pointer'>لیست من</li>

          <li className=''>
            <Menu as="div" className="relative inline-block ">
              <MenuButton className=" btn-ganr inline-flex w-full justify-center gap-x-1.5 border-none bg-transparent cursor-pointer">
                ژانر ها
                <ChevronDownIcon aria-hidden="true" className="object-center -mr-1 size-5 text-white-400" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute text-violet-400 right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-white/10 rounded-md bg-violet-200 p-3 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <button onClick={() => scrollToSection('action')} className="no-underline block w-full text-right px-4 py-2 text-sm  hover:bg-violet-200">
                      اکشن
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={() => scrollToSection('recommended')} className="block w-full text-right px-4 py-2 text-sm  hover:bg-violet-200">
                      ماجراجویی
                    </button>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    <button onClick={() => scrollToSection('comedy')} className="block w-full text-right px-4 py-2 text-sm hover:bg-violet-200">
                      کمدی
                    </button>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    <button onClick={() => scrollToSection('recommended')} className="block w-full text-right px-4 py-2 text-sm  hover:bg-violet-200">
                      پیشنهادی
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={() => scrollToSection('horror')} className="block w-full text-right px-4 py-2 text-sm  hover:bg-violet-200">
                      ترسناک
                    </button>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    <button onClick={() => scrollToSection('fantasy')} className="block w-full text-right px-4 py-2 text-sm  hover:bg-violet-200">
                      فانتزی
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={() => scrollToSection('sci-fi')} className="block w-full text-right px-4 py-2 text-sm  hover:bg-violet-200">
                      علمی-تخیلی
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={() => scrollToSection('crime')} className="block w-full text-right px-4 py-2 text-sm  hover:bg-violet-200">
                      جنایی
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </li>
        </ul>
      </div>

      <div className="navbar-left flex gap-2">
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="منو"
        >
          {mobileOpen ? <XMarkIcon className="size-6 " /> : <Bars3Icon className="size-6 " />}
        </button>

        <img src="data:image/svg+xml,%3csvg width='24' height='24' fill='%23810dc3' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.5 19c1.98 0 3.81-.69 5.25-1.83L20 21.42l1.41-1.41-4.25-4.25a8.47 8.47 0 0 0 1.83-5.25c0-4.69-3.81-8.5-8.5-8.5S2 5.81 2 10.5 5.81 19 10.5 19m0-15c3.58 0 6.5 2.92 6.5 6.5S14.08 17 10.5 17 4 14.08 4 10.5 6.92 4 10.5 4'%3e%3c/path%3e%3c/svg%3e" alt="" className='icons '/>
        <img src="data:image/svg+xml,%3csvg width='24' height='24' fill='%23810dc3' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M19 12.59V10c0-3.22-2.18-5.93-5.14-6.74C13.57 2.52 12.85 2 12 2s-1.56.52-1.86 1.26C7.18 4.08 5 6.79 5 10v2.59L3.29 14.3a1 1 0 0 0-.29.71v2c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-2c0-.27-.11-.52-.29-.71zM19 16H5v-.59l1.71-1.71a1 1 0 0 0 .29-.71v-3c0-2.76 2.24-5 5-5s5 2.24 5 5v3c0 .27.11.52.29.71L19 15.41zm-4.18 4H9.18c.41 1.17 1.51 2 2.82 2s2.41-.83 2.82-2'%3e%3c/path%3e%3c/svg%3e" alt="" className='icons'/>

        <div className="navbar-profile gap-2 flex flex-row">
          <img src="data:image/svg+xml,%3csvg width='24' height='24' fill='%23810dc3' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 6c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4m0 6c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2'%3e%3c/path%3e%3cpath d='M12 2C6.49 2 2 6.49 2 12c0 3.26 1.58 6.16 4 7.98V20h.03c1.67 1.25 3.73 2 5.97 2s4.31-.75 5.97-2H18v-.02c2.42-1.83 4-4.72 4-7.98 0-5.51-4.49-10-10-10M8.18 19.02C8.59 17.85 9.69 17 11 17h2c1.31 0 2.42.85 2.82 2.02-1.14.62-2.44.98-3.82.98s-2.69-.35-3.82-.98m9.3-1.21c-.81-1.66-2.51-2.82-4.48-2.82h-2c-1.97 0-3.66 1.16-4.48 2.82A7.96 7.96 0 0 1 4 11.99c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.29-.97 4.36-2.52 5.82'%3e%3c/path%3e%3c/svg%3e" alt="" className='profile' id='profile'/>
          <img src="data:image/svg+xml,%3csvg width='24' height='24' fill='%23810dc3' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M17.35 8H6.65c-.64 0-.99.76-.56 1.24l5.35 6.11c.3.34.83.34 1.13 0l5.35-6.11C18.34 8.76 18 8 17.36 8Z'%3e%3c/path%3e%3c/svg%3e" alt="" className='caret-icon size-6 animate-bounce '/>
          
          <button 
            className='login-btn p-0 m-0 bg-transparent cursor-pointer'
            onClick={() => navigate('/login')}
          >
            ورود
          </button>                
          
          <div className="dropdown hidden">
            <p>خروج</p>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div className={`mobile-panel ${mobileOpen ? 'open' : ''}`}>
        <ul className="mobile-links">
          <li onClick={() => scrollToSection('home')}>خانه</li>
          <li onClick={() => scrollToSection('top_rated')}>فیلم ها</li>
          <li className='sh' onClick={() => scrollToSection('now_playing')}>جدید و محبوب ها</li>
          <li className='list-mn'>لیست من</li>
          <li className=''>
            <Menu as="div" className="relative inline-block w-full">
              <MenuButton className="btn-ganr w-full inline-flex justify-center gap-x-1.5 border-none bg-transparent">
                ژانر ها
                <ChevronDownIcon aria-hidden="true" className="object-center -mr-1 size-5 text-white-400" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-white/10 rounded-md bg-violet-100 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="py-1">
                  <MenuItem><button onClick={() => scrollToSection('action')} className="block w-full text-right px-4 py-2 text-sm text-gray-800">اکشن</button></MenuItem>
                  <MenuItem><button onClick={() => scrollToSection('recommended')} className="block w-full text-right px-4 py-2 text-sm text-gray-800">ماجراجویی</button></MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem><button onClick={() => scrollToSection('comedy')} className="block w-full text-right px-4 py-2 text-sm text-gray-800">کمدی</button></MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem><button onClick={() => scrollToSection('recommended')} className="block w-full text-right px-4 py-2 text-sm text-gray-800">پیشنهادی</button></MenuItem>
                  <MenuItem><button onClick={() => scrollToSection('horror')} className="block w-full text-right px-4 py-2 text-sm text-gray-800">ترسناک</button></MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem><button onClick={() => scrollToSection('fantasy')} className="block w-full text-right px-4 py-2 text-sm text-gray-800">فانتزی</button></MenuItem>
                  <MenuItem><button onClick={() => scrollToSection('sci-fi')} className="block w-full text-right px-4 py-2 text-sm text-gray-800">علمی-تخیلی</button></MenuItem>
                  <MenuItem><button onClick={() => scrollToSection('crime')} className="block w-full text-right px-4 py-2 text-sm text-gray-800">جنایی</button></MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </li>
          <li 
            className="mobile-login cursor-pointer"
            onClick={() => {
              setMobileOpen(false)
              navigate('/login')
            }}
          >
            ورود
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar