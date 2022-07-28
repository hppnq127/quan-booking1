import axios from 'axios'
import  {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import { URL_BOOKING_STUDIO } from '../../../../../../setup/URL'
import { convertTime } from '../../../../../components/ConvertTime/ConvertCreationTime'
import {NotiType} from './components/NotiType'
import {SendTo} from './components/SendTo'
import './NotiPartner.scss'
export interface NotiDetail {
  id: number
  Title: string
  Content: string
  Type: number
  Status: number
  SendingTime: string
  Image: string|null
  Exception: string|null
  createdAt: string
  updatedAt: string|null
}

export const DetailNotiPartner = () => {
  const location = useLocation()
  const userId: any = location.state
  const [loading, setLoading] = useState(false)
  const [id] = useState<number>(userId.Id)
  const [infoNoti, setInfoNoti] = useState<NotiDetail>({
    id: 0,
  Title: '',
  Content: '',
  Type: 0,
  Status:0,
  SendingTime:'',
  Image: '',
  Exception: '',
  createdAt: '',
  updatedAt:'',
  })
  const getNotiId = () => {
    setLoading(false)
    let promise = axios({
      url: `${URL_BOOKING_STUDIO}notification/noti/${id}`,
      method: 'GET',
    })
    promise.then((result:any) => {
      console.log('Thanh cong')
      //Nếu gọi api thành công
      // => set lại state
      setInfoNoti(result.data.message)
      setLoading(true)
    })
    promise.catch((err: { response: { data: any } }) => {
      console.log('That bai')
      console.log(err.response.data)
    })
  }
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getNotiId()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: ' 97%',
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {' '}
        <div className='body'>
          <div className='header-item'>
            <span className='header-label'>Ngày tạo:</span>
            {loading? (<span>{convertTime(infoNoti.createdAt)}</span>): (<span>Loading...</span>)}
          </div>
          <div className='header-item'>
            <span className='header-label'>Trạng thái:</span>
            {loading? (<span>Đã gửi</span>):(<span>Loading...</span>)}
          </div>
        </div>
        <div className='body'>
          <SendTo name='đối tác' loading={loading} data={infoNoti}/>
        </div>
        <div className='body'>
          <NotiType loading={loading} data={infoNoti} />
        </div>
      </div>
    </div>
  )
}

