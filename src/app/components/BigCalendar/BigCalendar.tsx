import clsx from 'clsx'
import moment from 'moment'
import {useState, useEffect, useRef} from 'react'
import './BigCalendar.scss'
import '../BigCalendar/DayItem/DayItem.scss'
import {
  CalendarRenderDay,
  CalendarRenderMonth,
  dates,
  handleStatus,
  listPlace,
} from './CalendarRender'
import dayStyles, {curr3Year, currMonthName, currYear, nextYear, prevYear} from './Styles/Styles'
import {DetailCalendar} from './DetailCalendar/DetailCalendar'
import axios, {AxiosResponse} from 'axios'
import {useLocation} from 'react-router-dom'
import { URL_BOOKING_STUDIO } from '../../../setup/URL'

type BigCalendarProps = {
  CreationTime: string
}
export interface DETAIL {
  AbsentPriceByDate: number | null
  AbsentPriceByHour: number | null
  CancelPriceByDate: number | null
  CancelPriceByHour: number | null
  Date: string | null
  DepositByDate: number | null
  DepositByHour: number | null
  FreeCancelByDate: string | null
  FreeCancelByHour: string | null
  Open: true | null
  PaymentByDate: true | null
  PaymentByHour: true | null
  PriceByDate: number | null
  PriceByHour: number | null
  RoomId: number | null
  createdAt: string | null
  id: number | null
  updatedAt: string | null
}
export const BigCalendar = (props: BigCalendarProps) => {
  const location = useLocation()
  const userId: any = location.state
  const [id] = useState<number>(userId.Id)
  const [calendar, setCalendar] = useState<Array<any>>([])
  const [month, setMonth] = useState<Array<any>>([])
  const [value, setValue] = useState(moment())
  const [open, setOpen] = useState({
    dateMonth: false,
    service: false,
  })
  const [eventCalendar, setEventCalendar] = useState<DETAIL[]>([])
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [place, setPlace] = useState('Chọn dịch vụ:')
  const [warning, setWarning] = useState(false)
  //////////////////////////////////////////////////////////
  useEffect(() => {
    const getEvent = () => {
      setLoading(false)
      let promise = axios({
        url: `${URL_BOOKING_STUDIO}schedule?roomId=${id}&monthAndYear=${value.format(
          'M'
        )}-${value.format('YYYY')}`,
        method: 'GET',
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Thanh cong')
        setEventCalendar(result.data.data)

        setLoading(true)
      })
      promise.catch((err) => {
        console.log('That bai')
        setWarning(true)
        setTimeout(() => {
          setWarning(false)
          setValue(moment(new Date()))
        }, 2500)
        console.log(err.response.data)
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getEvent()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.format('M YYYY')])
  /////////////////////////////////////////////////////
  const handlePickPlace = () => {
    return (
      <div>
        <button
          onClick={() => setOpen({...open, service: !open.service})}
          className='pick-place-button'
        >
          <span className='text-place'>{place}</span>
          <img alt='' src='/media/icons/duotune/abstract/arrow-down.png' />
        </button>
        <div className={clsx(open.service ? 'pick-place-list' : 'd-none')}>
          {listPlace.map((place, index) => (
            <div
              key={index}
              className='text-place-list py-2'
              onClick={() => {
                setPlace(place)
                setOpen({...open, service: false})
              }}
            >
              {place}
            </div>
          ))}
        </div>
      </div>
    )
  }
  useEffect(() => {
    setMonth(CalendarRenderMonth(value))
    setCalendar(CalendarRenderDay(value))
  }, [value])
  useEffect(() => {
    let handler = (event: any) => {
      if (!ref.current?.contains(event.target)) {
        setOpen({...open, dateMonth: false})
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [open])

  return (
    <div className=''>
      <div className='d-flex flex-row justify-content-between' style={{width: '840px'}}>
        {/* Pick Month Year */}
        <div>
          <button onClick={() => setOpen({...open, dateMonth: true})} className='year-month-button'>
            <img
              alt=''
              src='/media/icons/duotune/abstract/calendar.png'
              className='me-4 ms-3 text-dark'
            />
            <span className='trans'>
              Tháng {currMonthName(value)}/{currYear(value)}
            </span>
            <img alt='' src='/media/icons/duotune/abstract/arrow-down.png' className='ms-4' />
          </button>

          <div className={clsx(open.dateMonth ? 'header-calendar' : 'd-none')} ref={ref}>
            <div className='year-picker'>
              <div className='pre-year-button' onClick={() => setValue(prevYear(value))}>
                <img alt='' src='/media/icons/duotune/abstract/arrow-up.png' />
              </div>
              {curr3Year(value)}
              <div className='next-year-button' onClick={() => setValue(nextYear(value))}>
                <img alt='' src='/media/icons/duotune/abstract/arrow-down.png' />
              </div>
            </div>
            <div>
              {month.map((threeMonth, index) => (
                <div className='d-flex flex-row ms-5' key={index}>
                  {threeMonth.map((eachMonth: any) => (
                    <button
                      key={index}
                      className={clsx(
                        eachMonth.isSame(value, 'month') ? 'this-month-button' : 'month-button'
                      )}
                      onClick={() => setValue(eachMonth)}
                    >
                      {' '}
                      Tháng {eachMonth.format('MM').toString()}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div></div>
          </div>
        </div>

        {/*Start Pick Place */}
        {handlePickPlace()}
      </div>
      <div className='my-12'></div>
      <div className='month-now d-flex'>
  
        THÁNG {currMonthName(value)}/{currYear(value)}  {warning ? <div className='text-danger px-4'>Không có dữ liệu! Vui lòng chọn lại</div> : <></>} 
      </div>
      <div className='body-calendar'>
        <div className='calentar-table'>
          <div className='d-flex justify-content-between' style={{width: '840px'}}>
            {dates.map((date, index) => (
              <div key={index} className='date-in-week'>
                {date}
              </div>
            ))}
          </div>
          {calendar.map((week, index) => (
            <div key={index} className={clsx('week-container', index === 0 && 'first-week')}>
              {week.map((day: any, index: number) => (
                <div
                  className={clsx('day', dayStyles(day, value))}
                  onClick={() => setValue(day)}
                  key={index}
                >
                  <span className={clsx('day-number',day.format('D M YYYY') === moment((new Date())).format('D M YYYY') && 'today-num')}>{day.format('D').toString()}</span>
                  {day.isSame(value, 'month') ? (
                    loading ? (
                      handleStatus(index, day, value, eventCalendar[parseInt(day.format('D')) - 1])
                    ) : (
                      <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                        <div className='spinner-grow text-success' role='status'>
                          <span className='sr-only'>Loading...</span>
                        </div>
                      </div>
                    )
                  ) : (
                    <div></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className='detail-calendar'>
         
          <DetailCalendar detail={eventCalendar[parseInt(value.format('D')) - 1]} />
        </div>
      </div>
    </div>
  )
}
