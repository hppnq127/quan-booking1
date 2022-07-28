import {FC} from 'react'
import {format} from 'timeago.js'
const Notification = [
  {
    type: 'partner',
    id: 'P0914481315',
    createdAt: Date.now(),
  },
  {
    type: 'customer',
    id: 'P0913556781',
    createdAt: Date.now(),
  },
  {
    type: 'newfeed',
    feedID: 'P0914481315S',
    createdAt: Date.now(),
  },
  {
    type: 'reportedfeed',
    feedID: 'P0914481315S',
    createdAt: Date.now(),
  },
  {
    type: 'cancel',
    order: '914481315',
    createdAt: Date.now(),
  },
  {
    type: 'customer',
    id: 'P09233454333',
    createdAt: Date.now(),
  },
  {
    type: 'missing',
    order: '9144813156',
    createdAt: Date.now(),
  },
  {
    type: 'reportedfeed',
    feedID: 'P0914235534S',
    createdAt: Date.now(),
  },
  {
    type: 'newfeed',
    feedID: 'P09144866887F',
    createdAt: Date.now(),
  },
]
const NofitycationRender = () => {
  return Notification.map((NotiItem, index) => {
    if (NotiItem.type === 'partner') {
      return (
        <div className='d-flex flex-row align-items-center py-3 ' key={index}>
          <img alt='user' src='/media/noti/user.png' style={{width:'35px',height:'35px', marginRight:'10px'}} />
          <div className='d-flex flex-column '>
            <div style={{fontWeight:'500'}} className='fs-6'>
              Đối tác <span style={{fontWeight:'700'}}>{NotiItem.id}</span> tạo tài khoản thành công{' '}
            </div>
            <div className='mb-1 ' style={{color: '#828282', fontSize: '12px'}}>
              {format(NotiItem.createdAt)}
            </div>
          </div>
        </div>
      )
    }
    if (NotiItem.type === 'customer') {
      return (
        <div className='d-flex flex-row align-items-center py-3' key={index}>
          <img alt='user' src='/media/noti/user.png' style={{width:'35px',height:'35px', marginRight:'10px'}} />
          <div className='d-flex flex-column '>
            <div style={{fontWeight:'500'}} className='fs-6'>
              Người dùng  <span style={{fontWeight:'700'}}>{NotiItem.id}</span> tạo tài khoản thành công{' '}
            </div>
            <div className='mb-1 ' style={{color: '#828282', fontSize: '12px'}}>
              {format(NotiItem.createdAt)}
            </div>
          </div>
        </div>
      )
    }
    if (NotiItem.type === 'newfeed') {
      return (
        <div className='d-flex flex-row align-items-center py-3' key={index}>
          <img alt='user' src='/media/noti/feed.png' style={{width:'35px',height:'35px', marginRight:'10px'}} />
          <div className='d-flex flex-column '>
            <div style={{fontWeight:'500'}} className='fs-6'>
              Bài đăng  <span style={{fontWeight:'700'}}>{NotiItem.feedID}</span> đã được tạo {' '}
            </div>
            <div className='mb-1 ' style={{color: '#828282', fontSize: '12px'}}>
              {format(NotiItem.createdAt)}
            </div>
          </div>
        </div>
      )
    }
    if (NotiItem.type === 'reportedfeed') {
      return (
        <div className='d-flex flex-row align-items-center py-3' key={index}>
          <img alt='user' src='/media/noti/reported.png' style={{width:'35px',height:'35px', marginRight:'10px'}} />
          <div className='d-flex flex-column '>
            <div style={{fontWeight:'500'}} className='fs-6'>
              Bài đăng  <span style={{fontWeight:'700'}}>{NotiItem.feedID}</span> bị báo cáo vi phạm {' '}
            </div>
            <div className='mb-1 ' style={{color: '#828282', fontSize: '12px'}}>
              {format(NotiItem.createdAt)}
            </div>
          </div>
        </div>
      )
    }
    if (NotiItem.type === 'cancel') {
      return (
        <div className='d-flex flex-row align-items-center py-3' key={index}>
          <img alt='user' src='/media/noti/stamp.png' style={{width:'35px',height:'35px', marginRight:'10px'}} />
          <div className='d-flex flex-column '>
            <div style={{fontWeight:'500'}} className='fs-6'>
              Đơn đặt <span style={{fontWeight:'700'}}>{NotiItem.order}</span> đã hủy {' '}
            </div>
            <div className='mb-1 ' style={{color: '#828282', fontSize: '12px'}}>
              {format(NotiItem.createdAt)}
            </div>
          </div>
        </div>
      )
    }
    if (NotiItem.type === 'missing') {
      return (
        <div className='d-flex flex-row align-items-center py-3' key={index}>
          <img alt='user' src='/media/noti/stamp.png' style={{width:'35px',height:'35px', marginRight:'10px'}} />
          <div className='d-flex flex-column '>
            <div style={{fontWeight:'500'}} className='fs-6'>
              Đơn đặt <span style={{fontWeight:'700'}}>{NotiItem.order}</span> vắng mặt {' '}
            </div>
            <div className='mb-1 ' style={{color: '#828282', fontSize: '12px'}}>
              {format(NotiItem.createdAt)}
            </div>
          </div>
        </div>
      )
    }
    return false
  })
}
const HeaderNotificationsMenu: FC = () => (
  <div
    className='menu menu-sub menu-sub-dropdown menu-column w-475px '
    data-kt-menu='true'
    
  >
    <div className='d-flex flex-column'>
      <div
        className='py-6 ps-8 fs-3'
        style={{fontWeight: '700', zIndex: '1', boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)'}}
      >
        Thông báo
      </div>
      <div className='d-flex flex-column  px-8 h-500px scroll'>{NofitycationRender()}</div>
    </div>
  </div>
)

export {HeaderNotificationsMenu}
