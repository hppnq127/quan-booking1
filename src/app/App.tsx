import {useEffect, useState} from 'react'
import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {getLayout, ILayout, LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import AuthInit from './modules/auth/redux/AuthInit'

const App = () => {
  const [config] = useState<ILayout>(getLayout())
  useEffect(() => {
    const head = document.getElementsByTagName('head')[0]
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = config.theme
    head.appendChild(link)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
