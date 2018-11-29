"use strict";

const CreateCheer = {
  name: 'create-cheer',

  data: function () {
    return {
      cheerType: "team",
      sender: null,
      teamName: "Chiefs",
      colorNames: []
    };
  },

  methods: {
    checkForm: function (e) {
    },

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
        <a class="base-breadcrumb-item" href="#/cheer">{{"Create Cheer"}}</a>
      </nav>
      -->

      <div class="hl-form">
        <p>
          Use Gridzilla to cheer for your team!
        </p>

        <form>

          <div class="form-group">
            <label for="name">Your first name (optional):</label>
            <input v-model="sender" type="text" class="form-control" id="name" aria-describedby="Your Name">
            <small class="form-text text-muted">
              We will display your name with your cheer.
            </small>
          </div>

          <div class="form-group">
            <label>Cheer by Team:</label>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="cheerBy" id="cheerForTeam" value="team" v-model="cheerType">
              <label class="form-check-label" for="cheerForTeam">Name</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="cheerBy" id="cheerForColors" value="colors" v-model="cheerType">
              <label class="form-check-label" for="cheerForColors">Colors</label>
            </div>
            <!--
            <small class="form-text text-muted">
              If your team is not listed, choose your colors.
            </small>
            -->
          </div>


          <div class="form-group">
            <label for="teamName" class="col-form-label col-form-label-sm">Choose a team:</label>
            <select v-model="teamName" class="form-control" id="teamName" :disabled="cheerType === 'colors'">
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
            <label for="colors" class="col-form-label col-form-label-sm">Choose one or more colors:</label>
            <select v-model="colorNames" multiple class="form-control" id="colors"
              style="height: 120px" :disabled="cheerType === 'team'">
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
              <option>Midnigh tBlue</option>
              <option>Sporting Blue</option>

              <option>Indigo</option>
              <option>Dark Indigo</option>

              <option>BlueViolet</option>

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

