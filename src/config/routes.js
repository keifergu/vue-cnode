import App from '../App';
import Topic from '../components/Topic';
import TopicList from '../components/TopicList';
import User from '../components/User';

export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        component: TopicList,
      },
      {
        path: '/topic/:topicId',
        component: Topic,
      },
      {
        path: '/user/:loginname',
        component: User,
      }
    ]
  }
]
