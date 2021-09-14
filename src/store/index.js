import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { CardGame } from './modules/CardGame';

export default new Vuex.Store({
    modules: { CardGame, }
})
