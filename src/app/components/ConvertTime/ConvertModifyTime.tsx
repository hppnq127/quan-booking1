import Moment from 'moment'
type Convert = {
    LastModificationTime:string|null
}
export const ConvertModifytime = (props:Convert) => {
    const {LastModificationTime} = props
    if (LastModificationTime !== null) {
      const modifySilce:string = LastModificationTime.slice(0, 16)
      Moment.locale('en')
      const modifyFormat = modifySilce
      const LastModificationTimeFormat = Moment(modifyFormat).format('DD/MM/YYYY  HH:mm')
      return (
        <td>
          <div className='d-flex justify-content-center ps-4'>
            <div className='d-flex justify-content-start text-start' style={{width: 'auto'}}>
              {LastModificationTimeFormat.slice(0, 10)} {LastModificationTimeFormat.slice(-5)}{' '}
            </div>
          </div>
        </td>
      )
    } else {
      return (
        <td style={{width: '110px'}}>
          <div className='d-flex justify-content-center'>
            <div className='d-flex justify-content-start text-start' style={{width: 'auto'}}></div>
          </div>
        </td>
      )
    }
  }
