"use strict";

const Message = {
  name: 'message',

  data: function () {
    return {};
  },

  template: `
    <div class="hl-form">
      <!--
      <nav class="base-breadcrumb">
        <a class="base-breadcrumb-item" href="#/">{{"Home"}}</a>
        <a class="base-breadcrumb-item" href="#/message">{{"Create Message"}}</a>
      </nav>
      -->

      <div class="hl-page-block">
        <form>

          <div class="form-group base-row">
            <p class="col-sm-12">
              Let's create a message!
            </p>
          </div>

        </form>
      </div>
    </div>
  `
};
