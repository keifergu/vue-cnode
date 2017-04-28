import App from '../App'
import Login from '../pages/Login'
import Topic from '../pages/Topic'
import User from '../pages/User'

import Home from '../pages/Home'
import Essence from '../pages/Essence'
import Share from '../pages/Share'
import Question from '../pages/Question'
import Jobs from '../pages/Jobs'

export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/essence',
        component: Home,
      },
      {
        path: '/share',
        component: Home,
      },
      {
        path: '/question',
        component: Home,
      },
      {
        path: '/jobs',
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
