import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useState} from 'react'
import {hashtags} from './Baiviet'

export type SetPropsType = {
  tagsProps: string[]
  setTagsProp: React.Dispatch<React.SetStateAction<string[]>>
}

export const MenuDao = ({setTagsProp, tagsProps}: SetPropsType) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(startDate)
  const handleCheckBox = (tag: string) => {
    const newTags = [...tagsProps]
    const checkIndex = newTags.indexOf(tag)
    if (checkIndex === -1) {
      newTags.push(tag)
    } else {
      newTags.splice(checkIndex, 1)
    }
    setTagsProp(newTags)
  }
  return (
    <div
      className='bg-white  py-8 mb-4 d-flex flex-row justify-content-center w-100'
      style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)', height: '208px'}}
    >
      <div className='d-flex flex-column w-100 px-20'>
        <div className='d-flex justify-content-between w-100 flex-wrap '>
          {hashtags.map((tag, index) => (
            <div
              key={index}
              className='formCheckboxMenu w-30 mb-8'
              onClick={() => handleCheckBox(tag)}
            >
              <label htmlFor={index.toString()} className='Checkbox-menu'>
                <input
                  type='checkbox'
                  className='Checkbox-input'
                  checked={tagsProps.includes(tag) ? true : false}
                />
                <span className='fs-4 fw-bolder text-capitalize'>{tag}</span>
                <i className='fa-solid fa-check fs-3'></i>
              </label>
            </div>
          ))}
          {/* <div className='formCheckboxMenu w-25'>
            <label htmlFor='checkbox_2' className='Checkbox-menu'>
              <input type='checkbox' className='Checkbox-input' id='checkbox_2' />
              <span className='fs-4 fw-bolder'>Nhiếp ảnh</span>
              <i className='fa-solid fa-check fs-3'></i>
            </label>
          </div>
          <div className='formCheckboxMenu w-25'>
            <label htmlFor='checkbox_3' className='Checkbox-menu'>
              <input type='checkbox' className='Checkbox-input' id='checkbox_3' />
              <span className='fs-4 fw-bolder'>Thiết bị</span>
              <i className='fa-solid fa-check fs-3'></i>
            </label>
          </div> */}
        </div>
        {/* --------------------------------------------------------------------------- */}
        {/* <div className='d-flex justify-content-evenly ps-18  pb-8 w-100'>
          <div className='formCheckboxMenu w-25'>
            <label htmlFor='checkbox_4' className='Checkbox-menu'>
              <input type='checkbox' className='Checkbox-input' id='checkbox_4' />
              <span className='fs-4 fw-bolder'>Trang phục</span>
              <i className='fa-solid fa-check fs-3'></i>
            </label>
          </div>
          <div className='formCheckboxMenu w-25'>
            <label htmlFor='checkbox_5' className='Checkbox-menu'>
              <input type='checkbox' className='Checkbox-input' id='checkbox_5' />
              <span className='fs-4 fw-bolder'>Make up</span>
              <i className='fa-solid fa-check fs-3'></i>
            </label>
          </div>
          <div className='formCheckboxMenu w-25'>
            <label htmlFor='checkbox_6' className='Checkbox-menu'>
              <input type='checkbox' className='Checkbox-input' id='checkbox_6' />
              <span className='fs-4 fw-bolder'>Người mẫu</span>
              <i className='fa-solid fa-check fs-3'></i>
            </label>
          </div>
        </div> */}
        {/* ---------------------------------------------- */}
        <div
          className='d-flex flex-column w-100'
          style={{
            transform: `translate(${130}px, ${0}px)`,
            zIndex: '1',
          }}
        >
          <div className='w-25  d-flex justify-content-center'>
            <label
              className='position-absolute bg-white fs-5 fw-semibold px-1'
              style={{
                transform: `translate(${-75}px, ${-11}px)`,
                color: '#616161',
              }}
            >
              Tìm kiếm
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
        </div>
      </div>
    </div>
  )
}
