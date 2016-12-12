import App from '../App';
import Topic from '../components/Topic';
import TopicList from '../components/TopicList';

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
        path: '/topic',
        component: Topic,
      },
    ]
  }
]
