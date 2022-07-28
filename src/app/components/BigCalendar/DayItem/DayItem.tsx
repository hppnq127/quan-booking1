import clsx from 'clsx'
import './DayItem.scss'

type DayItemProps = {
    day: string
    index: number
    onClick:any
    value:any
}
export const DayItem = (props:DayItemProps) => {
    const {day,index,onClick,value} = props
    console.log(value);
  return (
   <div></div>
  )
}
