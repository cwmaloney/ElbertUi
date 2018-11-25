/*
Message objects
  text - the text to display, required
  displayPeriod - how long the message should be displayed in milliseconds, optional
  class - CSS classes for message display, optional
*/

const state = {
  messages: new Array(),
  nextMessageId: 0
};

const mutations = {

  addMessage(state, message) {
    message.id = state.nextMessageId++;
    messages.push(message);
    return message;
  },

  deleteAllMessages(state) {
    for (let index = 0; index < state.messages.length; index++) {
      let message = state.messages[index];
      clearTimeout(message.timeoutEvent);
      state.messages.splice(index, 1);
    }
  },

  deleteMessage(state, id) {
    let index = state.messages.map(message => message.id).indexOf(id);
    if (index >= 0) {
      let message = state.messages[index];
      if (message.id === id) {
        clearTimeout(message.timeoutEvent);
        state.messages.splice(index, 1);
      }
    }
  }
};

function startTimer(context, message) {
  if (message.timeout) {
    message.timeoutEvent = setTimeout(function () {
      context.commit('deleteMessage', message.id);
    }, message.timeout);
  }
}

const actions = {
  insertMessage(context, message) {
    context.commit('insertMessage', message);
    startTimer(context, message);
  },

  clearAllMessages({commit}) { commit('clearAllMessages'); },
  deleteMessage({commit}, id) { commit('deleteMessage', id); }
};

const getters = {
  messages: (state) => { return state.messages; }
};

export default {
  state,
  mutations,
  actions,
  getters
}
