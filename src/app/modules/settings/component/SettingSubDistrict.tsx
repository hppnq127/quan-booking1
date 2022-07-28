import axios from 'axios'
import {useEffect, useState} from 'react'
import SelectSearch, {fuzzySearch} from 'react-select-search'
import './SettingDistrict/SettingDistrict.scss'
import '../SettingPage.scss'
import {formikCustom, removeAccents} from './SettingDistrict/SettingDistrict'
import {GetProvincesList} from './GetList/GetProvincesList'
import {GetDistrictsList} from './GetList/GetDistrictsList'
import {GetWardsList} from './GetList/GetWardsList'
import {optionsDisUpPush, optionsProPush, optionsWardPrefix} from './ChooseList/ChooseList'
import {InputUpdate, SelectSetting} from './InputUpdate/InputUpdate'
import {CHOOSINGWARD, DISTRICT, PROVINCE, WARD} from './INTERFACE/INTERFACE'
import { URL_BOOKING_STUDIO } from '../../../../setup/URL'
export const SettingSubDistrict = () => {
  const [provinces, setProvinces] = useState<PROVINCE[]>([])
  const [districts, setDistricts] = useState<DISTRICT[]>([])
  const [districtsUpdate, setDistrictsUpdate] = useState<DISTRICT[]>([])
  const [wards, setWards] = useState<WARD[]>([])
  const [valueProvinces, setValueProvinces] = useState(0)
  const [valueDistricts, setValueDistricts] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [flag, setFlag] = useState(false)
  const [update, setUpdate] = useState<WARD[]>([])
  const [choosingList, setChoosingList] = useState<CHOOSINGWARD[]>([])
  const [info, setInfo] = useState<CHOOSINGWARD>({
    Name: '',
    Prefix: '',
    DistrictId: 0,
    ProvinceId: 0,
    DistrictName:'',
    ProvinceName:'',
    DistrictPrefixName:''
  })
  //getProvincesList
  useEffect(() => {
    const ProvincesList = async () => {
      setProvinces(await GetProvincesList())
    }
    ProvincesList()
  }, [])
  //getDistrictList
  useEffect(() => {
    if (valueProvinces) {
      const getDistricts = async () => {
        setDistricts(await GetDistrictsList(valueProvinces))
      }
      getDistricts()
    }
  }, [valueProvinces])
  //getWardsList
  useEffect(() => {
    if (valueDistricts) {
      const getWards = async () => {
        setLoading(false)
        const List = await GetWardsList(valueDistricts)
        setWards(List)
        setUpdate(List)
        setLoading(true)
      }
      getWards()
    }
  }, [valueDistricts, valueProvinces, flag])
  //getDistrictListUpdate
  useEffect(() => {
    if (info.ProvinceId) {
      const getDistricts = async () => {
        setDistrictsUpdate(await GetDistrictsList(info.ProvinceId))
      }
      getDistricts()
    }
  }, [info.ProvinceId])

  const handleChange = (value: string, index: number, ward: WARD, name: string) => {
    const newWard = [...wards]
    if (name === 'Name') {
      newWard.splice(index, 1, {
        id: ward.id,
        Name: value,
        Prefix: update[index].Prefix,
        DistrictId: update[index].DistrictId,
        ProvinceId: update[index].ProvinceId,
        TenantId: null,
      })
      setUpdate(newWard)
    }
  }
  const handleUpdate = async (index: number) => {
    if (update[index].Name !== '') {
      await axios({
        url: `${URL_BOOKING_STUDIO}wards/wardById/${update[index].id}`,
        method: 'PUT',
        data: {
          TenantId: null,
          Name: update[index].Name,
          Prefix: update[index].Prefix,
          DistrictId: update[index].DistrictId,
          ProvinceId: update[index].ProvinceId,
        },
      })
      setFlag(!flag)
    }
  }
  const ListWards = () => {
    const sortWards = wards.sort((a, b) => a.Prefix.localeCompare(b.Prefix))
    return sortWards.filter((ward) => {
        if (searchTerm === '') {
          return ward
        } else if (
          removeAccents(ward.Prefix.concat(' ', ward.Name))
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          ward.Prefix.concat(' ', ward.Name).toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return ward
        }
        else return false
      })
      .map((ward, index) => (
        <div key={index} className='list'>
          <div>
            {ward.Prefix ? ward.Prefix : ''} {ward.Name}
          </div>
          <div>
            <i
              className='fa-solid fa-pen-to-square button-setting'
              data-bs-toggle='modal'
              data-bs-target={`#editModal${index}`}
              onClick={async () => {
                setDistrictsUpdate(await GetDistrictsList(update[index].DistrictId))
              }}
            ></i>
            <div
              className='modal fade'
              id={`editModal${index}`}
              tabIndex={-1}
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog '>
                <div className='modal-content w-450px mx-auto' style={{top: '200px'}}>
                  <div className='modal-body'>
                    <div className='d-flex flex-column w-100 h-150px justify-content-between'>
                      <div className='d-flex flex-row w-100 justify-content-between align-items-end'>
                        <InputUpdate
                          update={update}
                          index={index}
                          placeholder='Vd: Long Thành'
                          onChange={(e: {target: {name: any; value: any}}) => {
                            let {name, value} = e.target
                            handleChange(value, index, ward, name)
                          }}
                        />
                        <SelectSetting
                          value={update[index].Prefix}
                          option={optionsWardPrefix}
                          update={update}
                          index={index}
                          onChange={(e: any) => {
                            const newWard = [...wards]
                            newWard.splice(index, 1, {
                              id: ward.id,
                              Name: update[index].Name,
                              Prefix: e,
                              ProvinceId: update[index].ProvinceId,
                              DistrictId: update[index].DistrictId,
                              TenantId: null,
                            })
                            setUpdate(newWard)
                          }}
                        />
                      </div>
                      <div className='d-flex justify-content-end mt-4 align-items-center'>
                        <div className={update[index].Name ? 'd-none' : 'text-danger fs-5 fw-bold'}>
                          Vui lòng điền đầy đủ thông tin
                        </div>
                        <button
                          type='button'
                          className='add-confirm'
                          data-bs-dismiss={update[index].Name ? 'modal' : ''}
                          onClick={() => {
                            handleUpdate(index)
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
                handleDelete(ward.id)
              }}
            ></i>
          </div>
        </div>
      ))
  }
  const handleDeleteFromChoosingList = (index: number) => {
    let newChoosingList = [...choosingList]
    newChoosingList.splice(index, 1)
    setChoosingList(newChoosingList)
  }
  const choosing = () => {
    return choosingList.map((choosing, index) =>(
        <div key={index} className='d-flex justify-content-between w-375px py-2'>
          <div className='d-flex'>
            <div className='pe-2'>+</div>
            <div>
              {choosing.Prefix} {choosing.Name} ,{' '}{choosing.DistrictPrefixName} {' '}
              {choosing.DistrictName}
              , {choosing.ProvinceName}
            </div>
            {/* Not complete */}
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
      ))}
  const handleAdd = async () => {
    if (info.Name && info.Prefix && info.ProvinceId && info.ProvinceId) {
      const  objDis = districtsUpdate.find((o) => o.id ===info.DistrictId)
      const objPro = provinces.find((o) => o.id ===info.ProvinceId)
      setInfo({
        Name: '',
        Prefix: '',
        DistrictId: 0,
        ProvinceId: 0,
        DistrictName:'',
        ProvinceName:'',
        DistrictPrefixName:''
      })
      const data = {
        Name: info.Name.toString(),
        Prefix: info.Prefix,
        DistrictId: info.DistrictId,
        ProvinceId: info.ProvinceId,
        DistrictName:objDis? objDis.Name :'',
        ProvinceName:objPro? objPro.Name :'',
        DistrictPrefixName:objDis? objDis.Prefix :'',
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
          url: `${URL_BOOKING_STUDIO}wards`,
          method: 'POST',
          data: {
            Name: choosing.Name.toString(),
            Prefix: choosing.Prefix,
            DistrictId: choosing.DistrictId,
            ProvinceId: choosing.ProvinceId,
          },
        })
      })
      setChoosingList([])
      setFlag(!flag)
    }
  }
  const handleDelete = async (id: number) => {
    await axios({
      url: `${URL_BOOKING_STUDIO}wards/wardById/${id}`,
      method: 'DELETE',
    })
    setFlag(!flag)
  }
  return (
    <div className='w-75 d-flex h-100 '>
      <div
        className='d-flex flex-column align-items-center w-50 justify-content-start h-100'
        style={{marginTop: '15px'}}
      >
        <div>
          <div className='fs-6 fw-bolder'>Tỉnh/ Thành phố</div>
          <div
            className='d-flex justify-content-center p-1  '
            style={{backgroundColor: '#1ebfff', borderRadius: '6px'}}
          >
            <SelectSearch
              options={optionsProPush(provinces)}
              value={valueProvinces.toString()}
              onChange={(e: any) => {
                setValueProvinces(e)
                setLoading(false)
                setValueDistricts(0)
              }}
              search
              filterOptions={fuzzySearch}
              placeholder='Tìm Tỉnh/Thành phố...'
            />
          </div>
        </div>
        <div>
          <div className='fs-6 fw-bolder mt-5'>Quận/ Huyện/ Thành phố/ Thị xã</div>
          <div
            className='d-flex justify-content-center p-1  '
            style={{backgroundColor: '#1ebfff', borderRadius: '6px'}}
          >
            <SelectSearch
              options={optionsDisUpPush(districts)}
              value={valueDistricts.toString()}
              onChange={(e: any) => setValueDistricts(e)}
              search
              filterOptions={fuzzySearch}
              placeholder='Tìm Tỉnh/Thành phố...'
            />
          </div>
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
              <div className='modal-content w-850px  mx-auto  ' style={{top: '200px'}}>
                <div className='modal-body'>
                  <div className='d-flex flex-column w-100  justify-content-between'>
                    <div className='d-flex flex-row w-100  justify-content-between align-items-end '>
                      <div
                        className='d-flex flex-column w-auto  position-relative justify-content-start'
                        style={{height: '94px'}}
                      >
                        <label className='fs-6 fw-bold pb-3'>Tên Xã/ TT/ Phường</label>
                        <input
                          className='input-setting'
                          placeholder='Vd: Bửu Long'
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
                        <label className='fs-6 fw-bold  pb-3'>Loại (Xã, TT, Phường)</label>
                        <div
                          className='d-flex w-150px p-1'
                          style={{backgroundColor: '#1ebfff', borderRadius: '6px'}}
                        >
                          <SelectSearch
                            options={optionsWardPrefix}
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
                        <label className='fs-6 fw-bold  pb-3'>Thuộc Tỉnh/Thành phố</label>
                        <div
                          className='d-flex w-100 p-1'
                          style={{backgroundColor: '#1ebfff', borderRadius: '6px'}}
                        >
                          <SelectSearch
                            options={optionsProPush(provinces)}
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
                        className='d-flex flex-column w-auto  position-relative justify-content-start'
                        style={{height: '94px'}}
                      >
                        <label className='fs-6 fw-bold  pb-3'>Thuộc Quận/Huyện/Thị xã/Tp</label>

                        <div
                          className='d-flex w-200px p-1'
                          style={{backgroundColor: '#1ebfff', borderRadius: '6px'}}
                        >
                          <SelectSearch
                            options={optionsDisUpPush(districtsUpdate)}
                            value={info.DistrictId.toString()}
                            onChange={(e: any) => setInfo({...info, DistrictId: e})}
                            search
                            filterOptions={fuzzySearch}
                            placeholder='Chọn...'
                          />
                        </div>
                        {info.DistrictId ? <></> : formikCustom()}
                      </div>
                    </div>
                    <div className='d-flex justify-content-end mt-4 align-items-center '>
                      <div
                        className={
                          info.Name && info.Prefix && info.ProvinceId && info.DistrictId
                            ? 'd-none'
                            : 'text-danger fs-5 fw-bold'
                        }
                      >
                        Vui lòng điền đầy đủ thông tin
                      </div>
                      <button
                        type='button'
                        className='add-confirm'
                        /* data-bs-dismiss={info.Name && info.Prefix && info.ProvinceId ? 'modal' : ''} */
                        onClick={() => {
                          handleAdd()
                        }}
                      >
                        Thêm vào danh sách
                      </button>
                    </div>
                    <div style={{border: '1px solid #1ebfff', width: '100%', margin: '20px 0'}} />
                    <div className='d-flex justify-content-between mt-4 align-items-start w-100'>
                      <div className='d-flex flex-column'>
                        <div className='fs-4 fw-bolder'>Danh sách đang chọn</div>
                        <div className='fs-6 overflow-scroll  px-2' style={{maxHeight:'200px'}}>{choosing()}</div>
                      </div>
                      <div className='d-flex align-items-center  justify-content-start '>
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
            <div className='w-100'>{ListWards()}</div>
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
