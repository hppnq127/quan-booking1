import axios from 'axios'
import clsx from 'clsx'
import React, {useEffect, useRef, useState} from 'react'
import {getLayout, ILayout, LayoutSetup, useLayout} from '../../../../../_metronic/layout/core'
import DropFileInput from '../../../dao/DropFileInput'
import '../../../../../app/components/ListPagination/ListPagination.scss'
import {URL_BOOKING_STUDIO} from '../../../../../setup/URL'
export const SettingCustomCSS: React.FC = () => {
  const {setLayout} = useLayout()
  const [config, setConfig] = useState<ILayout>(getLayout())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const [theme, setTheme] = useState<any>()
  const [themes, setThemes] = useState<any[]>([])
  const [files, setFiles] = useState<any[]>([])
  const linkRef = useRef<any>(null)
  useEffect(() => {
    let promise = axios({
      url: `${URL_BOOKING_STUDIO}css-file`,
      method: 'get',
    })
    promise
      .then((result) => {
        const data = result.data.data
        console.log(data)
        setThemes([...data])
        setTheme(data.find((item: any) => item.CssFile === config.theme))
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

  //const updateData = (fieldsToUpdate: Partial<ILayout>) => {
  //const updatedData = {...config, ...fieldsToUpdate}
  //setConfig(updatedData)
  //}

  const updateConfig = () => {
    setConfigLoading(true)
    try {
      const head = document.getElementsByTagName('head')[0]
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = theme.CssFile
      head.appendChild(link)
      LayoutSetup.setConfig(config)
    } catch (error) {
      setConfig(getLayout())
    }
    setTimeout(() => {
      setLayout(config)
      setConfigLoading(false)
    }, 1000)
  }

  const reset = () => {
    setResetLoading(true)
    setTimeout(() => {
      setConfig(getLayout())
      setResetLoading(false)
    }, 1000)
  }

  const onchangeSelect = (e: any) => {
    const theme = JSON.parse(e.target.value)
    const updatedData = {
      ...config,
      theme: theme.CssFile,
    }
    setConfig(updatedData)
    console.log(updatedData)
    setTheme(theme)
  }

  const onChangeFile = (e: any) => {
    const newFiles = [...files]
    const filesUpload = e.target.files
    for (const file of filesUpload) {
      if (file.type.split('/')[1] === 'css' || file.type.slice('/')[1] === 'scss') {
        newFiles.unshift(file)
      }
    }
    setFiles(newFiles)
  }

  const handleDeleteFileUpload = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const handleUploadFileCss = () => {
    const newFiles = [...files]
    const formData = new FormData()
    for (let file of newFiles) {
      formData.append('CssFile', file)
    }
    formData.append('Description', 'Theme1')
    const promise = axios({
      url: `${URL_BOOKING_STUDIO}css-file`,
      method: 'POST',
      data: formData,
    })
    promise
      .then((result) => {
        console.log('Success!')
        setFiles([])
      })
      .catch((error) => {
        console.log('Error!', error)
      })
  }

  const handleDeleteTheme = (id: string) => {
    const promise = axios({
      url: `${URL_BOOKING_STUDIO}css-file/${id}`,
      method: 'DELETE',
    })
    promise
      .then((result) => {
        console.log('Success!')
        setFiles([])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div
      style={{
        paddingTop: '1.5%',
        paddingBottom: '1.5%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '97%',
        height: '92%',
        position: 'relative',
        overflow: 'scroll',
      }}
    >
      <div className='wrap-content card card-custom position-absolute w-100 settingCss-container'>
        {/* begin::Form */}
        <form className='form'>
          {/* begin::Body */}
          <div className='card-body'>
            <div className='tab-content pt-3'>
              <div className={clsx('tab-pane', 'active')}>
                <div className='row mb-3 d-flex'>
                  <label className='col-lg-3 col-form-label text-lg-end'>Theme:</label>
                  <div className='col-lg-9 col-xl-4'>
                    <select
                      className='form-select form-select-solid'
                      name='layout-builder[layout][aside][theme]'
                      value={JSON.stringify(theme)}
                      onChange={(e) => onchangeSelect(e)}
                    >
                      {themes.map((item: any, index: number) => (
                        <option key={index} value={JSON.stringify(item)}>
                          {item.Name}
                        </option>
                      ))}
                    </select>
                    <div className='form-text text-muted'>Select header color.</div>
                  </div>
                  <div
                    className='btn btn-outline-success d-flex align-items-center justify-content-center border border-2 border-success'
                    style={{width: '40px', height: '40px'}}
                    data-bs-toggle='modal'
                    data-bs-target='#modalUploadFile'
                  >
                    <i className='fa-solid fa-plus fs-3 ms-1'></i>
                  </div>
                  {/* <!-- Modal --> */}
                  <div
                    className='modal fade'
                    id='modalUploadFile'
                    aria-labelledby='exampleModalLabel'
                    aria-hidden='true'
                  >
                    <div className='modal-dialog modal-dialog-scrollable'>
                      <div className='modal-content'>
                        <div className='modal-body'>
                          <div className='d-flex flex-column mb-3 h-150px'>
                            <DropFileInput
                              onChangeFile={onChangeFile}
                              classIcon='fa-solid fa-cloud-arrow-up'
                            />
                          </div>
                          {files &&
                            files.map((theme, index) => (
                              <div
                                key={index}
                                className='w-100 d-flex justify-content-start border border-2 rounded py-2 px-6 mt-3 position-relative'
                              >
                                <div className='me-6'>
                                  {theme.type.split('/')[1] === 'css' && (
                                    <i
                                      className='fa-brands fa-css3-alt'
                                      style={{fontSize: '50px', color: '#80ccff'}}
                                    ></i>
                                  )}
                                </div>
                                <div className='d-flex flex-column fs-3'>
                                  <span>{theme.name}</span>
                                  <span className='fs-6 text-muted'>{theme.size} kB</span>
                                </div>
                                <i
                                  onClick={() => handleDeleteFileUpload(index)}
                                  className='fa-solid fa-xmark position-absolute'
                                  style={{top: '5px', right: '10px', fontSize: '20px'}}
                                ></i>
                              </div>
                            ))}
                        </div>
                        <div className='d-flex justify-content-end p-6'>
                          <button
                            type='button'
                            className='btn btn-secondary me-6'
                            data-bs-dismiss='modal'
                          >
                            Close
                          </button>
                          <button
                            type='button'
                            className='btn btn-primary'
                            data-bs-dismiss='modal'
                            onClick={handleUploadFileCss}
                          >
                            Upload File
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mb-6'>
                  <div className='col-lg-3'></div>
                  <div className='col-lg-9'>
                    <button type='button' onClick={updateConfig} className='btn btn-primary me-2'>
                      {!configLoading && <span className='indicator-label'>Preview</span>}
                      {configLoading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>

                    <button
                      type='button'
                      id='kt_layout_builder_reset'
                      className='btn btn-active-light btn-color-muted'
                      onClick={reset}
                    >
                      {/* {!resetLoading && <span className='indicator-label'>Reset</span>} */}
                      {resetLoading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                <div className='d-flex justify-content-center'>
                  <div className='w-80'>
                    <div className='pagination-container table'>
                      <table className='table border border border-secondary border-2'>
                        <thead className='border border border-secondary border-2 fs-5 fw-bolder table_header'>
                          <tr className=' align-middle'>
                            <th scope='col' style={{width: '10%'}}>
                              <div className='d-flex justify-content-center align-items-center'>
                                #
                              </div>
                            </th>
                            <th scope='col'>
                              <div className='d-flex justify-content-center align-items-center'>
                                Tên file
                              </div>
                            </th>
                            <th scope='col' style={{width: '15%'}}>
                              Thao tác
                            </th>
                          </tr>
                        </thead>
                        <tbody className='border border border-secondary border-2 table_body '>
                          {themes &&
                            themes.map((item, index) => (
                              <tr className='pagination-tr align-middle'>
                                <td>{index}</td>
                                <td>{item.Name}</td>
                                <td>
                                  <div className=' dropend '>
                                    <button
                                      type='button'
                                      className='Focus-button action-button'
                                      data-bs-toggle='dropdown'
                                      aria-expanded='false'
                                    >
                                      <img
                                        alt='more'
                                        src='/media/icons/duotune/arrows/test.svg'
                                        className='panigation-img'
                                      />
                                    </button>
                                    <div className='dropdown-menu'>
                                      <div className=' d-flex align-items-start d-flex flex-column  '>
                                        <div
                                          className='text-dark text-start   Hover-primary w-100'
                                          onClick={() => handleDeleteTheme(item.Id)}
                                        >
                                          <button
                                            style={{background: 'none', border: 'none'}}
                                            type='button'
                                            className='Focus-button w-100 py-2 d-flex justify-content-start align-items-center ms-3'
                                          >
                                            <i className='fa-solid fa-trash-can  text-dark pe-3'></i>
                                            Xóa
                                          </button>
                                        </div>

                                        <div
                                          className='text-dark text-start  Hover-primary w-100 pe-3'
                                          onClick={() => {
                                            linkRef.current.href = item.DownloadCssFile
                                            linkRef.current.click()
                                          }}
                                        >
                                          <button
                                            style={{background: 'none', border: 'none'}}
                                            type='button'
                                            className='Focus-button py-2 w-100 d-flex justify-content-start align-items-center ms-3'
                                          >
                                            <i className='fa-solid fa-arrow-down  text-dark pe-3'></i>
                                            Tải xuống
                                          </button>
                                          <a
                                            ref={linkRef}
                                            href='!#'
                                            download
                                            className='overflow-hidden'
                                          >1</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
