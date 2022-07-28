import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {NotiPartner} from './components/Partner/NotiPartner'
import { NotiUser} from './components/User/NotiUser'
import {Drawer} from './components/Drawer'
import { EditNotiPartner } from './components/Partner/EditNotiPartner'
import { DetailNotiPartner } from './components/Partner/DetailNotiPartner'
import { EditNotiUser } from './components/User/EditNotiUser'
import { DetailNotiUser } from './components/User/DetailNotiUser'
import { Setting } from './components/Setting/Setting'
const ChatPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='partner'
          element={
            <>
              <NotiPartner />
            </>
          }
        />

        <Route
          path='user'
          element={
            <>

              <NotiUser />
            </>
          }
        />
        <Route
          path='edit'
          element={
            <>
              <Drawer />
            </>
          }
        />
        <Route 
         path='edit-partner'
         element={
           <>
             <EditNotiPartner />
           </>
         }/>
         <Route 
         path='detail-partner'
         element={
           <>
             <DetailNotiPartner />
           </>
         }/>
         <Route 
         path='edit-user'
         element={
           <>
             <EditNotiUser />
           </>
         }/>
         <Route 
         path='detail-user'
         element={
           <>
             <DetailNotiUser />
           </>
         }/>
         <Route 
         path='setting'
         element={
           <>
             <Setting />
             </>
         }/>
        <Route index element={<Navigate to='/apps/chat/partner' />} />
      </Route>
    </Routes>
  )
}
export default ChatPage
