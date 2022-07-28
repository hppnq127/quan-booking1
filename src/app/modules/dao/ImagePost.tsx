import React from 'react'
import {POST} from './model'
type SetPropsType = {
  postProp: POST
  setChooseImgSlide: React.Dispatch<React.SetStateAction<number>>
  onClick?: any
}

export const URL_IMG = 'https://bookingstudio.herokuapp.com/image/'

function ImagePost({postProp, setChooseImgSlide, onClick}: SetPropsType) {
  // console.log(postProp)

  return (
    <div>
      {/* ----------------------- 1 picture --------------------- */}
      {
        <div
          className='d-flex w-100 flex-column position-relative'
          data-bs-toggle='modal'
          data-bs-target={`#exampleModal${postProp.Id}`}
          onClick={() => setChooseImgSlide(0)}
        >
          {postProp.Image.length === 1 && (
            <img
              onError={(e: any) => {
                e.target.classList.add('d-none')
              }}
              src={URL_IMG + postProp.Image[0]}
              alt='Hình ảnh'
              className='w-100 rounded-3 mb-6'
              style={{objectFit: 'cover'}}
            />
          )}
          {postProp.Video.length === 1 && (
            <div className=' post-video position-relative w-100 mb-6'>
              <video src={postProp.Video[0]} className='w-100 rounded-3'></video>
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
        </div>
      }
      {/* ----------------------- 2 picture --------------------- */}
      {postProp.Image.length + postProp.Video.length === 2 && (
        <div
          className='d-flex mb-6 w-100 justify-content-between'
          data-bs-toggle='modal'
          data-bs-target={`#exampleModal${postProp.Id}`}
        >
          {postProp.Image.length > 0 &&
            postProp.Image.map((picture, index) => (
              <div
                key={index}
                style={{width: '49%', height: '205px'}}
                onClick={() => setChooseImgSlide(index)}
              >
                <img
                  onError={(e: any) => {
                    e.target.classList.add('d-none')
                  }}
                  src={URL_IMG + picture}
                  alt='Hình ảnh'
                  className='w-100 rounded-3 h-100'
                  style={{objectFit: 'cover'}}
                />
              </div>
            ))}
          {postProp.Video.length > 0 &&
            postProp.Video.map((video, index) => (
              <div
                key={index}
                className=''
                style={{width: '49%', height: '205px'}}
                onClick={() => setChooseImgSlide(index)}
              >
                <div className=' post-video position-relative w-100' style={{height: '205px'}}>
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
            ))}
        </div>
      )}
      {/* ----------------------- 3 picture --------------------- */}
      {postProp.Image.length + postProp.Video.length === 3 && (
        <div
          className='d-flex flex-wrap mb-6 w-100 justify-content-between'
          data-bs-toggle='modal'
          data-bs-target={`#exampleModal${postProp.Id}`}
        >
          {postProp.Image.length > 0 &&
            postProp.Image.map((picture, index) => {
              if (postProp.Image.length === 3) {
                if (index === 0) {
                  return (
                    <div key={index} className='w-100'>
                      <img
                        onError={(e: any) => {
                          e.target.classList.add('d-none')
                        }}
                        src={URL_IMG + picture}
                        className='w-100 rounded mb-4'
                        onClick={() => setChooseImgSlide(index)}
                        alt=''
                      />
                    </div>
                  )
                } else {
                  return (
                    <div
                      style={{width: '49%', height: '205px'}}
                      onClick={() => setChooseImgSlide(index)}
                      key={index}
                    >
                      <img
                        onError={(e: any) => {
                          e.target.classList.add('d-none')
                        }}
                        src={URL_IMG + picture}
                        className='w-100 rounded-3 h-100'
                        style={{objectFit: 'cover'}}
                        alt=''
                      />
                    </div>
                  )
                }
              } else return false
              // if (postProp.Image.length === 2) {
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

          {/* {postProp.Video.length === 3 &&
            postProp.Image.map((video, index) => {
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
                  <div className=' post-video position-relative w-100'>
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
            })} */}
        </div>
      )}
      {/* ----------------------- > 4 picture --------------------- */}
      {postProp.Image.length + postProp.Video.length >= 4 && (
        <div
          className='d-flex flex-wrap mb-6 w-100 justify-content-between'
          data-bs-toggle='modal'
          data-bs-target={`#exampleModal${postProp.Id}`}
        >
          {postProp.Image.length > 0 &&
            postProp.Image.slice(0, 4).map((picture, index) => {
              if (postProp.Image.length === 4) {
                return (
                  <div
                    key={index}
                    className='mb-4'
                    style={{width: '49%', height: '205px'}}
                    onClick={() => setChooseImgSlide(index)}
                  >
                    <img
                      onError={(e: any) => {
                        e.target.classList.add('d-none')
                      }}
                      src={URL_IMG + picture}
                      className='w-100 rounded-3 h-100'
                      style={{objectFit: 'cover'}}
                      alt=''
                    />
                  </div>
                )
              } else {
                if (postProp.Image.length < 4) {
                  return (
                    <>
                      <div
                        className='mb-4'
                        style={{width: '49%', height: '205px'}}
                        onClick={() => setChooseImgSlide(index)}
                      >
                        <img
                          alt=''
                          onError={(e: any) => {
                            e.target.classList.add('d-none')
                          }}
                          src={URL_IMG + picture}
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
                      onClick={() => setChooseImgSlide(index)}
                    >
                      {index === 3 && (
                        <span className='fw-bolder text-white' style={{fontSize: '40px'}}>
                          {postProp.Image.length + postProp.Video.length - 4}+
                        </span>
                      )}
                      <img
                        alt=''
                        onError={(e: any) => {
                          e.target.classList.add('d-none')
                        }}
                        src={URL_IMG + picture}
                        className='w-100 rounded-3 h-100'
                        style={{objectFit: 'cover'}}
                      />
                    </div>
                  )
                }
              }
            })}
          {postProp.Video.length > 0 &&
            postProp.Video.slice(0, 4 - postProp.Image.length).map((video, index) => {
              return (
                <div key={index}>
                  <div
                    className={`mb-4 ${index === 4 - postProp.Image.length ? 'more-picture' : ''}`}
                    style={{width: '49%', height: '205px'}}
                    onClick={() => setChooseImgSlide(index)}
                  >
                    {index === 4 - postProp.Image.length && (
                      <span className='fw-bolder text-white' style={{fontSize: '40px'}}>
                        {postProp.Video.length - 4}+
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
        </div>
      )}
    </div>
  )
}

export default React.memo(ImagePost)
