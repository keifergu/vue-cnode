import Vue from 'vue'
import Vuex from 'vuex'
import cnode from '../api'
import { normalize, schema } from 'normalizr'

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
  }
})

export default store
