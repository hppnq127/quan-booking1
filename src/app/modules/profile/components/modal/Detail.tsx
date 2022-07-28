import {Link} from 'react-router-dom'
type Props = {
  Linkto: any
  UserId: number
  License?: string
}

const Detail = (props: Props) => {
  const {Linkto, UserId} = props
  const linkDetail = `${Linkto.toDetail}?id=${UserId}`
  const linkEdit = `${Linkto.toEdit}?id=${UserId}`

  return (
    <div className=' w-150px'>
      <div>
        <div className=' d-flex align-items-start d-flex flex-column  '>
          <div className='text-dark text-start   Hover-primary w-100'>
            <Link to={linkDetail} state={{Id: UserId}}>
              <button
                style={{background: 'none', border: 'none'}}
                type='button'
                className='Focus-button w-100 py-2'
              >
                <i className='fa-solid fa-eye  text-dark pe-3'></i>
                Xem chi tiết
              </button>
            </Link>
          </div>
          {/* --------------------------------------------------- */}
          <div className='text-dark text-start  Hover-primary w-100 pe-3'>
            <Link to={linkEdit} state={{Id: UserId}}>
              <button
                style={{background: 'none', border: 'none'}}
                type='button'
                className='Focus-button py-2 w-100 '
              >
                <i className='far fa-edit text-dark pe-3'></i>
                Chỉnh sửa
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Detail}
