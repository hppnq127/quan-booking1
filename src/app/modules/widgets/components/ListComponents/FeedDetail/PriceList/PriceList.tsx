import React from 'react'
import { BigCalendar } from '../../../../../../components/BigCalendar/BigCalendar'
type PriceListProps={
  CreationTime:string
}
export const PriceList = (props:PriceListProps) => {
  const {CreationTime} =props
  return (
    <>
    <div className=' d-flex align-items-center '>
    <span className='pag-header'> Quản lý bài đăng</span>
    <i className='fa-solid fa-angle-right icon-header px-5'></i>{' '}
    <span className='pag-name'>Lịch và giá</span>
  </div>
    <BigCalendar CreationTime={CreationTime}/>
    </>
  )
}
