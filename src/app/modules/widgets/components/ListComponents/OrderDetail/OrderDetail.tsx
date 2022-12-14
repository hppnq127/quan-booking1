import {FormItem} from '../../../../../components/FormItem/FormItem'
import {useEffect, useState} from 'react'
import Axios, {AxiosResponse} from 'axios'
import {useLocation} from 'react-router-dom'
import './OrderDetail.scss'
import {LoadingEffect} from '../../../../../components/LoadingEffect/LoadingEffect'
import {
  ConvertCreationTime,
  convertTime,
} from '../../../../../components/ConvertTime/ConvertCreationTime'
import { URL_BOOKING_STUDIO } from '../../../../../../setup/URL'
export interface ORDER {
  id: number
  TenantId: number
  OrderByTime: boolean
  OrderByTimeFrom: string
  OrderByTimeTo: string
  OrderByDateFrom: string
  OrderByDateTo: string
  PaymentType: null | string | number | boolean
  OrderNote: null | string | number | boolean
  BookingUserName: string
  BookingPhone: string
  BookingEmail: null | string
  StudioRoomId: number
  PromoCodeId: null | number
  CreationTime: string
  CreatorUserId: number
  LastModificationTime: string
  LastModifierUserId: null | string
  IsDeleted: boolean
  IsPayDeposit: boolean
  BookingStatus: number
  StudioRoom: {
    Name: string
  }
}

export const OrderDetail = () => {
  const location = useLocation()
  const userId: any = location.state
  const [fix, setFix] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)
  const [id] = useState<number>(userId.Id)
  const [infoBooking, setInfoBooking] = useState<ORDER>({
    id: 0,
    TenantId: 0,
    OrderByTime: false,
    OrderByTimeFrom: '',
    OrderByTimeTo: '',
    OrderByDateFrom: '',
    OrderByDateTo: '',
    PaymentType: '',
    OrderNote: '',
    BookingUserName: '',
    BookingPhone: '',
    BookingEmail: '',
    StudioRoomId: 0,
    PromoCodeId: 0,
    CreationTime: 'string',
    CreatorUserId: 0,
    LastModificationTime: '',
    LastModifierUserId: '',
    IsDeleted: false,
    IsPayDeposit: false,
    BookingStatus: 0,
    StudioRoom: {
      Name: '',
    },
  })

  const OrderByTimes = () => {
    if (infoBooking.OrderByTime === true) {
      return (
        <div className='d-flex flex-row'>
          {convertTime(infoBooking.OrderByTimeFrom)}
          {' - '}
          {convertTime(infoBooking.OrderByTimeTo).slice(-5)}
        </div>
      )
    } else {
      return (
        <div className='d-flex flex-row'>
          {convertTime(infoBooking.OrderByDateFrom).slice(0, 10)}
          {' - '}
          {convertTime(infoBooking.OrderByDateTo).slice(0, 10)}
        </div>
      )
    }
  }

  const getBookingId = () => {
    setLoading(false)
    let promise = Axios({
      url: `${URL_BOOKING_STUDIO}booking/${id}`,
      method: 'GET',
    })
    promise.then((result: AxiosResponse<any>) => {
      console.log('Thanh cong')
      setInfoBooking(result.data)
      setLoading(true)
    })
    promise.catch((err) => {
      console.log('That bai')
      console.log(err.response.data)
    })
  }
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getBookingId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleFix = () => {
    setFix(true)
    setTimeout(() => {
      setFix(false)
    }, 500)
  }
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '98%',
        height: '92%',
        overflowY: 'scroll',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: 'inherit',
          position: 'absolute',
          paddingTop: '1.5%',
          paddingBottom: '1.5%',
          backgroundColor: '#F6F6F6',
        }}
      >
        {loading ? (
          <>
            <div className={fix === true ? 'warning' : 'd-none'}>
              <div className='bg-white warning-content'>
                <img alt='' src='/media/icons/duotune/abstract/warning.png' className='pe-4' />
                <span>Kh??ng ???????c c???p quy???n ch???nh s???a</span>
              </div>
            </div>
            {/* Th??ng tin ????n ?????t */}
            <div
              className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6 mb-3'
              onClick={() => {
                handleFix()
              }}
            >
              <div className='px-8 py-3' style={{fontWeight: '600'}}>
                {' '}
                TH??NG TIN ????N ?????T
              </div>
              <div>
                <div className=' d-flex flex-row justify-content-evenly w-100'>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='M?? ????n ?????t' value={infoBooking.id} />
                    <FormItem lableName='M?? b??i ????ng' value='' />
                    <FormItem lableName='T??n ph??ng' value={infoBooking.StudioRoom.Name} />
                    <FormItem
                      lableName='Ng??y ?????t ????n'
                      value={<ConvertCreationTime CreationTime={infoBooking.CreationTime} />}
                    />
                    <FormItem lableName='Ng??y th???c hi???n' value={OrderByTimes()} />
                  </div>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='S??? ?????nh danh' value='Demo' />
                    <FormItem lableName='T??n kh??ch h??ng' value={infoBooking.BookingUserName} />
                    <FormItem lableName='S??? ??i???n tho???i' value={infoBooking.BookingPhone} />
                    <FormItem lableName='Email' value={infoBooking.BookingEmail} />
                    <FormItem
                      lableName='Tr???ng th??i ????n ?????t'
                      value={
                        infoBooking.BookingStatus === 0
                          ? 'Ch??? th???c hi???n'
                          : infoBooking.BookingStatus === 1
                          ? 'Ho??n t???t'
                          : infoBooking.BookingStatus === 2
                          ? '???? h???y'
                          : infoBooking.BookingStatus === 3
                          ? 'V???ng m???t'
                          : ''
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* T??nh ti???n */}
            <div
              className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6 mb-3'
              onClick={() => {
                handleFix()
              }}
            >
              <div>
                <div className=' d-flex flex-row justify-content-evenly w-100'>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='T???ng t???m t??nh' value='hello' />
                    <FormItem lableName='Khuy???n m??i' value='hello' />
                  </div>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='M?? khuy???n m??i' value='hello' />
                    <FormItem lableName='T???ng ti???n' value='hello' />
                  </div>
                </div>
              </div>
            </div>
            {/* Th??ng tin thanh to??n */}
            <div
              className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6 mb-3 '
              onClick={() => {
                handleFix()
              }}
            >
              <div className='px-8 py-3' style={{fontWeight: '600'}}>
                TH??NG TIN THANH TO??N
              </div>
              <div>
                <div className=' d-flex flex-row justify-content-evenly w-100'>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='H??nh th???c thanh to??n' value='hello' />
                    <FormItem lableName='C???ng thanh to??n' value='hello' />
                  </div>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Tr???ng th??i thanh to??n' value='hello' />
                    <FormItem lableName='Ti???n c???c' value='hello' />
                  </div>
                </div>
              </div>
            </div>
            {/* H???y ????n */}
            <div
              className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6 mb-3'
              onClick={() => {
                handleFix()
              }}
            >
              <div className='px-8 py-3' style={{fontWeight: '600'}}>
                H???Y ????N
              </div>
              <div>
                <div className=' d-flex flex-row justify-content-evenly w-100'>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Ng??y h???y' value='hello' />
                    <FormItem lableName='L?? do h???y ????n' value='hello' />
                    <FormItem lableName='S??? t??i kho???n nh???n ti???n' value='hello' />
                    <FormItem lableName='S??? ti???n ???????c ho??n' value='hello' />
                  </div>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='H???y ????n mi???n ph??' value='hello' />
                    <FormItem lableName='H???n h???y ????n mi???n ph??' value='hello' />
                    <FormItem lableName='Ph?? h???y ????n' value='hello' />
                    <div className='d-flex align-items-center h-100 pt-5'>
                      <label className='check-custom'>
                        ???? ho??n ti???n
                        <input type='checkbox' checked />
                        <span className='checkmark-custom' />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*V???ng m???t */}
            <div
              className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6 mb-3'
              onClick={() => {
                handleFix()
              }}
            >
              <div className='px-8 py-3' style={{fontWeight: '600'}}>
                V???NG M???T
              </div>
              <div>
                <div className=' d-flex flex-row justify-content-evenly w-100'>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Ph?? v???ng m???t' value='hello' />
                  </div>
                  <div className='d-flex flex-column' style={{width: '47%'}}></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='d-flex align-items-center justify-content-center w-100 h-600px'>
            <LoadingEffect />
          </div>
        )}
      </div>
    </div>
  )
}
