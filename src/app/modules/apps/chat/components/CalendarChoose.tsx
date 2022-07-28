import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useState} from 'react'
export const CalendarChoose = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(startDate)
  return (
    <div className='w-50  d-flex justify-content-start'>
      <label
        className='position-absolute bg-white fs-5 fw-semibold px-1'
        style={{
          transform: `translate(${13}px, ${-11}px)`,
          color: '#616161',
        }}
      >
        Ngày
      </label>
      <div
        className='d-flex p-4 justify-content-evenly rounded '
        style={{border: '1px solid #B2B2B2'}}
      >
        <style>
          {`.date-picker1 input {
          width: 84px;
          font-size:14px;
          border:none
               }`}
        </style>
        <i className='fa-solid fa-calendar-days fs-2 pe-4 ' style={{color: '#B2B2B2'}}></i>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          wrapperClassName='date-picker1 '
        />
        <div className='pe-2' style={{transform: `translate(${0}px, ${-3}px)`}}>
          _
        </div>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          wrapperClassName='date-picker1'
        />
      </div>
    </div>
  )
}
