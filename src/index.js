"use strict";

// Vue.config.productionTip = false;

// ---- VueRouter configuration -----

const routes = [
  { path: '', component: Home, name: 'home' },

  { path: '/message', component: CreateMessage, name: 'message' },
  // { path: '/cheer', component: CreateCheer, name: 'cheer' },
  // { path: '/snakes', component: Snakes, name: 'snakes' },
  { path: '/suggestion', component: CreateSuggestion, name: 'suggestion' },

  { path: '/about', component: About, name: 'about' },

  { path: '/utilities', component: Utilities, name: 'utilities' },
  { path: '/status', component: Status, name: 'status' },

  { path: '*', redirect: '/' }
];


// ----- Vuex Store - Messages to display to user -----

/*
Message objects contain
  text - the text to display, required
  displayPeriod - how long the message should be displayed in milliseconds, optional
  class - CSS classes for message display, optional
  id - added by the store
  timer - added by the store
*/

const messageStoreState = {
  messages: new Array(),
  nextMessageId: 0
};

const messageStoreGetters = {
  messages: (state) => { return state.messages; }
};

const messageStoreMutations = {
  addMessage(state, message) {
    message.id = state.nextMessageId++;
    state.messages.push(message);
    return message;
  },
  deleteMessage(state, id) {
    let index = state.messages.map(message => message.id).indexOf(id);
    if (index >= 0) {
      let message = state.messages[index];
      if (message.id === id) {
        clearTimeout(message.timer);
        state.messages.splice(index, 1);
      }
    }
  },
  deleteAllMessages(state) {
    for (let index = 0; index < state.messages.length; index++) {
      let message = state.messages[index];
      clearTimeout(message.timer);
      state.messages.splice(index, 1);
    }
  }
};

function messageStoreStartTimer(context, message) {
  if (message.timeout) {
    message.timeoutEvent = setTimeout(function () {
      context.commit('deleteMessage', message.id);
    }, message.timeout);
  }
}

const messageStoreActions = {
  addMessage(context, message) {
    context.commit('addMessage', message);
    messageStoreStartTimer(context, message);
  },
  setMessage(context, message) {
    context.commit('deleteAllMessages');
    context.commit('addMessage', message);
    messageStoreStartTimer(context, message);
  },
  deleteMessage({commit}, id) { commit('deleteMessage', id); },
  deleteAllMessages({commit}) { commit('deleteAllMessages'); }
};

const MessageStore = {
  state: messageStoreState,
  getters: messageStoreGetters,
  mutations: messageStoreMutations,
  actions: messageStoreActions
}

// ----- Vuex Store - sessionId -----

const sessionStoreState = {
  sessionId: null
};

const sessionStoreGetters = {
  sessionId: (state) => { return state.sessionId; }
};

const sessionStoreMutations = {
  setSessionId(state, sessionId) {
    state.sessionId = sessionId;
  }
};

const SessionStore = {
  state: sessionStoreState,
  getters: sessionStoreGetters,
  mutations: sessionStoreMutations
};

// ----- Vuex Store - user Input -----

const userInputState = {
  sender: null,
  recipient: null,
  message: null,
  teamName: null,
  colorNames: null
};

const userInputGetters = {
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

const userInputMutations = {
  setSender(sender) {
    state.sender = sender;
    localStorage.setItem('sender', sender);
  },
  setRecipient: (recipient) => {
    state.recipient = recipient;
    localStorage.setItem('recipient', recipient);
  },
  setMessage: (message) => {
    state.message = message;
    localStorage.setItem('message', message);
  },
  setTeamName: (teamName) => {
    state.teamName = teamName;
    localStorage.setItem('teamName', teamName);
  },
  setColorName: (colorNames) => {
    state.colorNames = colorNames;
    localStorage.setItem('colorNames', colorNames);
  },
  loadUserInputFromLocalStorage ( { commit, state } ) {
    const sender = localStorage.getItem("sender");
    if (sender) { state.setSender(sender); }

    const recipient = localStorage.getItem("recipient");
    if (recipient) { state.setRecipient(recipient); }
  }
};


const UserInputStore = {
  state: userInputState,
  getters: userInputGetters,
  mutations: userInputMutations
}

// ----- Vuex configuraiton -----

const Store = {
  modules: {
    MessageStore,
    UserInputStore,
    SessionStore
  },
  strict: true
};

// ----- registers Vue components -----

Vue.component( "messages", Messages );
//Vue.component( "snakes", Snakes );
Vue.component( "color-picker", ColorPicker );

// ----- start Vue -----

const router = new VueRouter( { routes } );
const store = new Vuex.Store(Store);

let gridzillaServerConfiguration;
// console.log(window.location.hostname);
if (window.location.hostname == "farmsteadlights.com") {
  gridzillaServerConfiguration = {
    baseUrl: "https://farmsteadlights.ngrok.io"
  }
} else {
  gridzillaServerConfiguration = {
    baseUrl: "http://localhost:8000"
  }
}

axios.defaults.baseURL = gridzillaServerConfiguration.baseUrl;

function setMessage(messageObject) {
  if (!messageObject.messageClass) {
    messageObject.messageClass = 'alert-info';
  }
  store.dispatch("setMessage", messageObject);
}

//setMessage( { message: "Connecting to Gridzilla..." } );

const socket = io(gridzillaServerConfiguration.baseUrl/*, { reconnectionAttempts: 3 , transport : ['websocket']}*/);

socket.on('connect', function() {
  // setMessage( {message: 'Connected to Gridzilla.'} );
  console.log(`socket id= ${socket.id}`);
});

socket.on('disconnect', function(error) {
  // setMessage( {message: 'Disconnected from Gridzilla!', messageClass: 'alert-danger fade show'} );
  console.log(`socket on disconnect: ${error.toString()}`);
});

socket.on('reconnect_failed', function(error) {
  // setMessage( {message: 'Connection to Gridzilla failed!', messageClass: 'alert-danger fade show'} );
  console.log(`socket on reconnect_failed: ${error.toString()}`);
});

socket.on('message', function (messageObject) {
  setMessage( messageObject );
  console.log(`socket on nessage: ${messageObject.message}`);
});

/* eslint-disable no-new */
const app = new Vue({
  store,
  router,
  provide() { return { axios, socket }; },
  beforeCreate() {
		this.$store.commit('loadUserInputFromLocalStorage');
	}
}).$mount('#app');
