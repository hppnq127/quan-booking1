import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Axios, {AxiosResponse} from 'axios'
import {Partner} from '../DetailPartner'
import Moment from 'moment'
import './EditPartner.scss'
import {convertTime} from '../../../../../components/ConvertTime/ConvertCreationTime'
import {LoadingEffect} from '../../../../../components/LoadingEffect/LoadingEffect'
import {FormInputItem, FormItem} from '../../../../../components/FormItem/FormItem'
import { URL_BOOKING_STUDIO } from '../../../../../../setup/URL'
export const EditPartner = () => {
  const [editPartner, setEditPartner] = useState<Partner>({
    Address: '',
    BankAccount: '',
    BankAccountOwnerName: '',
    BankBranchName: '',
    BusinessRegistrationLicenseNumber: '',
    CreationTime: '',
    Email: '',
    RepresentativeName: '',
    IdentifierCode: '',
    IsDeleted: null,
    LastModificationTime: '',
    NumberOfPost: 0,
    OtherPhone: '',
    PartnerName: '',
    Phone: '',
    id: 0,
  })
  const navigate = useNavigate()
  const location = useLocation()
  const userId: any = location.state
  const [loading, setLoading] = useState(false)
  const [id] = useState<number>(userId.Id)
  const [errors, setErrors] = useState(false)
  const [update, setUpdate] = useState(false)
  const [block, setBlock] = useState(false)
  const [unblock, setUnblock] = useState(false)
  // eslint-disable-next-line no-useless-escape
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const getPartnerId = () => {
    setLoading(false)
    let promise = Axios({
      url: `${URL_BOOKING_STUDIO}register-partner/${id}`,
      method: 'GET',
    })
    promise.then((result: AxiosResponse<any>) => {
      console.log('Thanh cong')
      //Nếu gọi api thành công
      // => set lại state
      setEditPartner(result.data)

      setLoading(true)
    })
    promise.catch((err) => {
      console.log('That bai')
      console.log(err.response.data)
    })
  }
  useEffect(() => {
    getPartnerId()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(editPartner)

  const handleChangeValue = (name: string, value: any) => {
    setEditPartner({...editPartner, [name]: value})
    if (name === 'Email') {
      if (regex.test(value) === false) {
        setErrors(true)
      } else {
        setErrors(false)
      }
    }
  }
  const stringMoment = `${Moment().toISOString()}`
  const thisMoment = Moment(`${stringMoment.slice(0, 23)}-07:00`)
  const modify = `${thisMoment.toISOString()}`
  const updateInfo = () => {
    if (errors === true) {
      alert('Vui lòng điền đúng thông tin!')
    } else {
      Axios({
        url: `${URL_BOOKING_STUDIO}register-partner/update/${id}`,
        method: 'PATCH',
        data: {...editPartner, LastModificationTime: modify},
      })
      setUpdate(true)
      setTimeout(() => {
        navigate('/crafted/pages/profile/overview')
      }, 1000)
    }
  }

  const blockPartner = () => {
    Axios({
      url: `${URL_BOOKING_STUDIO}register-partner/update/${id}`,
      method: 'PATCH',
      data: {IsDeleted: true, LastModificationTime: modify},
    })
    setBlock(true)
    setTimeout(() => {
      navigate('/crafted/pages/profile/overview')
    }, 1000)
  }
  const handleUnblock = () => {
    Axios({
      url: `${URL_BOOKING_STUDIO}register-partner/update/${id}`,
      method: 'PATCH',
      data: {IsDeleted: false, LastModificationTime: modify},
    })
    setUnblock(true)
    setTimeout(() => {
      navigate('/crafted/pages/profile/overview')
    }, 1000)
  }

  const handleType = () => {
    if (editPartner.IsDeleted === false) {
      return (
        <div className='d-flex flex-row'>
          <div className='' style={{backgroundColor: '#E3FAF4', width: '75%'}}>
            <div className='px-10 py-3'>
              <h1 className='fs-2'>
                {' '}
                <img
                  src='/media/icons/duotune/art/light.png'
                  style={{width: '25px', height: '25px', marginRight: '10px'}}
                  alt='light'
                ></img>
                Lưu ý khi thay đổi thông tin:
              </h1>
              <p className='fs-4'>
                1. Thông tin được thay đổi: phần thông tin trong ô{' '}
                <span style={{color: '#03AC84'}}>màu xanh</span> và hình ảnh
              </p>
              <p className='fs-4'>
                2. <span style={{fontWeight: '700'}}>Số điện thoại:</span> admin chỉ thay đổi khi
                Đối tác liên hệ trực tiếp qua Hotline, cung cấp chính xác các thông tin theo yêu cầu
                và trả lời đúng câu hỏi bảo mật HOẶC khi Đối tác trực tiếp đến văn phòng
              </p>
            </div>
          </div>
          <div className='d-flex flex-column  h-auto w-25'>
            <div className='h-50 w-100 d-flex  justify-content-center align-items-center '>
              <button
                className='w-75 rounded text-white'
                style={{
                  height: '70%',
                  backgroundColor: '#03AC84',
                  border: 'none',
                  fontWeight: '700',
                }}
                onClick={() => {
                  updateInfo()
                }}
              >
                LƯU THAY ĐỔI
              </button>
            </div>
            <div className='h-50 w-100 d-flex  justify-content-center align-items-center'>
              <button
                className='w-75 rounded text-white'
                style={{
                  height: '70%',
                  backgroundColor: '#E22828',
                  border: 'none',
                  fontWeight: '700',
                }}
                data-bs-toggle='modal'
                data-bs-target='#BlockModal'
              >
                KHÓA TÀI KHOẢN
              </button>
              {/* Block Modal */}
              <div
                className='modal fade '
                id='BlockModal'
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
                        Bạn có chắc rằng muốn khóa tài khoản người dùng này?
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
                        Ghi chú
                      </label>
                      <textarea
                        className='fs-5 px-4 py-3 rounded  w-100 mx-8 d-flex flex-row '
                        name='Email'
                        id='exampleFormControlTextarea1'
                        rows={5}
                        defaultValue={''}
                        placeholder='Lý do khóa tài khoản'
                        onChange={(e) => {
                          let {name, value} = e.target
                          handleChangeValue(name, value)
                        }}
                      />
                    </div>
                    <div className='d-flex flex-row justify-content-end pe-4 mb-8'>
                      <button
                        type='button'
                        className='mx-4 px-8 py-3 backEdit '
                        data-bs-dismiss='modal'
                      >
                        TRỞ VỀ
                      </button>
                      <button
                        className='mx-4 blockEdit'
                        onClick={() => {
                          blockPartner()
                        }}
                        data-bs-dismiss='modal'
                      >
                        KHÓA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (editPartner.IsDeleted === true) {
      return (
        <div className='block-container'>
          <div className='unblock-content'>
            <img alt='' src='/media/icons/duotune/abstract/block.png' className='pe-4'></img>Tài
            khoản đang bị khóa
          </div>
          <button
            className='unblock'
            onClick={() => {
              handleUnblock()
            }}
          >
            MỞ KHÓA TÀI KHOẢN
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
        overflowY: 'scroll',
        position: 'relative',
      }}
    >
      <div
        className=''
        style={{
          width: 'inherit',
          position: 'absolute',
          paddingTop: '1.5%',
          paddingBottom: '1.5%',
          backgroundColor: '#F6F6F6',
        }}
      >
        {loading ? (
          <div className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6'>
            {/* Done Update */}
            <div className={update === true ? 'done-update-container' : 'd-none'}>
              <div className='done-update '>
                <img alt='' src='/media/icons/duotune/abstract/success.png' className='me-5'></img>
                <span className='done-update-content'>Cập nhật hoàn tất</span>
              </div>
            </div>
            {/* Done Block */}
            <div className={block === true ? 'done-block-container' : 'd-none'}>
              <div className='done-block'>
                <img alt='' src='/media/icons/duotune/abstract/block.png' className='me-5'></img>
                <span className='done-block-content'>Đã khóa tài khoản</span>
              </div>
            </div>
            {/* Done Unblock */}
            <div className={unblock === true ? 'done-update-container' : 'd-none'}>
              <div className='done-update'>
                <img alt='' src='/media/icons/duotune/abstract/success.png' className='me-5'></img>
                <span className='done-update-content'>Đã mở khóa tài khoản</span>
              </div>
            </div>

            {/* .......................... */}
            <div className='d-flex flex-column bg-white py-5 '>
              <div className=' d-flex flex-row justify-content-evenly'>
                <div className='d-flex flex-column' style={{width: '47%'}}>
                  <FormItem lableName=' Số định danh' value={editPartner.IdentifierCode} />
                  <FormInputItem
                    lableName='Email'
                    value={editPartner.Email}
                    name='Email'
                    errors={errors}
                    onChange={(e: any) => {
                      let {name, value} = e.target
                      handleChangeValue(name, value)
                    }}
                  />

                  <div className='w-100 position-relative d-flex justify-content-center py-4'>
                    <label
                      className='position-absolute bg-white fs-5 fw-semibold px-1 '
                      style={{
                        transform: `translate(${0}px, ${-11}px)`,
                        color: '#03AC84',
                        left: '12px',
                      }}
                    >
                      Tổ chức
                    </label>
                    <div
                      placeholder='Nhập thông tin'
                      className='fs-5 px-4 py-3 rounded w-100 '
                      style={{border: '1px solid #03AC84', color: '#616161'}}
                    >
                      {/* Put props in */} Demo
                    </div>
                  </div>
                  <FormInputItem
                    lableName='Số GPĐKKD'
                    value={editPartner.BusinessRegistrationLicenseNumber}
                    name='BusinessRegistrationLicenseNumber'
                    onChange={(e: any) => {
                      let {name, value} = e.target
                      handleChangeValue(name, value)
                    }}
                  />
                  <FormInputItem
                    lableName='Người đại diện'
                    value={editPartner.RepresentativeName}
                    name='RepresentativeName'
                    onChange={(e: any) => {
                      let {name, value} = e.target
                      handleChangeValue(name, value)
                    }}
                  />
                  <FormInputItem
                    lableName='Số CMND/CCCD'
                    value='value'
                    name='noname'
                    /* onChange={(e: any) => {
                      let {name, value} = e.target
                      handleChangeValue(name, value)
                    }} */
                  />
                  <FormInputItem
                    lableName='Địa chỉ liên hệ'
                    value={editPartner.Address}
                    name='Address'
                    onChange={(e: any) => {
                      let {name, value} = e.target
                      handleChangeValue(name, value)
                    }}
                  />

                  <div className='w-100 position-relative d-flex justify-content-center py-4'>
                    <label
                      className='position-absolute bg-white fs-5 fw-semibold px-1 '
                      style={{
                        transform: `translate(${0}px, ${-11}px)`,
                        color: ' #03AC84',
                        left: '12px',
                      }}
                    >
                      Tài khoản ngân hàng
                    </label>

                    <div
                      placeholder='Nhập thông tin'
                      className='fs-5 px-4 py-3 rounded  w-100 '
                      style={{border: '1px solid #03AC84', color: '#616161'}}
                    >
                      <div className='w-50 d-inline-block focus-me'>
                        <label className=' text-danger'>Số tài khoản:</label>
                        <input
                          placeholder='Nhập thông tin'
                          className='fs-5  py-3 rounded w-50  text-start'
                          style={{border: 'none', color: '#616161'}}
                          name='BankAccount'
                          value={editPartner.BankAccount}
                          onChange={(e) => {
                            let {name, value} = e.target
                            handleChangeValue(name, value)
                          }}
                        />
                      </div>
                      <div className='w-50 d-inline-block focus-me'>
                        <label className=' text-danger'>Chủ tài khoản:</label>
                        <input
                          placeholder='Nhập thông tin'
                          className='fs-5  py-3 rounded w-50 input-focus-border-color-white  '
                          style={{border: 'none', color: '#616161'}}
                          name='BankAccountOwnerName'
                          value={editPartner.BankAccountOwnerName}
                          onChange={(e) => {
                            let {name, value} = e.target
                            handleChangeValue(name, value)
                          }}
                        />
                      </div>
                      <div className='w-50 d-inline-block focus-me'>
                        <label className=' text-danger'>Ngân hàng:</label>
                        <input
                          placeholder='Nhập thông tin'
                          className='fs-5  py-3 rounded w-50  '
                          style={{border: 'none', color: '#616161'}}
                          name='BankBranchName'
                          value={editPartner.BankBranchName}
                          onChange={(e) => {
                            let {name, value} = e.target
                            handleChangeValue(name, value)
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='d-flex flex-column'>
                    <div className='d-flex flex-row justify-content-between'>
                      <div style={{width: '47%'}}>
                        <FormItem
                          lableName='Ngày tạo'
                          value={convertTime(editPartner.CreationTime)}
                        />
                      </div>
                      <div style={{width: '47%'}}>
                        <FormItem
                          lableName='Ngày cập nhật gần nhất'
                          value={convertTime(editPartner.LastModificationTime)}
                        />
                      </div>
                    </div>
                    <div className='d-flex flex-row justify-content-between'>
                      <div style={{width: '47%'}}>
                        <FormItem lableName='Số bài đăng' value={editPartner.NumberOfPost} />
                      </div>
                      <div style={{width: '47%'}}>
                        <FormItem
                          lableName='Trạng thái'
                          value={editPartner.IsDeleted ? 'Cancel' : 'Active'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='d-flex flex-column' style={{width: '47%'}}>
                  <FormItem lableName='Tên đối tác' value={editPartner.PartnerName} />
                  <FormInputItem
                    lableName='Số điện thoại'
                    value={editPartner.Phone}
                    name='Phone'
                    onChange={(e: any) => {
                      let {name, value} = e.target
                      handleChangeValue(name, value)
                    }}
                  />
                  <div
                    className='w-100 d-flex flex-row text-center justify-content-evenly mb-10'
                    style={{height: '120px'}}
                  >
                    <div className='d-flex flex-column fs-6 ' style={{width: '46%'}}>
                      Hình chụp GPKD mặt trước
                      <div
                        style={{border: '1px dashed #B2B2B2', borderRadius: '10px'}}
                        className='w-80 h-100 mx-auto'
                      >
                        <img
                          alt='hello'
                          src='/media/noimg/noimage.png'
                          className='w-100 h-100 '
                          style={{borderRadius: '10px'}}
                        />
                      </div>
                    </div>
                    <div className='d-flex flex-column fs-6' style={{width: '46%'}}>
                      Hình chụp GPKD mặt sau
                      <div
                        style={{border: '1px dashed #B2B2B2', borderRadius: '10px'}}
                        className='w-80 h-100 mx-auto'
                      >
                        <img
                          alt='hello'
                          src='/media/noimg/noimage.png'
                          className='w-100 h-100 '
                          style={{borderRadius: '10px'}}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className='w-100 d-flex flex-row text-center justify-content-evenly '
                    style={{height: '120px', marginBottom: '31px'}}
                  >
                    <div className='d-flex flex-column fs-6' style={{width: '46%'}}>
                      CMND/CCCD mặt trước
                      <div
                        style={{border: '1px dashed #B2B2B2', borderRadius: '10px'}}
                        className='w-80 h-100 mx-auto'
                      >
                        <img
                          alt='hello'
                          src='/media/noimg/noimage.png'
                          className='w-100 h-100 '
                          style={{borderRadius: '10px'}}
                        />
                      </div>
                    </div>
                    <div className='d-flex flex-column fs-6' style={{width: '46%'}}>
                      CMND/CCCD mặt sau
                      <div
                        style={{border: '1px dashed #B2B2B2', borderRadius: '10px'}}
                        className='w-80 h-100 mx-auto'
                      >
                        <img
                          alt='hello'
                          src='/media/noimg/noimage.png'
                          className='w-100 h-100 '
                          style={{borderRadius: '10px'}}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='w-100 position-relative d-flex justify-content-center py-4'>
                    <label
                      className='position-absolute bg-white fs-5 fw-semibold px-1 '
                      style={{
                        transform: `translate(${0}px, ${-11}px)`,
                        color: '#616161',
                        left: '12px',
                      }}
                    >
                      Hợp đồng đối tác
                    </label>
                    <div
                      placeholder='Nhập thông tin'
                      className='fs-5 px-4 py-3 rounded border border-2 w-100 '
                      style={{borderColor: '#B2B2B2', color: '#616161'}}
                    >
                      {/* PUT props in */} Demo
                    </div>
                  </div>
                  <FormItem lableName='Câu hỏi bảo mật' value='value' />
                  <FormItem lableName='Trả lời câu hỏi bảo mật' value='value' />
                  <FormItem lableName='Ghi chú' value='value' />
                </div>
              </div>
            </div>
            {handleType()}
          </div>
        ) : (
          <div className='d-flex align-items-center justify-content-center w-100 h-600px'>
            <LoadingEffect />
          </div>
        )}
      </div>
    </div>
  )
}
