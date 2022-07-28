import {useState} from 'react'
import {Detail} from '../../modules/profile/components/modal/Detail'
import {ConvertModifytime} from '../ConvertTime/ConvertModifyTime'
import {ConvertCreationTime, convertTime} from '../ConvertTime/ConvertCreationTime'
import './ListPagination.scss'
type Post = {
  parentCallback: any
  posts: Array<object>
  TableHeader: Array<object>
  Linkto: object
  totalPages: number
  filters: {
    page: number
    limit: number
    maxPageLimit?: number
    minPageLimit?: number
  }
  License: string

  handleSort?: any
}
export const ListPagination = (props: Post) => {
  const {posts, TableHeader, Linkto, totalPages, filters, License, handleSort} = props

  const [currentPage, setCurrentPage] = useState(filters.page)
  const [pageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(
    filters.maxPageLimit !== undefined ? filters.maxPageLimit : 0
  )
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(
    filters.minPageLimit !== undefined ? filters.minPageLimit : 0
  )

  const newPosts = posts

  const paginate = (Number: any) => {
    props.parentCallback(Number, maxPageNumberLimit, minPageNumberLimit)
    setCurrentPage(Number)
  }
  console.log(posts)

  const Users = () => {
    return newPosts.map((user: any, index) => {
      const userInfo = () => {
        /* Order day Modify */
        const OrderByTimes = () => {
          if (user.OrderByTime === true) {
            return (
              <td>
                <div className='d-flex justify-content-center'>
                  <div className='d-flex justify-content-start text-start' style={{width: 'auto'}}>
                    {convertTime(user.OrderByTimeFrom)}
                    {' - '}
                    {convertTime(user.OrderByTimeTo).slice(-5)}
                  </div>
                </div>
              </td>
            )
          } else {
            return (
              <td>
                <div className='d-flex justify-content-center'>
                  <div className='d-flex justify-content-start text-start' style={{width: 'auto'}}>
                    {convertTime(user.OrderByDateFrom).slice(0, 10)}
                    {' - '}
                    {convertTime(user.OrderByDateTo).slice(0, 10)}
                  </div>
                </div>
              </td>
            )
          }
        }
        if (License === 'partner') {
          return (
            <>
              <td>{user.Phone !== '' ? `P${user.Phone}` : ''}</td>
              <td>{user.Phone}</td>
              <td>{user.Email}</td>
              <td>{user.NumberOfPost}</td>
              <ConvertCreationTime CreationTime={user.CreationTime} />
              <ConvertModifytime LastModificationTime={user.LastModificationTime} />
              <td>{user.IsDeleted === true ? 'Cancel' : 'Active'}</td>
            </>
          )
        }
        if (License === 'user') {
          return (
            <>
              <td>{user.IdentifierCode}</td>

              <td>{user.Email}</td>
              <td>{user.NumberOfBooking}</td>
              <ConvertCreationTime CreationTime={user.CreationTime} />
              <ConvertModifytime LastModificationTime={user.LastModificationTime} />
              <td>{user.IsDeleted === true ? 'Cancel' : 'Active'}</td>
            </>
          )
        }
        if (License === 'post') {
          return (
            <>
              <td>{user.IdentifierCode}</td>

              <td>{user.Email}</td>
              <td>{user.Name}</td>
              <ConvertCreationTime CreationTime={user.CreationTime} />
              <ConvertModifytime LastModificationTime={user.LastModificationTime} />
              <td>
                {user.IsDeleted === true ? (
                  <div style={{color: 'red'}}> Đóng / Không thể đặt</div>
                ) : (
                  <div style={{color: '#03AC84'}}> Mở / Có thể đặt</div>
                )}
              </td>
            </>
          )
        }
        if (License === 'order') {
          return (
            <>
              <td>{user.id}</td>
              <td></td>
              <td></td>
              {OrderByTimes()}
              <td>{user.PaymentType}</td>
              <td></td>
              <td>
                {user.BookingStatus === 0
                  ? 'Chờ thực hiện'
                  : user.BookingStatus === 1
                  ? 'Hoàn tất'
                  : user.BookingStatus === 2
                  ? 'Đã hủy'
                  : user.BookingStatus === 3
                  ? 'Vắng mặt'
                  : ''}
              </td>
            </>
          )
        }
        if (License === 'rating&report') {
          return (
            <>
              <td>{user.id}</td>
              <td>{user.StudioPostId}</td>
              <td>{user.StudioPost.Name}</td>
              <td>{user.Rate}</td>
              <td>{user.numberRate}</td>
              <td>null</td>
            </>
          )
        }
        if (License === 'webhook') {
          return (
            <>
              <td>{user.id}</td>
              <td>{user.Method}</td>
              <td>{user.Url}</td>
              <ConvertModifytime LastModificationTime={user.Timestamp} />
              <td>{user.Body}</td>
              <ConvertModifytime LastModificationTime={user.createdAt} />
              <ConvertModifytime LastModificationTime={user.updatedAt} />
            </>
          )
        }
        if (License === 'customCss') {
          return (
            <>
              <td>{user.id}</td>
              <td>{user.Method}</td>
              <td>{user.Url}</td>
              <ConvertModifytime LastModificationTime={user.Timestamp} />
              <td>{user.Body}</td>
              <ConvertModifytime LastModificationTime={user.createdAt} />
              <ConvertModifytime LastModificationTime={user.updatedAt} />
            </>
          )
        }
        if (License === 'noti') {
          return (
            <>
              <td>
                {user.Type === 1
                  ? 'Khuyến mãi'
                  : user.Type === 2
                  ? 'Sự kiện'
                  : user.Type === 3
                  ? 'Chính sách'
                  : 'Khác'}
              </td>
              <td>{user.Title}</td>
              <ConvertCreationTime CreationTime={user.createdAt} />
              <ConvertCreationTime CreationTime={user.SendingTime} />
              <td>{user.Status === 0 ? 'Đã gửi ' : user.Status === 1 ? 'Chờ gửi' : 'Đã hủy'}</td>
            </>
          )
        }
      }
      return (
        <tr
          className='pagination-tr align-middle'
          key={index}
          style={{backgroundColor: index % 2 === 0 ? '#F6F6F6' : '#fff'}}
        >
          {userInfo()}
          {License === 'webhook' && <></>}
          {License === 'customCss' && (
            <td>
              <div className=' dropstart '>
                <button
                  type='button'
                  className='Focus-button action-button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <img
                    alt='more'
                    src='/media/icons/duotune/arrows/test.svg'
                    className='panigation-img'
                  />
                </button>
                <div className='dropdown-menu'>
                  <div className=' w-150px'>
                    <div>
                      <div className=' d-flex align-items-start d-flex flex-column  '>
                        <div className='text-dark text-start   Hover-primary w-100'>
                          <div>
                            <button
                              style={{background: 'none', border: 'none'}}
                              type='button'
                              className='Focus-button w-100 py-2'
                            >
                              <i className='fa-solid fa-eye  text-dark pe-3'></i>
                              Xóa
                            </button>
                          </div>
                        </div>
                        {/* --------------------------------------------------- */}
                        <div className='text-dark text-start  Hover-primary w-100 pe-3'>
                          <div>
                            <button
                              style={{background: 'none', border: 'none'}}
                              type='button'
                              className='Focus-button py-2 w-100 '
                            >
                              <i className='far fa-edit text-dark pe-3'></i>
                              Tải xuống
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          )}
          {License === 'partner' ||
          License === 'user' ||
          License === 'post' ||
          License === 'order' ||
          License === 'noti' ||
          License === 'rating&report' ? (
            <td>
              <div className=' dropstart '>
                <button
                  type='button'
                  className='Focus-button action-button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <img
                    alt='more'
                    src='/media/icons/duotune/arrows/test.svg'
                    className='panigation-img'
                  />
                </button>
                <div className='dropdown-menu'>
                  <Detail
                    Linkto={Linkto}
                    UserId={License === 'rating&report' ? user.StudioPostId : user.id}
                  />
                </div>
              </div>
            </td>
          ) : null}
        </tr>
      )
    })
  }

  let pageNumber: Array<number>
  pageNumber = []
  for (let i: number = 1; i <= totalPages; i++) {
    pageNumber.push(i)
  }

  const Pag = () => {
    return pageNumber.map((number, index) => {
      if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
        return (
          <li className='px-1' key={index}>
            <button
              onClick={() => paginate(number)}
              className={
                currentPage === number
                  ? '  rounded-1 current-page '
                  : 'border border-secondary border-2 rounded-1 not-current-page'
              }
            >
              {number}
            </button>
          </li>
        )
      } else {
        return null
      }
    })
  }
  ////////////////
  const handleSkip = () => {
    if (pageNumber.length > currentPage + 4) {
      props.parentCallback(currentPage + 5, maxPageNumberLimit + 5, minPageNumberLimit + 5)
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
      setCurrentPage(currentPage + 5)
    } else {
      props.parentCallback(pageNumber.length, pageNumber.length, pageNumber.length - 5)
      setMaxPageNumberLimit(pageNumber.length)
      setMinPageNumberLimit(pageNumber.length - 5)
      setCurrentPage(pageNumber.length)
    }
  }
  ////////////////

  const handleNextPage = () => {
    if (currentPage + 1 > maxPageNumberLimit && maxPageNumberLimit < pageNumber.length) {
      props.parentCallback(currentPage + 1, maxPageNumberLimit + 5, minPageNumberLimit + 5)
      setCurrentPage(currentPage + 1)
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    } else {
      props.parentCallback(currentPage + 1, maxPageNumberLimit, minPageNumberLimit)
      setCurrentPage(currentPage + 1)
    }
  }
  ////////////////
  const handlePrevPage = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      props.parentCallback(currentPage - 1, maxPageNumberLimit - 5, minPageNumberLimit - 5)
      setCurrentPage(currentPage - 1)
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    } else {
      props.parentCallback(currentPage - 1, maxPageNumberLimit, minPageNumberLimit)
      setCurrentPage(currentPage - 1)
    }
  }

  ////////////////
  const TableHead = () => {
    return TableHeader.map((HeaderItem: any, index) => (
      <th scope='col' key={index} style={{width: `${HeaderItem.width}`}}>
        <div className='d-flex justify-content-center align-items-center'>
          {HeaderItem.name}
          {HeaderItem.icon && (
            <div className='btn-group dropdown'>
              <button
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                style={{background: 'none', border: 'none'}}
              >
                <img
                  className='ms-3'
                  src={HeaderItem.icon}
                  alt='sort'
                  style={{transform: `translate(${-5}px)`}}
                />
              </button>
              <ul
                className='dropdown-menu dropdown-menu-end p-0 btn border border-3 shadow fs-4'
                style={{transform: 'translate3d(-100%, 0px, 0px)'}}
              >
                {HeaderItem.listSort.map((item: any, index: number) => (
                  <li
                    key={index}
                    className='dropdown-item px-6'
                    onClick={() => handleSort(item.id, item.type)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </th>
    ))
  }

  return (
    <>
      {posts.length !== 0 ? (
        <div className='pagination-container '>
          <div className='p-6' style={{height: 'calc(100% - 70px)'}}>
            <table className='table border border border-secondary border-2'>
              <thead className='border border border-secondary border-2 fs-5 fw-bolder table_header'>
                <tr className=' align-middle'>
                  {TableHead()}
                  {License === 'webhook' ? (
                    <></>
                  ) : (
                    <th scope='col' style={{width: '8%'}}>
                      Thao tác
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className='border border border-secondary border-2 table_body'>
                {Users()}
              </tbody>
            </table>
          </div>
          <div className='d-flex justify-content-end py-5' style={{height: '70px'}}>
            <nav>
              <ul
                className='pagination pe-6 d-flex justify-content-between'
                style={{width: '470px'}}
              >
                <li>
                  <button
                    className='border border-secondary border-2 rounded-1'
                    onClick={handlePrevPage}
                    disabled={currentPage === pageNumber[0] ? true : false}
                    style={{
                      paddingLeft: '11px',
                      paddingRight: '11px',
                      paddingTop: '5px',
                      paddingBottom: '5px',
                      marginRight: '15px',
                    }}
                  >
                    <i className='fa-solid fa-angle-left'></i>
                  </button>
                </li>
                {Pag()}
                <li
                  className={
                    totalPages <= 5 || currentPage > totalPages - 4 ? 'd-none' : 'fs-1 px-6'
                  }
                  style={{transform: 'translate(-2px,7px)'}}
                >
                  ...
                </li>
                <li>
                  <button
                    className={
                      totalPages <= 5 || currentPage > totalPages - 4
                        ? 'd-none'
                        : ' border border-secondary border-2 rounded-1 not-current-page'
                    }
                    onClick={handleSkip}
                    disabled={currentPage === pageNumber.length ? true : false}
                  >
                    {currentPage > pageNumber[pageNumber.length - 6]
                      ? pageNumber.length
                      : pageNumber.length < 5
                      ? pageNumber.length
                      : currentPage + 5}
                  </button>
                </li>

                <li>
                  <button
                    className=' border border-secondary border-2 rounded-1 not-current-page'
                    onClick={handleNextPage}
                    disabled={currentPage === pageNumber[pageNumber.length - 1] ? true : false}
                  >
                    <i className='fa-solid fa-angle-right'></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <div className='pagination-container align-items-center justify-content-center'>
          <div className='fs-3 fw-bold d-flex  align-items-center'>
            {' '}
            <i className='fa-solid fa-magnifying-glass fs-1 pe-4 '></i>Không tìm thấy
          </div>
        </div>
      )}
    </>
  )
}
