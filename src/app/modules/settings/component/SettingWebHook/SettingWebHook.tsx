import axios, {AxiosResponse} from 'axios'
import  {useEffect, useState} from 'react'
import queryString from 'query-string'
import {ListPagination} from '../../../../components/ListPagination/ListPagination'
import {LoadingEffect} from '../../../../components/LoadingEffect/LoadingEffect'
import '../../../../../app/components/FormCustom/FormCustom.scss'
import { URL_BOOKING_STUDIO } from '../../../../../setup/URL'
const TableHeader = [
  {
    name: 'ID',
    width: '5%',
  },
  {
    name: 'Method',
    width: '10%',
  },
  {
    name: 'Url',
    width: '15%',
  },
  {
    name: 'Timestamp',
    width: '10%',
  },
  {
    name: 'Body',
    width: '',
  },
  {
    name: 'createdAt',
    width: '10%',
  },
  {
    name: 'updatedAt',
    width: '10%',
  },
]

export const SettingWebHook = () => {
  const [webhooks, setWebHooks] = useState([])
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
    method: '',
  })
  const paramString = queryString.stringify(filtersPage)
  useEffect(() => {
    const filterWebHook = () => {
      setLoading(false)
      let promise = axios({
        url: `${URL_BOOKING_STUDIO}webhook?${paramString}`,
        method: 'GET',
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Thanh cong')
        //Nếu gọi api thành công
        // => set lại state
        setWebHooks(result.data.data)
        setTotalPages(result.data.pagination.totalPages)
        setLoading(true)
      })
      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterWebHook()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersPage])

  const onchangeSelected = (e: any) => {
    setFiltersPage({...filtersPage, method: e.target.value})
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
        <div className='w-25'>
          <div className='w-100 h-100'>
            <label className='account-label text-input-title'>Chọn phương thức</label>
            <div className='account-form '>
              <select
                onChange={onchangeSelected}
                className='account-select text-input rounded'
                /* onChange={(e) => onChangeSelectedDelete(e)} */
              >
                <option selected value={''}>
                  Tất cả
                </option>
                <option value={'get'}>GET</option>
                <option value={'post'}>POST</option>
              </select>
            </div>
          </div>
          {/* <div className='w-100 position-relative d-flex pe-6'>
            <label
              className='position-absolute fs-5 fw-semibold px-1'
              style={{
                transform: `translate(${0}px, ${-11}px)`,
                color: '#1EC0FF',
                left: '12px',
                fontWeight: '700',
                backgroundColor: 'transparent',
              }}
            >
              Choose Package
            </label>
            <select
              name='package'
              className='rounded border border-2 w-100 py-4 px-3'
              style={{borderColor: '#B2B2B2'}}
              onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
            >
              <option disabled selected style={{color: '#B2B2B2'}}>
                Chọn...
              </option>
              <option value={'get'}>GET</option>
              <option value={'post'}>POST</option>
            </select>
          </div> */}
        </div>
      </div>
      {loading ? (
        <ListPagination
          posts={webhooks}
          TableHeader={TableHeader}
          Linkto={{}}
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
          License={'webhook'}
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
