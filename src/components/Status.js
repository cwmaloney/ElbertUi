"use strict";

const Status = {
  name: 'status',

  data: function () {
    return {
      info: "Loading..."
    };
  },

  mounted () {
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
      .get("http://localhost:8000/status")
      .then((response) => { this.info = response.data; } )
      .catch((error) => { this.info = error; });
  },

  template: `
    <div class="hl-page">
      <div class="hl-form">
        <form>

          <div class="form-group">
            <p>
            {{ info }}
            </p>
          </div>

        </form>
      </div>
    </div>
  `
};
