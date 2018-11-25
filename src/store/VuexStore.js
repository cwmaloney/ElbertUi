import Vue from 'vue';
import Vuex from 'vuex';


const UserInputs = require("./UserInputs.js");

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userInputs
  },
  strict: true
  // strict: process.env.NODE_ENV !== 'production'
});
