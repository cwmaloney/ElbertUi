"use strict";

const Snakes = {
  name: 'snakes',

  data: function () {
    return {
      sender: "",
      registered: false,
      gameId: null,
      snakeColor: null,
      gameActive: false
    };
  },

  methods: {
    checkForm: function (e) {
      e.preventDefault();
    },

    setMessage: function(messageObject) {
      this.$store.dispatch("setMessage", messageObject);
    },

    addMessage: function(messageObject) {
      this.$store.dispatch("addMessage", messageObject);
    },

    initializeSocket() {

      // set up the connection to the game server
      if (this.socket) {
        return;
      }

      this.setMessage("Connectiong...");
      this.socket = io(gridzillaBaseUrl, { reconnectionAttempts: 3 });

      this.socket.on('connect', function() {
        this.setMessage( {message: 'Connected to Gridzilla.'} );
        console.log(`socket id= ${this.socket.id}`);
      }.bind(this));

      this.socket.on('disconnect', function() {
        this.setMessage( {message: 'Disconnect from Gridzilla!', messageClass: 'alert-danger fade show'} );
      }.bind(this));

      this.socket.on('message', function (messageObject) {
        this.setMessage( messageObject );
      });

      this.socket.on('reconnect_failed', function() {
        this.setMessage( {message: 'Reconnection to Gridzilla failed!', messageClass: 'alert-danger fade show'} );
      }.bind(this));

      this.socket.on('ping', function(data) {
        const roundTripTime = Date.now() - this.pingTimestamp;

        this.addMessage( { message: `The current game is ${data.activeGameId}.`, timeout: 1500 } );
        this.addMessage( { message: `(ping round trip time is ${roundTripTime}.)`, timeout: 1500 } );

        setTimeout(this.sendPing.bind(this), 2000);
      }.bind(this));

      this.socket.on('gameStarted', function(data) {
        this.addMessage( {message: `Your game has started. You are the ${this.snakeColor} snake.`, timeout: 10000} );
        this.gameActive = true;
      }.bind(this));

      this.socket.on('gameEnded', function(gameResults) {
        this.setMessage(`Your game has ended.`);
        this.gameActive = true;
        this.gameId = null;
      }.bind(this));

      this.socket.on('state', function(data) {
        this.displayBoard(data.board);
      }.bind(this));

      this.socket.on('message', function(data) {
        this.addMessage(data.messageObject);
      }.bind(this));
    },

    register: function() {
      this.setMessage({message:"Registering...", messageClass: 'alert-info'});
      this.socket.emit('register', { name: this.sender, snakeColor: this.snakeColor });
    },

    // send ping to check status of game and measure latancy
    sendPing() {
      this.socket.emit('ping', this.gameId);
      this.pingTimestamp = Date.now();
    },

    displayBoard(board) {
    }

  // createRandomPlayerName() {
  //   return "Player " + Math.random().toString(5).substring(2);
  // },
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
            v-on:click="register">Register</button>

          <div class="container">
            <div class="row justify-content-center">
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="send('Up')">Up</button>
              </div>
            </div>
            <div class="row justify-content-between">
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="send('Left')">Left</button>
              </div>
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="send('Right')">Right</button>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-4">
                <button class="btn btn-primary mx-auto" v-on:click="send('Down')">Down</button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  `
};
