import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {OrderManager} from './components/Charts'
import {Feeds} from './components/Feeds'
import {ManagerPost} from './components/ManagerPost'
import {Tables} from './components/Tables'
import {Mixed} from './components/Mixed'
import {Statistics} from './components/Statistics'
import {Dao} from '../dao/Dao'
import {Baocaovipham} from '../dao/Baocaovipham'
import {FeedDetail} from './components/ListComponents/FeedDetail/FeedDetail'
import {FeedEdit} from './components/ListComponents/FeedEdit/FeedEdit'
import {OrderEdit} from './components/ListComponents/OrderEdit/OrderEdit'
import {OrderDetail} from './components/ListComponents/OrderDetail/OrderDetail'
import {RatingReportDetail} from './components/ListComponents/RatingReportDetail/RatingReportDetail'
const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Widgets',
    path: '/crafted/widgets/charts',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const WidgetsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/*  Start Order */}
        <Route
          path='managerorder'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Charts</PageTitle>
              <OrderManager />
            </>
          }
        />
        <Route
          path='orderdetail'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Charts</PageTitle>
              <OrderDetail />
            </>
          }
        />
        <Route
          path='orderedit'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Charts</PageTitle>
              <OrderEdit />
            </>
          }
        />
        {/* End Order */}
        <Route
          path='feeds'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Feeds</PageTitle>
              <Feeds />
            </>
          }
        />
        {/* Start Feed */}
        <Route
          path='managerfeed'
          element={
            <>
              <ManagerPost />
            </>
          }
        />
        <Route
          path='feeddetail'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Lists</PageTitle>
              <FeedDetail />
            </>
          }
        />
        <Route
          path='feededit'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Lists</PageTitle>
              <FeedEdit />
            </>
          }
        />
        {/* End Feed */}

        {/* Start Rating&Report */}
        <Route
          path='ratingReportDetail'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Lists</PageTitle>
              <RatingReportDetail />
            </>
          }
        />
        <Route
          path='ratingReportDetailEdit'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Lists</PageTitle>
              <RatingReportDetail />
            </>
          }
        />
        {/* End Rating&Report */}

        <Route
          path='mixed'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Mixed</PageTitle>
              <Mixed />
            </>
          }
        />
        <Route
          path='tables'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Tables</PageTitle>
              <Tables />
            </>
          }
        />
        <Route
          path='statistics'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Statiscics</PageTitle>
              <Statistics />
            </>
          }
        />
        <Route
          path='dao'
          element={
            <>
              <Dao />
            </>
          }
        />
        <Route
          path='baocaovipham'
          element={
            <>
              <Baocaovipham />
            </>
          }
        />

        <Route index element={<Navigate to='/crafted/widgets/lists' />} />
      </Route>
    </Routes>
  )
}

export default WidgetsPage
