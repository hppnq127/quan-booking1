import  {useEffect, useState} from 'react'
import Axios, {AxiosResponse} from 'axios'
import { useLocation} from 'react-router-dom'
import Moment from 'moment'
import {Rating} from 'react-simple-star-rating'
import {LoadingEffect} from '../../../../../components/LoadingEffect/LoadingEffect'
import {FormItem} from '../../../../../components/FormItem/FormItem'
import {URL_IMG} from '../../../../dao/ImagePost'
import { URL_BOOKING_STUDIO } from '../../../../../../setup/URL'
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

const List_Rating = [
  {id: 0, title: 'Tất cả'},
  {id: 5, title: '5 sao'},
  {id: 4, title: '4 sao'},
  {id: 3, title: '3 sao'},
  {id: 2, title: '2 sao'},
  {id: 1, title: '1 sao'},
  {id: 6, title: 'Có bình luận'},
  {id: 7, title: 'Có hình ảnh/video'},
]
export const RatingReportDetail = () => {
  const location = useLocation()
  const {Id}: any = location.state
  // console.log(postId)
  const [active, setActive] = useState(true)
  const [filterConment, setFilterConment] = useState<number>(5)
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState<any>({})
  const [ratings, setRatings] = useState<any>([])
  Moment.locale('en')
  useEffect(() => {
    const getRatingReport = () => {
      setLoading(false)
      let promise = Axios({
        url: `${URL_BOOKING_STUDIO}rating&report/${Id}`,
        method: 'GET',
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Thanh cong')
        // setPost(result.data)
        console.log(result.data)
        const data = result.data
        setPost(data)
        setLoading(true)
      })
      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    }
    getRatingReport()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    const getRating = () => {
      setLoading(false)
      let promise = Axios({
        url: `${URL_BOOKING_STUDIO}rating&report/rating/${Id}?rate=${filterConment}`,
        method: 'GET',
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Thanh cong')
        // setPost(result.data)
        const data = result.data.data
        console.log(data)

        setRatings(data)
      })
      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    }
    getRating()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterConment])

  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '97%',
        height: '100vh',
        overflow: 'scroll',
      }}
    >
      <div
        className='w-100 mb-6'
        style={{
          paddingTop: '1.5%',
          paddingBottom: '1.5%',
          backgroundColor: '#F6F6F6',
        }}
      >
        {loading ? (
          <div
            className=' bg-white d-flex flex-column justify-content-evenly w-100 py-6 px-10'
            style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)'}}
          >
            <div className=' d-flex flex-row w-100'>
              <div className=' d-flex flex-column w-50 pe-10'>
                <FormItem lableName='Số định danh' value={post.id} />
                <FormItem lableName='Tiêu đề' value={post.Name} />
              </div>
              <div className=' d-flex flex-column w-50 ps-10'>
                <FormItem lableName='Mã bài đăng' value={post.id} />
              </div>
            </div>
            <div className='d-flex flex-row align-items-center justify-content-center mb-6'>
              <div
                className='bg-white d-flex flex-row justify-content-center align-items-center w-100 '
                style={{boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)'}}
              >
                <div className='d-flex  h-55px w-100'>
                  <ul className='nav nav-stretch fs-5 fw-bolder flex-nowrap w-100 d-flex justify-content-evenly'>
                    <li className='nav-item  w-50' onClick={() => setActive(true)}>
                      <div
                        className={`text-active-primary ` + (active && 'alook')}
                        style={{color: '#000', margin: 'auto', width: '100%'}}
                      >
                        <div
                          className='px-20'
                          style={{
                            marginBottom: '34px',
                            transform: `translate(${150}px,${18}px)`,
                            cursor: 'pointer',
                          }}
                        >
                          XẾP HẠNG ĐÁNH GIÁ
                        </div>
                      </div>
                    </li>
                    <li className='nav-item w-50' onClick={() => setActive(false)}>
                      <div
                        className={` text-active-primary  ` + (!active && 'alook')}
                        style={{color: '#000', margin: 'auto', width: '100%'}}
                      >
                        <div
                          className=''
                          style={{
                            marginBottom: '34px',
                            transform: `translate(${240}px,${18}px)`,
                            cursor: 'pointer',
                          }}
                        >
                          BÁO CÁO VI PHẠM
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {active ? (
              <>
                <div
                  className='d-flex px-6 py-3 justify-content-center align-items-center border border-2 border-success mb-2'
                  style={{backgroundColor: '#E3FAF4'}}
                >
                  <div className='d-flex flex-column justify-content-center align-items-center fs-3 text-success fw-bold mb-3 me-10'>
                    <span>4.5</span>
                    <Rating
                      readonly={true}
                      ratingValue={4.5 * 2 * 10}
                      size={25}
                      fillColor='#F8D93A'
                      emptyColor='#CCCCCC'
                    />
                  </div>
                  <div className='d-flex flex-wrap mb-n3'>
                    {List_Rating.map((item, index) => (
                      <div
                        key={index}
                        className={`d-flex px-6 py-1 me-6 justify-content-center align-items-center rounded mb-3 ${
                          filterConment === item.id && 'border-success text-success'
                        }`}
                        style={{border: '2px solid #B2B2B2'}}
                        onClick={() => setFilterConment(item.id)}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>

                {/* comment */}
                <ul className='list-group list-group-flush'>
                  {ratings.map((item: any, index: number) => (
                    <li key={index} className='list-group-item mt-4'>
                      <div className='d-flex flex-column'>
                        <div
                          className='d-flex align-items-center justify-content-between mb-4'
                          style={{height: '50px'}}
                        >
                          <div className='d-flex h-100 '>
                            <div className='h-100 me-3'>
                              <img
                                onError={(e: any) => {
                                  e.target.classList.add('d-none')
                                }}
                                src={URL_IMG + item.BookingUser.image}
                                alt='avatar'
                                className='h-100 rounded-circle'
                              />
                            </div>
                            <div className='d-flex flex-column'>
                              <span className='text-body fw-bolder fs-4'>
                                {item.BookingUser.Fullname || 'Thanh Trúc'}
                              </span>
                              <Rating
                                readonly={true}
                                ratingValue={item.Rate * 2 * 10}
                                size={16}
                                fillColor='#F8D93A'
                                emptyColor='#CCCCCC'
                              />
                            </div>
                          </div>
                          <div className='d-flex justify-content-center'>
                            <span className='text-black-50 mt-1 me-6'>Hai ngày trước</span>
                            <div className='btn-group dropdown'>
                              <button
                                type='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                                style={{background: 'none', border: 'none'}}
                              >
                                <img
                                  alt='more'
                                  src='/media/icons/duotune/arrows/test.svg'
                                  style={{}}
                                />
                              </button>
                              <ul
                                className='dropdown-menu dropdown-menu-end px-3 btn border border-3 shadow'
                                style={{transform: 'translate3d(-100%, 0px, 0px)'}}
                              >
                                <li className='dropdown-item' onClick={() => {}}>
                                  <i className='fa-solid fa-trash-can text-dark me-5'></i>
                                  Xóa bình luận
                                </li>
                                <li className='dropdown-item'>
                                  <i className='fa-solid fa-link text-dark fs-6 me-3'></i>
                                  Sao chép liên kết
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className='fs-4 mb-4'>{item.Description}</p>
                        <div className='d-flex align-items-center mb-4' style={{height: '90px'}}>
                          {item.Image.map((image: any, index: any) => (
                            <div key={index} className='h-100 me-3'>
                              <img
                                onError={(e: any) => {
                                  e.target.classList.add('d-none')
                                }}
                                src={URL_IMG + image}
                                alt='avatar'
                                className='w-100 rounded-3 h-100'
                                style={{objectFit: 'cover'}}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className='d-flex flex-column'>
                <div className='d-flex justify-content-between align-items-center w-100'>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                      <a href='!#'>
                        <div className='symbol-label'>
                          <img src='/media/avatars/300-1.jpg' alt='avatar' className='w-100' />
                        </div>
                      </a>
                    </div>
                    <div className='d-flex flex-column'>
                      <a href='!#' className='text-hover-primary text-dark fw-bold fs-4 '>
                        Thanh Trúc
                      </a>
                      <div className='d-flex align-items-center'>
                        <span className='me-1 text-muted '>10/02/2022</span>
                        <span className='text-muted '>14:30</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className='col-9 text-danger border border-2 px-6 py-4 rounded'
                    style={{backgroundColor: '#FFEDED'}}
                  >
                    Chứa nội dung, hình ảnh phản cảm, khoả thân, khiêu dâm
                  </div>
                </div>
                <div className='d-flex justify-content-between align-items-center w-100 mt-5'>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                      <a href='!#'>
                        <div className='symbol-label'>
                          <img src='/media/avatars/300-1.jpg' alt='avatar' className='w-100' />
                        </div>
                      </a>
                    </div>
                    <div className='d-flex flex-column'>
                      <a href='!#' className='text-hover-primary text-dark fw-bold fs-4 '>
                        Thanh Trúc
                      </a>
                      <div className='d-flex align-items-center'>
                        <span className='me-1 text-muted '>10/02/2022</span>
                        <span className='text-muted '>14:30</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className='col-9 text-danger border border-2 px-6 py-4 rounded'
                    style={{backgroundColor: '#FFEDED'}}
                  >
                    Chứa nội dung, hình ảnh phản cảm, khoả thân, khiêu dâm
                  </div>
                </div>
              </div>
            )}
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
