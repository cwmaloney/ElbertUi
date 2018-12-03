"use strict";

const Snakes = {
  name: 'snakes',

  data: function () {
    return {
      sender: "",
      connected: false,
      gameId: null,
      snakeColor: null,
      mostRecentGameId: null,
      activeGameId: null,
      roundTripTime: null
    };
  },
  computed: {
    gamestatusMessage: function() {
      if (this.gameId) {
        if (this.activeGameId === this.gameId) {
          return `It is now your turn to play!  You are the ${this.snakeColor} snake.`;
        } else {
          let message = `You can play game ${this.gameId}. You will be the ${this.snakeColor} snake.`;
          if (this.mostRecentGameId) {
            message += ` The current game is ${this.mostRecentGameId}`;
          }
          return message;
        }
      }
      return "If you want to play, enter your name and click Play.";
    },
    latencyMessage: function() {
      if (this.roundTripTime) {
        return `Your round trip message time is ${this.roundTripTime}ms.`;
      } else
        return "";
    }
  },

  methods: {
    checkForm: function (e) {
      e.preventDefault();
    },

    setMessage: function(messageObject) {
      if (!messageObject.messageClass) {
        messageObject.messageClass = 'alert-info';
      }
      this.$store.dispatch("setMessage", messageObject);
    },

    addMessage: function(messageObject) {
      if (!messageObject.messageClass) {
        messageObject.messageClass = 'alert-info';
      }
      this.$store.dispatch("addMessage", messageObject);
    },

    register: function() {
      //this.setMessage({message:"Finding a game for you...", messageClass: 'alert-info'});
      socket.emit('snakes.register', { name: this.sender, snakeColor: this.snakeColor });
    },

    // send ping to check status of game and measure latancy
    sendPing() {
      socket.emit('snakes.ping');
      this.pingTimestamp = Date.now();
    },

    displayBoard(board) {
    },

    sendKeyPress(key) {
      socket.emit('snakes.keyPress', key);
    }

  // createRandomPlayerName() {
  //   return "Player " + Math.random().toString(5).substring(2);
  // },
  },

  mounted() {
    console.log("SnakeScene mounted");

    socket.on('snakes.pingResponse', function(data) {
      console.log(`SnakeScene pingResponse activeGameId=${data.activeGameId}`);
      if (this.activeGameId !== data.activeGameId) {
        this.activeGameId = data.activeGameId;
        if (data.activeGameId) {
          this.mostRecentGameId = data.activeGameId;
        }
      }
      if (this.pingTimestamp) {
        this.roundTripTime = Date.now() - this.pingTimestamp;
      }
      setTimeout(this.sendPing.bind(this), 2000);
    }.bind(this));

    socket.on('snakes.registered', function(data) {
      //this.setMessage({message:"Finding a game for you...", messageClass: 'alert-info'});
      console.log("SnakeScene registered", data);
      if (data.status !== "Okay") {
        this.$store.dispatch('setMessage', {
          message: data.message,
          messageClass: 'alert-danger fade show',
          // timeout: 2000,
          dismissible: true
        });
      } else {
        this.gameId = data.gameId;
        this.snakeColor = data.snakeColor;
        this.gameActive = false;
        setTimeout(this.sendPing.bind(this), 2000);
      }
    }.bind(this));

    socket.on('snakes.gameStarted', function(data) {
      console.log("SnakeScene gameStarted", data);
      this.activeGameId = data.activeGameId;
    }.bind(this));

    socket.on('snakes.gameEnded', function(data) {
      console.log("SnakeScene gameEnded", data);
      this.activeGameId = null;
      this.gameId = null;
    }.bind(this));

    socket.on('snakes.state', function(data) {
      console.log("SnakeScene state", data);
      this.displayBoard(data.board);
    }.bind(this));

    socket.on('snakes.message', function(messageObject) {
      console.log("SnakeScene message", messageObject);
      this.addMessage(data.messageObject);
    }.bind(this));
  },


  template: `
    <div class="hl-page">
      <!--
      <nav class="breadcrumb">
        <a class="breadcrumb-item" href="#/">{{"Home"}}</a>
        <a class="breadcrumb-item" href="#/message">{{"Snakes"}}</a>
      </nav>
      -->

      <div class="hl-form">
        <form @submit="checkForm">
          <div class="form-group">
            You can play snakes on Grizilla!
          </div>

          <div class="form-group">
            <label class="col-form-label col-form-label-sm pb-0" for="Name">Name:</label>
            <input v-model="sender" type="text" class="form-control" id="from" aria-describedby="Name">
          </div>

          <button class="btn btn-primary mx-auto"
            v-on:click="register">Play</button>

          <div class="form-group">
            {{gamestatusMessage}}
          </div>

          <div class="container">
            <div class="row justify-content-center">
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="sendKeyPress('Up')">Up</button>
              </div>
            </div>
            <div class="row justify-content-between">
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="sendKeyPress('Left')">Left</button>
              </div>
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="sendKeyPress('Right')">Right</button>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="sendKeyPress('Down')">Down</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <small>{{latencyMessage}}</small>
          </div>

        </form>
        </div>
    </div>
  `
};
