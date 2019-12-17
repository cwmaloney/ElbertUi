"use strict";

const Home = {
  name: 'home',

  data: function () {
    return {};
  },

  template: `
    <div class="hl-page">
      <!--
      <nav class="breadcrumb">
        <span class="breadcrumb-item active">{{"Home"}}</span>
      </nav>
      -->
      <div class="hl-form">
        <form>

          <div class="form-group">
            <p>
              <!-- Welcome to Holiday Lights on Farmstead Lane for Valentine's Day! -->
              Thank you for joining our celebration!
            </p>
            <p>
              Use the menu above to:
            </p>
            <ul>
              <li>See the program (song list)</li>
              <li>Display a message on Gridzilla</li>
              <li>Cheer for your favorite team</li>
              <!-- <li>Play Snakes on Gridzilla</li> -->
              <li>Send a suggestion to the Holiday Lights team</li>
              <li>Learn more about Holiday Lights</li>
            </ul>
            <p>
              If there is a urgent problem with the show, please text: 913 735 6622.
            </p>
          </div>

        </form>
      </div>
    </div>
  `
};
