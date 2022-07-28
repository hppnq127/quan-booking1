import  {useEffect, useState} from 'react'
import Axios, {AxiosResponse} from 'axios'
import {useLocation} from 'react-router-dom'
import {FormItem} from '../../../../components/FormItem/FormItem'
import {ConvertCreationTime} from '../../../../components/ConvertTime/ConvertCreationTime'
import {ConvertModifytime} from '../../../../components/ConvertTime/ConvertModifyTime'
import {LoadingEffect} from '../../../../components/LoadingEffect/LoadingEffect'
import { URL_BOOKING_STUDIO } from '../../../../../setup/URL'
export interface Partner {
  Address: string
  BankAccount: string
  BankAccountOwnerName: string
  BankBranchName: string
  BusinessRegistrationLicenseNumber: string
  CreationTime: string
  Email: string
  IdentifierCode: string
  RepresentativeName: string
  IsDeleted: boolean | null
  LastModificationTime: string
  NumberOfPost: number
  OtherPhone: string
  PartnerName: string
  Phone: string
  id: number
}
export const DetailParter = () => {
  const location = useLocation()
  const userId: any = location.state

  const [loading, setLoading] = useState(false)
  const [id] = useState<number>(userId.Id)

  const [infoUser, setInfoUser] = useState<Partner>({
    Address: '',
    BankAccount: '',
    BankAccountOwnerName: '',
    RepresentativeName: '',
    BankBranchName: '',
    BusinessRegistrationLicenseNumber: '',
    CreationTime: '',
    Email: '',
    IdentifierCode: '',
    IsDeleted: false,
    LastModificationTime: '',
    NumberOfPost: 0,
    OtherPhone: '',
    PartnerName: '',
    Phone: '',
    id: 0,
  })

  const getUserId = () => {
    setLoading(false)
    let promise = Axios({
      url: `${URL_BOOKING_STUDIO}register-partner/${id}`,
      method: 'GET',
    })
    promise.then((result: AxiosResponse<any>) => {
      console.log('Thanh cong')
      //Nếu gọi api thành công
      // => set lại state
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
  const bank:
    | any
    | string
    | null = `${infoUser.BankAccount} -  ${infoUser.BankAccountOwnerName} -  ${infoUser.BankBranchName}`
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '97%',
        height: '92%',
        overflow: 'scroll',
        position: 'relative',
      }}
    >
      <div
        className='w-100'
        style={{
          position: 'absolute',
          paddingTop: '1.5%',
          paddingBottom: '1.5%',
          backgroundColor: '#F6F6F6',
        }}
      >
        {loading ? (
          <div className=' bg-white d-flex flex-row justify-content-evenly w-100 py-6'>
            <div className='d-flex flex-column' style={{width: '47%'}}>
              <FormItem lableName='Số định danh' value={infoUser.IdentifierCode} />
              <FormItem lableName='Số điện thoại' value={infoUser.Phone} />
              <FormItem lableName='Tổ chức' value='' />
              <FormItem lableName='Số GPĐKKD' value={infoUser.BusinessRegistrationLicenseNumber} />
              <FormItem lableName='Người đại diện' value={infoUser.RepresentativeName} />
              <FormItem lableName='Số CMND/CCCD' value='' />
              <FormItem lableName=' Địa chỉ liên hệ' value={infoUser.Address} />
              <FormItem lableName='Tài khoản ngân hàng' value={bank} />
              <div className='d-flex flex-column'>
                <div className='d-flex flex-row justify-content-between'>
                  <div style={{width: '47%'}}>
                    <FormItem
                      lableName='Ngày tạo'
                      value={<ConvertCreationTime CreationTime={infoUser.CreationTime} />}
                    />
                  </div>
                  <div style={{width: '47%'}}>
                    <FormItem
                      lableName='Ngày cập nhật gần nhất'
                      value={
                        <ConvertModifytime LastModificationTime={infoUser.LastModificationTime} />
                      }
                    />
                  </div>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                  <div style={{width: '47%'}}>
                    <FormItem lableName='Số bài đăng' value={infoUser.NumberOfPost} />
                  </div>
                  <div style={{width: '47%'}}>
                    <FormItem
                      lableName='Trạng thái'
                      value={infoUser.IsDeleted ? 'Cancel' : 'Active'}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className='d-flex flex-column' style={{width: '47%'}}>
              <FormItem lableName='Tên đối tác' value={infoUser.PartnerName} />
              <FormItem lableName='Email' value={infoUser.Email} />
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
              <FormItem lableName='Hợp đồng đối tác' value='' />
              <FormItem lableName='Câu hỏi bảo mật' value='' />
              <FormItem lableName='Trả lời câu hỏi bảo mật' value='' />
              <FormItem lableName='Ghi chú' value='' />
            </div>
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
