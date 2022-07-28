import clsx from 'clsx'
import {statusStyles} from './Styles/Styles'
export const CalendarRenderDay = (value: any) => {
  const startDay = value.clone().startOf('month').startOf('week')
  const endDay = value.clone().endOf('month').endOf('week')
  const day = startDay.clone().subtract(1, 'day')
  const calendar = []
  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    )
  }
  return calendar
}
export const CalendarRenderMonth = (value: any) => {
  const startMonth = value.clone().startOf('year')
  const endMonth = value.clone().endOf('year')
  const month = startMonth.clone().subtract(1, 'month')
  const calendar = []
  while (month.isBefore(endMonth, 'month')) {
    calendar.push(
      Array(3)
        .fill(0)
        .map(() => month.add(1, 'month').clone())
    )
  }
  return calendar
}
export const handleStatus = (status: any, day: any, value: any, eventCalendar: any) => {
  if (eventCalendar !== undefined && eventCalendar.Open) {
    return (
      <>
        <div className='w-100 d-flex justify-content-end '>
          <button className={clsx(statusStyles(day, value))}>Mở</button>
        </div>
        <div className='w-100 d-flex flex-column'>
          <div>
            {eventCalendar.PriceByHour} đ/giờ {eventCalendar.id}
          </div>
          <div>{eventCalendar.PriceByDate} đ/ngày</div>
        </div>
      </>
    )
  } else if (eventCalendar !== undefined && eventCalendar.Open === false) {
    return (
      <>
        <div className='w-100 d-flex justify-content-end'>
          <button className={clsx(statusStyles(day, value, status))}>Đóng</button>
        </div>
      </>
    )
  }
}

export const listPlace = [
  'Chụp chân dung / Profile tại Studio',
  'Ngoại cảnh - Khu vực TP HCM',
  'Chụp kỷ yếu tại TP HCM - Nhóm dưới 10 người',
  'Chụp kỷ yếu tại TP HCM - Nhóm từ 10 người đến 30 người',
  'Chụp kỷ yếu tại TP HCM - Nhóm trên 30 người',
]
export const dates = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
