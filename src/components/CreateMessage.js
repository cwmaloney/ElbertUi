"use strict";

const CreateMessage = {
  name: 'create-message',

  data: function () {
    return {
      sender: null,
      recipient: null,
      message: null,
      imageName: null,
      color: "White",
      backgroundColor: "Black"
    };
  },

  methods: {
    checkForm: function (e) {
    //   if (this.name && this.age) {
    //     return true;
    //   }

    //   this.errors = [];

    //   if (!this.sender) {
    //     this.errors.push('Sender required.');
    //   }
    //   if (!this.recipient) {
    //     this.errors.push('Recipient required.');
    //   }

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
          imageName: this.imageName,
          color: this.color,
          backgroundColor: this.backgroundColor,
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

      <div class="hl-form">
        <form @submit="checkForm">

          <div class="form-group">
            You can diplay a message!
          </div>

          <div class="form-group row">
            <label class="col-3 col-form-label" for="to">To</label>
            <div class="col-9">
              <input v-model="recipient" type="text" class="form-control" id="to" aria-describedby="To">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-3 col-form-label" for="From">From</label>
            <div class="col-9">
              <input v-model="sender" type="text" class="form-control" id="from" aria-describedby="From">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-3 col-form-label" for="message">Message</label>
            <div class="col-9">
              <select v-model="message" class="form-control" id="Message">
              <!--
                <option>Happy Holidays</option>
                <option>Seasons Greetings</option>
                <option>Merry Christmas</option>
                <option>Feliz Navidad</option>
                <option>Happy Hanukkah</option>
                <option>Shalom</option>
                <option>Joyous Kwanzaa</option>
                <option>Happy Festivus</option>
                <option>Happy Winter Solstice</option>
                <option>Happy New Year</option>
              -->
                <option>Will you be my Valentine?</option>
                <option>Happy Valentine's Day</option>
                <option>I Love you</option>
                <option>We Love you</option>
                <option>You are my BFF</option>
                <option>Love, Peace, and Joy</option>
                <option>Will you marry me?</option>
                <option>Live Long and Prosper</option>
                <option>Happy Birthday</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-3 col-form-label" for="imageName">Image</label>
            <div class="col-9">
              <select v-model="imageName" class="form-control" id="Image">
                <option>Rose</option>
                <option>Heart</option>
                <option>Couple</option>
                <option>Birdy</option>
                <option>Pumpkin</option>
                <option>Snowflake</option>
                <option>Snowman</option>
                <option>Ghost</option>
                <option>Rainbow</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-3 col-form-label" for="color">Color</label>
            <div class="col-9">
              <color-picker id="color" v-model="color"></color-picker>
            </div>
          </div>

          <!--
          <div class="form-group row">
            <label class="col-3 col-form-label col-form-label-sm" for="background">Background</label>
            <div class="col-9">
              <color-picker id="background" v-model="backgroundColor"></color-picker>
            </div>
          </div>
          -->

          <div class="form-group row">
            <div class="col-12">
              <button class="btn btn-primary mx-auto"
                v-on:click="addMessage">Send Message</button>

              <small class="form-text text-muted text-left mt-3">
              You can use common names and names like Mom, Dad, Grandmother, & Everyone.
              You can enter multiple names separated by commas.
              </small>
            </div>
          </div>

        </form>
      </div>
    </div>
  `
};
