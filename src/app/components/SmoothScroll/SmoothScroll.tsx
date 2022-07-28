import {useEffect} from 'react'
import Scrollbar from 'smooth-scrollbar'
type PropsType = {
  element: any
  onClick?: boolean
}
export const SmoothScroll = ({element}: PropsType) => {
  useEffect(() => {
    if (element) {
      //const scrollElement = Scrollbar.init(element, options)
      // Scrollbar.infiniteScroll(() => {
      //   console.log('scrollbar')
      // }, 100)
      // console.log(scrollElement.getSize())
    }
    return () => {
      if (Scrollbar) {
        Scrollbar.destroy(element)
      }
    }
  }, [element])
  return <></>
}
