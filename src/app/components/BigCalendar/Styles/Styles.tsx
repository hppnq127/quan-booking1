function isSelected(day:any, value:any){
    return value.isSame(day,"day")
  }
  function beforeSelectedMonth(day:any, value:any){
    return value.isBefore(day, "month")
  }
  function afterSelectedMonth(day:any , value:any){
    return value.isAfter(day, "month")
  }
  function beforeToday( day:any){
    return day.isBefore(new Date(), "day")
  }
  function isToday(day:any){
    return day.isSame(new Date(), "day")
  }
  export default function dayStyles(day:any, value:any){
    if(afterSelectedMonth(day,value)) return "before"
    if(beforeSelectedMonth(day,value)) return "before"
    if(isSelected(day, value)) return "selected"
    if(isToday(day)) return "today"
  }
//////////////////////////////////////////////////////////* status */
  export function statusStyles(day:any, value:any, status?:any){
    if(afterSelectedMonth(day,value)) return "before-status"
    if(beforeSelectedMonth(day,value)) return "before-status"
    if(beforeToday(day)) return "expire-status"
    if(status===6) return "cancel-status"
    return "active-status"
  }
  ///////////////////////////////////////////////////////
  export  function currMonthName(value:any) {
    return value.format('MM')
  }
  export  function currYear(value:any){
    return value.format('YYYY')
  }
  export function curr3Year( value:any) {
    return <div className='curr3Year'>
      
      <div className='pre-year' >{value.clone().subtract(1, 'year').format('YYYY')}</div>
      <div className='curr-year' >{value.format('YYYY')}</div>
      <div className='next-year'>{value.clone().add(1, 'year').format('YYYY')}</div>
    </div>
  }
  export  function prevYear(value:any) {
    return value.clone().subtract(1, 'year')
  }
  export  function nextYear(value:any) {
    return value.clone().add(1, 'year')
  }