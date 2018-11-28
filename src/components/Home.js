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
        <span class="breadcrumb-item base-active">{{"Home"}}</span>
      </nav>
      -->
      <div class="hl-form">
        <form>

          <div class="form-group base-row">
            <p>
              Welcome to Holiday Lights on Farmstead Lane!
            </p>
            <p>
              Use the menu above to:
            </p>
            <ul>
              <li>Display a message on Grizilla</li>
              <li>Cheer for your favorite team</li>
              <li>Send the Holiday Lights team a suggestion</li>
              <li>Learn more about Holiday Lights</li>
            </ul>
            <p>
              More features will be coming soon include suverys and games.
            </p>
          </div>

        </form>
      </div>
    </div>
  `
};
