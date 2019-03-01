// import Apple from './components/apple'
// import Banana from './components/banana'
// import redApple from './components/children/redApple'
import indexPage from './pages/index'
import detail from './pages/detail'
import publishPage from './pages/details/publish'
import countPage from './pages/details/count'
import analysisPage from './pages/details/analysis'
import forecastPage from './pages/details/forecast'
import orderListPage from './pages/orderList'
const routers = [
  {
    path: '/',
    component: indexPage
  },
  {
    path: '/detail',
    component: detail,
    redirect: '/detail/analysis',
    children: [
      {
        path: 'publish',
        component: publishPage
      },
      {
        path: 'count',
        component: countPage
      },
      {
        path: 'analysis',
        component: analysisPage
      },
      {
        path: 'forecast',
        component: forecastPage
      }
    ]
  },
  {
    path: '/order',
    component: orderListPage
  }
  // {
  //   path: '/apple',
  //   name: 'applePage',
  //   component: Apple,
  //   children: [{
  //     path: 'red',
  //     name: 'redApple',
  //     component: redApple
  //   }]
  // },
  // {
  //   path: '/banana',
  //   component: Banana
  // }
]
export default routers
