import { useState} from 'react'
import './FeedEdit.scss'
import {RoomDetail} from '../FeedDetail/RoomDetail/RoomDetail'
import {PriceList} from '../FeedDetail/PriceList/PriceList'
import {Coupon} from '../FeedDetail/Coupon/Coupon'
export const FeedEdit = () => {
  const [toggleState, setToggleState] = useState(1)
  const [modal, setModal] = useState<{
    remove:boolean,
    hide:boolean
  }>({
    remove:false,
    hide:false
  })
  const toggleTab = (number: number) => {
    setToggleState(number)
  }
  const handleRemove = () => {
    setModal({...modal, remove:true})
  }
  const handleHide = () => {
    setModal({...modal, hide:true})
  }
  return (
    <div
      className='position-relative'
      style={{
        left: '-256px',
        zIndex: 10,
        width: 'calc( 100% + 256px)',
        height: '92%',
        backgroundColor: '#F6F6F6',
      }}
    > 
      {/* Start Modal */}
      <div className={modal.remove === true ? 'modal-remove' : 'd-none'}>
        <div className='bg-white modal-remove-feed'>
          <div className='ps-5 pe-12 py-5 d-flex flex-row modal-f-header w-100'>
            <img alt='' src='/media/icons/duotune/question.png' className='me-6  '></img>
            <span className=''>
              {' '}
              Bạn có chắc rằng muốn gỡ bài đăng này không? Bài đăng sẽ được gỡ vĩnh viễn!
            </span>
          </div>
          <div className='w-100 position-relative d-flex justify-content-center  pt-4 pb-6 textareaFocus '>
            <label
              className='position-absolute bg-white fs-5 fw-semibold px-1 '
              style={{
                transform: `translate(${0}px, ${-11}px)`,
                color: '#616161',
                left: '38px',
              }}
            >
              Ghi chú
            </label>
            <textarea
              className='fs-5 px-4 py-3 rounded  w-100 mx-8 d-flex flex-row '
              name='Email'
              id='exampleFormControlTextarea1'
              rows={5}
              defaultValue={''}
              placeholder='Lý do gỡ bài đăng'
             /*  onChange={(e) => {
                let {name, value} = e.target
              }} */
            />
          </div>
          <div className='d-flex flex-row justify-content-end pe-4'>
            <button
              type='button'
              className='mx-4 px-8 py-3 backFeed '
              onClick={() => setModal({...modal, remove:false})}
            >
              TRỞ VỀ
            </button>
            <button className='mx-4 hide'>GỠ BÀI</button>
          </div>
        </div>
      </div>
      <div className={modal.hide=== true ? 'modal-remove' : 'd-none'}>
        <div className='bg-white modal-remove-feed'>
          <div className='ps-5 pe-12 py-5 d-flex flex-row modal-f-header w-100'>
            <img alt='' src='/media/icons/duotune/question.png' className='me-6  '></img>
            <span className='d-flex align-items-center'>
              {' '}
              Bạn có chắc rằng muốn ẩn bài đăng này không? 
            </span>
          </div>
          <div className='w-100 position-relative d-flex justify-content-center  pt-4 pb-6 textareaFocus '>
            <label
              className='position-absolute bg-white fs-5 fw-semibold px-1 '
              style={{
                transform: `translate(${0}px, ${-11}px)`,
                color: '#616161',
                left: '38px',
              }}
            >
              Ghi chú
            </label>
            <textarea
              className='fs-5 px-4 py-3 rounded  w-100 mx-8 d-flex flex-row '
              name='Email'
              id='exampleFormControlTextarea1'
              rows={5}
              defaultValue={''}
              placeholder='Lý do ẩn bài đăng'
              
            />
          </div>
          <div className='d-flex flex-row justify-content-end pe-4'>
            <button
              type='button'
              className='mx-4 px-8 py-3 backFeed '
              onClick={() => setModal({...modal, hide:false})}
            >
              TRỞ VỀ
            </button>
            <button className='mx-4 hide'>ẨN BÀI</button>
          </div>
        </div>
      </div>
      {/* End Modal */}
      <div className='d-flex w-100 h-100'>
        <div className='col-2'>
          <div className='tabs'>
            <div
              className={toggleState === 1 ? 'list-active' : 'list'}
              onClick={() => toggleTab(1)}
            >
              Thông tin chung
            </div>
            <div
              className={toggleState === 2 ? 'list-active' : 'list'}
              onClick={() => toggleTab(2)}
            >
              Thông tin phòng
            </div>
            <div
              className={toggleState === 3 ? 'list-active' : 'list'}
              onClick={() => toggleTab(3)}
            >
              Lịch và giá
            </div>
            <div
              className={toggleState === 4 ? 'list-active' : 'list'}
              onClick={() => toggleTab(4)}
            >
              Khuyến mãi
            </div>
          </div>
        </div>

        <div className='col-10'>
          <div className=' pags'>
            <div className={toggleState === 1 ? 'pag-active' : 'pag'}>
              {/* <Genernal /> */}
            </div>
            <div className={toggleState === 2 ? 'pag-active' : 'pag'}>
              <RoomDetail />
            </div>
            <div className={toggleState === 3 ? 'pag-active' : 'pag'}>
              <PriceList CreationTime=''  />
            </div>
            <div className={toggleState === 4 ? 'pag-active' : 'pag'}>
              <Coupon />
            </div>
          </div>
          <div
            className={
              toggleState === 1 ? 'w-100 d-flex flex-row justify-content-end pe-10 mt-10' : 'pag'
            }
          >
            <button
              type='button'
              className='mx-4 remove-feed'
              onClick={() => {
                handleRemove()
              }}
            >
              GỠ BÀI ĐĂNG
            </button>
           
            <button 
            className='mx-4 hide-feed'
            onClick={() => {
              handleHide()
            }}
            >ẨN BÀI ĐĂNG</button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}
