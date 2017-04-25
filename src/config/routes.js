import App from '../App'
import Login from '../pages/Login'
import Topic from '../pages/Topic'
import Home from '../pages/Home'
import User from '../pages/User'


export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: '/topic/:topicId',
        component: Topic,
      },
      {
        path: '/user/:loginname',
        component: User,
      },
      {
        path: '/login',
        component: Login
      }
    ]
  }
]
