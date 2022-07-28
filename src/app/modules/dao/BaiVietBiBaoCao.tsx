import React from 'react'
import Calendar from 'react-calendar'
import {useState} from 'react'

import '../../components/TestCalendar/CustomReactCalendar.css'
import clsx from 'clsx'
export const BaiVietBiBaoCao = () => {
  const [date, setDate] = useState<any>(new Date())
  const [calendar, setCalendar] = useState(false)
  const hello = () => {
    console.log('wow')
    console.log(date)
  }
  return (
    <div className='app'>
      <button onClick={() => setCalendar(!calendar)}>
        {date.length > 0 ? (
          <p className='text-center'>
            {date[0].toDateString()}
            &nbsp;|&nbsp;
            <span className='bold'>End:</span> {date[1].toDateString()}
          </p>
        ) : (
          <p className='text-center'>
            <span className='bold'>Default selected date:</span> {date.toDateString()}
          </p>
        )}
      </button>
      <div className={clsx(calendar ? 'calendar-container' : 'd-none')}>
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
          showDoubleView={true}
          onClickDay={() => hello()}
          showNavigation={true}
        />
      </div>
    </div>
  )
}

//////////////////////////////////////
/* import  React, { Component } from  'react'

import  'react-dater/dist/index.css'
export const BaiVietBiBaoCao =() => {
  const EventCalendar = require('react-event-calendar');
  const events = [
    {
        start: '2015-07-20',
        end: '2015-07-02',
        eventClasses: 'optionalEvent',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];

  return (
    <EventCalendar 
    month={7}
    year={2015}
    events={events} 
    onEventClick={(target, eventData, day) => console.log(eventData) 
    />
      
    
  )
} */
