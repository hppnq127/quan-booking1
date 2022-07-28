import {useState} from 'react'
import {FormInputItem} from '../../../../../components/FormItem/FormItem'

export const Setting = () => {
  const Array = ['value1', 'value2', 'value4', 'value5']
  const [editSetting, setEditSetting] = useState({
    GoogleApiFcm: Array[0],
    AuthKey: Array[1],

    P12Password: Array[3],
    P12Bundleld: Array[4],
  })

  const [errors, setErrors] = useState({
    GoogleApiFcm: false,
    AuthKey: false,

    P12Password: false,
    P12Bundleld: false,
  })

  const lableName = Object.keys(editSetting)
  const error = Object.values(errors)
  const handleChangeValue = (name: string, value: any, index: number) => {
    setEditSetting({...editSetting, [name]: value})

    if (value === '' && name === lableName[index]) {
      setErrors({...errors, [name]: true})
    } else {
      setErrors({...errors, [name]: false})
    }
  }
  const items = () => {
    return Object.values(editSetting).map((item: any, index: any) => {
      return (
        <FormInputItem
          lableName={lableName[index]}
          name={lableName[index]}
          value={item}
          key={index}
          errors={error[index]}
          onChange={(e: any) => {
            let {name, value} = e.target
            handleChangeValue(name, value, index)
          }}
          styleLable={{
            transform: `translate(${0}px, ${-11}px)`,
            color: '#1EC0FF',
            left: '12px',
            fontWeight: '700',
          }}
          styleInput={{border: '1px solid #1EC0FF', color: '#616161', minHeight: '46px'}}
        />
      )
    })
  }
  const handleUpdate = () => {
    console.log(editSetting)
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
      <div className='formcustom-setting'>
        <div className='w-100 d-flex flex-column '>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <img
                alt=''
                src='/media/avatars/settingpic.png'
                style={{width: '100px', height: '75px'}}
              />
              <img
                alt=''
                src='/media/avatars/settingpic.png'
                style={{width: '100px', height: '75px', transform: 'scaleX(-1)'}}
              />
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <div className='d-flex flex-column' style={{width: '50%'}}>
              {items()}
              <div
                className='w-100 position-relative d-flex justify-content-center  pt-4 pb-6 '
                
              >
                <label
                 className='position-absolute bg-white fs-5 fw-semibold px-1 '
                 style={{
                  transform: `translate(${0}px, ${-11}px)`,
                  color: '#1EC0FF',
                  left: '12px',
                  fontWeight: '700',
                }}
                >
                  P12Certificate
                </label>
                <div
                  placeholder='Nhập thông tin'
                  className='fs-5  rounded  w-100 '
                  style={{border: '1px solid #1EC0FF', color: '#616161', minHeight: '46px'}}
                >
                
                </div>
                
              </div>
              <div className='d-flex justify-content-end '>
                <button
                  className='setting-button'
                  data-bs-toggle='modal'
                  data-bs-target='#BlockModal'
                >
                  Xác nhận
                </button>
                <div
                  className='modal fade '
                  id='BlockModal'
                  data-bs-backdrop='static'
                  data-bs-keyboard='false'
                  tabIndex={-1}
                  aria-labelledby='staticBackdropLabel'
                  aria-hidden='true'
                  style={{transform: 'translateY(200px)'}}
                >
                  <div className='modal-dialog w-400px'>
                    <div className='modal-content'>
                      <div className='ps-5 pe-12 py-5 d-flex flex-row modal-f-header w-100'>
                        <img alt='' src='/media/icons/duotune/question.png' className='me-6'></img>
                        <span className='d-flex align-items-center'>
                          {' '}
                          Bạn có chắc rằng muốn thay đổi thông tin?
                        </span>
                      </div>

                      <div className='d-flex flex-row justify-content-end pe-4 mb-8'>
                        <button
                          type='button'
                          className='mx-4 px-8 py-3 backEdit '
                          data-bs-dismiss='modal'
                        >
                          TRỞ VỀ
                        </button>
                        <button
                          className='mx-4 blockEdit'
                          onClick={() => {
                            handleUpdate()
                          }}
                          data-bs-dismiss='modal'
                        >
                          THAY ĐỔI
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <img
                alt=''
                src='/media/avatars/settingpic.png'
                style={{width: '100px', height: '75px', transform: 'scaleY(-1)'}}
              />
              <img
                alt=''
                src='/media/avatars/settingpic.png'
                style={{width: '100px', height: '75px', transform: 'scale(-1)'}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
