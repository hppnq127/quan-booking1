/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import {AuthorizationClient, LoginAdminRequest} from '../redux/UserInfoAPI'

import * as authActions from '../redux/AuthRedux'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'superadmin@admin.com',
  password: 'BookingStudio1',
}

//alert(here);
/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login(props: object) {
  // const accessToken =""

  // const authAxios = axios.create({
  //   baseURL:'https://bookingstudio.vn/api',
  //   headers : {
  //     Authorization:`Bearer ${accessToken}`,
  //   },
  // });

  const navigate = useNavigate()
  const dispatch = useDispatch()
  //get emailAdmin, passwordAdmin

  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async () => {
      //set adminName and adminPassword
      const inputEmailAdmin = document.getElementById('emailAdminFill') as HTMLInputElement | null
      const inputPasswordAdmin = document.getElementById(
        'passwordAdminFill'
      ) as HTMLInputElement | null
      const adminLogin = new AuthorizationClient()
      try {
        setLoading(true)
        // check if value !null
        if (inputEmailAdmin != null && inputPasswordAdmin != null) {
          const {
            Username: username,
            Id: id,
            Email: email,
            Fullname,
          } = (await adminLogin.loginAdmin(
            new LoginAdminRequest({
              username: inputEmailAdmin.value,
              password: inputPasswordAdmin.value,
            })
          )) as any // TODO: for quick demonstration

          dispatch(
            authActions.actions.fulfillUser({
              id,
              username,
              password: undefined,
              email,
              first_name: Fullname,
              last_name: Fullname,
            })
          )
          // Companyname: null
          // Email: "superadmin@admin.com"
          // Experience: null
          // Fullname: "admin admin"
          // Id: 1
          // Phone: null
          // TenantId: 0
          // Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN1cGVyYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjU0NTA4MjcyLCJleHAiOjE2NTUxMTMwNzIsImlhdCI6MTY1NDUwODI3Mn0.Q0g5hVsCAOO3q5YEAhhjHeVC8oBnrCFClKiaYkDoPhY"
          // Username: "superadmin@admin.com"
          // Usertype: 0
          // Website: null
        }
        // check if value null
        else if (inputEmailAdmin == null || inputPasswordAdmin == null) {
          await adminLogin.loginAdmin(new LoginAdminRequest({username: '', password: ''}))
        }
        console.log('Success')
      } catch (error) {
        console.log('Failure')
        navigate('forgot-password')
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <form
      name='formDangNhap'
      className='form w-100 p-10 helloform'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-start pb-10 w-100'>
        <h1 className='mb-3' style={{color: '#3F3F3F', fontWeight: '700'}}>
          Đăng nhập để quản lý{' '}
        </h1>
      </div>
      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-normal text-dark'>Tên đăng nhập</label>
        <input
          id='emailAdminFill'
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-white border border-dark border-1 p-4',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-2'>
        <div className='d-flex justify-content-between mt-6'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-normal text-dark fs-6 '>Mật khẩu</label>
            {/* end::Label */}
            {/* begin::Link */}

            {/* end::Link */}
          </div>
        </div>
        <input
          id='passwordAdminFill'
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-white border border-dark border-1 p-4',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
          style={{marginBottom: '50px'}}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}

      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg  w-100 mb-5 py-5'
          disabled={formik.isSubmitting || !formik.isValid}
          style={{background: '#E22828'}}
        >
          {!loading && <span className='text-white'>Đăng nhập</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      <div className='text-center pt-4 pb-6'>
        <div className='text-black fw-semibold fs-6 '></div>
      </div>
    </form>
  )
}
