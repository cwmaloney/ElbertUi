"use strict";

const CreateSuggestion = {
  name: 'create-suggestion',

  data: function () {
    return {};
  },

  template: `
    <div class="hl-page">
      <!--
      <nav class="base-breadcrumb">
        <a class="base-breadcrumb-item" href="#/">{{"Home"}}</a>
        <a class="base-breadcrumb-item" href="#/message">{{"Send Suggestion"}}</a>
      </nav>
      -->

      <div class="hl-form">
        <form>
          <div class="form-group base-row">
             We would love to hear what you are thinking.
          </div>

          <div class="form-group">
            <label for="name">Your Name (optional):</label>
            <input type="text" class="form-control" id="name" aria-describedby="Your Name - optional">
          </div>

          <div class="form-group">
            <label for="message">Suggestion:</label>
            <textarea class="form-control" rows="5" id="suggestion" aria-describedby="Suggestion">
            </textarea>
          </div>

          <button type="submit" class="btn btn-primary mx-auto">Send</button>

        </form>
      </div>
    </div>
  `
};
