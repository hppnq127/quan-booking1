import {useEffect, useState} from 'react'
import Axios, {AxiosResponse} from 'axios'
import {useLocation, useNavigate} from 'react-router-dom'
import Moment from 'moment'
import {convertTime} from '../../../../components/ConvertTime/ConvertCreationTime'
import {LoadingEffect} from '../../../../components/LoadingEffect/LoadingEffect'
import {FormItem} from '../../../../components/FormItem/FormItem'
import { URL_BOOKING_STUDIO } from '../../../../../setup/URL'
export interface USER {
  id: number
  IdentifierCode: null | string
  Phone: string
  Email: string
  NumberOfOrder: number
  CreationTime: string
  LastModificationTime: string
  IsDeleted: boolean
  GoogleEmail: string
  FacebookEmail: string
  GoogleName: string
}
export const EditUser = () => {
  const [infoUser, setInfoUser] = useState<USER>({
    id: 1,
    IdentifierCode: '',
    Phone: '',
    Email: '',
    NumberOfOrder: 0,
    CreationTime: '',
    LastModificationTime: '',
    IsDeleted: false,
    GoogleEmail: '',
    FacebookEmail: '',
    GoogleName: '',
  })
  const navigate = useNavigate()
  const location = useLocation()
  const userId: any = location.state
  const [loading, setLoading] = useState(false)
  const [id] = useState<number>(userId.Id)
  const getUserId = () => {
    setLoading(false)
    let promise = Axios({
      url: `${URL_BOOKING_STUDIO}booking-user/${id}`,
      method: 'GET',
    })
    promise.then((result: AxiosResponse<any>) => {
      console.log('Thanh cong')
      setInfoUser(result.data)
      setLoading(true)
    })
    promise.catch((err) => {
      console.log('That bai')
      console.log(err.response.data)
    })
  }
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUserId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const stringMoment = `${Moment().toISOString()}`
  const thisMoment = Moment(`${stringMoment.slice(0, 23)}-07:00`)
  const modify = `${thisMoment.toISOString()}`
  const blockPartner = () => {
    Axios({
      url: `${URL_BOOKING_STUDIO}booking-user/${id}`,
      method: 'PATCH',
      data: {...infoUser, IsDeleted: true, LastModificationTime: modify},
    })
    setTimeout(() => {
      navigate('/crafted/pages/profile/projects')
    }, 1000)
  }
  const handleType = () => {
    if (infoUser.IsDeleted === false) {
      return (
        <div className='d-flex justify-content-end'>
          <button
            className=' rounded text-white '
            style={{
              height: '60px',
              width: '260px',
              backgroundColor: '#E22828',
              border: 'none',
              fontWeight: '700',
              marginRight: '30px',
              marginTop: '30px',
            }}
            data-bs-toggle='modal'
            data-bs-target='#BlockUserModal' /*  onClick={ ()=>{ blockPartner() }} */
          >
            KH??A T??I KHO???N
          </button>
          <div
            className='modal fade '
            id='BlockUserModal'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabIndex={-1}
            aria-labelledby='staticBackdropLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='ps-5 pe-12 py-5 d-flex flex-row modal-f-header w-100'>
                  <img alt='' src='/media/icons/duotune/question.png' className='me-6'></img>
                  <span className='d-flex align-items-center'>
                    {' '}
                    B???n c?? ch???c r???ng mu???n kh??a t??i kho???n ng?????i d??ng n??y?
                  </span>
                </div>
                <div className='w-100 position-relative d-flex justify-content-center  pt-4 pb-6 textareaFocus '>
                  <label
                    className='position-absolute bg-white fs-5 fw-semibold px-1 '
                    style={{
                      transform: `translate(${0}px, ${-11}px)`,
                      color: '#616161',
                      left: '38px',
                    }}
                  >
                    Ghi ch??
                  </label>
                  <textarea
                    className='fs-5 px-4 py-3 rounded  w-100 mx-8 d-flex flex-row '
                    name='Email'
                    id='exampleFormControlTextarea1'
                    rows={5}
                    defaultValue={''}
                    placeholder='L?? do kh??a t??i kho???n'
                    
                  />
                </div>
                <div className='d-flex flex-row justify-content-end pe-4 mb-8'>
                  <button
                    type='button'
                    className='mx-4 px-8 py-3 backEdit '
                    data-bs-dismiss='modal'
                  >
                    TR??? V???
                  </button>
                  <button
                    className='mx-4 blockEdit'
                    onClick={() => {
                      blockPartner()
                    }}
                    data-bs-dismiss='modal'
                  >
                    KH??A
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (infoUser.IsDeleted === true) {
      return (
        <div className='block-container'>
          <div className='unblock-content'>
            <img alt='' src='/media/icons/duotune/abstract/block.png' className='pe-4'></img>T??i
            kho???n ??ang b??? kh??a
          </div>
          <button className='unblock' /*  onClick={()=> {handleUnblock()}} */>
            M??? KH??A T??I KHO???N
          </button>
        </div>
      )
    }
  }
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '97%',
        height: '92%',
      }}
    >
      <div
        className='w-100'
        style={{
          paddingTop: '1.5%',
          paddingBottom: '1.5%',
          backgroundColor: '#F6F6F6',
        }}
      >
        {loading ? (
          <div
            className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6'
            style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)'}}
          >
            <div className=' d-flex flex-row w-100'>
              <div className=' d-flex flex-column w-50 px-10'>
                <FormItem lableName='S??? ?????nh danh' value={infoUser.IdentifierCode} />
                <FormItem lableName='S??? ??i???n tho???i' value={infoUser.Phone} />
              </div>
              <div className=' d-flex flex-column w-50 px-10'>
                <FormItem lableName='T??n t??i kho???n' value='' />
                <FormItem lableName='T??i kho???n Google' value={infoUser.Email} />
              </div>
            </div>

            <div className='w-100 position-relative d-flex justify-content-center py-4 px-10'>
              <FormItem lableName='T??i kho???n Facebook' value={infoUser.FacebookEmail} />
            </div>
            <div className='w-100 d-flex flex-row justify-content-evenly '>
              <div
                className=' position-relative d-flex justify-content-center '
                style={{width: '22%'}}
              >
                <FormItem lableName='Ng??y t???o' value={convertTime(infoUser.CreationTime)} />
              </div>
              <div
                className=' position-relative d-flex justify-content-center '
                style={{width: '21.5%'}}
              >
                <FormItem
                  lableName='C???p nh???t g???n nh???t'
                  value={convertTime(infoUser.LastModificationTime)}
                />
              </div>
              <div
                className=' position-relative d-flex justify-content-center'
                style={{width: '21.5%'}}
              >
                <FormItem lableName='S??? ????n ?????t' value={infoUser.NumberOfOrder} />
              </div>
              <div
                className=' position-relative d-flex justify-content-center'
                style={{width: '22%'}}
              >
                <FormItem
                  lableName='Tr???ng th??i'
                  value={infoUser.IsDeleted === true ? 'Cancel' : 'Active'}
                />
              </div>
            </div>
            <div className='w-50 position-relative d-flex justify-content-center py-4 ps-10'>
              <FormItem lableName='Ghi ch??' value='' />
            </div>
          </div>
        ) : (
          <div className='d-flex align-items-center justify-content-center w-100 h-400px'>
            <LoadingEffect />
          </div>
        )}

        {handleType()}
      </div>
    </div>
  )
}
