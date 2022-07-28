import axios from 'axios'
import {useEffect, useState} from 'react'
import '../SettingPage.scss'
import {removeAccents} from './SettingDistrict/SettingDistrict'
import {GetProvincesList} from './GetList/GetProvincesList'
import {PROVINCE} from './INTERFACE/INTERFACE'
import Spinner from 'react-bootstrap/Spinner'
import { URL_BOOKING_STUDIO } from '../../../../setup/URL'
export const SettingProvince = () => {
  const [provinces, setProvinces] = useState<PROVINCE[]>([])
  const [flag, setFlag] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [update, setUpdate] = useState<PROVINCE[]>([])
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({
    Name: '',
    Code: '',
    TenantId: null,
  })

  useEffect(() => {
    const ProvincesList = async () => {
      setLoading(false);
      const list = await GetProvincesList();
      setProvinces(list);
      setUpdate(list);
      setLoading(true);
    }
    ProvincesList()
  }, [flag])
  const handleAdd = async () => {
    await axios({
      url: `${URL_BOOKING_STUDIO}provinces`,
      method: 'POST',
      data: {
        Name: info.Name,
        Code: info.Code,
        TenantId: null,
      },
    })
    setInfo({
      Name: '',
      Code: '',
      TenantId: null,
    })
    setFlag(!flag)
  }
  ///////////
  const handleChange = (name: string, value: string, index: any, province: PROVINCE) => {
    const newProvinces = [...provinces]
    if (name === 'Name') {
      newProvinces.splice(index, 1, {
        id: province.id,
        Name: value,
        Code: update[index].Code,
        TenantId: null,
      })
      setUpdate(newProvinces)
    }
    if (name === 'Code') {
      newProvinces.splice(index, 1, {
        id: province.id,
        Name: update[index].Name,
        Code: value,
        TenantId: null,
      })
      setUpdate(newProvinces)
    }
  }
  //////////////////////
  const handleUpdate = async (index: any, id: any) => {
    await axios({
      url: `${URL_BOOKING_STUDIO}provinces/${id}`,
      method: 'PUT',
      data: {
        Name: update[index].Name,
        Code: update[index].Code,
      },
    })
    setFlag(!flag)
  }
  /////////////////////////

  const handleDelete = async (id:number) => {
    await axios({
      url: `${URL_BOOKING_STUDIO}provinces/${id}`,
      method: 'DELETE',
    })
    setFlag(!flag)
  }
  const ListProvince = () => {
    return (
      provinces
        // eslint-disable-next-line array-callback-return
        .filter((province) => {
          if (searchTerm === '') {
            return province
          } else if (
            removeAccents(province.Name).toLowerCase().includes(searchTerm.toLowerCase()) ||
            province.Name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return province
          }
        })
        .map((province, index) => (
          <div key={index} className='list'>
            <div>{province.Name}</div>
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
                  <div className='modal-content w-350px mx-auto ' style={{top: '200px'}}>
                    <div className='modal-body'>
                      <div>
                        <input
                          className='input-setting mb-3'
                          name='Name'
                          value={update[index] ? update[index].Name : ''}
                          onChange={(e) => {
                            let {name, value} = e.target
                            handleChange(name, value, index, province)
                          }}
                        ></input>
                        <input
                          className='input-setting'
                          name='Code'
                          value={update[index] ? update[index].Code : ''}
                          onChange={(e) => {
                            let {name, value} = e.target
                            handleChange(name, value, index, province)
                          }}
                        ></input>
                        <button
                          type='button'
                          className='add-confirm'
                          data-bs-dismiss='modal'
                          onClick={() => {
                            handleUpdate(index, province.id)
                          }}
                        >
                          Cập nhật
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <i
                className='fa-solid fa-trash-can button-setting'
                onClick={() => {
                  handleDelete(province.id);
                }}
              ></i>
            </div>
          </div>
        ))
    )
  }
  return (
    <>
      <div className='d-flex flex-column w-25 h-100 align-items-end'>
        <>
          <button className='add-button' data-bs-toggle='modal' data-bs-target='#addModal'>
            <span className='add-text'>Thêm</span>
            <i className='fa-solid fa-plus button-setting '></i>
          </button>
          <div
            className='modal fade'
            id='addModal'
            tabIndex={-1}
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog '>
              <div className='modal-content w-425px mx-auto ' style={{top: '200px'}}>
                <div className='modal-body'>
                  <div className='d-flex flex-column w-100'>
                    <div className='d-flex flex-row w-100 justify-content-between'>
                      <div>
                        <label className='fs-6 fw-bold'>Tên tỉnh/ thành phố</label>
                        <input
                          className='input-setting'
                          placeholder='Vd: Hồ Chí Minh'
                          value={info.Name}
                          onChange={(e) => {
                            let {value} = e.target
                            setInfo({
                              ...info,
                              Name: value,
                            })
                          }}
                        ></input>
                      </div>
                      <div className='d-flex flex-column'>
                        <label className='fs-6 fw-bold'>Mã tỉnh/thành phố</label>
                        <input
                          className='input-setting'
                          placeholder='Vd: HCM'
                          value={info.Code}
                          onChange={(e) => {
                            let {value} = e.target
                            setInfo({
                              ...info,
                              Code: value,
                            })
                          }}
                        ></input>
                      </div>
                    </div>
                    <div className='d-flex justify-content-end mt-4'>
                      <button
                        type='button'
                        className='add-confirm'
                        data-bs-dismiss='modal'
                        onClick={() => {
                          handleAdd()
                        }}
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
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
            <div className='w-100'>{ListProvince()}</div>
          </div>
        ) : (
          <div className='w-100 d-flex justify-content-center'>
            <Spinner animation='border' variant='primary' />
          </div>
        )}
      </div>
    </>
  )
}
