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
              Welcome to Holiday Lights on Farmstead Lane for Valentine's Day!
            </p>
            <p>
              Use the menu above to:
            </p>
            <ul>
              <li>Display a message on Gridzilla</li>
              <!-- <li>Cheer for your favorite team</li> -->
              <!-- <li>Play Snakes on Gridzilla</li> -->
              <li>Send the Holiday Lights team a suggestion</li>
              <li>Learn more about Holiday Lights</li>
            </ul>
          </div>

        </form>
      </div>
    </div>
  `
};
