import {useState, useEffect, useRef} from 'react'
import axios, {AxiosResponse} from 'axios'
import queryString from 'query-string'
import CreatePost from './CreatePost'
import InfiniteScroll from 'react-infinite-scroller'
import './Baiviet.scss'
import ImagePost, {URL_IMG} from './ImagePost'
import {ConvertModifytime} from '../../components/ConvertTime/ConvertModifyTime'
import {convertDate} from '../widgets/components/Mixed'
import {COMMENT, POST} from './model'
import {URL_BOOKING_STUDIO} from '../../../setup/URL'
export const hashtags = ['studio', 'nhiepanh', 'thietbi', 'trangphuc', 'makeup', 'nguoimau']
type SetPropsType = {
  wrapRef: any
  tagsProps: string[]
  isReport?: boolean
}
export const Baiviet = ({wrapRef, tagsProps}: SetPropsType) => {
  const [posts, setPosts] = useState<POST[]>([])
  const [favorite, setFavorite] = useState<number[]>([])
  const [showComment, setShowComment] = useState<number[]>([])
  const [showSeeMore, setShowSeeMore] = useState<number[]>([])
  const [chooseImgSlide, setChooseImgSlide] = useState(0)
  const [comments, setComments] = useState<COMMENT[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    tags: tagsProps.join(','),
  })
  const [comment, setComment] = useState<any>({
    PostId: null,
    Content: '',
  })
  const audioRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const paramString = queryString.stringify(filters)
    const getPost = () => {
      let promise = axios({
        url: `${URL_BOOKING_STUDIO}post-post?${paramString}`,
        method: 'GET',
      })
      promise.then((result: AxiosResponse<any>) => {
        console.log('Get post success')
        const data = result.data.data || []
        let newPosts: Array<any> = [...data]
        if (newPosts !== null || data !== undefined || data !== []) {
          for (let i = 0; i < newPosts.length; i++) {
            const tags = newPosts[i].Tags.split(',')
            newPosts[i].Tags = [...tags]
          }
        }
        if (filters.page === 1) {
          setPosts([...newPosts])
        } else {
          setPosts([...posts, ...newPosts])
        }
        if (newPosts.length === filters.limit) {
          setHasMore(true)
          console.log('true')
        }
      })
      promise.catch((err) => {
        console.log('That bai')
        console.log(err.response.data)
      })
    }
    getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  useEffect(() => {
    setFilters({...filters, tags: tagsProps.join(',')})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsProps])

  const onClickImage = () => {}

  const handleFavorite = (userId: number) => {
    const newFavorite = [...favorite]
    const checkIndex = newFavorite.indexOf(userId)
    if (checkIndex === -1) {
      newFavorite.push(userId)
    } else {
      newFavorite.splice(checkIndex, 1)
    }
    setFavorite(newFavorite)
  }

  const getCommentsByPostId = (id: number) => {
    const promise = axios({
      url: `${URL_BOOKING_STUDIO}comment/${id}}`,
      method: 'GET',
    })
    promise.then((result: AxiosResponse<any>) => {
      const data = result.data.data
      const newChooseComment = [...showComment]
      const checkIndex = newChooseComment.indexOf(id)
      if (checkIndex === -1) {
        newChooseComment.push(id)
      } else {
        newChooseComment.splice(checkIndex, 1)
      }
      setComments([...comments, ...data])
      setShowComment(newChooseComment)
    })
  }
  const handleSeeMore = (id: number) => {
    const newShowSeeMore = [...showSeeMore]
    const checkIndex = newShowSeeMore.indexOf(id)
    if (checkIndex === -1) {
      newShowSeeMore.push(id)
    } else {
      newShowSeeMore.splice(checkIndex, 1)
    }
    setShowSeeMore(newShowSeeMore)
  }
  const handleNextSlide = (length: number) => {
    audioRef?.current?.pause()
    let pos = chooseImgSlide
    if (pos >= length - 1) {
      pos = 0
    } else {
      pos++
    }
    setChooseImgSlide(pos)
  }
  const handlePrevSlide = (length: number) => {
    audioRef?.current?.pause()
    let pos = chooseImgSlide
    if (pos <= 0) {
      pos = length - 1
    } else {
      pos--
    }
    setChooseImgSlide(pos)
  }

  const handleRemovePost = (id: number) => {
    const promise = axios({
      url: `${URL_BOOKING_STUDIO}post-post/${id}`,
      method: 'DELETE',
    })
    promise.then((res) => {
      console.log('Xóa thành công')
      setFilters({...filters, page: 1})
    })
    promise.catch((err) => console.log('Xóa thất bại', err))
  }

  const handleOnchangeComment = (e: any) => {
    setComment({...comment, Content: e.target.value})
  }

  const handleOnPressComment = (e: any) => {
    if (e.which === 13 && e.shiftKey === false) {
      e.preventDefault()
      setComment({PostId: '', Content: ''})
    }
  }
  const handleRemoveComment = (id: number) => {
    let newComments = [...comments]
    const checkComment = newComments.find((item, index) => item.id === id)
    if (checkComment !== null) {
      newComments = newComments.filter((item) => item !== checkComment)
    }
    setComments(newComments)
  }
  const fetchData = () => {
    setHasMore(false)
    setFilters({...filters, page: filters.page + 1})
  }
  return (
    <>
      <CreatePost filterProps={filters} setFiltersProps={setFilters} />
      <InfiniteScroll
        pageStart={filters.page}
        loadMore={fetchData}
        hasMore={hasMore}
        loader={
          <div key={0} className='spinner-border text-info' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        }
        useWindow={false}
        getScrollParent={() => wrapRef.current}
      >
        {posts.map((post, index) => (
          <div
            key={index}
            className='bg-white  py-8 mb-4 d-flex flex-row justify-content-center w-100'
            style={{boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.1)'}}
          >
            <div className='d-flex flex-column w-100 px-10'>
              <div className='d-flex justify-content-between align-items-center mb-4 w-100 '>
                <div className='d-flex align-items-center'>
                  <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                    <a href='!#'>
                      <div className='symbol-label'>
                        {post.Avatar ? (
                          <img
                            onError={(e: any) => {
                              e.target.classList.add('d-none')
                            }}
                            src={URL_IMG + post.Avatar}
                            alt={post.Avatar}
                            className='w-100'
                          />
                        ) : (
                          <i className='fa-solid fa-circle-user w-100'></i>
                        )}
                      </div>
                    </a>
                  </div>
                  <div className='d-flex flex-column'>
                    <a href='!#' className='text-hover-primary text-dark fw-bold fs-4 '>
                      {post.Username}
                    </a>
                    <div className='d-flex align-items-center'>
                      <div className='me-1 text-muted ms-n4'>
                        <ConvertModifytime
                          LastModificationTime={convertDate(new Date(post.CreationTime))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='btn-group dropdown'>
                    <button
                      type='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                      style={{background: 'none', border: 'none'}}
                    >
                      <img alt='more' src='/media/icons/duotune/arrows/test.svg' style={{}} />
                    </button>
                    <ul
                      className='dropdown-menu dropdown-menu-end px-3 btn border border-3 shadow'
                      style={{transform: 'translate3d(-100%, 0px, 0px)'}}
                    >
                      <li
                        className='dropdown-item'
                        data-bs-toggle='modal'
                        data-bs-target={`#modalDeletePost${post.Id}`}
                      >
                        <i className='fa-solid fa-trash-can text-dark me-5'></i>Xóa bài viết
                      </li>
                      <li className='dropdown-item'>
                        <i className='fa-solid fa-link text-dark fs-6 me-3'></i>Sao chép liên kết
                      </li>
                    </ul>
                    {/* <!-- Modal delete : start --> */}
                    <div
                      className='modal fade'
                      id={`modalDeletePost${post.Id}`}
                      aria-labelledby='modalDeletePost'
                      aria-hidden='true'
                    >
                      <div className='modal-dialog modal-dialog-centered'>
                        <div className='modal-content px-8'>
                          <div className='d-flex flex-column my-12'>
                            <div className='d-flex align-items-center mb-6'>
                              <img src='/media/svg/post/question.svg' alt='' />
                              <p className='mt-4 ms-4 fs-4'>
                                Bạn có chắc muốn xóa vĩnh viễn bài viết này không?
                              </p>
                            </div>
                            <div className='d-flex justify-content-end align-item-center'>
                              <div
                                className='btn text-uppercase border border-2 rounded me-6 border-danger text-danger'
                                data-bs-dismiss='modal'
                              >
                                Trở về
                              </div>
                              <div
                                className='btn text-uppercase border border-2 rounded text-white'
                                style={{backgroundColor: '#E22828'}}
                                data-bs-dismiss='modal'
                                onClick={() => handleRemovePost(post.Id)}
                              >
                                Xóa
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Modal delete : end --> */}
                  </div>
                </div>
              </div>
              {/* --------------------------------------------------------------------------- */}
              <div className='d-flex w-100 mb-n2'>
                <ul className='list-inline h-100'>
                  {post.Tags.map((item) => (
                    <li key={item} className='list-inline-item'>
                      <a style={{color: '#03AC84'}} href='!#' className='fs-5'>
                        #{item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='w-100 fs-4 pe-auto '>
                {post.Description.length < 120 ? (
                  <p>{post.Description}</p>
                ) : showSeeMore.includes(post.Id) ? (
                  <p>{post.Description}</p>
                ) : (
                  <p onClick={() => handleSeeMore(post.Id)}>
                    {post.Description.substring(0, 120)}...
                    <span style={{color: '#B2B2B2', cursor: 'pointer'}}>Xem thêm</span>
                  </p>
                )}
              </div>
              <ImagePost
                postProp={post}
                setChooseImgSlide={setChooseImgSlide}
                onClick={onClickImage}
              />
              {/* ---------------------Show Image: Start -------------------- */}
              <div
                className='modal fade'
                id={`exampleModal${post.Id}`}
                data-bs-backdrop='static'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog modal-fullscreen'>
                  <div
                    className='modal-content position-relative'
                    style={{backgroundColor: '#1D2226'}}
                  >
                    <div
                      className='d-flex align-items-center justify-content-center rounded-circle position-absolute'
                      data-bs-dismiss='modal'
                      data-bs-target={`#exampleModal${post.Id}`}
                      aria-label='Close'
                      style={{
                        height: '46px',
                        width: '46px',
                        top: '20px',
                        left: '20px',
                        zIndex: '4',
                        backgroundColor: '#000000',
                      }}
                      onClick={() => audioRef?.current?.pause()}
                    >
                      <i className='fa-solid fa-xmark text-white fs-2'></i>
                    </div>
                    <div className='d-flex'>
                      <div className='d-flex col-8 justify-content-center align-items-center'>
                        <div
                          id={`carouselExampleControls${post.Id}`}
                          className='carousel slide d-flex align-items-center justify-content-center w-100'
                          data-bs-touch='false'
                          data-bs-interval='false'
                        >
                          <div
                            className='btn position-absolute p-3 bg-light bg-opacity-25'
                            data-bs-target={`#carouselExampleControls${post.Id}`}
                            data-bs-slide='prev'
                            style={{left: '3rem'}}
                            onClick={() => {
                              handlePrevSlide(post.Image.length)
                            }}
                          >
                            <i className='fa-solid fa-angle-left'></i>
                          </div>
                          <div
                            className=' carousel-inner d-flex justify-content-between align-items-center mx-6 position-relative h-100'
                            style={{width: '80%'}}
                          >
                            {post.Image &&
                              post.Image.map((picture, index) => (
                                <div
                                  key={index}
                                  className={`carousel-item ${
                                    chooseImgSlide === index ? 'active' : ''
                                  }`}
                                >
                                  <img
                                    onError={(e: any) => {
                                      // e.target.classList.add('d-none')
                                    }}
                                    src={URL_IMG + picture}
                                    className='d-block w-100'
                                    alt={picture}
                                    style={{height: '500px', objectFit: 'contain'}}
                                  />
                                  {/* <video
                                          ref={chooseImgSlide === index ? audioRef : null}
                                          src={picture.url}
                                          className='d-block w-100'
                                          controls
                                        ></video> */}
                                </div>
                              ))}
                          </div>
                          <div
                            className='btn position-absolute p-3 bg-light bg-opacity-25'
                            data-bs-target={`#carouselExampleControls${post.Id}`}
                            data-bs-slide='next'
                            style={{right: '3rem'}}
                            onClick={() => {
                              handleNextSlide(post.Image.length)
                            }}
                          >
                            <i className='fa-solid fa-angle-right'></i>
                          </div>
                        </div>
                      </div>

                      <div
                        className='d-flex flex-column col-4 bg-white overflow-auto p-8'
                        style={{height: '100vh'}}
                      >
                        <div className='d-flex justify-content-between align-items-center mb-4 w-100 '>
                          <div className='d-flex align-items-center'>
                            <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                              <a href='!#'>
                                <div className='symbol-label'>
                                  {/* <img src={post.Image1} alt={post.Image1} className='w-100' /> */}
                                </div>
                              </a>
                            </div>
                            <div className='d-flex flex-column'>
                              <a href='!#' className='text-hover-primary text-dark fw-bold fs-4 '>
                                {post.Username}
                              </a>
                              <div className='d-flex align-items-center'>
                                <div className='me-1 text-muted ms-n4'>
                                  <ConvertModifytime LastModificationTime={post.CreationTime} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className='btn-group dropdown'>
                              <button
                                type='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                                style={{background: 'none', border: 'none'}}
                              >
                                <img
                                  alt='more'
                                  src='/media/icons/duotune/arrows/test.svg'
                                  style={{}}
                                />
                              </button>
                              <ul
                                className='dropdown-menu dropdown-menu-end px-3 btn border border-3 shadow'
                                style={{transform: 'translate3d(-100%, 0px, 0px)'}}
                              >
                                <li className='dropdown-item'>
                                  <i className='fa-solid fa-trash-can text-dark me-5'></i>
                                  Xóa bài viết
                                </li>
                                <li className='dropdown-item'>
                                  <i className='fa-solid fa-link text-dark fs-6 me-3'></i>
                                  Sao chép liên kết
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className='d-flex w-100 mb-n2'>
                          <ul className='list-inline h-100'>
                            {hashtags.map((item, index) => (
                              <li key={index} className='list-inline-item'>
                                <a href='!#' className='text-success fs-5'>
                                  #{item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className='pb-1 w-100 fs-4 pe-auto'>
                          {post.Description.length < 120 ? (
                            <p>{post.Description}</p>
                          ) : showSeeMore.includes(post.Id) ? (
                            <p>{post.Description}</p>
                          ) : (
                            <p onClick={() => handleSeeMore(post.Id)}>
                              {post.Description.substring(0, 120)}...
                              <span style={{color: '#B2B2B2'}}>Xem thêm</span>
                            </p>
                          )}
                        </div>
                        <div className='d-flex w-100 mb-6 align-items-center'>
                          {favorite.includes(post.Id) ? (
                            <div className='d-flex'>
                              <img
                                alt=''
                                src='/media/svg/post/favoriteCheck.svg'
                                className='me-3'
                                onClick={() => handleFavorite(post.Id)}
                              />
                              <span className='fs-5' style={{color: '#828282'}}>
                                {post.TotalLikes}
                              </span>
                            </div>
                          ) : (
                            <div className='d-flex'>
                              <img
                                alt=''
                                src='/media/svg/post/favorite.svg'
                                className='me-3'
                                onClick={() => handleFavorite(post.Id)}
                              />
                              <span className='fs-5' style={{color: '#828282'}}>
                                {post.TotalComments}
                              </span>
                            </div>
                          )}
                          <div className='mx-8'>
                            <i className='fa-solid fa-circle' style={{fontSize: '5px'}}></i>
                          </div>
                          {showComment.includes(post.Id) ? (
                            <div className='d-flex '>
                              <a
                                className=''
                                data-bs-toggle='collapse'
                                href='#collapseExample'
                                role='button'
                                aria-expanded='false'
                                aria-controls='collapseExample'
                                onClick={() => getCommentsByPostId(post.Id)}
                              >
                                <img
                                  src='/media/svg/post/commentCheck.svg'
                                  className='me-3'
                                  alt=''
                                />
                                <span className='fs-5' style={{color: 'red'}}>
                                  {post.TotalLikes}
                                </span>
                              </a>
                            </div>
                          ) : (
                            <div className='d-flex'>
                              <a
                                className=''
                                data-bs-toggle='collapse'
                                href='#collapseExample'
                                role='button'
                                aria-expanded='false'
                                aria-controls='collapseExample'
                                onClick={() => getCommentsByPostId(post.Id)}
                              >
                                <img src='/media/svg/post/comment.svg' className='me-3' alt='' />
                                <span className='fs-5' style={{color: '#828282'}}>
                                  {post.TotalComments}
                                </span>
                              </a>
                            </div>
                          )}
                        </div>
                        {/* -----------------------Comment post: Begin---------------------- */}
                        <div
                          className='d-flex justify-content-between align-items-center w-100 mt-8 input-comment'
                          style={{height: '40px', width: '676px'}}
                        >
                          <img
                            src='/media/svg/post/taoBaiDang.svg'
                            alt='#'
                            className='me-6 h-100'
                            style={{width: '40px'}}
                          />
                          <div className='d-flex justify-content-between align-items-center w-100 h-100 position-relative'>
                            <input
                              placeholder='Viết bình luận...'
                              className='fs-6 p-4 w-100 h-100 border border-2 rounded-pill outline-none'
                              style={{borderColor: '#B2B2B2'}}
                            />
                          </div>
                        </div>
                        {/* -----------------------Comment post: End---------------------- */}
                        {/* --------------------------List comment: Begin ----------------------- */}
                        <div className='d-flex flex-column'>
                          {comments &&
                            comments.map((comment, index) => (
                              <div key={index}>
                                <div className='d-flex justify-content-between align-items-center mb-4 mt-15 w-100 comment'>
                                  <div className='d-flex align-items-center'>
                                    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                      <a href='!#'>
                                        <div className='symbol-label'>
                                          {/* <img
                                              src={''}
                                              alt={`${URL_BOOKING_STUDIO}image/${''}`}
                                              className='w-100'
                                            /> */}
                                        </div>
                                      </a>
                                    </div>
                                    <div className='d-flex flex-column'>
                                      <a
                                        href='!#'
                                        className='text-hover-primary text-dark fw-bold fs-4 '
                                      >
                                        {}
                                      </a>
                                      <div className='d-flex align-items-center'>
                                        <span className='me-1 text-muted '>10/02/2022</span>
                                        <span className='text-muted '>14:30</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className='btn-group dropdown'>
                                      <button
                                        type='button'
                                        data-bs-toggle='dropdown'
                                        aria-expanded='false'
                                        style={{background: 'none', border: 'none'}}
                                      >
                                        <img
                                          alt='more'
                                          src='/media/icons/duotune/arrows/test.svg'
                                          style={{}}
                                        />
                                      </button>
                                      <ul
                                        className='dropdown-menu dropdown-menu-end px-3 btn border border-3 shadow'
                                        style={{transform: 'translate3d(-100%, 0px, 0px)'}}
                                      >
                                        <li
                                          className='dropdown-item'
                                          onClick={() => handleRemoveComment(comment.id)}
                                        >
                                          <i className='fa-solid fa-trash-can text-dark me-5'></i>
                                          Xóa bình luận
                                        </li>
                                        <li className='dropdown-item'>
                                          <i className='fa-solid fa-link text-dark fs-6 me-3'></i>
                                          Sao chép liên kết
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className='w-100 fs-5 mb-4'>
                                  <a style={{wordWrap: 'break-word'}} href={comment.Content}>
                                    {comment.Content}
                                  </a>
                                </div>
                                {/* <div
                                    className='d-flex rounded-3 border border-3 mb-6'
                                    style={{height: '80px', width: '365px'}}
                                  >
                                    <img
                                      src='/media/svg/post/taoBaiDang.svg'
                                      alt='#'
                                      className='me-2'
                                      style={{width: '150px'}}
                                    />
                                    <div className='d-flex flex-column p-3'>
                                      <h6
                                        className='text-uppercase fs-7'
                                        style={{color: '#616161'}}
                                      >
                                        {comment.preview.title}
                                      </h6>
                                      {comment.preview.description.length > 65 ? (
                                        <p className='fs-6 lh-sm' style={{color: '#222222'}}>
                                          {comment.preview.description.substring(0, 70)}...
                                        </p>
                                      ) : (
                                        <p className='fs-6 lh-sm' style={{color: '#222222'}}>
                                          {comment.preview.description}
                                        </p>
                                      )}
                                    </div>
                                  </div> */}
                                <div className='d-flex w-100 align-items-center'>
                                  {favorite.includes(post.Id) ? (
                                    <div className='d-flex'>
                                      <img
                                        alt=''
                                        src='/media/svg/post/favoriteCheck.svg'
                                        className='me-3'
                                        onClick={() => handleFavorite(comment.id)}
                                      />
                                      <span className='fs-5' style={{color: '#828282'}}>
                                        5
                                      </span>
                                    </div>
                                  ) : (
                                    <div className='d-flex'>
                                      <img
                                        alt=''
                                        src='/media/svg/post/favorite.svg'
                                        className='me-3'
                                        onClick={() => handleFavorite(comment.id)}
                                      />
                                      <span className='fs-5' style={{color: '#828282'}}>
                                        5
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                        {/* --------------------------List comment: End ----------------------- */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ---------------------Show Image: end -------------------- */}
              {/* ---------------------Toggle Comment, Favorite: start -------------------- */}
              <div className='d-flex w-100 align-items-center'>
                <div className='d-flex' onClick={() => handleFavorite(post.Id)}>
                  {favorite.includes(post.Id) ? (
                    <img src='/media/svg/post/favoriteCheck.svg' className='me-3' alt='' />
                  ) : (
                    <img src='/media/svg/post/favorite.svg' className='me-3' alt='' />
                  )}
                  <span
                    className='fs-5'
                    style={favorite.includes(post.Id) ? {color: 'red'} : {color: '#828282'}}
                  >
                    {post.TotalLikes}
                  </span>
                </div>
                <div className='mx-8'>
                  <i className='fa-solid fa-circle' style={{fontSize: '5px'}}></i>
                </div>

                <div className='d-flex' onClick={() => getCommentsByPostId(post.Id)}>
                  <a
                    className=''
                    data-bs-toggle='collapse'
                    href={`#collapseExample${post.Id}`}
                    role='button'
                    aria-expanded='false'
                    aria-controls={`collapseExample${post.Id}`}
                  >
                    {showComment.includes(post.Id) ? (
                      <img src='/media/svg/post/commentCheck.svg' className='me-3' alt='' />
                    ) : (
                      <img src='/media/svg/post/comment.svg' className='me-3' alt='' />
                    )}
                    <span
                      className='fs-5'
                      style={showComment.includes(post.Id) ? {color: 'red'} : {color: '#828282'}}
                    >
                      {post.TotalComments}
                    </span>
                  </a>
                </div>
              </div>
              {/* --------------------Toggle Comment, Favorite: end -------------------- */}

              {/* -----------------------Comment post: Begin---------------------- */}
              <div className='collapse mt-6' id={`collapseExample${post.Id}`}>
                <div
                  className='d-flex justify-content-between align-items-center w-100 mt-8 input-comment'
                  style={{height: '40px', width: '676px'}}
                >
                  <img
                    src='/media/svg/post/taoBaiDang.svg'
                    alt='#'
                    className='me-6 h-100'
                    style={{width: '40px'}}
                  />
                  <div className='d-flex justify-content-between align-items-center w-100 h-75 position-relative'>
                    <textarea
                      className='form-control fs-5 resize-none border border-2 rounded-pill outline-none'
                      placeholder='Nhập nội dung bài viết'
                      aria-label='With textarea'
                      value={comment.Content}
                      rows={1}
                      onChange={(e) => handleOnchangeComment(e)}
                      onKeyPress={(e) => handleOnPressComment(e)}
                    ></textarea>
                  </div>
                </div>
                {/* -----------------------Comment post: End---------------------- */}
                {/* --------------------------List comment: Begin ----------------------- */}
                <div className='d-flex flex-column'>
                  {comments &&
                    comments
                      .filter((comment) => comment.PostId === post.Id)
                      .map((comment, index) => (
                        <div key={index}>
                          <div className='d-flex justify-content-between align-items-center mb-4 mt-15 w-100 comment'>
                            <div className='d-flex align-items-center'>
                              <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                <a href='!#'>
                                  <div className='symbol-label'>
                                    {/* <img
                                      src={`${URL_BOOKING_STUDIO}image/`}
                                      alt={}
                                      className='w-100'
                                    /> */}
                                  </div>
                                </a>
                              </div>
                              <div className='d-flex flex-column'>
                                <a href='!#' className='text-hover-primary text-dark fw-bold fs-4 '>
                                  {comment.id}
                                </a>
                                <div className='d-flex align-items-center'>
                                  {/* <span className='me-1 text-muted '>10/02/2022</span>
                                    <span className='text-muted '>14:30</span> */}
                                  <ConvertModifytime
                                    LastModificationTime={convertDate(new Date(comment.createdAt))}
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className='btn-group dropdown'>
                                <button
                                  type='button'
                                  data-bs-toggle='dropdown'
                                  aria-expanded='false'
                                  style={{background: 'none', border: 'none'}}
                                >
                                  <img
                                    alt='more'
                                    src='/media/icons/duotune/arrows/test.svg'
                                    style={{}}
                                  />
                                </button>
                                <ul
                                  className='dropdown-menu dropdown-menu-end px-3 btn border border-3 shadow'
                                  style={{transform: 'translate3d(-100%, 0px, 0px)'}}
                                >
                                  <li
                                    className='dropdown-item'
                                    onClick={() => handleRemoveComment(comment.id)}
                                  >
                                    <i className='fa-solid fa-trash-can text-dark me-5'></i>
                                    Xóa bình luận
                                  </li>
                                  <li className='dropdown-item'>
                                    <i className='fa-solid fa-link text-dark fs-6 me-3'></i>
                                    Sao chép liên kết
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className='w-100 fs-5 mb-4'>
                            <a style={{wordWrap: 'break-word'}} href={comment.Content}>
                              {comment.Content}
                            </a>
                          </div>
                          <div
                            className='d-flex rounded-3 border border-3 mb-6'
                            style={{height: '80px', width: '365px'}}
                          >
                            <img
                              src='/media/svg/post/taoBaiDang.svg'
                              alt='#'
                              className='me-2'
                              style={{width: '150px'}}
                            />
                            {/* <div className='d-flex flex-column p-3'>
                              <h6 className='text-uppercase fs-7' style={{color: '#616161'}}>
                                {comment.preview.title}
                              </h6>
                              {comment.preview.description.length > 65 ? (
                                <p className='fs-6 lh-sm' style={{color: '#222222'}}>
                                  {comment.preview.description.substring(0, 70)}...
                                </p>
                              ) : (
                                <p className='fs-6 lh-sm' style={{color: '#222222'}}>
                                  {comment.preview.description}
                                </p>
                              )}
                            </div> */}
                          </div>
                          <div className='d-flex w-100 align-items-center'>
                            {favorite.includes(post.Id) ? (
                              <div className='d-flex'>
                                <img
                                  alt=''
                                  src='/media/svg/post/favoriteCheck.svg'
                                  className='me-3'
                                  onClick={() => handleFavorite(comment.id)}
                                />
                                <span className='fs-5' style={{color: '#828282'}}>
                                  5
                                </span>
                              </div>
                            ) : (
                              <div className='d-flex'>
                                <img
                                  alt=''
                                  src='/media/svg/post/favorite.svg'
                                  className='me-3'
                                  onClick={() => handleFavorite(comment.id)}
                                />
                                <span className='fs-5' style={{color: '#828282'}}>
                                  5
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                </div>
                {/* --------------------------List comment: End ----------------------- */}
              </div>
              {/* -----------------------Comment post: End---------------------- */}
            </div>
          </div>
        ))}
        {hasMore && (
          <div className='spinner-border text-info' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        )}
      </InfiniteScroll>

      {/* <SmoothScroll element={wrapRef.current} /> */}
    </>
  )
}
