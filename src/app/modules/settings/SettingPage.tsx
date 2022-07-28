import {Navigate, Routes, Route} from 'react-router-dom'
import { SettingDistrict } from './component/SettingDistrict/SettingDistrict'
import {SettingProvince} from './component/SettingProvince'
import {SettingSubDistrict} from './component/SettingSubDistrict'
import {SettingWebHook} from './component/SettingWebHook/SettingWebHook'
import {SettingCustomCSS} from './component/SettingCustomCSS/SettingCustomCSS'
const SuspensedView = ({children}:any) => {
  return (
    <div
      style={{
        paddingTop: '1.5%',
        paddingBottom: '1.5%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '97%',
        height: '92%',
      }}
    >
      <div className='formcustom-setting h-100'>
        <div className='w-100 d-flex flex-column justify-content-between h-100'>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <img
                alt=''
                src='/media/avatars/settingpic.png'
                style={{width: '100px', height: '75px'}}
              />
              <img
                alt=''
                src='/media/avatars/settingpic.png'
                style={{width: '100px', height: '75px', transform: 'scaleX(-1)'}}
              />
            </div>
          </div>
          <div className='d-flex justify-content-center align-items-center h-500px'>{children}</div>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <img
                alt=''
                src='/media/avatars/settingpic.png'
                style={{width: '100px', height: '75px', transform: 'scaleY(-1)'}}
              />
              <img
                alt=''
                src='/media/avatars/settingpic.png'
                style={{width: '100px', height: '75px', transform: 'scale(-1)'}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const SettingPage = () => (
  <Routes>
    <Route>
      <Route
        path='provinces'
        element={
          <>
            <SuspensedView>
            <SettingProvince />
            </SuspensedView>
          </>
        }
      />
     
      <Route
        path='districts'
        element={
          <>
          <SuspensedView>
          <SettingDistrict />
          </SuspensedView>
            
          </>
        }
      />
      <Route
        path='sub-districts'
        element={
          <>
          <SuspensedView>
          <SettingSubDistrict />
          </SuspensedView>
            
          </>
        }
      />
      <Route
        path='web-hook'
        element={
          <>
          <SuspensedView>
          <SettingWebHook />
          </SuspensedView>
            
          </>
        }
      />
      <Route
        path='settingWebHook'
        element={
          <>
            <SettingWebHook />
          </>
        }
      />
      <Route
        path='customCSS'
        element={
          <>
            <SettingCustomCSS />
          </>
        }
      />
      <Route index element={<Navigate to='/crafted/pages/profile/overview' />} />
    </Route>
  </Routes>
)

export default SettingPage
