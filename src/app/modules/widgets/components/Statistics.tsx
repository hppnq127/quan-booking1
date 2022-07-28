import  {useEffect, useState} from 'react'
import queryString from 'query-string'
import axios, {AxiosResponse} from 'axios'
import {LoadingEffect} from '../../../components/LoadingEffect/LoadingEffect'
import {SearchCustom} from '../../../components/FormCustom/SearchCustom'
import {ListPagination} from '../../../components/ListPagination/ListPagination'
import { URL_BOOKING_STUDIO } from '../../../../setup/URL'
const TableHeader = [
  {
    name: 'Số định danh',
    width: '',
    icon: '',
    listSort: [],
  },
  {
    name: 'Mã bài đăng',
    width: '',
    icon: '',
    listSort: [],
  },
  {
    name: 'Tiêu đề',
    width: '25%',
    icon: '',
    listSort: [],
  },
  {
    name: 'Xếp hạng',
    width: '11%',
    icon: '/media/icons/duotune/general/sort.svg',
    listSort: [
      {id: 0, title: 'Mặc định', type: 'rating'},
      {id: 0, title: 'Từ cao đến thấp', type: 'rating'},
      {id: 1, title: 'Từ thấp đến cao', type: 'rating'},
    ],
  },
  {
    name: 'Số lợt đánh giá',
    width: '11%',
    icon: '/media/icons/duotune/general/sort.svg',
    listSort: [
      {id: 0, title: 'Mặc định', type: 'rank'},
      {id: 1, title: 'Từ bé đến lớn', type: 'rank'},
      {id: 0, title: 'Từ lớn đến bé', type: 'rank'},
    ],
  },
  {
    name: 'Báo cáo sai phạm',
    width: '11%',
    icon: '/media/icons/duotune/general/sort.svg',
    listSort: [
      {id: 0, title: 'Mặc định', type: 'report'},
      {id: 1, title: 'Từ bé đến lớn', type: 'report'},
      {id: 0, title: 'Từ lớn đến bé', type: 'report'},
    ],
  },
]

//const SelectOptions = ['Đóng / Không thể đặt', 'Mở / Có thể đặt']
const Linkto = {
  toDetail: '/crafted/widgets/ratingReportDetail',
  toEdit: '/crafted/widgets/ratingReportDetailEdit',
}
const License = 'rating&report'
export function Statistics() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    rating: 0,
    rank: 0,
    maxPageLimit: 5,
    minPageLimit: 0,
  })
  // const callbackFunction = (page: any, maxPageLimit: any, minPageLimit: any) => {
  //   setFilters({
  //     ...filters,
  //     page: page,

  //     minPageLimit: minPageLimit,
  //   })
  // }

  const paramString = queryString.stringify(filters)
  /* filter User */
  const filterPost = (e: any) => {}
  /* get all  User */

  useEffect(() => {
    const getRatingReport = () => {
      let promise = axios({
        url: `${URL_BOOKING_STUDIO}rating&report?${paramString}`,
        method: 'GET',
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Thanh cong')
        //Nếu gọi api thành công
        // => set lại state
        setData(result.data.data)
        setTotalPages(result.data.pagination.totalPages)
        setLoading(true)
      })

      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    }
    
    getRatingReport()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  ///////////////////////////////
  const handleSort = (index: number, type: string) => {
    switch (type) {
      case 'rating':
        setFilters({...filters, rating: index})
        break
      case 'rank':
        setFilters({...filters, rank: index})
        break
      case 'report':
        break
      default:
        break
    }
  }

  return (
    <div
      style={{
        paddingTop: '1.5%',
        paddingBottom: '1.5%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '97%',
        height: '92%',
      }}
    >
      <div
        className='formcustom-container d-flex justify-content-start ps-6'
        style={{justifyContent: 'start'}}
      >
        <div className='w-22 ms-9'>
          <SearchCustom onChange={(e: any) => filterPost(e)} />
        </div>
      </div>
      {loading ? (
        <ListPagination
          posts={data}
          TableHeader={TableHeader}
          Linkto={Linkto}
          totalPages={totalPages}
          filters={filters}
          parentCallback={setFilters}
          License={License}
          handleSort={handleSort}
        />
      ) : (
        <div
          className='d-flex align-items-center justify-content-center w-100'
          style={{height: 'calc(98.5% - 115px)'}}
        >
          <LoadingEffect />
        </div>
      )}
    </div>
  )

  // useEffect(() => {
  //   const getPosts = async () => {
  //     setLoading(true)
  //     const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
  //     setData(res.data)
  //     setLoading(false)
  //   }
  //   getPosts()
  // }, [])

  // //Get current posts
  // const indexOfLastPost = currentPage * postPerPage
  // const indexOfFristPost = indexOfLastPost - postPerPage
  // const newPosts = posts.slice(indexOfFristPost, indexOfLastPost)

  // const paginate = (Number: any) => {
  //   return setCurrentPage(Number)
  // }

  // let pageNumber: Array<number>
  // pageNumber = []
  // for (let i: number = 1; i <= Math.ceil(posts.length / postPerPage); i++) {
  //   pageNumber.push(i)
  // }

  // const Pag = () => {
  //   return pageNumber.map((number) => {
  //     if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
  //       return (
  //         <div className='px-2'>
  //           <li
  //             key={number}
  //             className={
  //               currentPage === number
  //                 ? '  rounded-1 '
  //                 : 'border border-secondary border-2 rounded-1'
  //             }
  //             style={
  //               currentPage === number
  //                 ? {
  //                     backgroundColor: 'red',
  //                     paddingBottom: '5px',
  //                     paddingTop: '5px',
  //                     paddingLeft: '11px',
  //                     paddingRight: '11px',
  //                     border: '1.5px solid red',
  //                   }
  //                 : {
  //                     paddingBottom: '5px',
  //                     paddingTop: '5px',
  //                     paddingLeft: '11px',
  //                     paddingRight: '11px',
  //                   }
  //             }
  //           >
  //             <a
  //               href='#'
  //               className=''
  //               onClick={() => paginate(number)}
  //               style={currentPage === number ? {color: '#fff'} : {}}
  //             >
  //               {number}
  //             </a>
  //           </li>
  //         </div>
  //       )
  //     } else {
  //       return null
  //     }
  //   })
  // }
  // /////////////////////////
  // const handleNextPage = () => {
  //   setCurrentPage(currentPage + 1)
  //   if (currentPage + 1 > maxPageNumberLimit && maxPageNumberLimit < pageNumber.length) {
  //     setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
  //     setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
  //   }
  // }
  // ////////////
  // const handlePrevPage = () => {
  //   setCurrentPage(currentPage - 1)
  //   if ((currentPage - 1) % pageNumberLimit === 0) {
  //     setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
  //     setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
  //   }
  // }

  // const sortArray = (type: string) => {
  //   const newPostsSort = [...posts]
  //   switch (type) {
  //     case 'default':
  //       newPostsSort.sort((a: any, b: any) => a.id - b.id)
  //       setData(newPostsSort)
  //       break
  //     case 'highToLow':
  //       newPostsSort.sort((a: any, b: any) => b.id - a.id)
  //       setData(newPostsSort)
  //       break
  //     case 'lowToHigh':
  //       newPostsSort.sort((a: any, b: any) => a.id - b.id)
  //       setData(newPostsSort)
  //       break
  //     default:
  //       break
  //   }
  // }
  // return (
  //   <div
  //     style={{
  //       paddingTop: '1.5%',
  //       paddingBottom: '1.5%',
  //       marginLeft: 'auto',
  //       marginRight: 'auto',
  //       width: '97%',
  //       height: '92%',
  //     }}
  //   >
  //     <div
  //       className='bg-white  py-10 mb-4 d-flex flex-row '
  //       style={{
  //         boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)',
  //         height: '115px',
  //         marginBottom: '1.5%',
  //       }}
  //     >
  //       <div className='w-25 position-relative d-flex justify-content-center'>
  //         <label
  //           className='position-absolute bg-white fs-5 fw-semibold px-1'
  //           style={{
  //             transform: `translate(${-75}px, ${-11}px)`,
  //             color: '#616161',
  //           }}
  //         >
  //           Tìm kiếm
  //         </label>
  //         <input
  //           placeholder='Nhập thông tin'
  //           className='fs-3 p-4 rounded border border-2 '
  //           style={{borderColor: '#B2B2B2'}}
  //         />
  //       </div>
  //       {/*  */}
  //       <div className='w-25 position-relative d-flex justify-content-center'>
  //         <label
  //           className='position-absolute bg-white fs-5 fw-semibold px-1'
  //           style={{
  //             transform: `translate(${-75}px, ${-11}px)`,
  //             color: '#616161',
  //           }}
  //         >
  //           Ngày tạo
  //         </label>
  //         <input
  //           placeholder='Nhập thông tin'
  //           className='fs-3 p-4 rounded border border-2 '
  //           style={{borderColor: '#B2B2B2'}}
  //         />
  //       </div>
  //       {/*  */}
  //       <div className='w-25 position-relative d-flex justify-content-center'>
  //         <label
  //           className='position-absolute bg-white fs-5 fw-semibold px-1'
  //           style={{
  //             transform: `translate(${-43}px, ${-11}px)`,
  //             color: '#616161',
  //           }}
  //         >
  //           Cập nhật gần nhất
  //         </label>
  //         <input
  //           placeholder='Nhập thông tin'
  //           className='fs-3 p-4 rounded border border-2 '
  //           style={{borderColor: '#B2B2B2'}}
  //         />
  //       </div>
  //       {/*  */}
  //       <div className='w-25 position-relative d-flex justify-content-center'>
  //         <label
  //           className='position-absolute bg-white fs-5 fw-semibold px-1'
  //           style={{
  //             transform: `translate(${-72}px, ${-11}px)`,
  //             color: '#616161',
  //           }}
  //         >
  //           Trạng thái
  //         </label>
  //         <input
  //           placeholder='Nhập thông tin'
  //           className='fs-3 p-4 rounded border border-2 '
  //           style={{borderColor: '#B2B2B2'}}
  //         />
  //       </div>
  //     </div>
  //     <div
  //       className='w-100 text-center bg-white'
  //       style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)', height: 'calc(98.5% - 115px)'}}
  //     >
  //       <div className='p-6' style={{height: '90%'}}>
  //         <table className='table border border border-secondary border-2'>
  //           <thead className='border border border-secondary border-2 fs-5 fw-bolder'>
  //             <tr>
  //               <th scope='col'>Số định danh</th>
  //               <th scope='col'>Mã bài đăng</th>
  //               <th scope='col'>Tiêu đề</th>
  //               <th scope='col'>
  //                 Xếp hạng{' '}
  //                 <div className='btn-group dropdown'>
  //                   <button
  //                     type='button'
  //                     data-bs-toggle='dropdown'
  //                     aria-expanded='false'
  //                     style={{background: 'none', border: 'none'}}
  //                   >
  //                     <img
  //                       className='ms-3'
  //                       src='/media/icons/duotune/general/sort.svg'
  //                       alt='sort'
  //                       style={{transform: `translate(${-5}px)`}}
  //                     />
  //                   </button>
  //                   <ul
  //                     className='dropdown-menu dropdown-menu-end p-0 btn border border-3 shadow fs-4'
  //                     style={{transform: 'translate3d(-100%, 0px, 0px)'}}
  //                   >
  //                     <li className='dropdown-item px-6' onClick={() => sortArray('default')}>
  //                       Mặc định
  //                     </li>
  //                     <li className='dropdown-item px-6' onClick={() => sortArray('highToLow')}>
  //                       Từ cao đến thấp
  //                     </li>
  //                     <li className='dropdown-item px-6' onClick={() => sortArray('lowToHigh')}>
  //                       Từ thấp đến cao
  //                     </li>
  //                   </ul>
  //                 </div>
  //               </th>
  //               <th scope='col'>
  //                 Số lượt đánh giá{' '}
  //                 <div className='btn-group dropdown'>
  //                   <button
  //                     type='button'
  //                     data-bs-toggle='dropdown'
  //                     aria-expanded='false'
  //                     style={{background: 'none', border: 'none'}}
  //                   >
  //                     <img
  //                       className='ms-3'
  //                       src='/media/icons/duotune/general/sort.svg'
  //                       alt='sort'
  //                       style={{transform: `translate(${-5}px)`}}
  //                     />
  //                   </button>
  //                   <ul
  //                     className='dropdown-menu dropdown-menu-end p-0 btn border border-3 shadow fs-4'
  //                     style={{transform: 'translate3d(-100%, 0px, 0px)'}}
  //                   >
  //                     <li className='dropdown-item px-6' onClick={() => sortArray('default')}>
  //                       Mặc định
  //                     </li>
  //                     <li className='dropdown-item px-6' onClick={() => sortArray('lowToHigh')}>
  //                       Từ bé đến lớn
  //                     </li>
  //                     <li className='dropdown-item px-6' onClick={() => sortArray('highToLow')}>
  //                       Từ lớn đến bé
  //                     </li>
  //                   </ul>
  //                 </div>
  //               </th>
  //               <th scope='col'>
  //                 Báo cáo sai phạm{' '}
  //                 <div className='btn-group dropdown'>
  //                   <button
  //                     type='button'
  //                     data-bs-toggle='dropdown'
  //                     aria-expanded='false'
  //                     style={{background: 'none', border: 'none'}}
  //                   >
  //                     <img
  //                       className='ms-3'
  //                       src='/media/icons/duotune/general/sort.svg'
  //                       alt='sort'
  //                       style={{transform: `translate(${-5}px)`}}
  //                     />
  //                   </button>
  //                   <ul
  //                     className='dropdown-menu dropdown-menu-end p-0 btn border border-3 shadow fs-4'
  //                     style={{transform: 'translate3d(-100%, 0px, 0px)'}}
  //                   >
  //                     <li className='dropdown-item px-6' onClick={() => sortArray('default')}>
  //                       Mặc định
  //                     </li>
  //                     <li className='dropdown-item px-6' onClick={() => sortArray('lowToHigh')}>
  //                       Từ bé đến lớn
  //                     </li>
  //                     <li className='dropdown-item px-6' onClick={() => sortArray('highToLow')}>
  //                       Từ lớn đến bé
  //                     </li>
  //                   </ul>
  //                 </div>
  //               </th>
  //               <th scope='col'>Thao tác</th>
  //             </tr>
  //           </thead>
  //           <tbody className='border border border-secondary border-2'>{Posts()}</tbody>
  //         </table>
  //       </div>
  //       <div className='d-flex flex-stack justify-content-end flex-wrap pb-4 '>
  //         <nav>
  //           <ul className='pagination pe-6 '>
  //             <li>
  //               <button
  //                 className='border border-secondary border-2 rounded-1'
  //                 onClick={handlePrevPage}
  //                 disabled={currentPage === pageNumber[0] ? true : false}
  //                 style={{
  //                   paddingLeft: '11px',
  //                   paddingRight: '11px',
  //                   paddingTop: '5px',
  //                   paddingBottom: '5px',
  //                 }}
  //               >
  //                 <i className='fa-solid fa-angle-left'></i>
  //               </button>
  //             </li>
  //             {Pag()}
  //             <li>
  //               <button
  //                 className=' border border-secondary border-2 rounded-1'
  //                 onClick={handleNextPage}
  //                 disabled={currentPage === pageNumber[pageNumber.length - 1] ? true : false}
  //                 style={{
  //                   paddingLeft: '11px',
  //                   paddingRight: '11px',
  //                   paddingTop: '5px',
  //                   paddingBottom: '5px',
  //                 }}
  //               >
  //                 <i className='fa-solid fa-angle-right'></i>
  //               </button>
  //             </li>
  //           </ul>
  //         </nav>
  //       </div>
  //     </div>
  //   </div>
  // )
}
