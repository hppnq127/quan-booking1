/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

import {Link} from 'react-router-dom'


import * as auth from '../../../../app/modules/auth/redux/AuthRedux'
import {useDispatch} from 'react-redux'
import {toAbsoluteUrl} from '../../../helpers'

const HeaderUserMenu: FC = () => {
 

  const dispatch = useDispatch()
  const logout = () => {
    dispatch(auth.actions.logout())
  }

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
          </div>

          <div className='d-flex flex-column'>
            
            <a href='#' className='fw-bold fs-5 text-dark pb-2'>
              {/* {user.email} */} superadmin@admin.com
            </a>
            <div className='menu-item '>
              <a onClick={logout} className='btn text-white fw-bold' style={{backgroundColor:'#03AC84'}}>
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='separator my-2 w-80 mx-auto' style={{background:'#CACACA'}}></div>
      <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link '>
          <img alt='history' src='/media/icons/duotune/abstract/history.svg' className='pe-3'></img> Lịch sử đăng nhập
        </Link>
      </div>
      <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link '>
        <img alt='history' src='/media/icons/duotune/abstract/setting.svg' className='pe-3'></img> Cài đặt khác
        </Link>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
