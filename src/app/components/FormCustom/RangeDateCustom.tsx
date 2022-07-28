import {useEffect, useRef, useState} from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import './FormCustom.scss'
import Calendar from 'react-calendar'
import clsx from 'clsx'
import '../../components/TestCalendar/CustomReactCalendar.css'
import Moment from 'moment'
type RangeDateCustomProps = {
  name: string
  onChange?: any
}
export const convertDate = (date: Date) => {
  const stringMoment = date.toISOString()
  const thisMoment = new Date(`${stringMoment.slice(0, 23)}+00:00`)
  const modify = Moment(thisMoment.toISOString()).format('DD/MM/YYYY  HH:mm')
  return modify
}
export const convertDateSendToDB = (date: Date) => {
  const stringMoment = date.toISOString()
  const thisMoment = new Date(`${stringMoment.slice(0, 23)}-07:00`)
  const modify = `${thisMoment.toISOString()}`
  return modify
}
export const RangeDateCustom = (props: RangeDateCustomProps) => {
  const {name, onChange} = props
  const [date, setDate] = useState<any>(new Date())
  const ref = useRef<HTMLDivElement>(null)
  const [calendar, setCalendar] = useState<any>(false)
  useEffect(() => {
    let handler = (event: any) => {
      if (!ref.current?.contains(event.target)) {
        setCalendar(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })
  return (
    <div className='w-100 h-100'>
      <label className='account-label text-input-title'>{name}</label>
      <div className='account-form'>
        <span className='input-group-text border-0 bg-white text-input' id='search-addon'>
          <i className='fa-solid fa-calendar-days fs-2 '> </i>
        </span>

        <div className='d-flex flex-column justify-content-center w-100'>
          <button
            className='choose-day-custom text-input rounded'
            onClick={() => setCalendar(!calendar)}
          >
            {date.length > 0 ? (
              <>
                <span className='bold'>{convertDate(date[0]).slice(0, 10)}</span>
                <span className='bold px-3'>-</span>
                <span className='bold'>{convertDate(date[1]).slice(0, 10)}</span>
              </>
            ) : (
              <>
                <span className='bold' style={{color: '#B2B2B2'}}>
                  dd/mm/yyyy
                </span>
                <span className='bold px-3'>-</span>
                <span className='bold' style={{color: '#B2B2B2'}}>
                  dd/mm/yyyy
                </span>
              </>
            )}
          </button>
          <div ref={ref} className={clsx(calendar ? 'calendar-container' : 'd-none')}>
            <Calendar
              onChange={(e: any) => {
                setDate(e)
                onChange(e)
              }}
              value={date}
              selectRange={true}
              showDoubleView={true}
              showNavigation={true}
              className='mt-5'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
