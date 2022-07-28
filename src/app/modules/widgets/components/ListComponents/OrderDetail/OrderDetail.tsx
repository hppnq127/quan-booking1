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
                <span>Không được cấp quyền chỉnh sửa</span>
              </div>
            </div>
            {/* Thông tin đơn đặt */}
            <div
              className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6 mb-3'
              onClick={() => {
                handleFix()
              }}
            >
              <div className='px-8 py-3' style={{fontWeight: '600'}}>
                {' '}
                THÔNG TIN ĐƠN ĐẶT
              </div>
              <div>
                <div className=' d-flex flex-row justify-content-evenly w-100'>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Mã đơn đặt' value={infoBooking.id} />
                    <FormItem lableName='Mã bài đăng' value='' />
                    <FormItem lableName='Tên phòng' value={infoBooking.StudioRoom.Name} />
                    <FormItem
                      lableName='Ngày đặt đơn'
                      value={<ConvertCreationTime CreationTime={infoBooking.CreationTime} />}
                    />
                    <FormItem lableName='Ngày thực hiện' value={OrderByTimes()} />
                  </div>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Số định danh' value='Demo' />
                    <FormItem lableName='Tên khách hàng' value={infoBooking.BookingUserName} />
                    <FormItem lableName='Số điện thoại' value={infoBooking.BookingPhone} />
                    <FormItem lableName='Email' value={infoBooking.BookingEmail} />
                    <FormItem
                      lableName='Trạng thái đơn đặt'
                      value={
                        infoBooking.BookingStatus === 0
                          ? 'Chờ thực hiện'
                          : infoBooking.BookingStatus === 1
                          ? 'Hoàn tất'
                          : infoBooking.BookingStatus === 2
                          ? 'Đã hủy'
                          : infoBooking.BookingStatus === 3
                          ? 'Vắng mặt'
                          : ''
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Tính tiền */}
            <div
              className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6 mb-3'
              onClick={() => {
                handleFix()
              }}
            >
              <div>
                <div className=' d-flex flex-row justify-content-evenly w-100'>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Tổng tạm tính' value='hello' />
                    <FormItem lableName='Khuyến mãi' value='hello' />
                  </div>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Mã khuyến mãi' value='hello' />
                    <FormItem lableName='Tổng tiền' value='hello' />
                  </div>
                </div>
              </div>
            </div>
            {/* Thông tin thanh toán */}
            <div
              className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6 mb-3 '
              onClick={() => {
                handleFix()
              }}
            >
              <div className='px-8 py-3' style={{fontWeight: '600'}}>
                THÔNG TIN THANH TOÁN
              </div>
              <div>
                <div className=' d-flex flex-row justify-content-evenly w-100'>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Hình thức thanh toán' value='hello' />
                    <FormItem lableName='Cổng thanh toán' value='hello' />
                  </div>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Trạng thái thanh toán' value='hello' />
                    <FormItem lableName='Tiền cọc' value='hello' />
                  </div>
                </div>
              </div>
            </div>
            {/* Hủy đơn */}
            <div
              className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6 mb-3'
              onClick={() => {
                handleFix()
              }}
            >
              <div className='px-8 py-3' style={{fontWeight: '600'}}>
                HỦY ĐƠN
              </div>
              <div>
                <div className=' d-flex flex-row justify-content-evenly w-100'>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Ngày hủy' value='hello' />
                    <FormItem lableName='Lý do hủy đơn' value='hello' />
                    <FormItem lableName='Số tài khoản nhận tiền' value='hello' />
                    <FormItem lableName='Số tiền được hoàn' value='hello' />
                  </div>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Hủy đơn miễn phí' value='hello' />
                    <FormItem lableName='Hạn hủy đơn miễn phí' value='hello' />
                    <FormItem lableName='Phí hủy đơn' value='hello' />
                    <div className='d-flex align-items-center h-100 pt-5'>
                      <label className='check-custom'>
                        Đã hoàn tiền
                        <input type='checkbox' checked />
                        <span className='checkmark-custom' />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Vắng mặt */}
            <div
              className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6 mb-3'
              onClick={() => {
                handleFix()
              }}
            >
              <div className='px-8 py-3' style={{fontWeight: '600'}}>
                VẮNG MẶT
              </div>
              <div>
                <div className=' d-flex flex-row justify-content-evenly w-100'>
                  <div className='d-flex flex-column' style={{width: '47%'}}>
                    <FormItem lableName='Phí vắng mặt' value='hello' />
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
