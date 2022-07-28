import clsx from 'clsx'
import React, {FC} from 'react'
import {toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu} from '../../../partials'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Topbar: FC = () => {
  return (
    <div className='d-flex align-items-stretch flex-shrink-0 header_topbar'>
      {/* NOTIFICATIONS */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        style={{paddingRight: '30px'}}
      >
        {/* begin::Menu- wrapper */}
        <div
          className={clsx(
            'btn btn-icon btn-custom',
            toolbarButtonHeightClass,
            'header_topbar_nofi'
          )}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <img
            src='/media/icons/duotune/general/nofitication.png'
            alt='nofi'
            // style={{height: '25px'}}
          />
        </div>
        <HeaderNotificationsMenu />
        {/* end::Menu wrapper */}
      </div>

      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <img
            src={toAbsoluteUrl('/media/avatars/userAdmin.png')}
            alt='Admin'
            className='header_topbar_account'
          />
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}
    </div>
  )
}

export {Topbar}
