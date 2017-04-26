import Vue from 'vue'
import Vuex from 'vuex'
import cnode from '../api'
import { normalize, schema } from 'normalizr'

import _ from 'lodash'

Vue.use(Vuex)

const author = new schema.Entity('authors');
const topic = new schema.Entity('topics', {
  author: author
});

const store = new Vuex.Store({
  state: {
    topics: {},
    authors: {}
  },
  mutations: {
    fetchTopicListSuccess (state, payload) {
      var data = payload.map(topic => {
        return {
          ...topic,
          author: {
            id: topic.author_id,
            ...topic.author
          }
        }
      })
      const normalizedData = normalize(data, [topic]);
      state.topics = normalizedData.entities.topics
      state.authors = normalizedData.entities.authors
    },
    fetchTopicListFailed(state, error) {
      console.log(error)
    },
    fetchTopicSuccess (state, payload) {
      // TODO： 合并数据，抽取评论信息
      state.topics[payload.id] = payload
    },
    fetchTopicFailed(state, error) {
      console.log(error)
    },
  },
  actions: {
    fetchTopicList ( { commit } ) {
      cnode('topic_home')
        .then(data => commit('fetchTopicListSuccess', data))
        .catch(error => commit('fetchTopicListFailed', error))
    },
    fetchTopic ( { commit }, topicId) {
      cnode('topic_details', {
        pathParams: [topicId]
      })
        .then(data => commit('fetchTopicSuccess', data))
        .catch(error => commit('fetchTopicFailed', error))
    }
  },
  getters: {
    topicsWithAuthor: state => {
      var newTopics = {}
      for(let id in state.topics) {
        newTopics[id] = {...state.topics[id],author: state.authors[state.topics[id].author_id]}
      }
      return newTopics
    },
    allTopics: (state, getters) => {
      return _.chain(getters.topicsWithAuthor)
        .value()
    },
    essenceTopics: (state, getters) => {
      return _.chain(getters.topicsWithAuthor)
        .filter(t => t.good)
        .value()
    },
    shareTopics: (state, getters) => {
      return _.chain(getters.topicsWithAuthor)
        .filter(t => t.tab == "share")
        .value()
    },
    questionTopics: (state, getters) => {
      return _.chain(getters.topicsWithAuthor)
        .filter(t => t.tab == "ask")
        .value()
    },
    jobTopics: (state, getters) => {
      return _.chain(getters.topicsWithAuthor)
        .filter(t => t.tab == "job")
        .value()
    }
  }
})

export default store
