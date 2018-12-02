"use strict";

const CreateCheer = {
  name: 'create-cheer',

  data: function () {
    return {
      cheerType: "team",
      sender: "",
      teamName: "Chiefs",
      colorNames: []
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
        request.colorNames = this.colorNames;
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
      <!--
      <nav class="breadcrumb">
        <a class="breadcrumb-item" href="#/">{{"Home"}}</a>
        <a class="breadcrumb-item" href="#/cheer">{{"Create Cheer"}}</a>
      </nav>
      -->

      <div class="hl-form">
        <form @submit="checkForm">
          <div class="form-group">
            Use Gridzilla to cheer for your team!
          </div>

          <div class="form-group">
            <label class="col-form-label pb-0" for="name">Your first name (optional)</label>
            <input v-model="sender" type="text" class="form-control" id="name" aria-describedby="Your Name">
            <small class="form-text text-muted">
              We will display your name with your cheer.
            </small>
          </div>

          <fieldset class="form-group">
            <div class="row">
              <label class="col-form-label col-sm-2">Cheer By</label>
              <div class="col-sm-9">
                <div class="form-check">
                  <input class="form-check-input" type="radio" id="cheerForTeam" value="team" v-model="cheerType">
                  <label class="form-check-label" for="cheerForTeam">Team Name</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="cheerForColors" value="colors" v-model="cheerType">
                  <label class="form-check-label" for="cheerForColors">Colors</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <small class="form-text text-muted">
                  If your team is not listed, choose your colors.
                </small>
              </div>
            </div>
          </fieldset>

          <div class="form-group">
            <label for="teamName" class="col-form-label col-form-label-sm pb-0">Choose a team</label>
            <select v-model="teamName" class="form-control" id="teamName" v-bind:disabled="isCheerByColors">
              <option>Santa</option>
              <option>Rudolph</option>
              <option>Raindeer</option>
              <option>Grinch</option>
              <option>Snow</option>
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

          <div class="form-group">
            <label for="colors" class="col-form-label col-form-label-sm pb-0">Choose one or more colors</label>
            <select v-model="colorNames" multiple class="form-control" id="colors"
              style="height: 120px" v-bind:disabled="isCheerByTeam">
              <option>White</option>
              <option>Snow</option>
              <option>Celadon</option>
              <option>Gray</option>
              <option>Silver</option>

              <option>Red</option>
              <option>Crimson</option>
              <option>Dark Red</option>
              <option>Scarlet</option>

              <option>Pink</option>
              <option>Dark Pink</option>
              <option>Maroon</option>
              <option>Fuchsia</option>
              <option>Magenta</option>

              <option>Orange</option>
              <option>Orange Red</option>

              <option>Yellow</option>

              <option>Cream</option>
              <option>Brown</option>
              <option>Dark Brown</option>
              <option>Gold</option>

              <option>Yellow Green</option>
              <option>Chartreuse</option>

              <option>Green</option>
              <option>Dark Green</option>
              <option>Grinch Green</option>
              <option>Olive</option>
              <option>Turquoise</option>
              <option>Dark Turquoise</option>
              <option>Lime</option>
              <option>Teal</option>

              <option>Blue Green</option>
              <option>Cyan</option>
              <option>Dark Cyan</option>

              <option>Blue</option>
              <option>Light Blue</option>
              <option>Corn Flower Blue</option>
              <option>Dark Blue</option>
              <option>Royal Blue</option>
              <option>Navy</option>
              <option>Midnight Blue</option>
              <option>Sporting Blue</option>

              <option>Indigo</option>
              <option>Dark Indigo</option>

              <option>Blue Violet</option>

              <option>Purple</option>
              <option>Royal Purple</option>
              <option>Horned Frog Purple</option>

              <option>Violet</option>
              <option>Dark Violet</option>

              <option>Black</option>
            </select>
          </div>

          <button class="btn btn-primary mx-auto"
            v-on:click="addCheer">Send Cheer</button>

        </form>
      </div>
    </div>
  `
};

