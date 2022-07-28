import {useLayout} from '../../core'
import {AsideMenu} from './AsideMenu'

export const MasterAside = () => {
  const {classes} = useLayout()
  return (
    <div className='aside'>
      <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
    </div>
  )
}
