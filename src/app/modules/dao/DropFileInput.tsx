import {useRef} from 'react'

type SetTypeOnChange = {
  onChangeFile: React.Dispatch<React.SetStateAction<any>>
  actionString?: string
  image?: string
  icon?: string
  classIcon?: string
}

const DropFileInput = ({onChangeFile, actionString, image, icon, classIcon}: SetTypeOnChange) => {
  const wrapperRef = useRef<any>(null)

  const onDragEnter = () => wrapperRef.current.classList.add('dragover')
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover')
  const onDrop = () => wrapperRef.current.classList.remove('dragover')

  return (
    <div className='d-flex justify-content-center align-items-center border border-2 rounded h-100 w-100'>
      <div
        ref={wrapperRef}
        className='d-flex flex-column w-100 h-100 justify-content-center align-items-center position-relative drop-file-input'
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {/* <i className='fa-solid fa-cloud-arrow-up mb-3 text-primary' style={{fontSize: '100px'}}></i> */}
        {image ? (
          <img src={image} alt='' className='w-100 h-100' style={{objectFit: 'cover'}} />
        ) : (
          <>
            {icon && <img src={icon} alt='' style={{}} />}
            {classIcon && (
              <i className={`${classIcon} py-6`} style={{fontSize: '80px', color: '#5885AF'}}></i>
            )}
          </>
        )}
        {actionString && <p className='fs-3 text-black-50 fw-bolder'>{actionString}</p>}
        <input
          type='file'
          multiple
          value={''}
          className='w-100 h-100 position-absolute btn'
          style={{opacity: '0', top: '0', left: '0'}}
          onChange={(e) => onChangeFile(e)}
        />
      </div>
    </div>
  )
}

export default DropFileInput