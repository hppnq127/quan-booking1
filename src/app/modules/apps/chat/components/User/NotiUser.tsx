/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import axios, {AxiosResponse} from 'axios'
import queryString from 'query-string'
import {ListPagination} from '../../../../../components/ListPagination/ListPagination'
import {
  convertDateSendToDB,
  RangeDateCustom,
} from '../../../../../components/FormCustom/RangeDateCustom'
import {DropdownCustom} from '../../../../../components/FormCustom/DropdownCustom'
import '../../../../../components/FormCustom/FormCustom.scss'
import {LoadingEffect} from '../../../../../components/LoadingEffect/LoadingEffect'
import { URL_BOOKING_STUDIO } from '../../../../../../setup/URL'
const TableHeader = [
  {
    name: 'Loại thông báo',
    width: '10%',
  },
  {
    name: 'Tiêu đề',
    width: '30%',
  },
  {
    name: 'Ngày tạo',
    width: '8%',
  },
  {
    name: 'Ngày gửi',
    width: '8%',
  },
  {
    name: 'Trạng thái',
    width: '8%',
  },
]
const License = 'noti'
const Linkto = {
  toDetail: '/apps/chat/detail-user',
  toEdit: '/apps/chat/edit-user',
}
export function NotiUser() {
  const [noti, setNoti] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    maxPageLimit: 5,
    minPageLimit: 0,
    createdAt: {
      startDate: '',
      endDate: '',
    },
    SendingTime: {
      startDate: '',
      endDate: '',
    },
    Type: 0,
    Status: -1,
  })
  const [filtersPage, setFiltersPage] = useState({
    page: 1,
    limit: 6,
  })
  const paramString = queryString.stringify(filtersPage)
  useEffect(() => {
    const filterNotiUser = () => {
      setLoading(false)
      let promise = axios({
        url: `${URL_BOOKING_STUDIO}notification/fillter?${paramString}`,
        method: 'POST',
        data: {
          createdAt: {
            startDate: filters.createdAt.startDate,
            endDate: filters.createdAt.endDate,
          },
          SendingTime: {
            startDate: filters.SendingTime.startDate,
            endDate: filters.SendingTime.endDate,
          },
          Type: filters.Type,
          Status: 0,
          userType: 1,
        },
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Thanh cong')
        //Nếu gọi api thành công
        // => set lại state
        setNoti(result.data.data)
        console.log(result.data.data);
        
        setTotalPages(result.data.pagination.totalPages)
        setLoading(true)
      })
      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterNotiUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const handleChoosenType = (e: any) => {
    if (e.target.value === 'Tất cả') {
      setFilters({...filters, Type: e.target.value})
    } else {
      setFilters({...filters, Type: e.target.value})
    }
  }
  const handleChoosenStatus = (e: any) => {
    if (e.target.value === 'Tất cả') {
      setFilters({...filters, Status:0})
    } else {
      setFilters({...filters, Status: e.target.value})
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
      <div className='formcustom-container'>
        <div className='w-22'>
          <RangeDateCustom
            name='Ngày tạo'
            onChange={(e: any) => {
              setFilters({
                ...filters,
                createdAt: {
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
            name='Ngày gửi'
            onChange={(e: any) => {
              setFilters({
                ...filters,
                SendingTime: {
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
          <DropdownCustom
            name='Loại thông báo'
            selectOptions={['Khuyến mãi', 'Sự kiện', 'Chính sách']}
            choosen={(e: any) => {
              handleChoosenType(e)
            }}
          />
        </div>
        <div className='w-22'>
          <DropdownCustom
            name='Trạng thái'
            selectOptions={['Đã gửi', 'Chờ gửi', 'Đã hủy']}
            choosen={(e: any) => {
              handleChoosenStatus(e)
            }}
          />
        </div>
      </div>
      {loading ? (
        <ListPagination
          posts={noti}
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
