import axios from 'axios'
import {useEffect, useState} from 'react'
import SelectSearch, {fuzzySearch, SelectSearchOption} from 'react-select-search'
import {GetProvincesList} from '../GetList/GetProvincesList'
import '../../SettingPage.scss'
import './SettingDistrict.scss'
import {GetDistrictsList} from '../GetList/GetDistrictsList'
import {InputUpdate} from '../InputUpdate/InputUpdate'
import {CHOOSINGDISTRICT, DISTRICT, PROVINCE} from '../INTERFACE/INTERFACE'
import {optionsPrefixDistrict} from '../ChooseList/ChooseList'
import { URL_BOOKING_STUDIO } from '../../../../../setup/URL'
export function removeAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}
export const formikCustom = () => {
  return (
    <div className='text-danger position-absolute' style={{bottom: 0}}>
      *Không được bỏ trống !
    </div>
  )
}
export const SettingDistrict = () => {
  const [value, setValue] = useState(0)
  const [provinces, setProvinces] = useState<PROVINCE[]>([])
  const [districts, setDistricts] = useState<DISTRICT[]>([])
  const [update, setUpdate] = useState<DISTRICT[]>([])
  const [flag, setFlag] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [choosingList, setChoosingList] = useState<CHOOSINGDISTRICT[]>([])
  const [info, setInfo] = useState<CHOOSINGDISTRICT>({
    Name: '',
    Prefix: '',
    ProvinceId: 0,
    ProvinceName: '',
  })
  let options: SelectSearchOption[] = []
  useEffect(() => {
    const ProvincesList = async () => {
      setProvinces(await GetProvincesList())
    }
    ProvincesList()
  }, [])
  const optionsPush = async () => {
    return provinces.map((province: any, index) => {
      options.push({name: province.Name, value: province.id})
      return options
    })
  }
  optionsPush()
  useEffect(() => {
    if (value) {
      const getDistricts = async () => {
        setLoading(false)
        const List = await GetDistrictsList(value)
        setDistricts(List)
        setUpdate(List)
        setLoading(true)
      }
      getDistricts()
    }
  }, [value, flag])
  const sort = districts.sort((a, b) => a.Prefix.localeCompare(b.Prefix))
  const handleChange = (value: string, index: number, district: DISTRICT, name: string) => {
    const newDistricts = [...districts]
    if (name === 'Name') {
      newDistricts.splice(index, 1, {
        id: district.id,
        Name: value,
        Prefix: update[index].Prefix,
        ProvinceId: update[index].ProvinceId,
        TenantId: null,
      })
      setUpdate(newDistricts)
    }
  }
  const handleUpdate = async (index: any, id: any) => {
    await axios({
      url: `${URL_BOOKING_STUDIO}districts/districtById/${id}`,
      method: 'PUT',
      data: {
        Name: update[index].Name,
        Prefix: update[index].Prefix,
        ProvinceId: update[index].ProvinceId,
      },
    })
    setFlag(!flag)
  }
  const ListDistrict = () => {
    return (
      sort
        // eslint-disable-next-line array-callback-return
        .filter((district) => {
          if (searchTerm === '') {
            return district
          } else if (
            removeAccents(district.Prefix.concat(' ', district.Name))
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            district.Prefix.concat(' ', district.Name)
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            return district
          }
        })
        .map((district, index) => (
          <div key={index} className='list'>
            <div>
              {district.Prefix ? district.Prefix : ''} {district.Name}
            </div>
            <div>
              <i
                className='fa-solid fa-pen-to-square button-setting'
                data-bs-toggle='modal'
                data-bs-target={`#editModal${index}`}
              ></i>
              <div
                className='modal fade'
                id={`editModal${index}`}
                tabIndex={-1}
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog '>
                  <div className='modal-content w-500px mx-auto  ' style={{top: '200px'}}>
                    <div className='modal-body'>
                      <div className='d-flex flex-column w-100 h-150px justify-content-between'>
                        <div className='d-flex flex-row w-100 justify-content-between align-items-end'>
                          <div
                            className='d-flex flex-column w-auto  position-relative justify-content-start'
                            style={{height: '94px'}}
                          >
                            <label className='fs-6 fw-bold  pb-3'>Loại</label>

                            <div
                              className='d-flex w-200px p-1'
                              style={{backgroundColor: '#1ebfff', borderRadius: '6px'}}
                            >
                              <SelectSearch
                                options={optionsPrefixDistrict}
                                value={update[index] ? update[index].Prefix : ''}
                                onChange={(e: any) => {
                                  const newDistricts = [...districts]
                                  newDistricts.splice(index, 1, {
                                    id: district.id,
                                    Name: update[index].Name,
                                    Prefix: e,
                                    ProvinceId: update[index].ProvinceId,
                                    TenantId: null,
                                  })
                                  setUpdate(newDistricts)
                                }}
                                search
                                filterOptions={fuzzySearch}
                                placeholder='Chọn...'
                              />
                            </div>
                            {update[index].Prefix ? <></> : formikCustom()}
                          </div>
                          <InputUpdate
                            update={update}
                            index={index}
                            placeholder='Vd: Long Thành'
                            onChange={(e: {target: {name: any; value: any}}) => {
                              let {name, value} = e.target
                              handleChange(value, index, district, name)
                            }}
                          />
                        </div>
                        <div className='d-flex justify-content-end mt-4 align-items-center'>
                          <div
                            className={
                              update[index].ProvinceId && update[index].Name && update[index].Prefix
                                ? 'd-none'
                                : 'text-danger fs-5 fw-bold'
                            }
                          >
                            Vui lòng điền đầy đủ thông tin
                          </div>
                          <button
                            type='button'
                            className='add-confirm'
                            data-bs-dismiss={
                              update[index].ProvinceId && update[index].Name && update[index].Prefix
                                ? 'modal'
                                : ''
                            }
                            onClick={() => {
                              handleUpdate(index, district.id)
                            }}
                          >
                            Cập nhật
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <i
                className='fa-solid fa-trash-can button-setting'
                onClick={() => {
                  handleDelete(district)
                }}
              ></i>
            </div>
          </div>
        ))
    )
  }
  const handleDeleteFromChoosingList = (index: number) => {
    let newChoosingList = [...choosingList]
    newChoosingList.splice(index, 1)
    setChoosingList(newChoosingList)
  }
  const choosing = () => {
    return choosingList.map((choosing, index) => (
      <div key={index} className='d-flex justify-content-between py-1'>
        <div className='d-flex'>
          <div className='pe-2'>+</div>
          <div>
            {choosing.Prefix} {choosing.Name} , {choosing.ProvinceName}
          </div>
        </div>
        <div>
          <i
            className='fa-solid fa-trash-can button-setting'
            onClick={() => {
              handleDeleteFromChoosingList(index)
            }}
          ></i>
        </div>
      </div>
    ))
  }
  const handleAdd = () => {
    if (info.Name && info.Prefix && info.ProvinceId) {
      const objPro = provinces.find((o) => o.id === info.ProvinceId)
      setInfo({
        Name: '',
        Prefix: '',
        ProvinceId: 0,
        ProvinceName: '',
      })
      const data = {
        Name: info.Name.toString(),
        Prefix: info.Prefix,
        ProvinceId: info.ProvinceId,
        ProvinceName: objPro ? objPro.Name : '',
      }
      setChoosingList((list) => [...list, data])
    } else {
      return false
    }
  }
  const handleConfirmAdd = async () => {
    if (choosingList.length !== 0) {
      choosingList.map(async (choosing) => {
        await axios({
          url: `${URL_BOOKING_STUDIO}districts`,
          method: 'POST',
          data: {
            Name: choosing.Name.toString(),
            Prefix: choosing.Prefix,
            ProvinceId: choosing.ProvinceId,
          },
        })
      })
      setChoosingList([])
      setFlag(!flag)
    }
  }
  const handleDelete = async (district: DISTRICT) => {
    await axios({
      url: `${URL_BOOKING_STUDIO}districts/districtById/${district.id}`,
      method: 'DELETE',
    })
    setFlag(!flag)
  }
  return (
    <div className='w-75 d-flex h-100 '>
      <div className='d-flex align-items-start w-50 justify-content-center h-100 '>
        <div
          className='d-flex justify-content-center p-1  '
          style={{backgroundColor: '#1ebfff', borderRadius: '6px', marginTop: '35px'}}
        >
          <SelectSearch
            options={options}
            value={value.toString()}
            onChange={(e: any) => setValue(e)}
            search
            filterOptions={fuzzySearch}
            placeholder='Tìm tỉnh/thành phố...'
          />
        </div>
      </div>
      <div className='d-flex flex-column align-items-end justify-content-start h-100'>
        <>
          <button className='add-button' data-bs-toggle='modal' data-bs-target='#addModal'>
            <span className='add-text'>Thêm</span>
            <i className='fa-solid fa-plus button-setting '></i>
          </button>
          <div
            className='modal fade '
            id='addModal'
            tabIndex={-1}
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog '>
              <div className='modal-content w-900px mx-auto  ' style={{top: '200px'}}>
                <div className='modal-body'>
                  <div className='d-flex flex-column w-100 justify-content-between'>
                    <div className='d-flex flex-row w-100 justify-content-between align-items-end'>
                      <div
                        className='d-flex flex-column w-auto  position-relative justify-content-start'
                        style={{height: '94px'}}
                      >
                        <label className='fs-6 fw-bold pb-3'>Tên</label>
                        <input
                          className='input-setting'
                          placeholder='Vd: Long Thành'
                          value={info.Name}
                          onChange={(e) => {
                            let {value} = e.target
                            setInfo({
                              ...info,
                              Name: value,
                            })
                          }}
                        ></input>
                        {info.Name ? <></> : formikCustom()}
                      </div>
                      <div
                        className='d-flex flex-column w-auto  position-relative justify-content-start'
                        style={{height: '94px'}}
                      >
                        <label className='fs-6 fw-bold  pb-3'>Loại (Quận, Huyện, Thị xã, Tp)</label>

                        <div
                          className='d-flex w-200px p-1'
                          style={{backgroundColor: '#1ebfff', borderRadius: '6px'}}
                        >
                          <SelectSearch
                            options={optionsPrefixDistrict}
                            value={info.Prefix}
                            onChange={(e: any) => setInfo({...info, Prefix: e})}
                            search
                            filterOptions={fuzzySearch}
                            placeholder='Chọn...'
                          />
                        </div>
                        {info.Prefix ? <></> : formikCustom()}
                      </div>

                      <div
                        className='d-flex flex-column w-200px  position-relative justify-content-start'
                        style={{height: '94px'}}
                      >
                        <label className='fs-6 fw-bold  pb-3'>Thuộc tỉnh/thành phố</label>
                        <div
                          className='d-flex w-100 p-1'
                          style={{backgroundColor: '#1ebfff', borderRadius: '6px'}}
                        >
                          <SelectSearch
                            options={options}
                            value={info.ProvinceId.toString()}
                            onChange={(e: any) => setInfo({...info, ProvinceId: e})}
                            search
                            filterOptions={fuzzySearch}
                            placeholder='Tìm tỉnh/thành phố...'
                          />
                        </div>
                        {info.ProvinceId ? <></> : formikCustom()}
                      </div>
                      <div
                        className='d-flex flex-column w-225px  position-relative justify-content-end'
                        style={{height: '94px'}}
                      >
                        <div
                          className='d-flex w-100 p-1 justify-content-end'
                          style={{borderRadius: '6px', top: '27px', position: 'absolute'}}
                        >
                          <button
                            type='button'
                            className='add-confirm'
                            onClick={() => {
                              handleAdd()
                            }}
                          >
                            Thêm vào danh sách
                          </button>
                        </div>
                        <div
                          className={
                            info.Name && info.Prefix && info.ProvinceId
                              ? 'd-none'
                              : 'text-danger fs-5 fw-bold position-absolute w-100 text-end pe-1'
                          }
                          style={{bottom: '0px'}}
                        >
                          Vui lòng điền đầy đủ thông tin
                        </div>
                      </div>
                    </div>
                    <div style={{border: '1px solid #1ebfff', width: '99%', margin: '20px 0'}} />
                    <div className='d-flex justify-content-between mt-4 align-items-start w-100'>
                      <div className='d-flex flex-column'>
                        <div className='fs-4 fw-bolder'>Danh sách đang chọn</div>
                        <div className='fs-6 overflow-scroll  px-2' style={{maxHeight:'200px'}}>{choosing()}</div>
                      </div>
                      <div className='d-flex align-items-center  justify-content-start me-1'>
                        <div
                          className={
                            choosingList.length !== 0 ? 'd-none' : 'text-danger fs-5 fw-bold'
                          }
                        >
                          Danh sách đang chọn trống !!
                        </div>
                        <button
                          type='button'
                          className='confirmList'
                          data-bs-dismiss={choosingList.length !== 0 ? 'modal' : ''}
                          onClick={() => {
                            handleConfirmAdd()
                          }}
                        >
                          Xác nhận
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        <div className='input-group rounded mb-3' style={{border: '1px solid #B2B2B2'}}>
          <span className='input-group-text border-0 bg-white' id='search-addon'>
            <i className='fas fa-search fs-2' />
          </span>
          <input
            type='text'
            className='form-control rounded fs-5'
            placeholder='Tìm kiếm'
            aria-label='Search'
            aria-describedby='search-addon'
            style={{border: 'none'}}
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}
          />
        </div>
        {loading ? (
          <div className='h-100 w-100  d-flex overflow-scroll '>
            <div className='w-100'>{ListDistrict()}</div>
          </div>
        ) : (
          <div className='d-flex w-100 justify-content-center '>
            <div className='spinner-border text-primary' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
