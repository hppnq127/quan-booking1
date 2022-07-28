import { URL_BOOKING_STUDIO_IMG } from "../../../../../../../setup/URL"
import { convertTime } from "../../../../../../components/ConvertTime/ConvertCreationTime"
import '../NotiPartner.scss'
type typeNotiProps = {
  loading?:boolean,
  data?:any
}
export const NotiType = (props:typeNotiProps) => {
  const {data,loading}= props
  const typeNoti = () => {
 
    if (data.Type === 1) {
      return (
        <>
          <img alt='' src='/media/icons/duotune/abstract/sale.png' />
          <span className='noti-type-name-sale'>Khuyến mãi</span>
        </>
      )
    }
    if (data.Type === 2) {
      return (
        <>
          <img alt='' src='/media/icons/duotune/abstract/event.png' />
          <span className='noti-type-name-event'>Sự kiện</span>
        </>
      )
    }
    if (data.Type === 3) {
      return (
        <>
          <img alt='' src='/media/icons/duotune/abstract/term.png' />
          <span className='noti-type-name-term'>Chính sách</span>
        </>
      )
    }
    return  <span className='fs-2' style={{fontWeight:'700'}}>Khác</span>
  }

  return (
    <>
     {loading? (<> <div className='noti-type-header'>{typeNoti()}</div>
      <div className='noti-type-title'>{data.Title}</div>
      <div className='noti-type-time'>{convertTime(data.SendingTime)}</div>
      <img
        className='noti-type-pic'
        alt='PictureType'
        src={`${URL_BOOKING_STUDIO_IMG}${data.Image}`}
      />
      <div className='noti-type-content'>
       {data.Content}
      </div></>):(<div className="d-flex justify-content-center"><div className="lds-circle "><div></div></div></div>)
     }
    </>
  )
}
