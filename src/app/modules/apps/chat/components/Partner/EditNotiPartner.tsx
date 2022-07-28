import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { URL_BOOKING_STUDIO } from '../../../../../../setup/URL'
import { convertTime } from '../../../../../components/ConvertTime/ConvertCreationTime'
import {NotiType} from './components/NotiType'
import {SendTo} from './components/SendTo'
import { NotiDetail } from './DetailNotiPartner'

export const EditNotiPartner = () => {
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
  const handleCancelNoti = () => {
    let hello = 2
    if (hello === 1) {
      return (
        <>
          <button
            className='cancel-noti'
            type='button'
            data-bs-toggle='modal'
            data-bs-target='#ModalCanel'
          >
            Hủy thông báo
          </button>
          <div
            className='modal fade'
            id='ModalCanel'
            tabIndex={-1}
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog d-flex justify-content-center'>
              <div className='modal-content w-375px px-8 py-6'>
                <div className='modal-content-canel'>
                  Thông báo này đã được gửi đi do đó không thể huỷ.
                </div>
                <div className='w-100 d-flex justify-content-end'>
                  <button type='button' className='modal-button-canel' data-bs-dismiss='modal'>
                    TRỞ VỀ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
    if (hello === 2) {
      return (
        <>
          <button
            className='cancel-noti'
            type='button'
            data-bs-toggle='modal'
            data-bs-target='#ModalCanel'
          >
            Hủy thông báo
          </button>
          <div
            className='modal fade '
            id='ModalCanel'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabIndex={-1}
            aria-labelledby='staticBackdropLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content w-375px'>
                <div className='ps-5 pe-12 py-5 d-flex flex-row modal-f-header w-100'>
                  <img alt='' src='/media/icons/duotune/question.png' className='me-6'></img>
                  <span className='d-flex align-items-center'>
                    {' '}
                    Bạn có chắc rằng muốn huỷ thông báo này không?
                  </span>
                </div>
                <div className='d-flex flex-row justify-content-end pe-4 mb-8'>
                  <button className='mx-4 cancel' data-bs-dismiss='modal'>
                    HỦY THÔNG BÁO
                  </button>
                  <button type='button' className='modal-button-canel' data-bs-dismiss='modal'>
                    TRỞ VỀ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
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
          <div className='d-flex flex-row justify-content-between align-items-center'>
            <div>
              <div className='header-item'>
                <span className='header-label'>Ngày tạo:</span>
                {loading? (<span>{convertTime(infoNoti.createdAt)}</span>): (<span>Loading...</span>)}
              </div>
              <div className='header-item'>
                <span className='header-label'>Trạng thái:</span>
                {loading? (<span>Đã gửi</span>):(<span>Loading...</span>)}
              </div>
            </div>
            <div>{handleCancelNoti()}</div>
          </div>
        </div>
        <div className='body'>
          <SendTo name='đối tác' loading={loading} data={infoNoti}/>
        </div>
        <div className='body'>
          <NotiType loading={loading} data={infoNoti}   />
        </div>
      </div>
    </div>
  )
}
