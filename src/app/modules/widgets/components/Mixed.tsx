import React, {useEffect, useRef, useState} from 'react'
import Axios, {AxiosResponse} from 'axios'
import queryString from 'query-string'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { URL_BOOKING_STUDIO } from '../../../../setup/URL'

export const convertDate = (date: Date) => {
  const stringMoment = date.toISOString()
  const thisMoment = new Date(`${stringMoment.slice(0, 23)}-07:00`)
  const modify = thisMoment.toISOString()
  return modify
}
/* eslint-disable jsx-a11y/anchor-is-valid */
export function Mixed() {
  const [filters, setFilters] = useState<any>({
    option: -1,
    provinceId: -1,
    isDelete: false,
    createDate: {
      startDate: new Date(),
      endDate: new Date(),
    },
  })
  const [provinces, setProvinces] = useState<object[]>([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(startDate)

  useEffect(() => {
    const getProvinces = () => {
      let promise = Axios({
        url: `${URL_BOOKING_STUDIO}province`,
        method: 'GET',
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Thanh cong')
        const data = result.data
        setProvinces(data)
      })
      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    }
    getProvinces()
  }, [])

  const onchangeSelectedReport = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({...filters, option: parseInt(e.target.value)})
  }
  const onchangeSelectedProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({...filters, provinceId: e.target.value})
  }

  const onChangeSelectedDelete = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isDeleted = parseInt(e.target.value)
    if (isDeleted === 1) {
      setFilters({...filters, isDelete: true})
    }
    if (isDeleted === 2) {
      setFilters({...filters, isDelete: false})
    }
  }

console.log("hello render");


  const linkRef = useRef<any>()

  const handleBtnExportReport = () => {
    const newFilters = {
      ...filters,
      // createDate: {
      //   startDate: convertDate(filters.createDate.startDate),
      //   endDate: convertDate(filters.createDate.endDate),
      // },
    }
    delete newFilters.createDate
    const paramString = queryString.stringify(newFilters)
    console.log(paramString)
    const getExportFile = () => {
      let promise = Axios({
        url: `${URL_BOOKING_STUDIO}filter?${paramString}`,
        method: 'GET',
      })
      promise.then((result: AxiosResponse<any>) => {
        const url: any = result.config.url
        linkRef.current.href = url
        linkRef.current.click()
      })
      promise.catch((err) => {
        console.log(err)
      })
    }
    getExportFile()
  }

  const handleOnChangeStartDate = (date: Date) => {
    setFilters({
      ...filters,
      createDate: {...filters.createDate, startDate: date},
    })
  }

  const handleOnChangeEndDate = (date: Date) => {
    setFilters({
      ...filters,
      createDate: {...filters.createDate, endDate: date},
    })
  }


  const BtnExportReport = () => {
    return (
      <div className='d-flex justify-content-end mt-8 pe-8'>
        <div
          className='d-flex justify-content-center align-items-center btn border border-2 rounded border-success py-3 px-14'
          onClick={handleBtnExportReport}
        >
          <img src='/media/svg/export-data/excel.svg' alt='' />
          <h4 className='ps-3 pt-2' style={{color: '#03AC84'}}>
            Xu???t b??o c??o
          </h4>
        </div>
        <a ref={linkRef} href='#' className='d-none'>1</a>
      </div>
    )
  }

  return (
    <div
      className='p-6 '
      style={{
        paddingTop: '16px',
        paddingBottom: '16px',
        width: '1280px',
      }}
    >
      <div
        className='formcustom-container mb-4 d-flex justify-content-start'
        style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)'}}
      >
        <div className='w-50 position-relative d-flex justify-content-center'>
          <label
            className='position-absolute bg-white fs-5 fw-semibold px-1 text-input-title'
            style={{
              transform: `translate(${-210}px, ${-11}px)`,
              color: '#616161',
            }}
          >
            Lo???i b??o c??o
          </label>
          <select
            className='fs-3 rounded w-90 ps-3 py-4 border-0 text-input'
            style={{borderColor: '#B2B2B2'}}
            onChange={(e) => onchangeSelectedReport(e)}
          >
            <option disabled selected style={{color: '#B2B2B2'}}>
              Ch???n...
            </option>
            <option value={1}>T??i kho???n ?????i t??c</option>
            <option value={2}>T??i kho???n kh??ch h??ng</option>
            <option value={3}> Danh s??ch b??i ????ng Studio</option>
            <option value={4}>Danh s??ch b??i ????ng Nhi???p ???nh</option>
            <option value={5}>Danh s??ch ????n ?????t ph??t sinh</option>
            <option value={6}>Hoa h???ng ph??</option>
          </select>
        </div>
      </div>
      {filters.option === -1 && (
        <div
          className='w-100 d-flex align-items-center justify-content-center'
          style={{
            height: '70vh',
            // position: 'absolute',
          }}
        >
          <img
            src='/media/svg/export-data/background.svg'
            alt=''
            style={{width: '260px', height: '200px'}}
          />
        </div>
      )}
      {filters.option === 1 && (
        <>
          <div
            className='bg-white py-6 mb-4 d-flex flex-column'
            style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)'}}
          >
            <h4 className='ps-12 mb-8 ps-18' style={{color: '#03AC84'}}>
              B??? l???c n??ng cao
            </h4>
            <div className='d-flex flex-row ps-6'>
              <div className='col-3 position-relative d-flex justify-content-center'>
                <label
                  className='position-absolute bg-white fs-5 fw-semibold px-1'
                  style={{
                    transform: `translate(${-65}px, ${-11}px)`,
                    color: '#616161',
                  }}
                >
                  T???nh/Th??nh ph???
                </label>
                <select
                  className='fs-3  rounded border border-2 w-90 ps-3 py-4 w-90'
                  style={{borderColor: '#B2B2B2'}}
                  onChange={(e) => onchangeSelectedProvince(e)}
                >
                  <option defaultValue={0}>T???t c???</option>
                  {provinces.map((province: any, index) => (
                    <option key={province.id} value={province.id}>
                      {province.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-3 position-relative d-flex justify-content-center'>
                <label
                  className='position-absolute bg-white fs-5 fw-semibold px-1'
                  style={{
                    transform: `translate(${-85}px, ${-11}px)`,
                    color: '#616161',
                  }}
                >
                  Tr???ng th??i
                </label>
                <select
                  className='fs-3  rounded border border-2 w-90 ps-3 py-4'
                  style={{borderColor: '#B2B2B2'}}
                  onChange={(e) => onChangeSelectedDelete(e)}
                >
                  <option defaultValue={0}>T???t c???</option>
                  <option value={1}>Active</option>
                  <option value={2}>Cancel</option>
                </select>
              </div>
              <div
                className='d-flex flex-column col-3'
                style={{
                  zIndex: '1',
                }}
              >
                <div className='w-100 d-flex justify-content-center'>
                  <label
                    className='position-absolute bg-white fs-5 fw-semibold px-1'
                    style={{
                      transform: `translate(${-75}px, ${-11}px)`,
                      color: '#616161',
                    }}
                  >
                    Ng??y t???o
                  </label>
                  <div
                    className='d-flex p-4 justify-content-evenly rounded w-90'
                    style={{border: '1px solid #B2B2B2'}}
                  >
                    <style>
                      {`.date-picker1 input {
                        width: 84px;
                        font-size:14px;
                        border:none
                      }`}
                    </style>
                    <i
                      className='fa-solid fa-calendar-days fs-2 pe-4 '
                      style={{color: '#B2B2B2'}}
                    ></i>
                    <DatePicker
                      selected={filters.createDate.startDate}
                      onChange={handleOnChangeStartDate}
                      selectsStart
                      startDate={filters.createDate.startDate}
                      endDate={filters.createDate.endDate}
                      wrapperClassName='date-picker1 '
                    />
                    <div className='pe-2' style={{transform: `translate(${0}px, ${-3}px)`}}>
                      _
                    </div>
                    <DatePicker
                      selected={filters.createDate.endDate}
                      onChange={handleOnChangeEndDate}
                      selectsEnd
                      startDate={filters.createDate.startDate}
                      endDate={filters.createDate.endDate}
                      minDate={filters.createDate.startDate}
                      wrapperClassName='date-picker1'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BtnExportReport />
        </>
      )}
      {filters.option === 2 && (
        <>
          <div
            className='bg-white py-6 mb-4 d-flex flex-column'
            style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)'}}
          >
            <h4 className='ps-12 mb-8 ps-18' style={{color: '#03AC84'}}>
              B??? l???c n??ng cao
            </h4>
            <div className='d-flex flex-row ps-6'>
              <div className='col-3 position-relative d-flex justify-content-center'>
                <label
                  className='position-absolute bg-white fs-5 fw-semibold px-1'
                  style={{
                    transform: `translate(${-85}px, ${-11}px)`,
                    color: '#616161',
                  }}
                >
                  Tr???ng th??i
                </label>
                <select
                  className='fs-3  rounded border border-2 w-90 ps-3 py-4'
                  style={{borderColor: '#B2B2B2'}}
                  onChange={(e) => onChangeSelectedDelete(e)}
                >
                  <option defaultValue={0}>T???t c???</option>
                  <option value={1}>Active</option>
                  <option value={2}>Cancel</option>
                </select>
              </div>
              <div
                className='d-flex flex-column col-3 '
                style={{
                  zIndex: '1',
                }}
              >
                <div className='w-100 d-flex justify-content-center'>
                  <label
                    className='position-absolute bg-white fs-5 fw-semibold px-1'
                    style={{
                      transform: `translate(${-75}px, ${-11}px)`,
                      color: '#616161',
                    }}
                  >
                    Ng??y t???o
                  </label>
                  <div
                    className='d-flex p-4 justify-content-evenly rounded w-90'
                    style={{border: '1px solid #B2B2B2'}}
                  >
                    <style>
                      {`.date-picker1 input {
                        width: 84px;
                        font-size:14px;
                        border:none
                      }`}
                    </style>
                    <i
                      className='fa-solid fa-calendar-days fs-2 pe-4 '
                      style={{color: '#B2B2B2'}}
                    ></i>
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
          <BtnExportReport />
        </>
      )}
      {filters.option === 3 && (
        <>
          <div
            className='bg-white py-6 mb-4 d-flex flex-column'
            style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)'}}
          >
            <h4 className='ps-12 mb-8 ps-18' style={{color: '#03AC84'}}>
              B??? l???c n??ng cao
            </h4>
            <div className='d-flex flex-row ps-6'>
              <div className='col-3 position-relative d-flex justify-content-center'>
                <label
                  className='position-absolute bg-white fs-5 fw-semibold px-1'
                  style={{
                    transform: `translate(${-85}px, ${-11}px)`,
                    color: '#616161',
                  }}
                >
                  Tr???ng th??i
                </label>
                <select
                  className='fs-3  rounded border border-2 w-90 ps-3 py-4'
                  style={{borderColor: '#B2B2B2'}}
                  onChange={(e) => onChangeSelectedDelete(e)}
                >
                  <option defaultValue={0}>T???t c???</option>
                  <option value={1}>Active</option>
                  <option value={2}>Cancel</option>
                </select>
              </div>
              <div
                className='d-flex flex-column col-3'
                style={{
                  zIndex: '1',
                }}
              >
                <div className='w-100 d-flex justify-content-center'>
                  <label
                    className='position-absolute bg-white fs-5 fw-semibold px-1'
                    style={{
                      transform: `translate(${-75}px, ${-11}px)`,
                      color: '#616161',
                    }}
                  >
                    Ng??y t???o
                  </label>
                  <div
                    className='d-flex p-4 justify-content-evenly rounded w-90'
                    style={{border: '1px solid #B2B2B2'}}
                  >
                    <style>
                      {`.date-picker1 input {
                      width: 84px;
                      font-size:14px;
                      border:none
                    }`}
                    </style>
                    <i
                      className='fa-solid fa-calendar-days fs-2 pe-4 '
                      style={{color: '#B2B2B2'}}
                    ></i>
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
          <BtnExportReport />
        </>
      )}
      {filters.option === 5 && (
        <>
          <div
            className='bg-white py-6 mb-4 d-flex flex-column'
            style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)'}}
          >
            <h4 className='ps-16 mb-8' style={{color: '#03AC84'}}>
              B??? l???c n??ng cao
            </h4>
            <div className='d-flex flex-row  justify-content-between px-6'>
              <div className='col-3 position-relative d-flex justify-content-center'>
                <label
                  className='position-absolute bg-white fs-5 fw-semibold px-1'
                  style={{
                    transform: `translate(${-60}px, ${-11}px)`,
                    color: '#616161',
                  }}
                >
                  M?? b??i ????ng
                </label>
                <input
                  placeholder='Nh???p th??ng tin'
                  className='w-90 fs-3 p-4 rounded border border-2 '
                  style={{borderColor: '#B2B2B2'}}
                />
              </div>
              <div className='col-3 position-relative d-flex justify-content-center'>
                <label
                  className='position-absolute bg-white fs-5 fw-semibold px-1'
                  style={{
                    transform: `translate(${-15}px, ${-11}px)`,
                    color: '#616161',
                  }}
                >
                  S??? ?????nh danh (Kh??ch h??ng)
                </label>
                <input
                  placeholder='Nh???p th??ng tin'
                  className='w-90 fs-3 p-4 rounded border border-2 '
                  style={{borderColor: '#B2B2B2'}}
                />
              </div>
              <div className='col-3 position-relative d-flex justify-content-center'>
                <label
                  className='position-absolute bg-white fs-5 fw-semibold px-1'
                  style={{
                    transform: `translate(${-85}px, ${-11}px)`,
                    color: '#616161',
                  }}
                >
                  Tr???ng th??i
                </label>
                <select
                  className='fs-3 rounded border border-2 w-90 ps-3 py-4'
                  style={{borderColor: '#B2B2B2'}}
                  onChange={(e) => onChangeSelectedDelete(e)}
                >
                  <option defaultValue={0}>T???t c???</option>
                  <option value={1}>Active</option>
                  <option value={2}>Cancel</option>
                </select>
              </div>
              <div
                className='col-3 d-flex flex-column'
                style={{
                  zIndex: '1',
                }}
              >
                <div className='d-flex justify-content-center w-100'>
                  <label
                    className='position-absolute bg-white fs-5 fw-semibold px-1'
                    style={{
                      transform: `translate(${-75}px, ${-11}px)`,
                      color: '#616161',
                    }}
                  >
                    Ng??y t???o
                  </label>
                  <div
                    className='d-flex p-4 justify-content-evenly rounded w-90'
                    style={{border: '1px solid #B2B2B2'}}
                  >
                    <style>
                      {`.date-picker1 input {
                        width: 84px;
                        font-size:14px;
                        border:none
                      }`}
                    </style>
                    <i
                      className='fa-solid fa-calendar-days fs-2 pe-4 '
                      style={{color: '#B2B2B2'}}
                    ></i>
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
          <BtnExportReport />
        </>
      )}
      {filters.option === 6 && (
        <>
          <div
            className='bg-white py-6 mb-4 d-flex flex-column'
            style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)'}}
          >
            <h4 className=' mb-8 ps-16' style={{color: '#03AC84'}}>
              B??? l???c n??ng cao
            </h4>
            <div className='d-flex flex-row ps-6'>
              <div
                className='col-3 d-flex flex-column'
                style={{
                  zIndex: '1',
                }}
              >
                <div className='w-100 d-flex justify-content-center'>
                  <label
                    className='position-absolute bg-white fs-5 fw-semibold px-1'
                    style={{
                      transform: `translate(${-60}px, ${-11}px)`,
                      color: '#616161',
                    }}
                  >
                    Ng??y th???c t???
                  </label>
                  <div
                    className='d-flex p-4 justify-content-evenly rounded w-90'
                    style={{border: '1px solid #B2B2B2'}}
                  >
                    <style>
                      {`.date-picker1 input {
                        width: 84px;
                        font-size:14px;
                        border:none
                      }`}
                    </style>
                    <i
                      className='fa-solid fa-calendar-days fs-2 pe-4 '
                      style={{color: '#B2B2B2'}}
                    ></i>
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
              <div className='col-3 position-relative d-flex justify-content-center'>
                <label
                  className='position-absolute bg-white fs-5 fw-semibold px-1'
                  style={{
                    transform: `translate(${-85}px, ${-11}px)`,
                    color: '#616161',
                  }}
                >
                  Tr???ng th??i
                </label>
                <select
                  className='fs-3  rounded border border-2 w-90 ps-3 py-4'
                  style={{borderColor: '#B2B2B2'}}
                  onChange={(e) => onChangeSelectedDelete(e)}
                >
                  <option defaultValue={0}>T???t c???</option>
                  <option value={1}>Ho??n t???t</option>
                  <option value={2}>???? h???y</option>
                  <option value={3}>V???ng m???t</option>
                </select>
              </div>
            </div>
          </div>
          <BtnExportReport />
        </>
      )}
     
 
    </div>
  )
}
