"use strict";

const CreateCheer = {
  name: 'create-cheer',

  data: function () {
    return {
      colorNames: colorNames,
      cheerType: "team",
      sender: "",
      teamName: "Chiefs",
      selectedColorNames: [ "Red" ]
    };
  },

  computed: {
    isCheerByTeam() {
      return this.cheerType === "team";
    },
    isCheerByColors() {
      return this.cheerType === "colors";
    }
  },

  methods: {
    checkForm: function (e) {
      e.preventDefault();
    },

    // onCheerResponse: function(response) {
    //   if (response.status === 200) {
    //     if ( response.data.status === "Okay") {
    //       this.$store.dispatch('setMessage', {
    //         message: response.data.message,
    //         messageClass: 'alert-success fade show',
    //         // timeout: 2000,
    //         dismissible: true
    //       });
    //       if (response.data.sessionId) {
    //         //console.log(`r.d.si=${response.data.sessionId} t.s.si=${this.$store.getters.sessionId}`);
    //         this.$store.commit('setSessionId', response.data.sessionId);
    //         //console.log(`t.s.si=${this.$store.getters.sessionId}`);
    //       }
    //     } else {
    //       this.$store.dispatch('setMessage', {
    //         message: response.data.message,
    //         messageClass: 'alert-danger fade show',
    //         // timeout: 2000,
    //         dismissible: true
    //       });
    //     }
    //   } else {
    //     this.$store.dispatch('setMessage', {
    //       message: `Unable to contact Gridzilla. Please try again. (error=${response.status})`,
    //       messageClass: 'alert-danger fade show',
    //       // timeout: 2000,
    //       dismissible: true
    //     });
    //   }
    // },

    // onErrorResponse: function(error, callName) {
    //   const message = ((callName) ? `${callName} Failed. `
    //                               : `Unable to contact Gridzilla. `)
    //       + `Please try again. (${error.toString()})`;
    //   this.$store.dispatch('setMessage', {
    //     message,
    //     messageClass: 'alert-danger fade show',
    //     // timeout: 2000,
    //     dismissible: true
    //   });
    // },

          // // Receive state from server
          // socket.on('state', (state) => {
          //   // and redraw the game
          //   game.draw(state.players, state.apples);
          // });
      //console.log(`t.s.si=${this.$store.sessionId}`);
      // axios.post("/snakes.register", {
      //     sessionId: this.$store.getters.sessionId,
      //     sender: this.sender,
      //     timeout: 10000
      //   })
      //   .then((response) => { this.onRegisterResponse(response); })
      //   .catch((error) => { this.onErrorResponse(error, "Registration"); });

    addCheer: function() {
      this.$store.dispatch('setMessage', {
        message:("Creating your cheer..."),
        messageClass: 'alert-info'
      });
      //console.log(`t.s.si=${this.$store.sessionId}`);
      let request = {
        sessionId: this.$store.getters.sessionId,
        sender: this.sender,
        timeout: 10000
      };
      if (this.cheerType === "team") {
        request.teamName = this.teamName;
      } else {
        request.colorNames = this.selectedColorNames;
      }
      axios.post("/cheers", request)
        .then((response) => {
          if (response.status === 200 && response.data.status === "Okay") {
            this.$store.dispatch('setMessage', {
              message: response.data.message,
              messageClass: 'alert-success fade show',
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
              dismissible: true
            });
          }
        })
        .catch((error) => {
          this.$store.dispatch('setMessage', {
            message: error.toString(),
            messageClass: 'alert-danger fade show',
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
            Use Gridzilla to cheer for your team!
          </div>

          <div class="form-group row">
            <label class="col-form-label col-3" for="name">From:</label>
            <div class="col-9">
              <input v-model="sender" type="text" class="form-control" id="name" aria-describedby="Your First Name">
              <small class="form-text text-muted">
                Optional; Put your first name on the cheer.
              </small>
            </div>
          </div>

          <fieldset class="form-group">
            <div class="row">
              <legend class="col-form-label col-3">Cheer For:</legend>
              <div class="col-9">
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="cheerForTeam" value="team" v-model="cheerType">
                    <label class="form-check-label" for="cheerForTeam">Team Name</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" id="cheerForColors" value="colors" v-model="cheerType">
                  <label class="form-check-label" for="cheerForColors">Team Colors</label>
                </div>
                <small class="form-text text-muted">
                If your team is not listed, choose your team colors.
                </small>
              </div>
            </div>
          </fieldset>


          <div class="form-group row">
            <label for="teamName" class="col-form-label col-3">Team</label>
            <div class="col-9">
              <select v-model="teamName" class="form-control" id="teamName" v-bind:disabled="isCheerByColors">
                <option>Santa</option>
                <option>Rudolph</option>
                <option>Snowman</option>
                <option>Raindeer</option>
                <option>Grinch</option>
                <option>Snow</option>
                <option>Tree</option>
                <option>Halloween</option>
                <option>Rainbow</option>,
                <option>USA</option>

                <option>Chiefs</option>
                <option>Royals</option>
                <option>Sporting KC</option>
                <option>Mavericks</option>

                <option>Baylor</option>
                <option>Iowa</option>
                <option>Iowa State</option>
                <option>Kansas</option>
                <option>Kansas State</option>
                <option>MNU</option>
                <option>Missouri</option>
                <option>Nebraska</option>
                <option>Neptunes</option>
                <option>Oklahoma</option>
                <option>Oklahoma State</option>
                <option>Pittsburg State</option>
                <option>Rockhurst</option>
                <option>UMKC</option>
                <option>Texas Christian</option>
                <option>Texas</option>
                <option>Texas Tech</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label for="colors" class="col-form-label col-3">Color</label>
            <div class="col-9">
              <select v-model="selectedColorNames" multiple class="form-control" id="colors"
                style="height: 120px" v-bind:disabled="isCheerByTeam">
                <option v-for="colorName in colorNames">{{colorName}}</option>
              </select>
              <small class="form-text text-muted">
                Choose one or more colors.
              </small>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-12">
              <button class="btn btn-primary mx-auto"
                v-on:click="addCheer">Send Cheer</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  `
};

