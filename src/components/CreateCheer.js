"use strict";

const CreateCheer = {
  name: 'create-cheer',

  data: function () {
    return {};
  },

  template: `
    <div class="hl-form">
      <nav class="base-breadcrumb">
        <a class="base-breadcrumb-item" href="#/">{{"Home"}}</a>
        <a class="base-breadcrumb-item" href="#/cheer">{{"Create Cheer"}}</a>
      </nav>

      <div class="hl-page-block">
        <form>

          <div class="form-group base-row">
            <p class="col-sm-12">
              Let's create a cheer!
            </p>
          </div>

        </form>
      </div>
    </div>
`
};
