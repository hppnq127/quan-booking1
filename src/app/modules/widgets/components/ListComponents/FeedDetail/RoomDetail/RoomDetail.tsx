import React from 'react'

export const RoomDetail = () => {
  return (
    <>
      <div className=' d-flex align-items-center '>
        <span className='pag-header'> Quản lý bài đăng</span>
        <i className='fa-solid fa-angle-right icon-header px-5'></i>{' '}
        <span className='pag-name'>Thông tin phòng</span>
      </div>
      <div className='input-group rounded my-5' style={{border: '1px solid #B2B2B2', width: '40%'}}>
        <span className='input-group-text border-0 bg-white' id='search-addon'>
          <i className='fas fa-search fs-2' />
        </span>
        <input
          type='text'
          className='form-control rounded fs-4'
          placeholder='Tìm kiếm'
          aria-label='Search'
          aria-describedby='search-addon'
          style={{border: 'none'}}
        />
      </div>
      <table  className='w-100 table border border border-secondary border-2'>
        <thead className='border border border-secondary border-2 '>
          <tr  className=' align-middle text-center'>
            <th>Tên phòng</th>
            <th style={{width:'25%'}}>
              <div className='d-flex flex-column w-100 justify-content-center'>
                <th className='w-100 d-flex flex-row justify-content-center'>Giá niêm yết</th>
                <div className='d-flex flex-row w-100 '>
                  <div className='w-50 text-center '>
                    đ/giờ
                  </div>
                  <div className='w-50 text-center'>
                    đ/ngày
                  </div>
                </div>
              </div>
            </th>
            <th>Số đơn đặt</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  )
}
