"use strict";

const CreateCheer = {
  name: 'create-cheer',

  data: function () {
    return {};
  },

  template: `
    <div class="hl-page">
      <!--
      <nav class="base-breadcrumb">
        <a class="base-breadcrumb-item" href="#/">{{"Home"}}</a>
        <a class="base-breadcrumb-item" href="#/cheer">{{"Create Cheer"}}</a>
      </nav>
      -->

      <p>
        You can cheer for your favorite team using Gridzilla!
      </p>

      <div class="hl-form">
        <form>

          <div class="form-group">
            <label for="name">Your first name (optional):</label>
            <input type="text" class="form-control" id="name" aria-describedby="Your Name">
            <small class="form-text text-muted">
              You can display your name on Grizilla with you cheer.
            </small>
          </div>

          <div class="form-group">
            <small class="form-text text-muted">
              Choose a team name or team colors:
            </small>
            <ul class="nav nav-tabs" id="cheerTabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="name-tab" data-toggle="tab" href="#nameTabContent" role="tab">Team Name</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="colors-tab" data-toggle="tab" href="#colorsTabContent" role="tab">Team Colors</a>
              </li>
            </ul>

            <form class="hl-form">
              <div class="tab-content" id="cheerTabContent">

                <div class="tab-pane fade show active" id="nameTabContent" role="tabpanel">
                  <div class="form-group">
                    <label for="teamName">Choose a Team:</label>
                    <select class="form-control" id="teamName">
                      <option>Chiefs</option>
                      <option>Royals</option>
                      <option>Sporting KC</option>
                    </select>
                  </div>
                </div>

                <div class="tab-pane fade" id="colorsTabContent" role="tabpanel">
                  <div class="form-group">
                    <label for="colors">Choose one or more colors:</label>
                    <select multiple class="form-control" id="colors">
                      <option>Red</option>
                      <option>Blue</option>
                      <option>Green</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>

          </div>

          <button type="submit" class="btn btn-primary mx-auto">Send</button>
        </form>
      </div>
    </div>
  `
};
