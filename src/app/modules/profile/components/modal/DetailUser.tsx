import React, {useEffect, useState} from 'react'
import Axios, {AxiosResponse} from 'axios'
import {useLocation} from 'react-router-dom'
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
export const DetailUser = () => {
  const location = useLocation()
  const userId: any = location.state

  const [loading, setLoading] = useState(false)
  const [id] = useState<number>(userId.Id)
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
    getUserId()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
                <FormItem lableName='Số định danh' value={infoUser.IdentifierCode} />
                <FormItem lableName='Số điện thoại' value={infoUser.Phone} />
              </div>
              <div className=' d-flex flex-column w-50 px-10'>
                <FormItem lableName='Tên tài khoản' value='' />
                <FormItem lableName='Tài khoản Google' value={infoUser.Email} />
              </div>
            </div>

            <div className='w-100 position-relative d-flex justify-content-center py-4 px-10'>
              <FormItem lableName='Tài khoản Facebook' value={infoUser.FacebookEmail} />
            </div>
            <div className='w-100 d-flex flex-row justify-content-evenly '>
              <div
                className=' position-relative d-flex justify-content-center '
                style={{width: '22%'}}
              >
                <FormItem lableName='Ngày tạo' value={convertTime(infoUser.CreationTime)} />
              </div>
              <div
                className=' position-relative d-flex justify-content-center '
                style={{width: '21.5%'}}
              >
                <FormItem
                  lableName='Cập nhật gần nhất'
                  value={convertTime(infoUser.LastModificationTime)}
                />
              </div>
              <div
                className=' position-relative d-flex justify-content-center'
                style={{width: '21.5%'}}
              >
                <FormItem lableName='Số đơn đặt' value={infoUser.NumberOfOrder} />
              </div>
              <div
                className=' position-relative d-flex justify-content-center'
                style={{width: '22%'}}
              >
                <FormItem
                  lableName='Trạng thái'
                  value={infoUser.IsDeleted === true ? 'Cancel' : 'Active'}
                />
              </div>
            </div>
            <div className='w-50 position-relative d-flex justify-content-center py-4 ps-10'>
              <FormItem lableName='Ghi chú' value='' />
            </div>
          </div>
        ) : (
          <div className='d-flex align-items-center justify-content-center w-100 h-300px'>
            <LoadingEffect />
          </div>
        )}
      </div>
    </div>
  )
}
