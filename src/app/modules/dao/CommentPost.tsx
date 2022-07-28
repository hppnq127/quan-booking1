// import React from 'react'
// import {POST, COMMENT} from './Baiviet'

// type SetPropsType = {
//   postProp: POST
//   commentProp: COMMENT
//   setChooseImgSlide: React.Dispatch<React.SetStateAction<number>>
// }

// function CommentPost({postProp, commentProp}: SetPropsType) {
//   return (
//     <div className='collapse mt-6' id={`collapseExample${postProp.id}`}>
//       {/* -----------------------Comment post: Begin---------------------- */}
//       <div
//         className='d-flex justify-content-between align-items-center w-100 mt-8 input-comment'
//         style={{height: '40px', width: '676px'}}
//       >
//         <img
//           src='/media/svg/post/taoBaiDang.svg'
//           alt='#'
//           className='me-6 h-100'
//           style={{width: '40px'}}
//         />
//         <div className='d-flex justify-content-between align-items-center w-100 h-75 position-relative'>
//           <textarea
//             className='form-control fs-5 resize-none border border-2 rounded-pill outline-none'
//             placeholder='Nhập nội dung bài viết'
//             aria-label='With textarea'
//             value={commentProp.content}
//             rows={1}
//             onChange={(e) => handleOnchangeComment(e)}
//             onKeyPress={(e) => handleOnPressComment(e)}
//           ></textarea>

//           {/* <textarea
//                           placeholder='Tạo bài viết...'
//                           className='fs-6 py-2 ps-4 w-100 h-100 border border-2 rounded-pill outline-none' style={{borderColor:'#B2B2B2'}} rows={1}/> */}
//         </div>
//       </div>
//       {/* -----------------------Comment post: End---------------------- */}
//       {/* --------------------------List comment: Begin ----------------------- */}
//       <div className='d-flex flex-column'>
//         {comments &&
//           comments.map((comment) => (
//             <>
//               <div className='d-flex justify-content-between align-items-center mb-4 mt-15 w-100 comment'>
//                 <div className='d-flex align-items-center'>
//                   <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
//                     <a href='#'>
//                       <div className='symbol-label'>
//                         <img src={commentProp.avatar} alt={commentProp.name} className='w-100' />
//                       </div>
//                     </a>
//                   </div>
//                   <div className='d-flex flex-column'>
//                     <a href='#' className='text-hover-primary text-dark fw-bold fs-4 '>
//                       {commentProp.name}
//                     </a>
//                     <div className='d-flex align-items-center'>
//                       <span className='me-1 text-muted '>10/02/2022</span>
//                       <span className='text-muted '>14:30</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className='btn-group dropdown'>
//                     <button
//                       type='button'
//                       data-bs-toggle='dropdown'
//                       aria-expanded='false'
//                       style={{background: 'none', border: 'none'}}
//                     >
//                       <img alt='more' src='/media/icons/duotune/arrows/test.svg' style={{}} />
//                     </button>
//                     <ul
//                       className='dropdown-menu dropdown-menu-end px-3 btn border border-3 shadow'
//                       style={{transform: 'translate3d(-100%, 0px, 0px)'}}
//                     >
//                       <li
//                         className='dropdown-item'
//                         onClick={() => handleRemoveComment(commentProp.id)}
//                       >
//                         <i className='fa-solid fa-trash-can text-dark me-5'></i>
//                         Xóa bình luận
//                       </li>
//                       <li className='dropdown-item'>
//                         <i className='fa-solid fa-link text-dark fs-6 me-3'></i>
//                         Sao chép liên kết
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <div className='w-100 fs-5 mb-4'>
//                 <a style={{wordWrap: 'break-word'}} href={commentProp.content}>
//                   {commentProp.content}
//                 </a>
//               </div>
//               <div
//                 className='d-flex rounded-3 border border-3 mb-6'
//                 style={{height: '80px', width: '365px'}}
//               >
//                 <img
//                   src='/media/svg/post/taoBaiDang.svg'
//                   alt='#'
//                   className='me-2'
//                   style={{width: '150px'}}
//                 />
//                 <div className='d-flex flex-column p-3'>
//                   <h6 className='text-uppercase fs-7' style={{color: '#616161'}}>
//                     {commentProp.preview.title}
//                   </h6>
//                   {commentProp.preview.description.length > 65 ? (
//                     <p className='fs-6 lh-sm' style={{color: '#222222'}}>
//                       {commentProp.preview.description.substring(0, 70)}...
//                     </p>
//                   ) : (
//                     <p className='fs-6 lh-sm' style={{color: '#222222'}}>
//                       {commentProp.preview.description}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className='d-flex w-100 align-items-center'>
//                 {favorite.includes(postProp.id) ? (
//                   <div className='d-flex'>
//                     <img
//                       src='/media/svg/post/favoriteCheck.svg'
//                       className='me-3'
//                       onClick={() => handleFavorite(commentProp.id)}
//                     />
//                     <span className='fs-5' style={{color: '#828282'}}>
//                       5
//                     </span>
//                   </div>
//                 ) : (
//                   <div className='d-flex'>
//                     <img
//                       src='/media/svg/post/favorite.svg'
//                       className='me-3'
//                       onClick={() => handleFavorite(commentProp.id)}
//                     />
//                     <span className='fs-5' style={{color: '#828282'}}>
//                       5
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </>
//           ))}
//       </div>
//       {/* --------------------------List comment: End ----------------------- */}
//     </div>
//   )
// }

// export default CommentPost
