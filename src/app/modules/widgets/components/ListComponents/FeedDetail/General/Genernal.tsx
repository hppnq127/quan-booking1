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
        <span className='pag-header'> Qu???n l?? b??i ????ng</span>
        <i className='fa-solid fa-angle-right icon-header px-5'></i>{' '}
        <span className='pag-name'>Th??ng tin chung</span>
      </div>
      <div className='d-flex flex-column pt-5'>
        <div className='w-100  d-flex justify-content-between'>
          <div style={{width: '48%'}}>
            <FormItem lableName='S??? ?????nh danh' value='' />
          </div>
          <div style={{width: '48%'}}>
            <FormItem lableName='M?? b??i ????ng' value='' />
          </div>
        </div>
        <div className='w-100  d-flex justify-content-between'>
          <div style={{width: '48%'}}>
            <FormItem lableName='Ti??u ?????' value={infoFeed.Name} />
          </div>
          <div style={{width: '48%'}}>
            <FormItem lableName='?????a ch???' value={infoFeed.Address} />
          </div>
        </div>
        <div className='w-100  d-flex justify-content-between'>
          <div style={{width: '22%'}}>
            <FormItem lableName='Th???i gian l??m vi???c (Bu???i s??ng)' value={morning()} />
          </div>
          <div style={{width: '22%'}}>
            <FormItem lableName='Th???i gian l??m vi???c (Bu???i chi???u)' value={afternoon()} />
          </div>
          <div style={{width: '22%'}}>
            <FormItem lableName='S??? ????n ?????t' value={infoFeed?.BookingCount} />
          </div>
          <div style={{width: '22%'}}>
            <FormItem
              lableName='Tr???ng th??i'
              value={infoFeed.IsDeleted ? '????ng / Kh??ng th??? ?????t' : 'M??? / C?? th??? ?????t'}
            />
          </div>
        </div>
        <div className='w-100  d-flex justify-content-between'>
          <div style={{width: '22%'}}>
            <FormItem lableName='Ng??y ????ng' value={convertTime(infoFeed.CreationTime)} />
          </div>
          <div style={{width: '22%'}}>
            <FormItem
              lableName='C???p nh???t g???n nh???t'
              value={convertTime(infoFeed.LastModificationTime)}
            />
          </div>
          <div style={{width: '48%'}}>
            <FormItem lableName='Ghi ch??' value='' />
          </div>
        </div>
        <div className='w-100  d-flex justify-content-between'>
          <div style={{width: '48%'}}>
            <div className='fs-5 ps-5 py-2' style={{color: '#616161'}}>
              ???nh ?????i di???n
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
            <FormItem lableName='M?? t???' value={infoFeed.Description} />
          </div>
        </div>
      </div>
    </>
  )
}
