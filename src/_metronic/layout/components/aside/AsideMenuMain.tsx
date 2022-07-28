/* eslint-disable react/jsx-no-target-blank */

import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {useIntl} from 'react-intl'

export function AsideMenuMain() {
  const intl = useIntl()
  const superAdmin = () => {
    if (1 > 0) {
      return (
        <AsideMenuItemWithSub
          to='/admin/settings'
          title='Settings'
          fontIcon='bi-chat-left'
          icon='/media/icons/duotune/abstract/setting.svg'
        >
          <AsideMenuItem to='/admin/settings/provinces' title='Tỉnh/Thành phố' />
          <AsideMenuItem to='/admin/settings/districts' title='Quận/Huyện/Thị xã' />
          <AsideMenuItem to='/admin/settings/sub-districts' title='Phường/Xã' />
          <AsideMenuItem to='/admin/settings/settingWebHook' title='WebHook' />
        <AsideMenuItem to='/admin/settings/customCSS' title='Custom CSS' />
        </AsideMenuItemWithSub>
      )
    } else {
      return <></>
    }
  }
  return (
    <>
      {/* quản lý tài khoản */}
      <div className='aside_pt'></div>
      <AsideMenuItemWithSub
        to='/crafted/pages'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/quanlytaikhoan.svg'
      >
        <AsideMenuItem to='/crafted/pages/profile/overview' title='Đối tác' hasBullet={true} />
        <AsideMenuItem to='/crafted/pages/profile/projects' title='Khách hàng' hasBullet={true} />
      </AsideMenuItemWithSub>
      {/* quản lý bài đăng */}
      <AsideMenuItem
        to='/crafted/widgets/managerfeed'
        title='Quản lý bài đăng'
        fontIcon='bi-person'
        icon='/media/icons/duotune/general/quanlybaidang.svg'
      />
      {/* xếp hạng- báo cáo */}
      <AsideMenuItem
        to='/crafted/widgets/statistics'
        title='Xếp hạng - Báo cáo'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/xephangbaocao.svg'
      />
      {/* Quản lý đơn đặt */}
      <AsideMenuItem
        to='/crafted/widgets/managerorder'
        title='Quản lý đơn đặt'
        icon='/media/icons/duotune/general/quanlydondat.svg'
        fontIcon='bi-layers'
      />
      {/* Data Export */}

      <AsideMenuItem
        to='/crafted/widgets/mixed'
        title='Data Export'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/general/dataexport.svg'
      />
      {/* Chính sách */}

      <AsideMenuItem
        to='/crafted/widgets/tables'
        title='Chính sách'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/general/chinhsach.svg'
      />
      {/* Dạo */}

      <AsideMenuItem
        to='/crafted/widgets/dao'
        title='Dạo'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/general/dao.svg'
      />
      {/* Thông báo */}
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Thông báo'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/general/thongbao.svg'
      >
        <AsideMenuItem to='/apps/chat/partner' title='Đối tác' />
        <AsideMenuItem to='/apps/chat/user' title='Khách hàng' />
        <AsideMenuItem  to='/apps/chat/edit' title='Tạo thông báo' />
        <AsideMenuItem to='/apps/chat/setting' title='Notification Setting' />
      </AsideMenuItemWithSub>
      {/* setting */}
      {superAdmin()}
      
    </>
  )
}
