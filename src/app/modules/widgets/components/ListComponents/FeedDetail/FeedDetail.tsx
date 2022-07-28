import  {useEffect, useState} from 'react'
import {RoomDetail} from './RoomDetail/RoomDetail'
import { PriceList } from './PriceList/PriceList'
import { Coupon } from './Coupon/Coupon'
import { Genernal, GenernalProps } from './General/Genernal'
import './FeedDetail.scss'
import { useLocation } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { URL_BOOKING_STUDIO } from '../../../../../../setup/URL'
export const FeedDetail = () => {
  const [toggleState, setToggleState] = useState(1)
  const toggleTab = (number: number) => {
    setToggleState(number)
  }
 ////////////////////////
 const location = useLocation()
 const userId: any = location.state
 const [loading, setLoading] = useState(false)
 const [id] = useState<number>(userId.Id)
 const [infoFeed, setInfoFeed] = useState<GenernalProps["infoFeed"]>({
  Address:'',
  BookingCount: 0,
  CreationTime: '',
  CreatorUserId: 0,
  DeleterUserId: 0,
  DeletionTime: '',
  Description: '',
  HourCloseDefault: 0,
  HourOpenDefault:0,
  Image1: '',
  Image2: '',
  Image3: '',
  Image4: '',
  Image6: '',
  Image5: '',
  Image7: '',
  Image8: '',
  Image9: '',
  Image10: '',
  Image11: '',
  Image12:'',
  Image13: '',
  Image14: '',
  Image15: '',
  Image16:'',
  Image17: '',
  Image18:'',
  Image19:'',
  Image20:'',
  IsDeleted:false,
  IsHotDeal:false,
  LastModificationTime:'',
  LastModifierUserId: 0,
  Latitude: 0,
  Longtitude: 0,
  MinutesCloseDefault: 0,
  MinutesOpenDefault: 0,
  Name: '',
  Price: 0,
  PriceUnit: '',
  Sales: 0,
  TenantId: 0,
  id: 0,
})
 
 useEffect(() => {
  const getUserId = () => {
    setLoading(false)
    let promise = axios({
      url: `${URL_BOOKING_STUDIO}studio-post/${id}`,
      method: 'GET',
    })
    promise.then((result: AxiosResponse<any>) => {
      console.log('Thanh cong')
      setInfoFeed(result.data)
      setLoading(true)
    })
    promise.catch((err: { response: { data: any } }) => {
      console.log('That bai')
      console.log(err.response.data)
    })
  }
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   getUserId()
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])
 ////////////////////////
 console.log(infoFeed);
 
  return (
    <div
      className='position-relative'
      style={{
        left: '-256px',
        zIndex: 2,
        width: 'calc( 100% + 256px)',
        height: '92%',
        top:0,
        backgroundColor: '#F6F6F6',
      }}
    >
      <div className='d-flex w-100 h-100'>
        <div className='col-2 h-100'>
          <div className='tabs'>
            <div
              className={toggleState === 1 ? 'list-active' : 'list'}
              onClick={() => toggleTab(1)}
            >
              Thông tin chung
            </div>
            <div
              className={toggleState === 2 ? 'list-active' : 'list'}
              onClick={() => toggleTab(2)}
            >
              Thông tin phòng
            </div>
            <div
              className={toggleState === 3 ? 'list-active' : 'list'}
              onClick={() => toggleTab(3)}
            >
              Lịch và giá
            </div>
            <div
              className={toggleState === 4 ? 'list-active' : 'list'}
              onClick={() => toggleTab(4)}
            >
              Khuyến mãi
            </div>
          </div>
        </div>
        <div className='col-10 h-100' style={{overflowY:'scroll', position:'absolute', left:'260px'}}>
          <div className=' pags'>
            <div className={toggleState === 1 ? 'pag-active' : 'pag'}>
              <Genernal infoFeed={infoFeed} loading={loading}/>
            </div>
            <div className={toggleState === 2 ? 'pag-active' : 'pag'}>
              <RoomDetail />
            </div>
            <div className={toggleState === 3 ? 'pag-active' : 'pag'} >
              <PriceList CreationTime={infoFeed.CreationTime}/>
            </div>
            <div className={toggleState === 4 ? 'pag-active' : 'pag'}>
              <Coupon />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


