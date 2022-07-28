import React from 'react'
import clsx from 'clsx'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}
const AsideMenuItemWithSub: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config
  return (
    <div
      className={clsx(
        'menu-item ps-3',
        {'here show ': isActive},
        'menu-accordion',
        'p-2',
        'aside_item_drop'
      )}
      data-kt-menu-trigger='click'
      style={{paddingLeft: '10px'}}
    >
      <span className={clsx('menu-link', 'menu-accordion', 'py-3')}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2 aside_item_drop-title' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className={clsx('menu-title fs-3 aside_item_drop-title')} style={{fontWeight: '600'}}>
          {title}
        </span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion ', {'menu-active-bg': isActive})}>
        {children}
      </div>
    </div>
  )
}
export {AsideMenuItemWithSub}
