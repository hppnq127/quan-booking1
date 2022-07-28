import React from 'react'
import Moment from 'moment'
type ConvertCreate = {
  CreationTime: string
}
export const ConvertCreationTime = (props: ConvertCreate) => {
  const {CreationTime} = props
  const dateSlice: string = CreationTime.slice(0, 16)
  Moment.locale('en')
  const dateFormat = dateSlice
  const CreationTimeFormat = Moment(dateFormat).format('DD/MM/YYYY  HH:mm')
  return (
    <td>
      <div className='d-flex justify-content-center'>
        <div className='d-flex justify-content-start text-start' style={{width: 'auto'}}>
          {CreationTimeFormat.slice(0, 10)}
          <br></br>
          {CreationTimeFormat.slice(-5)}{' '}
        </div>
      </div>
    </td>
  )
}
export const convertTime = (time: string) => {
  if (time !== null) {
    const dateSlice: string = time.slice(0, 16)
    Moment.locale('en')
    const dateFormat = dateSlice
    const TimeFormat = Moment(dateFormat).format('DD/MM/YYYY  HH:mm')
    return TimeFormat
  } else {
    const TimeFormat = ''
    return TimeFormat
  }
}
