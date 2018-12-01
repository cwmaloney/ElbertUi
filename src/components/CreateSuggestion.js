"use strict";

const CreateSuggestion = {
  name: 'create-suggestion',

  data: function () {
    return {
      sender: null,
      suggestion: null
    };
  },

  methods: {
    checkForm: function (e) {

      this.errors = [];

      if (!this.suggestion) {
        this.errors.push('Suggestion required.');
      }

      e.preventDefault();
    },

    addSuggestion: function() {
      this.$store.dispatch('setMessage', {
        message:("Submitting your suggestion..."),
        messageClass: 'alert-info'
      });
      //console.log(`t.s.si=${this.$store.sessionId}`);
      axios.post("/suggestions", {
          sessionId: this.$store.getters.sessionId,
          sender: this.sender,
          suggestion: this.suggestion,
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
      <nav class="breadcrumb">
        <a class="breadcrumb-item" href="#/">{{"Home"}}</a>
        <a class="breadcrumb-item" href="#/message">{{"Send Suggestion"}}</a>
      </nav>
      -->

      <div class="hl-form">
        <form>
          <div class="form-group row">
             We would love to hear what you are thinking.
          </div>

          <div class="form-group">
            <label for="name">Your Name (optional):</label>
            <input v-model="sender" type="text" class="form-control" id="name" aria-describedby="Your Name (optional)">
          </div>

          <div class="form-group">
            <label for="message">Suggestion:</label>
            <textarea v-model="suggestion" class="form-control" rows="5" id="suggestion" aria-describedby="Suggestion">
            </textarea>
          </div>

          <button class="btn btn-primary mx-auto"
            v-on:click="addSuggestion">Send Suggestion</button>

        </form>
      </div>
    </div>
  `
};
