import React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {checkIsActive, KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}
const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config
  const location = useLocation()
  return (
    <div className='menu-item py-4' style={{paddingLeft: '10px'}}>
      <Link
        className={clsx(
          'menu-link without-sub aside_item',
          {active: isActive},
          location.pathname === to && 'menu-active-custom'
        )}
        to={to}
      >
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className={clsx('menu-title fs-3 aside_item_title')} style={{fontWeight: '600'}}>
          {title}
        </span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
