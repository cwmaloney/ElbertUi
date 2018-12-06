"use strict";

const Snakes = {
  name: 'snakes',

  props: {
    gridHeight: { type: Number, default: 36 },
    gridWidth: { type: Number, default: 168 },
    scaleFactor: { type: Number, default: 4 },
  },

  data: function () {
    return {
      name: "",
      gameId: null,
      colorName: null,
      dead: false,
      mostRecentGameId: null,
      activeGameId: null,
      roundTripTime: null,
      gameReport: ""
    };
  },
  computed: {
    gameStatusMessage: function() {
      let message
      if (this.gameId) {
        if (this.activeGameId === this.gameId) {
          if (this.dead) {
            message = "Your snake is dead."
          } else {
            message = `It is your turn to play!  You are the ${this.colorName} snake.`;
          }
        } else if (this.mostRecentGameId >= this.gameId) {
          message = `Your game is over. Click Play if you want to play again.`;
        } else {
          if (this.gameId === this.mostRecentGameId + 1) {
            message = `Your game is next!`
          } else {
            message = `You can play game ${this.gameId}.`;
            if (this.activeGameId) {
              message += ` (The current game is ${this.activeGameId}.)`;
            } else {
              if (this.mostRecentGameId) {
                message += ` (The next game is ${this.mostRecentGameId+1}.)`;
              }
            }
          }
          message += ` You will be the ${this.colorName} snake.`;
        }
      } else {
        message = "If you want to play, enter your name and click Play.";
      }
      return message;
    },
    latencyMessage: function() {
      if (this.roundTripTime) {
        return `Your round trip message time is ${this.roundTripTime}ms.`;
      } else
        return "";
    },
    gameReportMessage: function() {
      let message = null;
      if (this.gameReport && this.gameReport.players) {
        message = `Scores for Game ${this.gameReport.gameId}:`;
        let addComma = false;
        for (let player of this.gameReport.players) {
          if (addComma) message += ",";
          message += ` ${player.name}: ${player.points}`;
          addComma = true;
        }
      }
      return message;
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
      socket.emit('snakes.register', { name: this.name });
    },

    // send ping to check status of game and measure latancy
    sendPing() {
      socket.emit('snakes.ping');
      this.pingTimestamp = Date.now();
    },

    // displayGrid(data) {
    //   let canvas = document.getElementById('canvas')
    //   let context = canvas.getContext('2d');
    //   context.clearRect(0,0,canvas.width,canvas.height);
    //   context.fillStyle = "black"; // "rgba(255, 0, 0, .5)";
    //   context.fillRect(0, 0, (this.gridWidth)*this.scaleFactor, (this.gridHeight)*this.scaleFactor);

    //   if (data.snakes) {
    //     for (let snakeIndex = 0; snakeIndex < data.snakes.length; snakeIndex++) {
    //       let snake = data.snakes[snakeIndex];
    //       let colorName = snake.colorName;
    //       context.fillStyle = colorName;

    //       context.fillRect(snake.x*this.scaleFactor, snake.y*this.scaleFactor, this.scaleFactor, this.scaleFactor);
    //       if (snake.tail) {
    //         for (let tailIndex = 0; tailIndex < snake.tail.length; tailIndex++) {
    //           let tailPart = snake.tail[tailIndex];
    //           context.fillRect(tailPart.x*this.scaleFactor, tailPart.y*this.scaleFactor, this.scaleFactor, this.scaleFactor);
    //         }
    //       }
    //     }
    //   }
    //   if (data.snacks) {
    //     for (let snackIndex = 0; snackIndex < data.snacks.length; snackIndex++) {
    //       let snack = data.snacks[snackIndex];
    //       context.fillStyle = "white";
    //       context.fillRect(snack.x*this.scaleFactor, snack.y*this.scaleFactor, this.scaleFactor, this.scaleFactor);
    //     }
    //   }
    // },

    sendDirection(direction) {
      socket.emit('snakes.changeDirection', direction);
    }

  // createRandomPlayerName() {
  //   return "Player " + Math.random().toString(5).substring(2);
  // },
  },

  mounted() {
    console.log("SnakeScene mounted");
    // this.displayGrid({});

    socket.on('snakes.pingResponse', function(data) {
      console.log(`SnakeScene pingResponse activeGameId=${data.activeGameId} @${new Date()}`);
      if (data.activeGameId) {
        if (this.activeGameId !== data.activeGameId) {
          this.activeGameId = data.activeGameId;
        }
        if (this.mostRecentGameId !== data.activeGameId) {
           this.mostRecentGameId = data.activeGameId;
        }
      }
      if (this.pingTimestamp) {
        this.roundTripTime = Date.now() - this.pingTimestamp;
      }
      this.pingTimer = setTimeout(this.sendPing.bind(this), 4000);
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
        this.$store.dispatch('deleteAllMessages');
        this.gameId = data.gameId;
        this.colorName = data.colorName;
        this.gameActive = false;
        if (!this.pingTimer) {
          this.pingTimer = setTimeout(this.sendPing.bind(this), 2000);
        }
      }
    }.bind(this));

    socket.on('snakes.gameStarted', function(data) {
      console.log("SnakeScene gameStarted", data);
      this.activeGameId = data.id;
      this.mostRecentGameId = data.id;
    }.bind(this));

    socket.on('snakes.gameEnded', function(data) {
      console.log("SnakeScene gameEnded", data);
      this.activeGameId = null;
      this.mostRecentGameId = data.id;
    }.bind(this));

    socket.on('snakes.gameReport', function(data) {
      console.log("SnakeScene gameReport", data);
      this.gameReport = data;
    }.bind(this));

    socket.on('snakes.state', function(data) {
      // ("SnakeScene state", data);
      // this.displayGrid(data);
    }.bind(this));

    socket.on('snakes.message', function(messageObject) {
      console.log("SnakeScene message", messageObject);
      this.addMessage(messageObject);
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

      <div class="hl-form w-100">
        <form @submit="checkForm">
          <div class="form-group">
            You can play snakes on Grizilla!
          </div>

          <div class="form-group">
            <label class="col-form-label col-form-label-sm pb-0" for="Name">Name:</label>
            <input v-model="name" type="text" class="form-control" id="from" aria-describedby="Name">
            <button class="btn btn-primary mt-1 mx-auto"
              v-on:click="register">Play</button>
          </div>

          <div class="form-group" style="height: 56px; display: block">
            <p >{{gameStatusMessage}}</p>
          </div>

          <div class="form-group w-100 m-0 p-0">
            <div class="container w-100 m-0 p-0">
              <div class="row justify-content-center w-100 m-0 p-0">
                <div class="col-12 w-100 m-0 p-0">
                  <button class="btn btn-primary mx-auto w-100 my-2 mx-1 p-2"
                    style="height: 64px; display: block"
                    v-on:click="sendDirection('Up')">Up</button>
                </div>
              </div>
              <div class="row justify-content-between w-100 m-0 p-0">
                <div class="col-5 w-100 m-0 p-0">
                  <button class="btn btn-primary mx-auto w-100 my-2 mx-1 p-2"
                    style="height: 64px; display: block"
                    v-on:click="sendDirection('Left')">Left</button>
                </div>
                <div class="col-5 w-100 m-0 p-0">
                  <button class="btn btn-primary mx-auto w-100 my-2 mx-1 p-2"
                  style="height: 64px; display: block"
                  v-on:click="sendDirection('Right')">Right</button>
                </div>
              </div>
              <div class="row justify-content-center w-100 m-0 p-0">
                <div class="col-12 w-100 m-0 p-0">
                  <button class="btn btn-primary mx-auto w-100 my-2 mx-1 p-2"
                  style="height: 64px; display: block"
                  v-on:click="sendDirection('Down')">Down</button>
                </div>
              </div>
            </div>
          </div>

          <!--
          <div class="form-group">
            <canvas id="canvas" :width="gridWidth*scaleFactor" :height="gridHeight*scaleFactor"
              style="box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.4);"></canvas>
          </div>
          -->

          <div class="form-group">
            <p>{{gameReportMessage}}</p>
          </div>

          <div class="form-group">
            <small>{{latencyMessage}}</small>
          </div>

        </form>
        </div>
    </div>
  `
};
