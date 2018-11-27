"use strict";

const CreateMessage = {
  name: 'create-message',

  data: function () {
    return {
      sender: null,
      recipient: null,
      message: null
    };
  },

  methods: {
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.sender) {
        this.errors.push('Sender required.');
      }
      if (!this.recipient) {
        this.errors.push('Recipient required.');
      }

      e.preventDefault();
    },

    addMessage: function() {
      this.$store.dispatch('setMessage', {
        message:("Creating your message..."),
        messageClass: 'alert-info'
      });
      //console.log(`t.s.si=${this.$store.sessionId}`);
      axios.post("/messages", {
          sessionId: this.$store.getters.sessionId,
          sender: this.sender,
          recipient: this.recipient,
          message: this.message,
          timeout: 10000
        })
        .then((response) => {
          if (response.status === 200 && response.data.status === "Okay") {
            this.$store.dispatch('setMessage', {
              message: response.data.message,
              messageClass: 'alert-success fade show',
              // timeout: 2000,
              dismissible: true
            });
            if (response.data.sessionId) {
              //console.log(`r.d.si=${response.data.sessionId} t.s.si=${this.$store.getters.sessionId}`);
              this.$store.commit('setSessionId', response.data.sessionId);
              //console.log(`t.s.si=${this.$store.getters.sessionId}`);
            }
          } else {
            this.$store.dispatch('setMessage', {
              message: response.data.message,
              messageClass: 'alert-danger fade show',
              // timeout: 2000,
              dismissible: true
            });
          }
        })
        .catch((error) => {
          this.$store.dispatch('setMessage', {
            message: error.toString(),
            messageClass: 'alert-danger fade show',
            // timeout: 2000,
            dismissible: true
          });
        });
    }
  },

  template: `
    <div class="hl-page">
      <!--
      <nav class="base-breadcrumb">
        <a class="base-breadcrumb-item" href="#/">{{"Home"}}</a>
        <a class="base-breadcrumb-item" href="#/message">{{"Create Message"}}</a>
      </nav>
      -->

      <div class="hl-form">
        <form @submit="checkForm">
          <div class="form-group base-row">
             You can create a message to display on Gridzilla!
          </div>

          <div class="form-group">
            <label for="To">To:</label>
            <input v-model="recipient" type="text" class="form-control" id="to" aria-describedby="To">
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
            <select v-model="message" class="form-control" id="Message">
              <option>Happy Holidays</option>
              <option>Seasons Greetings</option>
              <option>Love, Peace, and Joy</option>
              <option>I Love you</option>
              <option>We Love you</option>
              <option>Merry Christmas</option>
              <option>Feliz Navidad</option>
              <option>Happy Hanukkah</option>
              <option>Shalom</option>
              <option>Joyous Kwanzaa</option>
              <option>Will you marry me?</option>
              <option>Live Long and Prosper</option>
              <option>Happy New Year</option>
              <option>You are my BFF</option>
            </select>
          </div>
          <div class="form-group">
            <label for="From">From:</label>
            <input v-model="sender" type="text" class="form-control" id="from" aria-describedby="From">
          </div>

          <button class="btn btn-primary mx-auto"
            v-on:click="addMessage">Send Message</button>

          <p class="text-left mt-3">
          You can use common names and names like Mom, Dad, and Grandmother.
          You can enter multiple names separated by commas.
          </p>

        </form>
      </div>
    </div>
  `
};
