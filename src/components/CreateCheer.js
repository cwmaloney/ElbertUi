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
                      <option>USA<option>
                  </div>
                </div>

                <div class="tab-pane fade" id="colorsTabContent" role="tabpanel">
                  <div class="form-group">
                    <label for="colors">Choose one or more colors:</label>
                    <select multiple class="form-control" id="colors">
                      <option>white</option>
                      <option>snow</option>
                      <option>celadon</option>
                      <option>gray</option>
                      <option>silver</option>

                      <option>red</option>
                      <option>crimson</option>
                      <option>darkRed</option>
                      <option>scarlet</option>

                      <option>pink</option>
                      <option>darkPink</option>
                      <option>maroon</option>
                      <option>fuchsia</option>
                      <option>magenta</option>

                      <option>orange</option>
                      <option>orangeRed</option>

                      <option>yellow</option>

                      <option>cream</option>
                      <option>brown</option>
                      <option>darkBrown</option>
                      <option>gold</option>

                      <option>yellowGreen</option>
                      <option>chartreuse</option>

                      <option>green</option>
                      <option>darkGreen</option>
                      <option>grinchGreen</option>
                      <option>olive</option>
                      <option>turquoise</option>
                      <option>darkTurquoise</option>
                      <option>lime</option>
                      <option>teal</option>

                      <option>blueGreen</option>
                      <option>cyan</option>
                      <option>darkCyan</option>

                      <option>blue</option>
                      <option>lightBlue</option>
                      <option>cornFlowerBlue</option>
                      <option>darkBlue</option>
                      <option>royalBlue</option>
                      <option>navy</option>
                      <option>midnightBlue</option>
                      <option>sportingBlue</option>

                      <option>indigo</option>
                      <option>darkIndigo</option>

                      <option>blueViolet</option>

                      <option>purple</option>
                      <option>royalPurple</option>
                      <option>hornedFrogPurple</option>

                      <option>violet</option>
                      <option>darkViolet</option>

                      <option>black</option>
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

