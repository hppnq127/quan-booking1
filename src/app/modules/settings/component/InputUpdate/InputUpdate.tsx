import React from 'react'
import SelectSearch, {fuzzySearch, SelectSearchOption} from 'react-select-search'
import {formikCustom} from '../SettingDistrict/SettingDistrict'

type InputUpdateProps = {
  update: any
  index: number
  onChange: any
  placeholder: string
}
export const InputUpdate = ({update, index, onChange, placeholder}: InputUpdateProps) => {
  return (
    <div
      className='d-flex flex-column w-auto  position-relative justify-content-start'
      style={{height: '94px'}}
    >
      <label className='fs-6 fw-bold pb-3'>Tên</label>
      <input
        name='Name'
        className='input-setting'
        placeholder={placeholder}
        value={update[index] ? update[index].Name : ''}
        onChange={(e) => {
          onChange(e)
        }}
      ></input>
      {update[index].Name ? <></> : formikCustom()}
    </div>
  )
}
type SelectSettingProps = {
  update: any
  index: number
  onChange: any
  option: SelectSearchOption[]
  value: string
}
export const SelectSetting = ({update, index, onChange, option, value}: SelectSettingProps) => {
  return (
    <div
      className='d-flex flex-column w-auto  position-relative justify-content-start'
      style={{height: '94px'}}
    >
      <label className='fs-6 fw-bold  pb-3'>Loại (Quận, Huyện, Thị xã, Tp)</label>
      <div className='d-flex w-200px p-1' style={{backgroundColor: '#1ebfff', borderRadius: '6px'}}>
        <SelectSearch
          options={option}
          value={value}
          onChange={(e: any) => {
            onChange(e)
          }}
          search
          filterOptions={fuzzySearch}
          placeholder='Chọn...'
        />
      </div>
    </div>
  )
}
