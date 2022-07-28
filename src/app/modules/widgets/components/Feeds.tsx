import React, {FC} from 'react'

import { DaoMenuItem } from '../Daonavbar'
const Feeds: FC = () => {
  
  return (
    <div>
      <DaoMenuItem to='/crafted/widgets/dao/' title='Dạo'  fontIcon='bi-chat-left'
        icon='/media/icons/duotune/general/dao.svg'/>
       </div>
  )
}

export {Feeds}
