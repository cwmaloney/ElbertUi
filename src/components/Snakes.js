"use strict";

const Snakes = {
  name: 'snakes',

  props: {
    gridHeight: { type: Number, default: 36 },
    gridWidth: { type: Number, default: 168 },
    scaleFactor: { type: Number, default: 4 },
    dotSize: { type: Number, default: 15 },
    regionLimit: { type: Number, default: .333 }
  },

  data: function () {
    return {
      name: "",

      // game status
      gameId: null,
      colorName: null,
      dead: false,
      mostRecentGameId: null,
      activeGameId: null,

      gameReport: "",

      roundTripTime: null,

      // input tracking
      touchpadCanvas: null,
      touchpadContext: null,
      mouseX: null,
      mouseY: null,
      mouseDown: null,
      touchX: null,
      touchY: null,
      direction: null
    };
  },
  computed: {

    registered: function() {
      if (this.gameId && this.mostRecentGameId < this.gameId) {
        return true;
      }
      return false;
    },
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

    isGameActive: function() {
      if (this.gameId && this.activeGameId === this.gameId) {
        return true;
      }
      return false;
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
      if (!this.pingTimer && this.isGameActive()) {
        socket.emit('snakes.ping');
        this.pingTimestamp = Date.now();
      }
    },

    // displayGrid(data) {
    //   let canvas = document.getElementById('gridCanvas')
    //   let context = canvas.getContext('2d');
    //   context.clearRect(0, 0, canvas.width, canvas.height);
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
      if (this.isGameActive()) {
        console.log(`sendDirection ${direction}`);
        socket.emit('snakes.changeDirection', direction);
      }
    },

    // ---------- canvas, mouse events, touch events ----------
    clearCanvas() {
      this.touchpadContext.clearRect(0, 0, this.touchpadCanvas.width, this.touchpadCanvas.height);
      this.touchpadContext.fillStyle = "rgba(100, 100, 256, .1)";
      this.touchpadContext.fillRect(0, 0, this.touchpadCanvas.width, this.touchpadCanvas.height);

      const width = this.touchpadCanvas.width;
      const height = this.touchpadCanvas.height;
      const centerX = width/2;
      const centerY = height/2;
      const length = 10;
      const offset = 10;

      this.touchpadContext.fillStyle = "rgba(0, 0, 0, .5)";
      this.touchpadContext.lineWidth = 3;

      // up arrow
      this.touchpadContext.beginPath();
      this.touchpadContext.moveTo(centerX-length, offset+length);
      this.touchpadContext.lineTo(centerX, offset);
      this.touchpadContext.lineTo(centerX+length, offset+length);
      this.touchpadContext.stroke();

      // down arrow
      this.touchpadContext.beginPath();
      this.touchpadContext.moveTo(centerX-length, height-(offset+length));
      this.touchpadContext.lineTo(centerX, height-offset);
      this.touchpadContext.lineTo(centerX+length, height-(offset+length));
      this.touchpadContext.stroke();

      // left arrow
      this.touchpadContext.beginPath();
      this.touchpadContext.moveTo(offset+length, centerY-length);
      this.touchpadContext.lineTo(offset, centerY);
      this.touchpadContext.lineTo(offset+length, centerY+length);
      this.touchpadContext.stroke();

      // right arrow
      this.touchpadContext.beginPath();
      this.touchpadContext.moveTo(width-(offset+length), centerY-length);
      this.touchpadContext.lineTo(width-offset, centerY);
      this.touchpadContext.lineTo(width-(offset+length), centerY+length);
      this.touchpadContext.stroke();
    },
    drawDot(x, y, size = this.dotSize) {
      this.clearCanvas();
      this.touchpadContext.fillStyle = "rgba(128, 128, 255, .5)";
      this.touchpadContext.beginPath();
      this.touchpadContext.arc(x, y, size, 0, Math.PI*2, true);
      this.touchpadContext.closePath();
      this.touchpadContext.fill();
    },
    onMouseDown(e) {
      this.saveMousePosition(e);
      this.drawDot(this.mouseX, this.mouseY);
      this.setDirection("mouse", this.mouseX, this.mouseY, true);
      this.mouseDown = true;
    },
    onMouseUp() {
      this.mouseDown = false;
    },
    onMouseMove(e) {
      this.saveMousePosition(e);
      if (this.mouseDown == true) {
        this.drawDot(this.mouseX, this.mouseY);
        this.setDirection("mouse", this.mouseX, this.mouseY, false);
      }
    },
    saveMousePosition(e) {
      if (!e.offsetX) {
        console.log("*** saveMousePostion missing offsetX");
      } else {
        console.log(`saveMousePosition ${e.offsetX} ${e.offsetY}`)
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
      }
    },
    onTouchStart(e) {
      this.touching = true;
      this.saveTouchPosition(e);
      this.drawDot(this.touchX, this.touchY);
      this.setDirection("touch", this.touchX, this.touchY, true);
      e.preventDefault();
    },
    onTouchMove(e) {
      this.saveTouchPosition(e);
      this.drawDot(this.touchX, this.touchY);
      this.setDirection("touch", this.touchX, this.touchY, true);
      e.preventDefault();
    },
    onTouchStop(e) {
      this.touching = false;
      e.preventDefault();
    },
    saveTouchPosition(e) {
      if(e.touches) {
        // ignore multiple touches
        if (e.targetTouches.length == 1) {
          var touch = e.targetTouches[0];
          // console.log(`saveTouchPosition ${touch.pageX} ${touch.target.offsetLeft} ${touch.pageY} ${touch.target.offsetTop}`)
          this.touchX = touch.pageX - touch.target.offsetLeft;
          this.touchY = touch.pageY - touch.target.offsetTop;
        }
      }
    },
    setDirection(mode, x, y, force = true) {
      const yFactor = y/this.touchpadCanvas.height;
      const xFactor = x/this.touchpadCanvas.width;

      let newDirection;
      if (yFactor < this.regionLimit) {
        newDirection = "Up";
      } else if (yFactor > (1 - this.regionLimit)) {
        newDirection = "Down";
      } else if (xFactor < this.regionLimit) {
        newDirection = "Left";
      } else if (xFactor > (1 - this.regionLimit)) {
        newDirection = "Right";
      }

      // console.log(`setDirection ${mode} ${newDirection}`);
      if (newDirection && (newDirection != this.direction || force)) {
        this.sendDirection(newDirection);
        window.navigator.vibrate(500);
      }
      // this may clear the direction if user moves back to center
      this.direction = newDirection;
    },
    onTouchpadContainerResize() {
      //console.log(`resize: screen.width=${screen.width} screen.height=${screen.height}`);
      const touchpadContainer = document.getElementById('touchpadContainer');
      //console.log(`rearesizedy: tpc.width=${tpc.clientWidth} tpc.height=${tpc.clientHeight}`);
      const margin = screen.width - touchpadContainer.clientWidth;
      if (screen.width < screen.height) {
        const size = Math.min(screen.width, screen.height) - margin;
        this.touchpadCanvas.width = size;
        this.touchpadCanvas.height = size;
      } else {
        this.touchpadCanvas.width = screen.width - margin;
        this.touchpadCanvas.height = screen.height - margin;
      }
      //console.log(`resize: w=${this.touchpadCanvas.width} h={this.touchpadCanvas.height} margin=${margin}`);
      this.clearCanvas();
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
         this.pingTimer = setTimeout(this.sendPing.bind(this), 2000);
      }
    }.bind(this));

    socket.on('snakes.gameStarted', function(data) {
      console.log("SnakeScene gameStarted", data);
      this.activeGameId = data.id;
      this.mostRecentGameId = data.id;
      screen.orientation.lock("portrait-primary");
      var touchpadContainer = document.getElementById("touchpadContainer");
      touchpadContainer.scrollIntoView();
    }.bind(this));

    socket.on('snakes.gameEnded', function(data) {
      console.log("SnakeScene gameEnded", data);
      this.activeGameId = null;
      this.mostRecentGameId = data.id;
      screen.orientation.unlock();
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

    this.touchpadCanvas = document.getElementById('touchpad');
    if (!this.touchpadCanvas) {
      console.log("*** missing touchpad canvas");
    } else {
      if (this.touchpadCanvas.getContext) {
        this.touchpadContext = this.touchpadCanvas.getContext('2d');
      }
      if (!this.touchpadContext) {
        console.log("*** missing touchpad context");
      } else {
        this.$nextTick(function () {

          this.touchpadCanvas.addEventListener('mousedown', this.onMouseDown);
          this.touchpadCanvas.addEventListener('mousemove', this.onMouseMove);
          window.addEventListener('mouseup', this.onMouseUp, false);

          this.touchpadCanvas.addEventListener('touchstart', this.onTouchStart);
          this.touchpadCanvas.addEventListener('touchmove', this.onTouchMove);
          this.touchpadCanvas.addEventListener('touchstop', this.onTouchStop);

          //const touchpadContainer= document.getElementById('touchpadContainer');
          window.addEventListener('resize', this.onTouchpadContainerResize.bind(this));
          this.onTouchpadContainerResize();
        });
      }
    }
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
            You can play snakes on Gridzilla!
          </div>

          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Name:</span>
              </div>
              <input v-model="name" type="text" class="form-control" :disabled="registered" id="from" aria-describedby="Name">
              <div class="input-group-append">
                <button class="btn btn-primary" :disabled="registered" v-on:click="register">Play</button>
              </div>
            </div>
          </div>

          <div class="form-group" style="height: 56px; display: block">
            <p >{{gameStatusMessage}}</p>
          </div>

          <div class="form-group">
            <div id="touchpadContainer" class="hl-touchpadContainer">
                <canvas id="touchpad" class="hl-touchpad" width=200 height=200>
                </canvas>
            </div>
          </div>

          <!--
          <div class="form-group">
            <canvas id="gridCanvas" :width="gridWidth*scaleFactor" :height="gridHeight*scaleFactor"
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
