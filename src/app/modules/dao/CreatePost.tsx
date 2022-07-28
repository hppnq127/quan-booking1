import React, {useState} from 'react'
import Picker, {IEmojiData} from 'emoji-picker-react'
import {hashtags} from './Baiviet'
import DropFileInput from './DropFileInput'
import {CREATE_POST} from './model'
import './Baiviet.scss'
import axios, {AxiosResponse} from 'axios'
import {URL_BOOKING_STUDIO} from '../../../setup/URL'

type SetPropsType = {
  filterProps: {}
  setFiltersProps: React.Dispatch<React.SetStateAction<any>>
}

const CreatePost = ({filterProps, setFiltersProps}: SetPropsType) => {
  const [post, setPost] = useState<CREATE_POST>({
    Tags: [],
    Description: '',
    Image: [],
    Video: [],
  })

  console.log(filterProps)

  const onChangeFile = (e: any) => {
    const newPost = {...post}
    const files = e.target.files

    for (const file of files) {
      file.preview = URL.createObjectURL(file)
      newPost.Image.unshift(file)
    }
    setPost({...newPost})
  }

  const removeImagePost = (name: string) => {
    const newImagePost = post.Image.filter((image: any) => image !== name)
    setPost({...post, Image: newImagePost})
  }

  const removeAllImagePost = () => {
    setPost({...post, Image: []})
  }

  const handleSetValueInput = (e: HTMLTextAreaElement) => {
    setPost({...post, Description: e.value})
  }

  const handlePostPost = () => {
    try {
      const newPost = {...post}
      for (let i = 0; i < newPost.Image.length; i++) {
        delete newPost.Image[i].preview
      }
      const formData = new FormData()
      for (let item of newPost.Image) {
        formData.append('image', item)
      }
      formData.append('Description', newPost.Description)
      formData.append('Tags', newPost.Tags.join(','))

      let promise = axios({
        url: `${URL_BOOKING_STUDIO}post-post`,
        method: 'POST',
        data: formData,
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Tạo bài đăng thành công')
        setFiltersProps({...filterProps, page: 1})
        setPost({
          Tags: [],
          Description: '',
          Image: [],
          Video: [],
        })
      })
      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    } catch (error) {
      console.log(error, 'Tạo bài đăng thất bại')
    }
  }

  const handleChooseHas = (index: string) => {
    const newChoose = [...post.Tags]
    const checkIndex = newChoose.indexOf(index)
    if (checkIndex === -1) {
      newChoose.push(index)
    } else {
      newChoose.splice(checkIndex, 1)
    }
    setPost({...post, Tags: newChoose})
  }

  const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
    setPost({...post, Description: post.Description + `${emojiObject.emoji}`})
  }

  return (
    <div
      className='bg-white mb-4 d-flex flex-row justify-content-center align-items-center w-100'
      style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)', height: '96px'}}
    >
      <div
        className='d-flex justify-content-between align-items-center w-100 px-10'
        style={{height: '40px'}}
      >
        <img
          src='/media/svg/post/taoBaiDang.svg'
          alt='#'
          className='me-6 h-100'
          style={{width: '40px'}}
        />
        <div className='d-flex justify-content-between align-items-center w-100 h-100 position-relative'>
          <input
            disabled={true}
            placeholder='Tạo bài viết...'
            className='fs-6 p-4 pe-20 w-100 h-100 border border-2 rounded-pill outline-none'
            style={{borderColor: '#B2B2B2', cursor: 'pointer', zIndex: '1'}}
            data-bs-toggle='modal'
            data-bs-target='#exampleModalToggle'
          />
          {/* <!-- Button trigger modal --> */}
          <div
            className='me-6 position-absolute'
            style={{width: '24px', right: '5px', zIndex: '0'}}
          >
            <img src='/media/svg/post/upLoadImgPost.svg' alt='#' className='' />
          </div>

          {/* -----------------modal------------------- */}
          <div
            className='modal fade'
            id='exampleModalToggle'
            aria-hidden='true'
            aria-labelledby='exampleModalToggleLabel'
            data-bs-backdrop='static'
          >
            <div className='modal-dialog modal-dialog-scrollable modal-lg'>
              <div className='modal-content py-12 px-4'>
                <div className='d-flex position-relative justify-content-center align-items-center mb-2 pb-2'>
                  <h5
                    className='modal-title text-uppercase pe-none fs-2 fw-bolder'
                    id='staticBackdropLabel'
                  >
                    Tạo bài viết
                  </h5>
                  <div
                    className='btn-close position-absolute border border-2 rounded-circle p-3'
                    style={{right: '20px', backgroundColor: '#E7E7E7', cursor: 'pointer'}}
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></div>
                </div>
                <div className='modal-body mb-n5'>
                  <div className='mb-8'>
                    <img
                      src='/media/svg/post/taoBaiDang.svg'
                      alt='#'
                      className='me-6 h-100'
                      style={{width: '40px'}}
                    />
                    <span className='fs-4 fw-bolder'>Booking Studio</span>
                  </div>
                  <div className='d-flex mb-8'>
                    {hashtags.map((item, index) => (
                      <div
                        key={index}
                        className={`btn border border-light rounded-pill py-2 px-3 me-4 fs-5  ${
                          post.Tags.includes(item) ? 'text-success bg-success bg-opacity-10' : ''
                        }`}
                        style={{backgroundColor: '#F4F4F4'}}
                        onClick={() => handleChooseHas(item)}
                      >
                        #{item}
                      </div>
                    ))}
                  </div>
                  <div className='input-group mb-6'>
                    <textarea
                      className='form-control fs-4 resize-none border-0'
                      placeholder='Nhập nội dung bài viết'
                      aria-label='With textarea'
                      rows={5}
                      value={post.Description}
                      onChange={(e) => handleSetValueInput(e.target)}
                    ></textarea>
                  </div>
                  {/* ------------------------------------------------------------- */}
                  <div className='d-flex flex-row-reverse mb-8 w-100'>
                    <div className='btn-group dropstart'>
                      <div
                        className='btn'
                        id='dropdownMenuClickableInside'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                        data-bs-auto-close='outside'
                      >
                        <i
                          className='fa-solid fa-face-laugh text-warning'
                          style={{fontSize: '40px'}}
                        ></i>
                      </div>
                      <div
                        className='dropdown-menu'
                        aria-labelledby='dropdownMenuClickableInside'
                        style={{transform: 'translate(-15%, -50%)', width: '500px'}}
                      >
                        {/* <Emoji setChosenEmojiProp={setChosenEmoji} /> */}
                        <Picker onEmojiClick={onEmojiClick} />
                      </div>
                    </div>
                  </div>
                  {/* ------------------------------------------------------------- */}
                  <div className='d-flex flex-wrap w-100 justify-content-between position-relative'>
                    {/* ----------------------- 1 picture --------------------- */}
                    {post.Image.length + post.Video.length === 1 && (
                      <div className='d-flex mb-6 w-100 flex-column'>
                        {post.Image.length === 1 && (
                          <img
                            src={post.Image[0].preview}
                            alt='Hình ảnh'
                            className='w-100 rounded-3'
                            style={{objectFit: 'cover'}}
                          />
                        )}
                        {post.Video.length === 1 && (
                          <div className=' post-video position-relative w-100'>
                            <video src={post.Video[0]} className='w-100 rounded-3'></video>
                            <div
                              className='border border-3 border-white rounded-circle d-flex justify-content-center align-items-center position-absolute btn-play'
                              style={{
                                width: '50px',
                                height: '50px',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <i className='fa-solid fa-play fs-1 text-white'></i>
                            </div>
                          </div>
                        )}
                        <div
                          className='btn btn-close position-absolute border border-2 rounded-circle p-2'
                          style={{top: '10px', right: '15px', backgroundColor: '#FFFFFF'}}
                          onClick={() => removeAllImagePost()}
                        ></div>
                      </div>
                    )}
                    {/* ----------------------- 2 picture --------------------- */}
                    {post.Image.length + post.Video.length === 2 && (
                      <div className='d-flex mb-6 w-100 justify-content-between'>
                        {post.Image.length > 0 &&
                          post.Image.map((picture, index) => (
                            <div key={index} style={{width: '49%', height: '205px'}}>
                              <img
                                src={picture.preview}
                                alt='Hình ảnh'
                                className='w-100 rounded-3 h-100'
                                style={{objectFit: 'cover'}}
                              />
                            </div>
                          ))}
                        {post.Video.length > 0 &&
                          post.Video.map((video, index) => (
                            <div key={index} className='' style={{width: '49%', height: '205px'}}>
                              <div
                                className=' post-video position-relative w-100'
                                style={{height: '205px'}}
                              >
                                <video src={video} className='w-100 rounded'></video>
                                <div
                                  className='border border-3 border-white rounded-circle d-flex justify-content-center align-items-center position-absolute btn-play'
                                  style={{
                                    width: '50px',
                                    height: '50px',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                  }}
                                >
                                  <i className='fa-solid fa-play fs-1 text-white'></i>
                                </div>
                              </div>
                              )
                            </div>
                          ))}
                        <div
                          className='btn btn-close position-absolute border border-2 rounded-circle p-2'
                          style={{top: '10px', right: '15px', backgroundColor: '#FFFFFF'}}
                          onClick={() => removeAllImagePost()}
                        ></div>
                      </div>
                    )}
                    {/* ----------------------- 3 picture --------------------- */}
                    {post.Image.length + post.Video.length === 3 && (
                      <div className='d-flex flex-wrap mb-6 w-100 justify-content-between'>
                        {post.Image.length > 0 &&
                          post.Image.map((picture, index) => {
                            if (post.Image.length === 3) {
                              if (index === 0) {
                                return (
                                  <div key={index} className='w-100 rounded mb-4'>
                                    <img src={picture.preview} className='w-100' alt='' />
                                  </div>
                                )
                              } else {
                                return (
                                  <div key={index} style={{width: '49%', height: '205px'}}>
                                    <img
                                      alt=''
                                      src={picture.preview}
                                      className='w-100 rounded-3 h-100'
                                      style={{objectFit: 'cover'}}
                                    />
                                  </div>
                                )
                              }
                            } else
                            return false
                            // if (post.Image.length === 2) {
                            //   if (index === 0) {
                            //     return (
                            //       <>
                            //         <img
                            //           src={picture}
                            //           className='w-100 rounded mb-4'
                            //           onClick={() => setChooseImgSlide(index)}
                            //         />
                            //       </>
                            //     )
                            //   } else {
                            //     return (
                            //       <div
                            //         style={{width: '49%'}}
                            //         onClick={() => setChooseImgSlide(index)}
                            //       >
                            //         <img src={picture} className='w-100 rounded-3' />
                            //       </div>
                            //     )
                            //   }
                            // }
                          })}

                        {post.Video.length === 3 &&
                          post.Image.map((video, index) => {
                            if (index === 0) {
                              return (
                                <div key={index}>
                                  <div className=' post-video position-relative w-100 mb-4'>
                                    <video src={video} className='w-100 rounded'></video>
                                    <div
                                      className='border border-3 border-white rounded-circle d-flex justify-content-center align-items-center position-absolute btn-play'
                                      style={{
                                        width: '50px',
                                        height: '50px',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                      }}
                                    >
                                      <i className='fa-solid fa-play fs-1 text-white'></i>
                                    </div>
                                  </div>
                                </div>
                              )
                            } else {
                              return (
                                <div key={index} className=' post-video position-relative w-100'>
                                  <video src={video} className='w-100 rounded'></video>
                                  <div
                                    className='border border-3 border-white rounded-circle d-flex justify-content-center align-items-center position-absolute btn-play'
                                    style={{
                                      width: '50px',
                                      height: '50px',
                                      top: '50%',
                                      left: '50%',
                                      transform: 'translate(-50%, -50%)',
                                    }}
                                  >
                                    <i className='fa-solid fa-play fs-1 text-white'></i>
                                  </div>
                                </div>
                              )
                            }
                          })}
                      </div>
                    )}
                    {/* ----------------------- > 4 picture --------------------- */}
                    {post.Image.length + post.Video.length >= 4 && (
                      <div className='d-flex flex-wrap mb-6 w-100 justify-content-between'>
                        {post.Image.length > 0 &&
                          post.Image.slice(0, 4).map((picture, index) => {
                            if (post.Image.length === 4) {
                              return (
                                <div
                                  key={index}
                                  className='mb-4'
                                  style={{width: '49%', height: '205px'}}
                                >
                                  <img
                                  alt=''
                                    src={picture.preview}
                                    className='w-100 rounded-3 h-100'
                                    style={{objectFit: 'cover'}}
                                  />
                                </div>
                              )
                            } else {
                              if (post.Image.length < 4) {
                                return (
                                  <>
                                    <div className='mb-4' style={{width: '49%', height: '205px'}}>
                                      <img
                                      alt=''
                                        src={picture.preview}
                                        className='w-100 rounded-3 h-100'
                                        style={{objectFit: 'cover'}}
                                      />
                                    </div>
                                  </>
                                )
                              } else {
                                return (
                                  <div
                                    className={`mb-4 ${index === 3 ? 'more-picture' : ''}`}
                                    style={{width: '49%', height: '205px'}}
                                  >
                                    {index === 3 && (
                                      <span
                                        className='fw-bolder text-white'
                                        style={{fontSize: '40px'}}
                                      >
                                        {post.Image.length + post.Video.length - 4}+
                                      </span>
                                    )}
                                    <img
                                    alt=''
                                      src={picture.preview}
                                      className='w-100 rounded-3 h-100'
                                      style={{objectFit: 'cover'}}
                                    />
                                  </div>
                                )
                              }
                            }
                          })}
                        {post.Video.length > 0 &&
                          post.Video.slice(0, 4 - post.Image.length).map((video, index) => {
                            return (
                              <div key={index}>
                                <div
                                  className={`mb-4 ${
                                    index === 4 - post.Image.length ? 'more-picture' : ''
                                  }`}
                                  style={{width: '49%', height: '205px'}}
                                >
                                  {index === 4 - post.Image.length && (
                                    <span
                                      className='fw-bolder text-white'
                                      style={{fontSize: '40px'}}
                                    >
                                      {post.Video.length - 4}+
                                    </span>
                                  )}
                                  <div className=' post-video position-relative w-100 h-100'>
                                    <video src={video} className='w-100 rounded-3 h-100'></video>
                                    <div
                                      className='border border-3 border-white rounded-circle d-flex justify-content-center align-items-center position-absolute btn-play'
                                      style={{
                                        width: '50px',
                                        height: '50px',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                      }}
                                    >
                                      <i className='fa-solid fa-play fs-1 text-white'></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        <div
                          className='btn btn-close position-absolute border border-2 rounded-circle p-2'
                          style={{top: '10px', right: '15px', backgroundColor: '#FFFFFF'}}
                          onClick={() => removeAllImagePost()}
                        ></div>
                      </div>
                    )}
                  </div>
                  <div
                    className='border border-2 border-success rounded fw-bolder d-flex justify-content-center py-4 fs-4 mb-8 pe-auto'
                    style={{color: '#03AC84', cursor: 'pointer'}}
                    data-bs-target='#exampleModalToggle2'
                    data-bs-toggle='modal'
                  >
                    Thêm Ảnh/Video
                  </div>
                  <div
                    className='btn rounded fw-bolder d-flex justify-content-center py-4 fs-4 text-white pe-auto'
                    style={{backgroundColor: '#E22828'}}
                    data-bs-dismiss='modal'
                    aria-label='Close'
                    onClick={() => handlePostPost()}
                  >
                    Đăng
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------Modal add picture ------------------------- */}
          <div
            className='modal fade'
            id='exampleModalToggle2'
            aria-hidden='true'
            aria-labelledby='exampleModalToggleLabel2'
            data-bs-backdrop='static'
          >
            <div className='modal-dialog modal-dialog-scrollable modal-lg'>
              <div className='modal-content'>
                <div className='d-flex position-relative justify-content-between align-items-center mb-2 shadow p-6 bg-body rounded'>
                  <div className='d-flex align-items-center justify-content-center fs-3'>
                    <div
                      className='d-flex align-items-center justify-content-center p-3 bg-secondary rounded-circle me-6 '
                      data-bs-target='#exampleModalToggle'
                      data-bs-toggle='modal'
                      style={{cursor: 'pointer'}}
                    >
                      <i className='fa-solid fa-arrow-left text-dark'></i>
                    </div>
                    <span className='fw-bolder'>Ảnh/Video</span>
                  </div>
                  <div className='d-flex align-items-center'>
                    <div
                      className='btn border rounded fw-bolder d-flex justify-content-center py-4 fs-4 text-white h-100 pe-auto'
                      style={{backgroundColor: '#03AC84', width: '150px'}}
                      data-bs-target='#exampleModalToggle'
                      data-bs-toggle='modal'
                    >
                      Xong
                    </div>
                  </div>
                </div>
                <div className='modal-body'>
                  {
                    <div className='p-2'>
                      <div className='w-100 h-200px'>
                        <DropFileInput
                          onChangeFile={onChangeFile}
                          actionString='Nhấn/Kéo thả để tải file'
                          icon='/media/svg/post/upLoadImage.svg'
                        />
                      </div>
                      {post.Image.length !== 0 &&
                        post.Image.map((picture, index) => (
                          <div key={index} className='position-relative'>
                            <img
                              src={picture.preview}
                              alt='Hình ảnh'
                              className='w-100 rounded mb-3'
                            />
                            {/* <video src={picture} className='w-100 rounded' controls></video> */}
                            <div
                              className='btn-close position-absolute border border-2 rounded-circle p-2'
                              style={{top: '10px', right: '15px', backgroundColor: '#FFFFFF'}}
                              onClick={() => removeImagePost(picture)}
                            ></div>
                          </div>
                        ))}
                      {/* {post.Video.length !== 0 &&
                        post.Image.map((picture) => (
                          <div className='position-relative'>
                            <img src={picture} alt='Hình ảnh' className='w-100 rounded' />
                            <video src={picture} className='w-100 rounded' controls></video>
                            <div
                              className='btn-close position-absolute border border-2 rounded-circle p-2'
                              style={{top: '10px', right: '15px', backgroundColor: '#FFFFFF'}}
                              onClick={() => removeImagePost(picture)}
                            ></div>
                            `
                          </div>
                        ))} */}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CreatePost)
