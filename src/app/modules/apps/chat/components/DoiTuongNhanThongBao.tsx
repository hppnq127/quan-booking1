import { memo} from 'react'
import {MultiSelect} from 'react-multi-select-component'
import './objectNotify.scss'
type SetPropsType = {
  exceptsProp: any[]
  optionsProp: any[]
  toggleState: number
  setToggleState: React.Dispatch<React.SetStateAction<number>>
  users: any[]
  setExceptsProp: React.Dispatch<React.SetStateAction<any[]>>
  setOptionsProp: React.Dispatch<React.SetStateAction<any[]>>
}
export const DoiTuongNhanThongBao = memo(
  ({
    exceptsProp,
    optionsProp,
    setExceptsProp,
    setOptionsProp,
    users,
    setToggleState,
    toggleState,
  }: SetPropsType) => {
    //const [loading, setLoading] = useState(false)
    // const [excepts, setExceptsProp] = useState<any[]>([])
    // const [opitons, setOptionsProp] = useState<any[]>([])

    /* const [searchTerm, setSearchTerm] =useState('') */
    const toggleTab = (index: number) => {
      setToggleState(index)
    }
    return (
      <div className='d-flex flex-column w-100'>
        <div className='d-flex flex-row w-100 py-1'>
          <div
            className='w-50 d-flex  align-items-center'
            onClick={() => {
              toggleTab(0)
              setExceptsProp([])
              setOptionsProp([])
            }}
          >
            <input
              type='radio'
              name='doitac'
              id='doitac'
              style={{width: '17px', height: '17px', marginRight: '20px'}}
              checked={toggleState === 0}
            />
            <label className='form-check-label fs-5' htmlFor='doitac'>
              Đối tác
            </label>
          </div>
          <div
            className='w-50 d-flex  align-items-center'
            onClick={() => {
              toggleTab(1)
              setExceptsProp([])
              setOptionsProp([])
            }}
          >
            <input
              type='radio'
              name='doitac'
              id='khachhang'
              style={{width: '17px', height: '17px', marginRight: '20px'}}
              checked={toggleState === 1}
            />
            <label className='form-check-label fs-5' htmlFor='khachhang'>
              Khách hàng
            </label>
          </div>
        </div>
        <div>
          {/* Đối tác */}
          <div className={toggleState === 0 ? 'content  active-content p-0' : 'content p-0'}>
            <div
              className=' w-100 d-flex justify-content-between align-items-center p-4 rounded-3 my-2'
              style={{backgroundColor: '#F4F4F4'}}
              onClick={() => {
                setExceptsProp([])
                setOptionsProp([])
              }}
            >
              <label className='form-check-label d-flex flex-column w-600px' htmlFor='tatca'>
                <div className='fs-4'>Tất cả đối tác</div>
                <div style={{color: '#828282'}}>{users.length} đối tác</div>
              </label>
              <input
                className=''
                type='radio'
                name='chondoitac'
                id='tatca'
                style={{width: '20px', height: '20px'}}
              />
            </div>
            {/* Ngoai tru doi tac: start */}
            <div className='mb-2'>
              <button
                type='button'
                className='w-100 rounded-3 p-4'
                data-bs-toggle='modal'
                data-bs-target='#ModalExceptPartner'
                style={{border: 'none', backgroundColor: '#F4F4F4'}}
                onClick={() => setOptionsProp([])}
              >
                <div
                  className=' w-100 d-flex justify-content-between align-items-center   '
                  style={{backgroundColor: '#F4F4F4'}}
                >
                  <label
                    className='form-check-label d-flex flex-column text-start w-600px'
                    htmlFor='tatcatru'
                  >
                    <div className='fs-4'>Tất cả đối tác NGOẠI TRỪ...</div>
                    <div style={{color: '#828282'}}>
                      {exceptsProp.length}/{users.length} đối tác
                    </div>
                  </label>
                  <input
                    className=''
                    type='radio'
                    name='chondoitac'
                    id='tatcatru'
                    style={{width: '20px', height: '20px'}}
                  ></input>
                </div>
              </button>
              {/* Begin Modal Partner */}
              <div
                className='modal fade'
                id='ModalExceptPartner'
                tabIndex={-1}
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content px-6 mt-16'>
                    <div
                      className='w-100 d-flex justify-content-center py-6 fs-6'
                      style={{fontWeight: 700}}
                    >
                      Tất cả các đối tác NGOẠI TRỪ
                    </div>
                    <div className='py-2'>
                      {exceptsProp.length}/{users.length}
                    </div>
                    <MultiSelect
                      className={''}
                      options={users}
                      value={exceptsProp}
                      onChange={setExceptsProp}
                      labelledBy='selected'
                      // defaultIsOpen={true}
                      isOpen={true}
                      ItemRenderer={({checked, option, onClick, disabled}: any) => (
                        <div
                          className={`item-renderer d-flex justify-content-between h-40px px-3 ${
                            disabled && 'disabled'
                          }`}
                        >
                          {option.label === 'Select All' ||
                          option.label === 'Select All (Filtered)' ? (
                            <div>
                              <span>{option.label}</span>
                            </div>
                          ) : (
                            <div className='d-flex h-100'>
                              <img
                                src='/media/avatars/300-1.jpg'
                                alt=''
                                className='h-100 rounded-circle pe-3'
                              />
                              <div className='d-flex flex-column'>
                                <span>{option.value}</span>
                                <span>{option.label.substring(0, 20)}</span>
                              </div>
                            </div>
                          )}
                          <input
                            className='Checkbox-input'
                            style={{width: '20px', height: '20px'}}
                            type='checkbox'
                            onChange={onClick}
                            checked={checked}
                            tabIndex={-1}
                            disabled={disabled}
                          />
                        </div>
                      )}
                    />
                    <div className='h-400px'></div>
                    <div className='d-flex justify-content-end align-items-center mb-6'>
                      <button
                        type='button'
                        className='btn btn-outline-light text-danger h-100 btn-sm'
                        data-bs-dismiss='modal'
                        onClick={() => setExceptsProp([])}
                      >
                        Hủy
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger h-100 btn-sm px-8'
                        data-bs-dismiss='modal'
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Modal Partner */}
            </div>
            {/* Ngoai tru doi tac : end*/}

            {/* Tuy chon doi tac: start */}
            <div>
              <button
                type='button'
                className='w-100 rounded-3 p-4'
                data-bs-toggle='modal'
                data-bs-target='#ModalSelectedPartner'
                style={{border: 'none', backgroundColor: '#F4F4F4'}}
                onClick={() => setExceptsProp([])}
              >
                <div
                  className=' w-100 d-flex justify-content-between align-items-center   '
                  style={{backgroundColor: '#F4F4F4'}}
                >
                  <label
                    className='form-check-label d-flex flex-column text-start w-600px'
                    htmlFor='optionPartner'
                  >
                    <div className='fs-4'>Tùy chọn</div>
                    <div style={{color: '#828282'}}>
                      {optionsProp.length}/{users.length} đối tác
                    </div>
                  </label>
                  <input
                    className=''
                    type='radio'
                    name='chondoitac'
                    id='optionPartner'
                    style={{width: '20px', height: '20px'}}
                  ></input>
                </div>
              </button>
              {/* Begin Modal Partner */}
              <div
                className='modal fade'
                id='ModalSelectedPartner'
                tabIndex={-1}
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content px-6 mt-16'>
                    <div
                      className='w-100 d-flex justify-content-center py-6 fs-6'
                      style={{fontWeight: 700}}
                    >
                      Tùy chọn
                    </div>
                    <div className='py-2'>
                      {optionsProp.length}/{users.length}
                    </div>
                    <MultiSelect
                      className={''}
                      options={users}
                      value={optionsProp}
                      onChange={setOptionsProp}
                      labelledBy='selected'
                      // defaultIsOpen={true}
                      isOpen={true}
                      ItemRenderer={({checked, option, onClick, disabled}: any) => (
                        <div
                          className={`item-renderer d-flex justify-content-between h-40px px-3 ${
                            disabled && 'disabled'
                          }`}
                        >
                          {option.label === 'Select All' ||
                          option.label === 'Select All (Filtered)' ? (
                            <div>
                              <span>{option.label}</span>
                            </div>
                          ) : (
                            <div className='d-flex h-100'>
                              <img
                                src='/media/avatars/300-1.jpg'
                                alt=''
                                className='h-100 rounded-circle pe-3'
                              />
                              <div className='d-flex flex-column'>
                                <span>{option.value}</span>
                                <span>{option.label.substring(0, 20)}</span>
                              </div>
                            </div>
                          )}
                          <input
                            className='Checkbox-input'
                            style={{width: '20px', height: '20px'}}
                            type='checkbox'
                            onChange={onClick}
                            checked={checked}
                            tabIndex={-1}
                            disabled={disabled}
                          />
                        </div>
                      )}
                    />
                    <div className='h-400px'></div>
                    <div className='d-flex justify-content-end align-items-center mb-6'>
                      <button
                        type='button'
                        className='btn btn-outline-light text-danger h-100 btn-sm'
                        data-bs-dismiss='modal'
                        onClick={() => setOptionsProp([])}
                      >
                        Hủy
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger h-100 btn-sm px-8'
                        data-bs-dismiss='modal'
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Modal Partner */}
            </div>
            {/* Tuy chon doi tac : end*/}
          </div>

          {/* Khách hàng */}
          <div className={toggleState === 1 ? 'content  active-content p-0' : 'content p-0'}>
            <div
              className=' w-100 d-flex justify-content-between align-items-center p-4 rounded-3 my-2'
              style={{backgroundColor: '#F4F4F4'}}
              onClick={() => {
                setExceptsProp([])
                setOptionsProp([])
              }}
            >
              <label
                className='form-check-label d-flex flex-column w-600px'
                htmlFor='tatcakhachhang'
              >
                <div className='fs-4'>Tất cả khách hàng</div>
                <div style={{color: '#828282'}}>{users.length} khách hàng</div>
              </label>
              <input
                className=''
                type='radio'
                name='chonkhachhang'
                id='tatcakhachhang'
                style={{width: '20px', height: '20px'}}
              />
            </div>
            {/* Ngoai tru khach hang: start */}
            <div className='mb-2'>
              <button
                type='button'
                className='w-100 rounded-3 p-4'
                data-bs-toggle='modal'
                data-bs-target='#ModalExceptCustomer'
                style={{border: 'none', backgroundColor: '#F4F4F4'}}
                onClick={() => setOptionsProp([])}
              >
                <div
                  className=' w-100 d-flex justify-content-between align-items-center   '
                  style={{backgroundColor: '#F4F4F4'}}
                >
                  <label
                    className='form-check-label d-flex flex-column text-start w-600px'
                    htmlFor='tatcatrukhachhang'
                  >
                    <div className='fs-4'>Tất cả khách hàng NGOẠI TRỪ...</div>
                    <div style={{color: '#828282'}}>
                      {exceptsProp.length}/{users.length} khách hàng
                    </div>
                  </label>
                  <input
                    className=''
                    type='radio'
                    name='chonkhachhang'
                    id='tatcatrukhachhang'
                    style={{width: '20px', height: '20px'}}
                  ></input>
                </div>
              </button>
              {/* Begin Modal Customer */}
              <div
                className='modal fade'
                id='ModalExceptCustomer'
                tabIndex={-1}
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content px-6 mt-16'>
                    <div
                      className='w-100 d-flex justify-content-center py-6 fs-6'
                      style={{fontWeight: 700}}
                    >
                      Tất cả các khách hàng NGOẠI TRỪ
                    </div>
                    <div className='py-2'>
                      {exceptsProp.length}/{users.length}
                    </div>
                    <MultiSelect
                      className={''}
                      options={users}
                      value={exceptsProp}
                      onChange={setExceptsProp}
                      labelledBy='selected'
                      // defaultIsOpen={true}
                      isOpen={true}
                      ItemRenderer={({checked, option, onClick, disabled}: any) => (
                        <div
                          className={`item-renderer d-flex justify-content-between h-40px px-3 ${
                            disabled && 'disabled'
                          }`}
                        >
                          {option.label === 'Select All' ||
                          option.label === 'Select All (Filtered)' ? (
                            <div>
                              <span>{option.label}</span>
                            </div>
                          ) : (
                            <div className='d-flex h-100'>
                              <img
                                src='/media/avatars/300-1.jpg'
                                alt=''
                                className='h-100 rounded-circle pe-3'
                              />
                              <div className='d-flex flex-column'>
                                <span>{option.value}</span>
                                <span>{option.label.substring(0, 20)}</span>
                              </div>
                            </div>
                          )}
                          <input
                            className='Checkbox-input'
                            style={{width: '20px', height: '20px'}}
                            type='checkbox'
                            onChange={onClick}
                            checked={checked}
                            tabIndex={-1}
                            disabled={disabled}
                          />
                        </div>
                      )}
                    />
                    <div className='h-400px'></div>
                    <div className='d-flex justify-content-end align-items-center mb-6'>
                      <button
                        type='button'
                        className='btn btn-outline-light text-danger h-100 btn-sm'
                        data-bs-dismiss='modal'
                        onClick={() => setExceptsProp([])}
                      >
                        Hủy
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger h-100 btn-sm px-8'
                        data-bs-dismiss='modal'
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Modal Partner */}
            </div>
            {/* Ngoai tru khách hàng : end*/}

            {/* Tuy chon khach hang: start */}
            <div>
              <button
                type='button'
                className='w-100 rounded-3 p-4'
                data-bs-toggle='modal'
                data-bs-target='#ModalSelectedCustomer'
                style={{border: 'none', backgroundColor: '#F4F4F4'}}
                onClick={() => setExceptsProp([])}
              >
                <div
                  className=' w-100 d-flex justify-content-between align-items-center   '
                  style={{backgroundColor: '#F4F4F4'}}
                >
                  <label
                    className='form-check-label d-flex flex-column text-start w-600px'
                    htmlFor='optionCustomer'
                  >
                    <div className='fs-4'>Tùy chọn</div>
                    <div style={{color: '#828282'}}>
                      {optionsProp.length}/{users.length} khách hàng
                    </div>
                  </label>
                  <input
                    className=''
                    type='radio'
                    name='chonkhachhang'
                    id='optionCustomer'
                    style={{width: '20px', height: '20px'}}
                  ></input>
                </div>
              </button>
              {/* Begin Modal Partner */}
              <div
                className='modal fade'
                id='ModalSelectedCustomer'
                tabIndex={-1}
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content px-6 mt-16'>
                    <div
                      className='w-100 d-flex justify-content-center py-6 fs-6'
                      style={{fontWeight: 700}}
                    >
                      Tùy chọn
                    </div>
                    <div className='py-2'>
                      {optionsProp.length}/{users.length}
                    </div>
                    <MultiSelect
                      className={''}
                      options={users}
                      value={optionsProp}
                      onChange={setOptionsProp}
                      labelledBy='selected'
                      // defaultIsOpen={true}
                      isOpen={true}
                      ItemRenderer={({checked, option, onClick, disabled}: any) => (
                        <div
                          className={`item-renderer d-flex justify-content-between h-40px px-3 ${
                            disabled && 'disabled'
                          }`}
                        >
                          {option.label === 'Select All' ||
                          option.label === 'Select All (Filtered)' ? (
                            <div>
                              <span>{option.label}</span>
                            </div>
                          ) : (
                            <div className='d-flex h-100'>
                              <img
                                src='/media/avatars/300-1.jpg'
                                alt=''
                                className='h-100 rounded-circle pe-3'
                              />
                              <div className='d-flex flex-column'>
                                <span>{option.value}</span>
                                <span>{option.label.substring(0, 20)}</span>
                              </div>
                            </div>
                          )}
                          <input
                            className='Checkbox-input'
                            style={{width: '20px', height: '20px'}}
                            type='checkbox'
                            onChange={onClick}
                            checked={checked}
                            tabIndex={-1}
                            disabled={disabled}
                          />
                        </div>
                      )}
                    />
                    <div className='h-400px'></div>
                    <div className='d-flex justify-content-end align-items-center mb-6'>
                      <button
                        type='button'
                        className='btn btn-outline-light text-danger h-100 btn-sm'
                        data-bs-dismiss='modal'
                        onClick={() => setOptionsProp([])}
                      >
                        Hủy
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger h-100 btn-sm px-8'
                        data-bs-dismiss='modal'
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Modal Customer */}
            </div>
            {/* Tuy chon khach hang : end*/}
          </div>
        </div>
      </div>
    )
  }
)
