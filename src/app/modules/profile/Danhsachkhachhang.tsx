/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import '../../components/FormCustom/FormCustom.scss'
import {ListPagination} from '../../components/ListPagination/ListPagination'
import Axios, {AxiosResponse} from 'axios'
import queryString from 'query-string'
import {SearchCustom} from '../../components/FormCustom/SearchCustom'
import {convertDateSendToDB, RangeDateCustom} from '../../components/FormCustom/RangeDateCustom'
import {DropdownCustom} from '../../components/FormCustom/DropdownCustom'
import {LoadingEffect} from '../../components/LoadingEffect/LoadingEffect'
import { URL_BOOKING_STUDIO } from '../../../setup/URL'
const TableHeader = [
  {
    name: 'Số định danh',
    width: '',
  },
  {
    name: 'Tên tài khoản',
    width: '',
  },
  {
    name: 'Số đơn đặt',
    width: '',
  },
  {
    name: 'Ngày tạo',
    width: '',
  },
  {
    name: 'Cập nhật gần nhất',
    width: '',
  },
  {
    name: 'Trạng thái',
    width: '',
  },
]
const SelectOptions = ['Active', 'Cancel']
const License = 'user'
const Linkto = {
  toDetail: '/crafted/pages/profile/detailuser',
  toEdit: '/crafted/pages/profile/edituser',
}
export function Danhsachkhachhang() {
  const [users, setUsers] = useState([])
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
    limit: 6,
  })
  const paramString = queryString.stringify(filtersPage)

  useEffect(() => {
    const filterUser = () => {
      setLoading(false)
      let promise = Axios({
        url: `${URL_BOOKING_STUDIO}booking-user/?${paramString}`,
        method: 'POST',
        data: {
          "keyString": "t",
          "CreateDate": {
              "startDate": "2020-01-30T17:39:08.081Z",
              "endDate": "2022-01-30T17:39:08.081Z"
          },
          "updateDate": {
              "startDate": "2021-03-30T17:39:08.081Z",
              "endDate": "2023-01-30T17:39:08.081Z"
          }
          
      }
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Thanh cong')
        //Nếu gọi api thành công
        // => set lại state
        setUsers(result.data.data)
        setTotalPages(result.data.pagination.totalPages)
        setLoading(true)
      })

      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    }
    filterUser()
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
          posts={users}
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
