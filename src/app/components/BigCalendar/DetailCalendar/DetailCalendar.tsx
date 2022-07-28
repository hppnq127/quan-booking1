import React from 'react'
import {FormItem} from '../../FormItem/FormItem'
import {DETAIL} from '../BigCalendar'

type DetailCalendarProps = {
  detail?: DETAIL
}
export const DetailCalendar = (props: DetailCalendarProps) => {
  const {detail} = props
  return (
    <>
      <div className='price-and-term'> GIÁ {'&'} CHÍNH SÁCH THEO GIỜ </div>
      <FormItem lableName='Giá áp dụng (đ/giờ)' value={detail?.PriceByHour} />
      <FormItem lableName='Đặt cọc (% đơn đặt)' value={detail?.DepositByHour} />
      <FormItem
        lableName='HÌnh thức thanh toán'
        value={detail?.PaymentByHour ? 'Chuyển khoản' : 'Tiền mặt'}
      />
      <FormItem lableName='Hủy đơn miễn phí' value={detail?.FreeCancelByHour} />
      <FormItem lableName='Phí hủy đơn' value={detail?.CancelPriceByHour} />
      <FormItem lableName='Phí vắng mặt' value={detail?.AbsentPriceByHour} />
      <div className='price-and-term'> GIÁ {'&'} CHÍNH SÁCH THEO NGÀY</div>
      <FormItem lableName='Giá áp dụng (đ/ngày)' value={detail?.PriceByDate} />
      <FormItem lableName='Đặt cọc' value={detail?.DepositByDate} />
      <FormItem
        lableName='Hình thức thanh toán'
        value={detail?.PaymentByDate ? 'Chuyển khoản' : 'Tiền mặt'}
      />
      <FormItem lableName='Hủy đơn miễn phí' value={detail?.FreeCancelByDate} />
      <FormItem lableName='Phí hủy đơn' value={detail?.CancelPriceByDate} />
      <FormItem lableName='Phí vắng mặt' value={detail?.AbsentPriceByDate} />
    </>
  )
}
