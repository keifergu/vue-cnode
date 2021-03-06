import Vue from 'vue'
import Vuex from 'vuex'
import { normalize, schema, denormalize } from 'normalizr'

import cnode from '../api'
import storage from './storage'

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
      token: storage.get("token"),
      pageLimit: 20
    },
    results: {
      all: [],
      home: [],
      essence: [],
      question: [],
      share: [],
      jobs: []
    }
  },
  mutations: {
    fetchTopicListSuccess (state, { topics, tab }) {
      const normalizeData = normalize(topics, topicList);

      state.topics = Object.assign({}, normalizeData.entities.topics, state.topics)
      state.authors = Object.assign({}, normalizeData.entities.authors, state.authors)
      state.results[tab] = _
        .chain(state.results[tab])
        .concat(normalizeData.result)
        .uniq()
        .value()
      state.results.all = _
        .chain(state.results.all)
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
      const token = payload.token
      storage.set('token', token)
      state.config.token = token
      state.config.user = payload.data
    },
    loginFailed (state, error) {
      console.log(error)
    },
    createReplySuccess (state, payload) {
      console.log(payload)
    },
    createReplyFailed (state, { error, topicId }) {
      console.log(error)
      state.topics[topicId].replies.pop()
    },
    optimismUpdateReply(state, payload) {
      const { topic, content } = payload
      state.topics[topic].replies.push(content)
    },
  },
  actions: {
    login( { commit, getters, state }, payload) {
      const token = payload && payload.token ? payload.token : getters.token
      cnode("login", {
        params: {
          accesstoken: token
        }
      })
        .then(data => {
          commit('loginSuccess', {
            data,
            token
          })
        })
        .catch(error => commit('loginFailed', error))
    },
    fetchTopicList ( { commit, getters, state}, payload) {
      const map = {
        home: '',
        essence: 'good',
        question: 'ask',
        share: 'share',
        jobs: 'job'
      }
      // 获取当前的 tab
      const tab = map[ getters.currentTab ]
      const tabObj =  tab ? {tab} : {}

      // 判断是否是下一页，计算页数
      let page = 1
      if (payload && payload.next) {
        page = getters.currentPage + 1
      }
      let params = Object.assign({}, tabObj, {
        page,
        limit: state.config.pageLimit
      })

      cnode('topics',{
        params
      })
        .then(topics => commit('fetchTopicListSuccess', {
          tab: getters.currentTab,
          topics
        }))
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
    createReply ({ commit, getters, state}, payload) {
      const topicId = getters.currentTopicId
      const { content } = payload

      commit('optimismUpdateReply', {
        topicId,
        content,
      })

      cnode("create_reply", {
        params: {
          content,
          accesstoken: getters.token
        },
        pathParams: [ topicId ]
      })
        .then(data => commit('createReplySuccess', data))
        .catch(error => commit('createReplyFailed', {
          error,
          topicId
        }))
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
      const tab = getters.currentTab,
        results = state.results,
        limit = state.config.pageLimit,
        // 针对不同的 tab 有不同的过滤策略
        filters = {
          home: () => true,
          essence: t => t.good,
          jobs: t => t.tab == "job",
          share: t => t.tab == "share",
          question: t => t.tab == "ask",
        }
      // 当要获得的 tab 中没有 topic 时，说明是第一次访问该 topic
      // 此时从所有的 topics results 中获取 page 的前几个，然后过滤
      // 获取当前 tab 的 topic
      if(results[tab].length === 0) {
        const list = results.all.slice(0, limit)
        let topics = denormalize(list, topicList, state)
        return topics.filter(filters[tab])
      } else {
        return denormalize(results[tab], topicList, state)
      }
    },
    currentPage: (state, getters) => {
      const tab = getters.currentTab;
      const tabResults = state.results[tab],
        limit = state.config.pageLimit;
      return tabResults.length / limit;
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
