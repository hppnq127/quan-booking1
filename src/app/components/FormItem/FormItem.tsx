import clsx from 'clsx'

type FormItemProps = {
  lableName: string | number | null
  value: string | number | null | any
 
}
export const FormItem = (props: FormItemProps) => {
  const {lableName, value} = props
  return (
    <div className='w-100 position-relative d-flex justify-content-center py-4'>
      <label
        className='position-absolute bg-white fs-5 fw-semibold px-1 '
        style={{
          transform: `translate(${0}px, ${-11}px)`,
          color: '#616161',
          left: '12px',
        }}
      >
        {lableName}
      </label>
      <div
        placeholder='Nhập thông tin'
        className='fs-5 px-4 py-3 rounded  w-100 '
        style={{border: '1px solid #B2B2B2', color: '#616161', minHeight: '46px'}}
      >
        {value}
      </div>
    </div>
  )
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
type FormInputItemProps = {
  lableName: string | number | null
  value: string | number | null | any
  onChange?:any
  index?:number
  errors?:boolean
  styleLable?:any
  styleInput?:any
  name:string
 
}
export const FormInputItem = (props: FormInputItemProps) => {
  const {lableName, value, index,onChange,errors,styleLable,styleInput,name} = props
  
  return (
    <div className='w-100 position-relative d-flex justify-content-center  pt-4 pb-6 ' key={index}>
    <label
      className='position-absolute bg-white fs-5 fw-semibold px-1 '
      style={styleLable !== undefined ? styleLable:{
        transform: `translate(${0}px, ${-11}px)`,
        color: '#03AC84',
        left: '12px',
       
      }}
    >
      {lableName}
    </label>
    <input
      placeholder='Nhập thông tin'
      className='fs-5 px-4 py-3 rounded  w-100 '
      style={styleInput !== undefined ? styleInput:{border: '1px solid #03AC84', color: '#616161', minHeight: '46px'}}
      name={name}
      value={value}
      onChange={(e) => {
        onChange(e)
      }}
    ></input>
    <div
      className={clsx(
        errors === true
          ? 'position-absolute w-100 d-flex align-items-end bottom-0 justify-content-end  text-danger'
          : 'd-none'
      )}
    >
      {lableName === 'Email' ? (<>Sai định dạng Email !</> ):(<>Không được để trống!</>)}
    </div>
  </div>
  )
}
