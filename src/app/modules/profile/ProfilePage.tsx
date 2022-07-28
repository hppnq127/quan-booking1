import {Navigate, Routes, Route} from 'react-router-dom'
import { DetailParter } from './components/modal/DetailPartner'

import { Danhsachdoitac } from './Danhsachdoitac'
import { Danhsachkhachhang } from './Danhsachkhachhang'
import { Documents } from './components/Documents'
import { EditPartner } from './components/modal/EditPartner/EditPartner'
import { EditUser } from './components/modal/EditUser'
import { DetailUser } from './components/modal/DetailUser'




const ProfilePage = () => (
  
  <Routes>
    <Route >
      <Route
        path='overview'
        element={
          <>
           
           <Danhsachdoitac />
           
          </>
        }
      />
      <Route
        path='projects'
        element={
          <>
            <Danhsachkhachhang />
          </>
        }
      />
       <Route
        path='documents'
        element={
          <>
            
            <Documents />
          </>
        }
      />
      <Route
        path='detailpartner'
        element={
          <>
            
            <DetailParter />
          </>
        }
      />
      <Route
        path='editpartner'
        element={
          <>
            
            <EditPartner />
            
          

          </>
        }
      />
      <Route
        path='detailuser'
        element={
          <>
            
            <DetailUser />
          </>
        }
      />
      <Route
        path='edituser'
        element={
          <>
            
            <EditUser />
          </>
        }
      />
      <Route index element={<Navigate to='/crafted/pages/profile/overview' />} />
    </Route>
  </Routes>
)

export default ProfilePage
