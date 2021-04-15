import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import warm from '@/store/warm'

Vue.use(Vuex)

axios.defaults.withCredentials = true
export default new Vuex.Store({
	modules: {
		warm: warm
	}
})
