import React from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
export const DaoNavBar = () => {
  const location = useLocation()
  return (
    <div
      className='d-flex flex-row align-items-end justify-content-center '
      style={{
        position: 'absolute',
        top: '13%',
        left: '50%',
        zIndex: '2',
        transform: 'translate(-50%, -50%)',
        // backgroundColor: '#F6F6F6',
      }}
    >
      <div
        className='bg-white  py-10  d-flex flex-row justify-content-center align-items-center  '
        style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)', height: '60px', width: '700px'}}
      >
        <div className='d-flex  h-55px w-100'>
          <ul className='nav nav-stretch   fs-5 fw-bolder flex-nowrap w-100 d-flex justify-content-evenly'>
            <li className='nav-item  w-30'>
              <Link
                className={
                  `text-active-primary    ` +
                  (location.pathname === '/crafted/widgets/dao' && 'alook')
                }
                to='/crafted/widgets/dao'
                style={{color: '#000', margin: 'auto'}}
              >
                <div
                  className='px-20'
                  style={{marginBottom: '34px', transform: `translate(${0}px,${18}px)`}}
                >
                  BÀI VIẾT
                </div>
              </Link>
            </li>
            <li className='nav-item w-40'>
              <Link
                className={
                  ` text-active-primary  ` +
                  (location.pathname === '/crafted/widgets/baocaovipham' && 'alook')
                }
                to='/crafted/widgets/baocaovipham'
                style={{color: '#000', margin: 'auto'}}
              >
                <div
                  className='px-10'
                  style={{marginBottom: '34px', transform: `translate(${0}px,${18}px)`}}
                >
                  BÁO CÁO VI PHẠM
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
