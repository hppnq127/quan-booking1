import { URL_BOOKING_STUDIO_IMG } from '../../../../../../../setup/URL'
import {convertTime} from '../../../../../../components/ConvertTime/ConvertCreationTime'
import {FormItem} from '../../../../../../components/FormItem/FormItem'
import '../FeedDetail.scss'
export type GenernalProps = {
  infoFeed: {
    Address: string
    BookingCount: number
    CreationTime: string
    CreatorUserId: number
    DeleterUserId: number
    DeletionTime: string
    Description: string | null
    HourCloseDefault: number
    HourOpenDefault: number
    Image1: string | null
    Image2: string | null
    Image3: string | null
    Image4: string | null
    Image6: string | null
    Image5: string | null
    Image7: string | null
    Image8: string | null
    Image9: string | null
    Image10: string | null
    Image11: string | null
    Image12: string | null
    Image13: string | null
    Image14: string | null
    Image15: string | null
    Image16: string | null
    Image17: string | null
    Image18: string | null
    Image19: string | null
    Image20: string | null
    IsDeleted: boolean
    IsHotDeal: boolean
    LastModificationTime: string
    LastModifierUserId: number | null
    Latitude: number
    Longtitude: number
    MinutesCloseDefault: number
    MinutesOpenDefault: number
    Name: string
    Price: number
    PriceUnit: string
    Sales: number
    TenantId: number
    id: number
  }
  loading?: boolean
}

export const Genernal = (props: GenernalProps) => {
  const {infoFeed, loading} = props
  console.log(loading)
  const morning = () => {
    if (infoFeed.HourOpenDefault >= 10) {
      return (
        <>
          {' '}
          {infoFeed.HourOpenDefault}:{infoFeed.MinutesOpenDefault} - 11:59
        </>
      )
    } else {
      return (
        <>
          {' '}
          0{infoFeed.HourOpenDefault}:{infoFeed.MinutesOpenDefault} - 11:59
        </>
      )
    }
  }
  const afternoon = () => {
    if (infoFeed.HourCloseDefault >= 10) {
      return (
        <>
          12:00 - {infoFeed.HourCloseDefault}:{infoFeed.MinutesCloseDefault}{' '}
        </>
      )
    } else {
      return (
        <>
          12:00 - 0{infoFeed.HourCloseDefault}:{infoFeed.MinutesCloseDefault}
        </>
      )
    }
  }
  return (
    <>
      <div className=' d-flex align-items-center '>
        <span className='pag-header'> Quản lý bài đăng</span>
        <i className='fa-solid fa-angle-right icon-header px-5'></i>{' '}
        <span className='pag-name'>Thông tin chung</span>
      </div>
      <div className='d-flex flex-column pt-5'>
        <div className='w-100  d-flex justify-content-between'>
          <div style={{width: '48%'}}>
            <FormItem lableName='Số định danh' value='' />
          </div>
          <div style={{width: '48%'}}>
            <FormItem lableName='Mã bài đăng' value='' />
          </div>
        </div>
        <div className='w-100  d-flex justify-content-between'>
          <div style={{width: '48%'}}>
            <FormItem lableName='Tiêu đề' value={infoFeed.Name} />
          </div>
          <div style={{width: '48%'}}>
            <FormItem lableName='Địa chỉ' value={infoFeed.Address} />
          </div>
        </div>
        <div className='w-100  d-flex justify-content-between'>
          <div style={{width: '22%'}}>
            <FormItem lableName='Thời gian làm việc (Buổi sáng)' value={morning()} />
          </div>
          <div style={{width: '22%'}}>
            <FormItem lableName='Thời gian làm việc (Buổi chiều)' value={afternoon()} />
          </div>
          <div style={{width: '22%'}}>
            <FormItem lableName='Số đơn đặt' value={infoFeed?.BookingCount} />
          </div>
          <div style={{width: '22%'}}>
            <FormItem
              lableName='Trạng thái'
              value={infoFeed.IsDeleted ? 'Đóng / Không thể đặt' : 'Mở / Có thể đặt'}
            />
          </div>
        </div>
        <div className='w-100  d-flex justify-content-between'>
          <div style={{width: '22%'}}>
            <FormItem lableName='Ngày đăng' value={convertTime(infoFeed.CreationTime)} />
          </div>
          <div style={{width: '22%'}}>
            <FormItem
              lableName='Cập nhật gần nhất'
              value={convertTime(infoFeed.LastModificationTime)}
            />
          </div>
          <div style={{width: '48%'}}>
            <FormItem lableName='Ghi chú' value='' />
          </div>
        </div>
        <div className='w-100  d-flex justify-content-between'>
          <div style={{width: '48%'}}>
            <div className='fs-5 ps-5 py-2' style={{color: '#616161'}}>
              Ảnh đại diện
            </div>
            {loading ? (
              <img
                src={`${URL_BOOKING_STUDIO_IMG}${infoFeed.Image1}`}
                alt=''
                style={{borderRadius: '10px', width: '300px', height: '200px'}}
              />
            ) : (
              <div
                style={{width: '300px', height: '200px'}}
                className='d-flex justify-content-center align-items-center'
              >
                <div className='spinner-border text-secondary' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            )}
          </div>
          <div style={{width: '48%'}}>
            <FormItem lableName='Mô tả' value={infoFeed.Description} />
          </div>
        </div>
      </div>
    </>
  )
}
