import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {PageDataProvider} from './core'
import {useLocation} from 'react-router-dom'
import {MenuComponent} from '../assets/ts/components'
import {MasterHeader} from './components/header/MasterHeader'
import {MasterAside} from './components/aside/MasterAside'
import { ChatPageAdmin } from '../partials/layout/drawer-messenger/ChatPageAdmin'
const MasterLayout = () => {
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])
  return (
    <PageDataProvider>
      <div
        className='d-flex flex-column overflow-hidden w-100 h-100 '
        style={{backgroundColor: '#F6F6F6'}}
      >
        {/* Header Master */}
        <MasterHeader />
        {/* info */}
        <div className='d-flex flex-row  justify-content-end w-100 h-100'>
          <MasterAside />
          {/* content */}
          <div
            style={{
              backgroundColor: '#F6F6F6',
              width: 'calc(100% - 256px)',
              height: '100%',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          >
            <div style={{height: '8%'}}></div>
            <Outlet />
            <ChatPageAdmin />
          </div>
        </div>
      </div>
    </PageDataProvider>
  )
}
export {MasterLayout}
