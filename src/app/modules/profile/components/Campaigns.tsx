/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card5 } from '../../../../_metronic/partials/content/cards/Card5'

export function Campaigns() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  const [pageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }
    getPosts();
  }, []);
  

  //Get current posts
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFristPost = indexOfLastPost - postPerPage
  const newPosts = posts.slice(indexOfFristPost, indexOfLastPost)

  const paginate = (Number: any) => {
    return setCurrentPage(Number)
  }

  const Posts = () => {
    if (loading) {
      return <h2 className='w-100 text-center'>Loading</h2>
    }
    return (

      newPosts.map((post, index) => (
        <div key={index} className='col-sm-6 col-xl-4 h-75 ' >
          <Card5 
            image='/media/svg/brand-logos/twitter.svg'
            title={post['title']}
            description={post['id']}
            status='up'
            statusValue={17.62}
            statusDesc='Followers growth'
            progress={5}
            progressType='New trials'
            
          />
        </div>

      ))
    )
  }

  let pageNumber: Array<number>;
  pageNumber = []
  for (let i: number = 1; i <= Math.ceil(posts.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  const Pag = () => {


    return pageNumber.map(number => {
      if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
        return (
          <li key={number} className={currentPage ===number ? 'active page-item' : 'page-item'}>
            <a href='#' className='page-link' onClick={() => paginate(number)}>{number}</a>
          </li>)
      } else {
        return null
      }

    })


  }
  /////////////////////////
  const handleNextPage = () => {
    setCurrentPage( currentPage + 1 );
    if (currentPage +1 > maxPageNumberLimit&&maxPageNumberLimit < pageNumber.length  ) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    } 
}
////////////
const handlePrevPage = () => {
  setCurrentPage( currentPage - 1 );
  if ((currentPage - 1 )%pageNumberLimit===0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  }
}
  return (
    <>
      
      <div className='row g-6 g-xl-9'  >
        {Posts()}
      </div>
      <div className='d-flex flex-stack justify-content-center flex-wrap pt-1'>
        <nav>
          <ul className='pagination align-middle'>
            <li>
              <button className='btn btn-primary' onClick={handlePrevPage}
              disabled = {currentPage ===pageNumber[0] ? true : false}>
                Prev
              </button>
            </li>
            <li className='px-3 d-flex flex-column justify-content-center'>
              ...
            </li>
            {Pag()}
            <li className='px-3 d-flex flex-column justify-content-center'>
                        ...
                    </li>
                    <li>
                        <button className='btn btn-primary'  onClick={handleNextPage}
                        disabled = {currentPage ===pageNumber[pageNumber.length -1] ? true : false}>
                            Next
                        </button>
                    </li>
          </ul>
        </nav>


      </div>
    </>
  )
}
