import React from 'react'
type SendToProps= {
    name:string
    loading?:boolean
    data?:any
}
export const SendTo = (props:SendToProps) => {
    const {name, loading, data} = props
 const Exception= data.Exception.slice(0,-2).split(",")


  if (Exception.length=== 0) {
    return (
      <div>
        <div className='name-sendto'>Tất cả {name}</div>
        <div className='number-sendto'>145 {name}</div>
      </div>
    )
  }
  if (Exception.length > 0) {
    return (
      <>
        <button
          type='button'
          data-bs-toggle='modal'
          data-bs-target='#ModalDoiTac'
          className='button-detail'
        >
          <div className='d-flex flex-column align-items-start'>
            <div className='name-sendto'>Tất cả {name} NGOẠI TRỪ...</div>
            {loading? (<div className='number-sendto'>{Exception.length}/145 {name}</div>):(<div>Loading...</div>)}
          </div>
          <div className='d-flex flex-row align-items-center'>
            <span className='more-detail'>Xem thêm</span>
            <img alt='' src='/media/icons/duotune/abstract/right-green.png' />
          </div>
        </button>
        <div
          className='modal fade'
          id='ModalDoiTac'
          tabIndex={-1}
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content px-6'>
              <div
                className='w-100 d-flex justify-content-center py-6 fs-6'
                style={{fontWeight: 700}}
              >
                Tất cả {name} tác NGOẠI TRỪ
              </div>
           
              <div className='input-group rounded w-100 ' style={{border: '1px solid #B2B2B2'}}>
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
            

              <div className='py-2'>{Exception.length}/145</div>

              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                  Close
                </button>
                <button type='button' className='btn btn-primary'>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
/*   if (hello === 3 ){
    return (
        <>
          <button
            type='button'
            data-bs-toggle='modal'
            data-bs-target='#ModalDoiTac'
            className='button-detail'
          >
            <div className='d-flex flex-column align-items-start'>
              <div className='name-sendto'>Tùy chọn</div>
              <div className='number-sendto'>100/145 {name}</div>
            </div>
            <div className='d-flex flex-row align-items-center'>
              <span className='more-detail'>Xem thêm</span>
              <img alt='' src='/media/icons/duotune/abstract/right-green.png' />
            </div>
          </button>
          <div
            className='modal fade'
            id='ModalDoiTac'
            tabIndex={-1}
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content px-6'>
                <div
                  className='w-100 d-flex justify-content-center py-6 fs-6'
                  style={{fontWeight: 700}}
                >
                  Tùy chọn
                </div>
            
                <div className='input-group rounded w-100 ' style={{border: '1px solid #B2B2B2'}}>
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
              
  
                <div className='py-2'>13/145</div>
  
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                    Close
                  </button>
                  <button type='button' className='btn btn-primary'>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
  } */
  return <></>
}
