import React from 'react'
import './FormCustom.scss'
type SetPropsType = {
  onChange: any
}
export const SearchCustom = ({onChange}: SetPropsType) => {
  return (
    <div className='w-100 h-100'>
      <label className='account-label text-input-title'>Tìm kiếm</label>
      <div className='account-form'>
        <span className='input-group-text border-0 text-input' id='search-addon'>
          <i className='fas fa-search fs-2' />
        </span>
        <input
          type='text'
          className='form-control rounded fs-4 text-input'
          placeholder='Tìm kiếm'
          aria-label='Search'
          aria-describedby='search-addon'
          style={{border: 'none'}}
          onChange={(e) => onChange(e)}
        />
      </div>
    </div>
  )
}
