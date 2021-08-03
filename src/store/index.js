import Vue from 'vue'
import Vuex from 'vuex'

import { galleryData } from '@/store/modules/galleryData.js' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    galleryData:galleryData
  }
})
