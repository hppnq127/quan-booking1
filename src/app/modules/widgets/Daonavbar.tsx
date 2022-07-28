import React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import { useLayout } from '../../../_metronic/layout/core'
import { checkIsActive, KTSVG } from '../../../_metronic/helpers'


type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}

const DaoMenuItem: React.FC<Props> = ({
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

  return (
    <div className='menu-item py-2' style={{paddingLeft:'10px'}} >
      <Link className={clsx('menu-link without-sub', {active: isActive})} to={to}>
        
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
          
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title fs-3 fw-bold'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {DaoMenuItem}
