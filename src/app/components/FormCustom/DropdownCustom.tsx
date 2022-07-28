import './FormCustom.scss'
type DropdownCustomProps = {
  selectOptions: any
  name: string
  choosen?: any
}
export const DropdownCustom = (props: DropdownCustomProps) => {
  const {selectOptions, name, choosen} = props
  const selectbox = () => {
    return selectOptions.map((option: any, index: number) => {
      return <option value={index + 1}>{option}</option>
    })
  }
  return (
    <div className='w-100 h-100'>
      <label className='account-label text-input-title'>{name}</label>
      <div className='account-form '>
        <select
          onChange={(e) => choosen(e)}
          className='account-select text-input rounded'
        >
          <option defaultValue={0}>Tất cả</option>
          {selectbox()}
        </select>
      </div>
    </div>
  )
}
