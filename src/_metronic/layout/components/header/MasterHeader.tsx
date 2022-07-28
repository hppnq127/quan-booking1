import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Topbar} from './Topbar'
export const MasterHeader = () => {
  const [dateString, setDateString] = useState('')
  useEffect(() => {
    const date = new Date()
    const month = date.getMonth() + 1 //months from 1-12
    const day = date.getDate()
    const year = date.getFullYear()
    const dateOfWeek = date.getDay()
    const thu = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', ' Thứ năm', 'Thứ sáu', 'Thứ bảy']
    const newDate = thu[dateOfWeek] + ', ngày ' + day + ' tháng ' + month + ' năm ' + year
    setDateString(newDate)
  }, [])
  return (
    <div className={'d-flex w-100 position-fixed flex-row justify-content-between header'}>
      {/* logo */}
      <Link to='/crafted/pages/profile/overview'>
        <div className='d-flex align-items-center header_logo'>
          <img alt='Logo' src={'/media/logos/logo-booking.png'} className='w-100 h-100' />
        </div>
      </Link>
      {/* Date */}
      <div className='d-flex align-items-center header_text'>{dateString}</div>
      {/* nofitication */}
      <div>
        <Topbar />
      </div>
    </div>
  )
}
