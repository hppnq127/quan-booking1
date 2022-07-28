import  { useRef, useState} from 'react'
import {MenuDao} from './MenuDao'
import {DaoNavBar} from './DaoNavBar'
import {Baiviet} from './Baiviet'
export function Dao() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [tags, setTags] = useState<string[]>([])
  return (
    <>
      <DaoNavBar />
      <div
        ref={wrapRef}
        className='d-flex flex-column  align-items-center position-relative'
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          height: '92%',
          overflow: 'auto',
        }}
      >
        <div
          className=' d-flex flex-column justify-content-center align-items-center'
          style={{
            position: 'absolute',
            paddingTop: '0%',
            paddingBottom: '1.5%',
            // paddingBottom: '100px',
            width: '700px',
          }}
        >
          <div style={{width: '100%'}}>
            <div style={{paddingTop: '10%'}}></div>
            <MenuDao setTagsProp={setTags} tagsProps={tags} />
            <Baiviet wrapRef={wrapRef} tagsProps={tags} />
          </div>
        </div>
      </div>
    </>
  )
}
