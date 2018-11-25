"use strict";

const state = {
  sender: null,
  recipient: null,
  message: null,
  teamName: null,
  colorNames: null
};

const getters = {
  getSender: (state) => {
    return state.sender;
  },
  getRecipient: (state) => {
    return state.recipient;
  },
  getMessage: (state) => {
    return state.message;
  },
  getTeamName: (state) => {
    return state.teamName;
  },
  getColorName: (state) => {
    return state.colorNames;
  },
};

const mutations = {
  setName(name) {
    state.name = name;
  },
  setRecipient: (recipient) => {
    state.recipient = recipient;
  },
  setMessage: (message) => {
    state.message = message;
  },
  setTeamName: (teamName) => {
    state.teamName = teamName;
  },
  setColorName: (colorNames) => {
    state.colorNames = colorNames;
  },
};

const actions = {

};

const UserInputStore = {
  state,
  getters,
  mutations,
  actions
}

module.exports = UserInputStore;
