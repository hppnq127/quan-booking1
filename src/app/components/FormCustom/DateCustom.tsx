import {useEffect, useRef, useState} from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import './DateCustom.scss'
import Calendar from 'react-calendar'
import clsx from 'clsx'
import '../../components/TestCalendar/CustomReactCalendar.css'
import {convertDate} from './RangeDateCustom'
type DateCustomProps = {
  name: string
  onChange?: any
}
export const DateCustom = (props: DateCustomProps) => {
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
      <label className='account-label'>{name}</label>
      <div className='account-form'>
        <span className='input-group-text border-0 bg-white' id='search-addon'>
          <i className='fa-solid fa-calendar-days fs-2'> </i>
        </span>

        <div className='d-flex flex-column justify-content-center '>
          <button className='choose-day-custom' onClick={() => setCalendar(!calendar)}>
            {date ? (
              <>
                <span className='bold'>{convertDate(date).slice(0, 10)}</span>
              </>
            ) : (
              <>
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
              selectRange={false}
              showDoubleView={false}
              showNavigation={true}
              className='mt-5 w-350px'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
