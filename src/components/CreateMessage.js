"use strict";

const CreateMessage = {
  name: 'create-message',

  data: function () {
    return {};
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
        <form>
          <div class="form-group base-row">
             You can create a message to display on Gridzilla!
          </div>

          <div class="form-group">
            <label for="To">To:</label>
            <input type="text" class="form-control" id="to" aria-describedby="To">
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
            <select class="form-control" id="Message">
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
            <input type="text" class="form-control" id="from" aria-describedby="From">
          </div>

          <button type="submit" class="btn btn-primary mx-auto">Send</button>

          <p class="text-left mt-3">
          You can use common names and names like Mom, Dad, and Grandmother.
          You can enter multiple names separated by commas.
          </p>

        </form>
      </div>
    </div>
  `
};
