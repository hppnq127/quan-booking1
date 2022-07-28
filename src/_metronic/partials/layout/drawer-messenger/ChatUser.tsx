import React, {useState, useEffect, useRef} from 'react'
import {MESSAGE} from './ChatContent'
import {CONVERSATION} from './DrawerMessenger'
import moment from 'moment'
import {socket} from './ConnectSocketIo'
type ChatUserProps = {
  userInfo: CONVERSATION
  toggleClick: any
  toggleState: any
}
export const ChatUser = React.memo((props: ChatUserProps) => {
  const {userInfo, toggleState, toggleClick} = props
  const [isRead, setIsRead] = useState(false)
  const [isOnline, setIsOnline] = useState(false)
  const initMountState = useRef(true)
  const [lastMessage, setLastMessage] = useState<MESSAGE | null>(
    userInfo.newestMessage
      ? {
          id: userInfo.newestMessage.id,
          ConversationId: userInfo.id,
          createdAt: userInfo.newestMessage.createdAt,
          Content: userInfo.newestMessage.Content,
          Chatting:
            userInfo.newestMessage.CustomerId === -1 && userInfo.newestMessage.PartnerId === -1
              ? 'Admin'
              : 'Other',
        }
      : null
  )
  useEffect(() => {
    if (initMountState.current) {
      initMountState.current = false
    } else if(userInfo.newestMessage) {
      console.log("tin",userInfo);
      setIsRead(userInfo.newestMessage.CustomerId === -1 && userInfo.newestMessage.PartnerId === -1 ? true:false)
      setLastMessage(
        { 
              id: userInfo.newestMessage.id,
              ConversationId: userInfo.id,
              createdAt: userInfo.newestMessage.createdAt,
              Content: userInfo.newestMessage.Content,
              Chatting:
                userInfo.newestMessage.CustomerId === -1 && userInfo.newestMessage.PartnerId === -1
                  ? 'Admin'
                  : 'Other',
            }
      )
    }
  }, [userInfo])
  useEffect(() => {
    socket.emit('login', {
      userId: 100,
      room: userInfo.id,
    })
    socket.on('online', (userIds: number[]) => {
      setIsOnline(userIds.includes(userInfo.Chatter.id))
      /*    console.log("Online", userIds); */
    })
    socket.on('offline', (userIds: number[]) => {
      setIsOnline(userIds.includes(userInfo.Chatter.id))
      /*   console.log("offline", userIds); */
    })
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, userInfo])
  return (
    <li
      className={
        toggleState === userInfo.id
          ? 'tabs-user-chat active-tabs-user-chat d-flex align-items-center'
          : 'tabs-user-chat'
      }
      onClick={() => {
        toggleClick(userInfo.id)
        setIsRead(true)
      }}
      style={{height: '56px'}}
    >
      <div className='d-flex flex-row w-100 px-6 align-items-center h-100'>
        <div className='d-flex align-items-center h-100'>
          <img
            src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
            alt='avatar'
            className='d-flex align-self-center me-3'
            width={40}
          />
        </div>
        <div className='py-2 h-100 w-100 d-flex flex-column justify-content-between'>
          <div className='d-flex justify-content-between align-items-center'>
            <p className='fw-normal mb-0 fs-6 text-dark'>{userInfo.Chatter.PartnerName}</p>
            {isOnline ? (
              <span className='bullet bullet-dot bg-success h-10px w-10px'></span>
            ) : (
              <span className='bullet bullet-dot bg-danger h-10px w-10px'></span>
            )}
          </div>

          {lastMessage ? (
            lastMessage.Chatting === 'Admin' ? (
              <div
                className='w-100 d-flex justify-content-between'
                style={{color: '#828282', fontSize: '13px'}}
              >
                <div>
                  Bạn:{' '}
                  {lastMessage.Content.toString().length <= 15
                    ? lastMessage.Content
                    : `${lastMessage.Content.toString().slice(0, 16)}...`}
                </div>
                <div>{moment(lastMessage.createdAt).format('HH:mm')}</div>
              </div>
            ) : (
              <div
                className='w-100 d-flex justify-content-between'
                style={{
                  color: isRead ? '#828282' : '#000',
                  fontSize: '13px',
                  fontWeight: isRead ? 500 : 700,
                }}
              >
                <div>
                  {lastMessage.Content.toString().length <= 15
                    ? lastMessage.Content
                    : `${lastMessage.Content.toString().slice(0, 16)}...`}
                </div>
                <div>{moment(lastMessage.createdAt).format('HH:mm')}</div>
              </div>
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </li>
  )
})
