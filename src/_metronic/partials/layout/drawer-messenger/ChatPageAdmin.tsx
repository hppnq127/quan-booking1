import React, {useState, useEffect} from 'react'
import {DrawerMessenger} from './DrawerMessenger'
import './ChatPageAdmin.scss'
import clsx from 'clsx'
import { socket } from './ConnectSocketIo'
export const ChatPageAdmin = () => {
  const [countUnRead, setCountUnRead] = useState(0) ////// sau nay goi api
  const toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px'
  useEffect(() => {
    socket.on('receive_message', (data) => {
      if (data.Chatting !== 'Admin') {
        setCountUnRead((pre) => pre + 1)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
  return (
    <>
      <div className='chat-page-admin-button shadow' onClick={() => setCountUnRead(0)}>
        <div
          className={clsx(
            'btn btn-icon btn-active-light-primary btn-custom position-relative',
            toolbarButtonHeightClass
          )}
          id='kt_drawer_chat_toggle'
        >
          <i className='fa-regular fa-comment-dots' style={{fontSize: '27px', color: '#E22828'}} />
          {countUnRead === 0 ? (
            <></>
          ) : (
            <>
              {countUnRead > 0 && countUnRead <= 10 ? (
                <div className='chat-page-admin-unRead'>{countUnRead}</div>
              ) : (
                <div className='chat-page-admin-unRead-plus'>
                  10<span style={{transform: 'translateY(-3px)', fontSize: '7px'}}>+</span>
                </div>
              )}
            </>
          )}
          <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>
        </div>
      </div>
      <div
        id='kt_drawer_chat'
        className='bg-white rounded chat-page-admin-container'
        data-kt-drawer='true'
        data-kt-drawer-name='chat'
        data-kt-drawer-activate='true'
        data-kt-drawer-overlay='true'
        data-kt-drawer-direction='custom-chat'
        data-kt-drawer-toggle='#kt_drawer_chat_toggle'
        data-kt-drawer-close='#kt_drawer_chat_close'
      >
        <DrawerMessenger />
      </div>
    </>
  )
}
