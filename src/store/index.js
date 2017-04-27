import Vue from 'vue'
import Vuex from 'vuex'
import cnode from '../api'
import { normalize, schema, denormalize } from 'normalizr'

import _ from 'lodash'

Vue.use(Vuex)

function customizer(objValue, srcValue) {
  return  _.isUndefined(objValue) ? srcValue: objValue
}

var mergeDiffValue = _.partialRight(_.assignWith, customizer)

const author = new schema.Entity('authors');

const topic = new schema.Entity('topics', {
  author: author
},{
  processStrategy: value => _.set(value,'author.id',value.author_id)
});

const topicList = [topic];

const store = new Vuex.Store({
  state: {
    topics: {},
    authors: {},
    config: {},
    result: []
  },
  mutations: {
    fetchTopicListSuccess (state, payload) {
      const normalizeData = normalize(payload, topicList);

      state.topics = mergeDiffValue(state.topics, normalizeData.entities.topics)
      state.authors = mergeDiffValue(state.authors, normalizeData.entities.authors)
      state.result = _
        .chain(state.result)
        .concat(normalizeData.result)
        .uniq()
        .value()
    },
    fetchTopicListFailed(state, error) {
      console.error(error)
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
    fetchTopicList ( { commit }, payload) {
      cnode('topics',{
        params: {
          tab: payload.tab || 'share'
        }
      })
        .then(data => commit('fetchTopicListSuccess', data))
        .catch(error => commit('fetchTopicListFailed', error))
    },
    fetchTopics ( { commit } ) {
      cnode('topics')
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
      return denormalize(state.result, topicList, state)
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
