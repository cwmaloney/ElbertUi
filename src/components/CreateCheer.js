"use strict";

const CreateCheer = {
  name: 'create-cheer',

  data: function () {
    return {};
  },

  template: newFunction()
};
function newFunction() {
  return `
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
                    <label for="teamName">Choose a team:</label>
                    <select class="form-control" id="teamName">
                      <option>Santa</option>
                      <option>Rudolph</option>
                      <option>Raindeer</option>
                      <option>Grinch</option>
                      <option>Snow</option>
                      <option>Halloween</option>
                      <option>Rainbow</option>,

                      <option>Chiefs</option>
                      <option>Royals</option>
                      <option>Sporting KC</option>

                      <option>Baylor</option>
                      <option>Iowa</option>
                      <option>Iowa State</option>
                      <option>Kansas</option>
                      <option>Kansas State</option>
                      <option>Mavericks</option>
                      <option>MNU</option>
                      <option>Missouri</option>
                      <option>Nebraska</option>
                      <option>Neptunes</option>
                      <option>Oklahoma</option>
                      <option>Oklahoma State</option>
                      <option>Pittsburg State</option>
                      <option>Rockhurst</option>
                      <option>Roos</option>
                      <option>Texas Christian</option>
                      <option>Texas</option>
                      <option>Texas Tech</option>
                      <option>USA</option>
                    </select>
                  </div>
                </div>

                <div class="tab-pane fade" id="colorsTabContent" role="tabpanel">
                  <div class="form-group">
                    <label for="colors">Choose one or more colors:</label>
                    <select multiple class="form-control" id="colors">
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
                      <option>brown</option>
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

                      <option>BlueGreen</option>
                      <option>Cyan</option>
                      <option>Dark Cyan</option>

                      <option>Blue</option>
                      <option>Light Blue</option>
                      <option>Corn Flower Blue</option>
                      <option>Dark Blue</option>
                      <option>Royal Blue</option>
                      <option>Navy</option>
                      <option>MidnightBlue</option>
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
                </div>
              </div>
            </form>

          </div>

          <button type="submit" class="btn btn-primary mx-auto">Send</button>
        </form>
      </div>
    </div>
  `;
}

