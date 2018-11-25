"use strict";

const UserInputs = require("./UserInputStore.js");
const MessageStore = require("./MessageStore.js");

const VuexStore = {
  modules: {
    MessageStore,
    UserInputs
  },
  strict: true
};

module.exports = VuexStore;
