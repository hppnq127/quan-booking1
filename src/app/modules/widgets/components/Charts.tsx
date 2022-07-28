/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import Axios, {AxiosResponse} from 'axios'
import {ListPagination} from '../../../components/ListPagination/ListPagination'
import '../../../components/FormCustom/FormCustom.scss'
import {SearchCustom} from '../../../components/FormCustom/SearchCustom'
import {DropdownCustom} from '../../../components/FormCustom/DropdownCustom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {LoadingEffect} from '../../../components/LoadingEffect/LoadingEffect'
import '../../../components/FormCustom/FormCustom.scss'
import {convertDateSendToDB, RangeDateCustom} from '../../../components/FormCustom/RangeDateCustom'
const TableHeader = [
  {
    name: 'Mã đơn đặt',
    width: '',
  },
  {
    name: 'Số định danh',
    width: '',
  },
  {
    name: 'Mã bài đăng',
    width: '',
  },
  {
    name: 'Ngày thực hiện',
    width: '11  %',
  },
  {
    name: 'Hình thức thanh toán',
    width: '',
  },
  {
    name: 'Trạng thái thanh toán',
    width: '',
  },
  {
    name: 'Trạng thái đơn đặt',
    width: '105px',
  },
]
const License = 'order'
const Linkto = {
  toDetail: '/crafted/widgets/orderdetail',
  toEdit: '/crafted/widgets/orderedit',
}
export function OrderManager() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    maxPageLimit: 5,
    minPageLimit: 0,
    search: '',
    orderDate: {
      startDate: '',
      endDate: '',
    },
  })
  const [filtersPage, setFiltersPage] = useState({
    page: 1,
    limit: 6,
  })

  useEffect(() => {
    const filterOrder = () => {
      setLoading(false)
      let promise = Axios({
        url: `https://bookingstudio.herokuapp.com/api/booking?limit=10`,
        method: 'POST',
        data: {
          keyString: filters.search,
          OrderDate: {
            OrderByDateFrom: filters.orderDate.startDate,
            OrderByDateTo: filters.orderDate.endDate,
          },
          PaymentType: null,
          IsPayDeposit: false,
          BookingStatus: 0,
        },
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Thanh cong')
        //Nếu gọi api thành công
        // => set lại state
        setOrders(result.data.data)
        setTotalPages(result.data.pagination.totalPages)
        setLoading(true)
      })

      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])
  function Arrow(props: any) {
    let className = props.type === 'next' ? 'nextArrow' : 'prevArrow'
    className += ' arrow'
    const char =
      props.type === 'next' ? (
        props.currentSlide !== 1 ? (
          <i className='fa-solid fa-caret-right' style={{cursor: 'pointer'}}></i>
        ) : (
          <i className='fa-solid fa-caret-right' style={{color: 'transparent'}}></i>
        )
      ) : props.currentSlide !== 0 ? (
        <i className='fa-solid fa-caret-left' style={{cursor: 'pointer'}}></i>
      ) : (
        <i className='fa-solid fa-caret-left ' style={{color: 'transparent'}}></i>
      )
    return (
      <span className={className} onClick={props.onClick}>
        {char}
      </span>
    )
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
        className='formcustom-container d-flex justify-content-center align-items-center'
        style={{
          height: '110px',
          marginBottom: '10px',
          zIndex: 10,
          boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Slider
          dots={false}
          nextArrow={<Arrow type='next' />}
          prevArrow={<Arrow type='prev' />}
          swipe={true}
          infinite={false}
          slidesToShow={4}
          slidesToScroll={1}
          className='silder-custom d-flex flex-row '
        >
          <div className='w-100 h-100 px-4  customize-slide'>
            <SearchCustom
              onChange={(e: any) => {
                setFilters({
                  ...filters,
                  search: e.target.value,
                  page: 1,
                  maxPageLimit: 5,
                  minPageLimit: 0,
                })
                setFiltersPage({...filtersPage, page: 1})
              }}
            />
          </div>
          <div className=' h-700px  px-4 w-300px customize-slide '>
            <RangeDateCustom
              name='Ngày thực hiện'
              onChange={(e: any) => {
                setFilters({
                  ...filters,
                  orderDate: {
                    startDate: convertDateSendToDB(e[0]),
                    endDate: convertDateSendToDB(e[1]),
                  },
                  page: 1,
                  maxPageLimit: 5,
                  minPageLimit: 0,
                })
                setFiltersPage({...filtersPage, page: 1})
              }}
            />
          </div>
          <div className='w-100 h-100 px-4 customize-slide'>
            <DropdownCustom name='Hình thức thanh toán' selectOptions={['Online', 'Offline']} />
          </div>
          <div className='w-100 h-100 px-4  customize-slide'>
            <DropdownCustom
              name='Trạng thái thanh toán'
              selectOptions={['Đã thanh toán', 'Chưa thanh toán', 'Đã cọc', 'Null']}
            />
          </div>
          <div className='w-100 h-100 px-4 customize-slide'>
            <DropdownCustom
              name='Trạng thái đơn đặt'
              selectOptions={['Đã thanh toán', 'Chưa thanh toán', 'Đã cọc', 'Null']}
            />
          </div>
        </Slider>
      </div>

      {loading ? (
        <ListPagination
          posts={orders}
          TableHeader={TableHeader}
          Linkto={Linkto}
          totalPages={totalPages}
          filters={filters}
          parentCallback={(page: any, maxPageLimit: any, minPageLimit: any) => {
            setFilters({
              ...filters,
              page: page,
              maxPageLimit: maxPageLimit,
              minPageLimit: minPageLimit,
            })
            setFiltersPage({
              ...filtersPage,
              page: page,
            })
          }}
          License={License}
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
}
