"use strict";

const Snakes = {
  name: 'snakes',

  data: function () {
    return {
      sender: "",
      registered: false,
      gameId: null,
      gameActive: false
    };
  },

  methods: {
    checkForm: function (e) {
      e.preventDefault();
    },

    onRegistereResponse(response) {
      if (response.status === 200) {
        if ( esponse.data.status === "Okay") {
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
      } else {
        this.$store.dispatch('setMessage', {
          message: `Unable to contact Gridzilla. Please try again. (error=${response.status})`,
          messageClass: 'alert-danger fade show',
          // timeout: 2000,
          dismissible: true
        });
      }
    },

    onErrorResponse(error, callName) {
      const message = ((callName) ? `${callName} Failed. ` : `Unable to contact Gridzilla. `) + `Please try again. (${error.toString()})`;
      this.$store.dispatch('setMessage', {
        message,
        messageClass: 'alert-danger fade show',
        // timeout: 2000,
        dismissible: true
      });
    },

    register: function() {
      this.$store.dispatch('setMessage', {
        message:("Registering..."),
        messageClass: 'alert-info'
      });
      //console.log(`t.s.si=${this.$store.sessionId}`);
      axios.post("/snakes.register", {
          sessionId: this.$store.getters.sessionId,
          sender: this.sender,
          timeout: 10000
        })
        .then((response) => { this.onRegisterResponse(response); })
        .catch((error) => { this.onErrorResponse(error, "Registration"); });
    }
  },

  template: `
    <div class="hl-page">
      <!--
      <nav class="breadcrumb">
        <a class="breadcrumb-item" href="#/">{{"Home"}}</a>
        <a class="breadcrumb-item" href="#/message">{{"Snakes"}}</a>
      </nav>
      -->

      <div class="hl-form">
        <form @submit="checkForm">
          <div class="form-group">
            You can play snakes on Grizilla!
          </div>

          <div class="form-group">
            <label class="col-form-label col-form-label-sm pb-0" for="Name">Name:</label>
            <input v-model="sender" type="text" class="form-control" id="from" aria-describedby="Name">
          </div>

          <button class="btn btn-primary mx-auto"
            v-on:click="register">Register</button>

          <div class="container">
            <div class="row justify-content-center">
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="send('Up')">Up</button>
              </div>
            </div>
            <div class="row justify-content-between">
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="send('Left')">Left</button>
              </div>
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="send('Right')">Right</button>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="send('Down')">Down</button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  `
};
