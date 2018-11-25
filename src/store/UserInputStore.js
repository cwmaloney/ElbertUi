
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

  signIn(context, {emailAddress, password}) {
    // console.log('action signIn' +
    //  ' emailAdress=' + emailAddress + ' password=' + password);

    return new Promise((resolve, reject) => {
      context.getters.authenticationApi.signIn(emailAddress, password)
        .then(function(user) {
          // console.log('action signIn authenticationApi.signIn completed', user);

          if (!context.getters.authenticationApi.hasNotifier) {
            context.commit('setUser', user);
          }
          resolve(user);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },


};

export default {
  state,
  getters,
  mutations,
  actions
}
