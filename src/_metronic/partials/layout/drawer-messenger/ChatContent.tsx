import React, {useState, useRef, useEffect} from 'react'
import {CONVERSATION} from './DrawerMessenger'
import Axios, {AxiosResponse} from 'axios'
import {format, register} from 'timeago.js'
import {ChatTimeAgo} from '../../../../app/components/ChatTimeAgo/ChatTimeAgo'
import moment from 'moment'
import ScrollToBottom from 'react-scroll-to-bottom'
import {socket} from './ConnectSocketIo'
import {TypingAnimation} from '../../../../app/components/TypingAnimation/TypingAnimation'
import { URL_BOOKING_STUDIO } from '../../../../setup/URL'
type UserChat = {
  userchat: CONVERSATION
}
export interface MESSAGE {
  id: number
  ConversationId: number
  createdAt: string
  Content: string | number
  Chatting: string
}
register('my-locale', ChatTimeAgo)
format('2016-06-12', 'my-locale')
export const ChatContent = React.memo((props: UserChat) => {
  const {userchat} = props
  const {id} = props.userchat
  const [messageList, setMessageList] = useState<MESSAGE[]>([])
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeOutRef = useRef<any>(null)
  useEffect(() => {
    const ChatList = () => {
      setLoading(false)
      let promise = Axios({
        url: `${URL_BOOKING_STUDIO}chat/message?page=1&limit=6&ConversationId=${id}`,
        method: 'GET',
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Thanh cong')
        //Nếu gọi api thành công
        // => set lại state
        setMessageList(result.data.data)
        setLoading(true)
        /* setTotalPages(result.data.pagination.totalPages) */
      })
      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    }
    ChatList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [message, setMessage] = useState('')
  const messageEndRef = useRef<null | HTMLDivElement>(null)
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  const onInputChange = (event: any) => {
    setMessage(event.target.value)
    socket.emit('typing', {
      ConversationId: userchat.id,
      typing: true,
    })
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current)
    }
    typingTimeOutRef.current = setTimeout(() => {
      socket.emit('typing', {
        ConversationId: userchat.id,
        typing: false,
      })
    }, 1000)
  }
  const onEnterPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false && message.trim() !== '') {
      e.preventDefault()
      const stringMoment = `${moment().toISOString()}`
      const thisMoment = moment(`${stringMoment.slice(0, 23)}-07:00`)
      const modify = `${thisMoment.toISOString()}`
      const messageContent = {
        id: Math.random(),
        ConversationId: userchat.id,
        createdAt: modify,
        Content: message,
        Chatting: 'Admin',
      }
      setMessage('')
      await Axios({
        url: `${URL_BOOKING_STUDIO}chat/message?page=1&limit=10&ConversationId=${id}`,
        method: 'POST',
        data: {ConversationId: userchat.id, Content: message, Admin: true},
      })
      socket.emit('send_message', messageContent)
    }
    scrollToBottom()
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      if (data.ConversationId === userchat.id) {
        setIsTyping(false)
        setMessageList((list) => [...list, data])
        scrollToBottom()
      } else {
        return false
      }
    })
    scrollToBottom()
    socket.on('isTyping', (data) => {
      if (data.ConversationId === userchat.id && data.typing === true) {
        setIsTyping(true)
        scrollToBottom()
      } else {
        setIsTyping(false)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
  return (
    <div style={{height: '474px', overflow: 'hidden', width: '100%', position: 'relative'}}>
      <div className='d-flex flex-row ps-6 py-3'>
        <img
          alt='user'
          src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
          style={{width: '40px', height: '40px'}}
        ></img>
        <div className='d-flex flex-column w-100 justify-content-center ps-3'>
          <div>{userchat.Chatter.PartnerName}</div>
        </div>
      </div>
      {loading ? (
        <>
          {messageList.length === 0 ? (
            <div className='w-100 d-flex justify-content-center align-items-center '>
              {' '}
              <button
                className='start-conversation'
                onClick={async () => {
                  const stringMoment = `${moment().toISOString()}`
                  const thisMoment = moment(`${stringMoment.slice(0, 23)}-07:00`)
                  const modify = `${thisMoment.toISOString()}`
                  const messageContent = {
                    id: Math.random(),
                    ConversationId: userchat.id,
                    createdAt: modify,
                    Content: 'Xin chào',
                    Chatting: 'Admin',
                  }
                  await socket.emit('send_message', messageContent)
                  scrollToBottom()
                  setMessage('')
                  await Axios({
                    url: `${URL_BOOKING_STUDIO}chat/message?page=1&limit=10&ConversationId=${id}`,
                    method: 'POST',
                    data: {ConversationId: userchat.id, Content: 'Xin chào', Admin: true},
                  })
                }}
              >
                Nhấn để trò chuyện ngay !
              </button>{' '}
              <img
                alt='waving'
                src='/media/icons/duotune/communication/waving.gif'
                width={80}
                height={80}
              ></img>
            </div>
          ) : (
            <ScrollToBottom
              className='scroll-smooth h-325px w-100 d-flex flex-column justify-content-between'
              followButtonClassName='text-danger bg-danger '
              initialScrollBehavior='smooth'
            >
              {messageList
                .sort((a: MESSAGE, b: MESSAGE) => {
                  const a1: any = new Date(a.createdAt) //sua
                  const b1: any = new Date(b.createdAt) // sua
                  return a1 - b1
                })
                .map((itm, index) => {
                  return (
                    <div key={index}>
                      <div
                        className={
                          itm.Chatting === 'Admin'
                            ? ' px-6  d-flex w-100 d-flex flex-row-reverse fw-bold align-items-end'
                            : ' px-6 d-flex w-100 justify-content-start align-items-end'
                        }
                      >
                        <div
                          className={
                            itm.Chatting !== 'Admin'
                              ? 'my-2 px-4 py-3 active-tabs-user-chat chat-item-main'
                              : 'bg-gray-primary my-2 px-4 py-3 chat-item-main'
                          }
                        >
                          {itm.Content}
                        </div>
                        <div className='mb-2 mx-2' style={{color: '#828282', fontSize: '12px'}}>
                          {format(itm.createdAt.slice(0, -1).concat('+07:00'), 'my-locale')}
                        </div>
                      </div>
                    </div>
                  )
                })}
              {isTyping ? (
                <div className='d-flex align-items-center ps-6'>
                  {' '}
                  <img
                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
                    alt='avatar'
                    className='d-flex align-self-center'
                    width={40}
                  />{' '}
                  <TypingAnimation />
                </div>
              ) : (
                <></>
              )}
            </ScrollToBottom>
          )}
        </>
      ) : (
        <div className='w-100 d-flex justify-content-center align-items-center h-325px '>
          <div>
            <div>
              <div className='spinner-grow text-success' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
              <div className='spinner-grow text-danger' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
              <div className='spinner-grow text-warning' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
              <div className='spinner-grow text-info' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className='py-4 d-flex flex-row w-100 align-items-center '
        style={{
          zIndex: '1',
          boxShadow: '0 -4px 20px 0 rgba(0, 0, 0, 0.1)',
          bottom: '0px',
          position: 'absolute',
        }}
      >
        <div className='ms-8'>
          <img
            alt='logochat'
            src='/media/logos/logo-chat.png'
            style={{height: '40px', width: '40px'}}
          ></img>
        </div>
        <textarea
          className='form-control form-control-flush rounded-pill '
          style={{backgroundColor: '#F4F4F4', marginLeft: '10px'}}
          rows={1}
          data-kt-element='input'
          placeholder='Type a message'
          value={message}
          onKeyDown={onEnterPress}
          onChange={onInputChange}
        ></textarea>

        <div className='d-flex align-items-center me-2'>
          <button
            className='btn btn-sm btn-icon btn-active-light-primary me-1'
            type='button'
            data-bs-toggle='tooltip'
            title='Coming soon'
          >
            <i className='bi bi-paperclip fs-3'></i>
          </button>
        </div>
      </div>
    </div>
  )
})
