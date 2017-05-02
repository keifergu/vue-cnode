import Vue from 'vue'
import Vuex from 'vuex'
import { normalize, schema, denormalize } from 'normalizr'

import cnode from '../api'

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
    config: {
      user:{
        avatar_url: '',
        loginname: ''
      },
      token: ''
    },
    result: []
  },
  mutations: {
    fetchTopicListSuccess (state, payload) {
      const normalizeData = normalize(payload, topicList);

      state.topics = Object.assign({}, normalizeData.entities.topics, state.topics)
      state.authors = Object.assign({}, normalizeData.entities.authors, state.authors)
      state.result = _
        .chain(state.result)
        .concat(normalizeData.result)
        .uniq()
        .value()
    },
    fetchTopicListFailed (state, error) {
      console.error(error)
    },
    fetchTopicSuccess (state, payload) {
      // TODO： 合并数据，抽取评论信息
      Vue.set(state.topics, payload.id, payload)
    },
    fetchTopicFailed (state, error) {
      console.log(error)
    },
    loginSuccess (state, payload) {
      state.config.user = payload
    },
    loginFailed (state, error) {
      console.log(error)
    },
    createReplySuccess (state, error) {
      console.log(error)
    },
    createReplyFailed (state, error) {
      console.log(error)
    },
  },
  actions: {
    login( { commit, getters, state }, payload) {
      cnode("login", {
        params: {
          accesstoken: payload.token
        }
      })
        .then(data => {
          commit('loginSuccess', data)
          state.config.token = payload.token
        })
        .catch(error => commit('loginFailed', error))
    },
    fetchTopicList ( { commit, getters }, payload) {
      const map = {
        home: '',
        essence: 'good',
        question: 'ask',
        share: 'share',
        jobs: 'job'
      }
      const tab = map[ getters.currentTab ]
      const tabObj =  tab ? {tab} : {}
      const params = Object.assign({}, tabObj)
      cnode('topics',{
        params
      })
      // TODO: 完成新建回复，抽取回复等操作,修改 api ，对空值删除
        .then(data => commit('fetchTopicListSuccess', data))
        .catch(error => commit('fetchTopicListFailed', error))
    },
    fetchTopics ( { commit } ) {
      cnode('topics')
        .then(data => commit('fetchTopicListSuccess', data))
        .catch(error => commit('fetchTopicListFailed', error))
    },
    fetchTopicByPath ( { commit, state, getters } ) {
      const topicId = getters.currentTopicId
      cnode('topic_details', {
        pathParams: [topicId]
      })
        .then(data => commit('fetchTopicSuccess', data))
        .catch(error => commit('fetchTopicFailed', error))
    },
    createReply ({ commit, getters }, payload) {
      cnode("create_reply", {
        params: {
          accesstoken: getters.token,
          content: payload.content,
        },
        pathParams: [ getters.currentTopicId ]
      })
        .then(data => commit('createReplySuccess', data))
        .catch(error => commit('createReplyFailed', error))
    }
  },
  getters: {
    currentTopicId: state => {
      return state.route.params.topicId || undefined
    },
    currentTopic: (state, getters) => {
      const id = getters.currentTopicId
      return state.topics[id] || undefined
    },
    currentTab: (state, getters) => {
      const pathRe = new RegExp(/\/(\w+)\/?/)
      const path = pathRe.exec(state.route.path)
      return  path ? path[1] : 'home'
    },
    currentTopicList: (state, getters) => {
      const tab = getters.currentTab
      return getters[ tab + 'Topics']
    },
    topicsWithAuthor: state => {
      return denormalize(state.result, topicList, state)
    },
    homeTopics: (state, getters) => {
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
    jobsTopics: (state, getters) => {
      return _.chain(getters.topicsWithAuthor)
        .filter(t => t.tab == "job")
        .value()
    },
    token: (state) => {
      return state.config.token
    },
    currentUser: (state) => {
      return state.config.user
    },
    isLogin: (state) => {
      return !!state.config.token
    }
  }
})

export default store
