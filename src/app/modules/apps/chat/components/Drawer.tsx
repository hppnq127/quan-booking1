import axios, {AxiosResponse} from 'axios'
import {FC, useEffect, useState} from 'react'
import { URL_BOOKING_STUDIO } from '../../../../../setup/URL'
import {DateCustom} from '../../../../components/FormCustom/DateCustom'
import { convertDateSendToDB} from '../../../../components/FormCustom/RangeDateCustom'
import DropFileInput from '../../../dao/DropFileInput'
import {DoiTuongNhanThongBao} from './DoiTuongNhanThongBao'
import TextEditor from './TextEditor'
interface Notification {
  Title: string
  Content: string
  Type: number
  SendingTime: string
  Exception: number[]
  image: any
}
const Drawer: FC = () => {
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState<any>()
  const [users, setUsers] = useState<any[]>([])
  const [toggleState, setToggleState] = useState<number>(0)
  const [excepts, setExcepts] = useState<any[]>([])
  const [options, setOptions] = useState<any[]>([])
  const [notification, setNotification] = useState<Notification>({
    Title: '',
    Content: '',
    Type: 0,
    SendingTime: '',
    Exception: [],
    image: [],
  })
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      const data = res.data
      const options: any = []
      for (let i = 0; i < data.length; i++) {
        options.push({label: data[i].title, value: data[i].id + ''})
      }
      setUsers([...options])
    }
    getUser()
  }, [])

  const onChangeFile = (e: any) => {
    const image = e.target.files[0]
    image.preview = URL.createObjectURL(image)
    setNotification({...notification, image: image})
  }
  const handleOnChangeType = (e: any) => {
    setNotification({...notification, Type: e.target.value})
  }
  const handleOnChangeTitle = (e: any) => {
    setNotification({...notification, Title: e.target.value})
  }

  const handleSubmit = () => {
    const newExcepts: any = []
    if (excepts.length > 0) {
      for (let i = 0; i < excepts.length; i++) {
        newExcepts.unshift(parseInt(excepts[i].value))
      }
    }
    if (options.length > 0) {
      const filterOptions = users.filter((user) => !options.includes(user))
      for (let i = 0; i < filterOptions.length; i++) {
        newExcepts.unshift(parseInt(filterOptions[i].value))
      }
    }
    const newNotification: any = {
      ...notification,
      SendingTime: convertDateSendToDB(date).slice(0, 11) + time + ':00.000Z',
      Exception: [...newExcepts].join(',') + `:${toggleState}`,
    }
    setNotification(newNotification)

    try {
      delete newNotification.image.preview
      const formData = new FormData()
      formData.append('Title', newNotification.Title)
      formData.append('Content', newNotification.Content)
      formData.append('Type', newNotification.Type)
      formData.append('SendingTime', newNotification.SendingTime)
      formData.append('Exception', newNotification.Exception)
      formData.append('image', newNotification.image)
      let promise = axios({
        url: `${URL_BOOKING_STUDIO}notification`,
        method: 'POST',
        data: formData,
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Send Notification Success!')
      })
      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    } catch (error) {
      console.log(error, 'T???o b??i ????ng th???t b???i')
    }
  }

  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        height: '92%',
        overflow: 'scroll',
        position: 'relative',
      }}
    >
      <div style={{width: 'inherit', position: 'absolute', padding: '1.5%'}}>
        <div
          className='wrap-content pt-10 pb-4 d-flex flex-column w-100'
          style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)'}}
        >
          <div className='d-flex flex-row w-100 h-100 mb-6'>
            <div className='col-6 d-flex flex-column h-100'>
              {/* Lo???i th??ng b??o */}
              <div className=' w-100 ps-6 position-relative d-flex justify-content-center py-4'>
                <label
                  className='position-absolute bg-white fs-5 fw-semibold px-1'
                  style={{
                    transform: `translate(${-210}px, ${-11}px)`,
                    color: '#616161',
                  }}
                >
                  Lo???i th??ng b??o
                </label>
                <select
                  className='fs-3  rounded border border-2 w-90 ps-3 py-4'
                  style={{borderColor: '#B2B2B2'}}
                  onChange={handleOnChangeType}
                >
                  {/* <option disabled selected style={{color:'#B2B2B2'}}>
              S??? ki???n
            </option> */}
                  <option value={1}>S??? ki???n</option>
                  <option value={2}>Khuy???n m??i</option>
                  <option value={3}> Ch??nh s??ch</option>
                  <option value={4}>Kh??c</option>
                </select>
              </div>
              {/* Ti??u ????? */}
              <div className='w-100 ps-6 position-relative d-flex justify-content-center py-4'>
                <label
                  className='position-absolute bg-white fs-5 fw-semibold px-1'
                  style={{
                    transform: `translate(${0}px, ${-11}px)`,
                    left: '59px',
                    color: '#616161',
                  }}
                >
                  Ti??u ?????
                </label>
                <input
                  placeholder='Nh???p'
                  className='fs-3 p-4 rounded border border-2 w-90 '
                  style={{borderColor: '#B2B2B2'}}
                  onChange={handleOnChangeTitle}
                  value={notification.Title}
                />
              </div>
              <div
                className='w-100 ps-6 position-relative d-flex justify-content-center pt-4 pb-5 '
                style={{height: '80%'}}
              >
                <label
                  className='position-absolute bg-white fs-5 fw-semibold px-1'
                  style={{
                    transform: `translate(${0}px, ${-11}px)`,
                    left: '69px',
                    color: '#616161',
                    zIndex: '1',
                  }}
                >
                  N???i dung
                </label>
                <div className='w-100 px-10'>
                  <TextEditor
                    setText={(value: any) => setNotification({...notification, Content: value})}
                  />
                </div>
              </div>
            </div>
            <div className='col-6 d-flex flex-column pe-8 '>
              <div>?????I T?????NG NH???N TH??NG B??O</div>
              <DoiTuongNhanThongBao
                setExceptsProp={setExcepts}
                setOptionsProp={setOptions}
                exceptsProp={excepts}
                optionsProp={options}
                users={users}
                setToggleState={setToggleState}
                toggleState={toggleState}
              />
              <div className='w-50 h-150px mt-4 mb-10'>
                <h3 className='fs-4'>H??nh ???nh</h3>
                {/* {notification.image && <img src={notification.image.preview} alt='' />} */}
                <DropFileInput
                  onChangeFile={onChangeFile}
                  image={notification.image.preview}
                  icon='/media/svg/post/upLoadImage.svg'
                />
              </div>
              <h1 className='fs-4 mb-4 pt-2'> C??I ?????T TH???I GIAN G???I TH??NG B??O</h1>
              <div className='d-flex justify-content-start w-100'>
                <div className='w-50 d-flex pe-10'>
                  <DateCustom name='Ng??y' onChange={(e: any) => setDate(e)} />
                </div>
                <div className='w-50 d-flex h-100'>
                  <label
                    className='position-absolute bg-white fs-5 fw-semibold px-1'
                    style={{
                      transform: `translate(${13}px, ${-11}px)`,
                      color: '#616161',
                    }}
                  >
                    Gi???
                  </label>
                  <div
                    className='d-flex p-4 rounded w-80 h-85 align-items-center'
                    style={{border: '1px solid #B2B2B2'}}
                  >
                    <i className='fa-solid fa-clock' style={{color: '#B2B2B2'}}></i>
                    {/* <DateRangePicker
                    selected={date}
                    onChange={(date: Date) => setDate(date)}
                    selectsStart
                    startDate={date}
                    wrapperClassName='date-picker1 '
                  /> */}
                    <input
                      type='time'
                      style={{outline: 'none', border: 'none'}}
                      className='h-100'
                      onChange={(e: any) => setTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='mx-auto py-4 rounded text-white fs-4 '
            style={{
              width: '171px',
              border: 'none',
              backgroundColor: '#E22828',
              fontWeight: '600',
            }}
            onClick={handleSubmit}
          >
            G???i th??ng b??o
          </button>
        </div>
      </div>
    </div>
  )
}

export {Drawer}
