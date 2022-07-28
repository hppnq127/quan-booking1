/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import Axios, {AxiosResponse} from 'axios'
import queryString from 'query-string'
import {ListPagination} from '../../../components/ListPagination/ListPagination'
import {SearchCustom} from '../../../components/FormCustom/SearchCustom'
import {convertDateSendToDB, RangeDateCustom} from '../../../components/FormCustom/RangeDateCustom'
import {DropdownCustom} from '../../../components/FormCustom/DropdownCustom'
import '../../../components/FormCustom/FormCustom.scss'
import {LoadingEffect} from '../../../components/LoadingEffect/LoadingEffect'
import { URL_BOOKING_STUDIO } from '../../../../setup/URL'
const TableHeader = [
  {
    name: 'Số định danh',
    width: '',
  },
  {
    name: 'Mã bài đăng',
    width: '',
  },
  {
    name: 'Tiêu đề',
    width: '25%',
  },
  {
    name: 'Ngày đăng',
    width: '8%',
  },
  {
    name: 'Cập nhật gần nhất',
    width: '7%',
  },
  {
    name: 'Trạng thái',
    width: '10%',
  },
]
const SelectOptions = ['Đóng / Không thể đặt', 'Mở / Có thể đặt']
const License = 'post'
const Linkto = {
  toDetail: '/crafted/widgets/feeddetail',
  toEdit: '/crafted/widgets/feededit',
}
export function ManagerPost() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    maxPageLimit: 5,
    minPageLimit: 0,
    search: '',
    createDate: {
      startDate: '',
      endDate: '',
    },
    updateDate: {
      startDate: '',
      endDate: '',
    },
  })
  const [filtersPage, setFiltersPage] = useState({
    page: 1,
    limit: 5,
  })
  const paramString = queryString.stringify(filtersPage)
  const filterPosts = () => {
    setLoading(false)
    let promise = Axios({
      url: `${URL_BOOKING_STUDIO}studio-post?${paramString}`,
      method: 'POST',
      data: {
        keyString: filters.search,
        CreateDate: {
          startDate: filters.createDate.startDate,
          endDate: filters.createDate.endDate,
        },
        updateDate: {
          startDate: filters.updateDate.startDate,
          endDate: filters.updateDate.endDate,
        },
      },
    })
    promise.then((result: AxiosResponse<any>) => {
      console.log('Thanh cong')
      //Nếu gọi api thành công
      // => set lại state
      setPosts(result.data.data)
      setTotalPages(result.data.pagination.totalPages)
      setLoading(true)
    })
    promise.catch((err) => {
      console.log('That bai')
      console.log(err.response.data)
    })
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

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
      <div className='formcustom-container'>
      <div className='w-22'>
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
        <div className='w-22'>
          <RangeDateCustom
            name='Ngày tạo'
            onChange={(e: any) => {
              setFilters({
                ...filters,
                createDate: {
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
        <div className='w-22'>
          <RangeDateCustom
            name='Cập nhật gần nhất'
            onChange={(e: any) => {
              setFilters({
                ...filters,
                updateDate: {
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
        <div className='w-22'>
          <DropdownCustom name='Trạng thái' selectOptions={SelectOptions} />
        </div>
      </div>
      {loading ? (
        <ListPagination
          posts={posts}
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
