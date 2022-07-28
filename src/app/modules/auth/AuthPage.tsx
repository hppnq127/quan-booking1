/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'


const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div style={{backgroundColor: '#F9F9F9'}} className='w-100 h-100 overflow-hidden'>
      <div className='row  justify-content-evenly h-100'>
        <div className='col-login-5 '>
          <div  className=' px-5 d-flex flex-row justify-content-center'>
            <div className='d-flex flex-column justify-content-center pb-20'  style={{width: '480px'}}>
              <div className=' d-flex flex-column w-100'>
                <div className='pt-13  pb-10 w-100 '>
                  <a href='#' className=''>
                    <img
                      alt='Logo'
                      src={toAbsoluteUrl('/media/logos/logo-booking.png')}
                      style={{height: '39px', width: '129px'}}
                    />
                  </a>
                </div>
                <h1
                  className=' w-100 text-left pt-10'
                  style={{
                    fontSize: '44px',
                    paddingBottom: '26px',
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: '-3px',
                  }}
                >
                  Tăng Doanh Thu và Hiệu Quả Truyền Thông
                </h1>
                <p
                  className='text-left fs-4 w-100
          '
                  style={{paddingBottom: '54px'}}
                >
                  Trở thành đối tác của BOOKING STUDIO khiến việc kinh doanh của bạn dễ dàng hơn bao
                  giờ hết. Hãy cùng nhau bắt đầu nhé!
                </p>
              </div>
              <div className='mx-auto'>
                <img
                  alt='Banner'
                  src={toAbsoluteUrl('/media/background/strategy.png')}
                  style={{height: '250px', width: '361px'}}
                ></img>
              </div>
            </div>
          </div>
        </div>
        <div className='col-login-5 py-20 '>
          <div className='d-flex flex-center  h-100 w-100 ' style={{top:'10px'}} >
            <div className='d-flex flex-center h-100 w-100 ' >
              <div className='bg-white shadow   loginFullScreen '>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
