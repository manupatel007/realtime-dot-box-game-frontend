import "./styles.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialBoard(5);
  }

  ws = new WebSocket(
    "wss://fastapi-websockets.vishwas007.repl.co/ws/" + Date.now()
  );

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connectedd");
    };

    this.ws.onmessage = (evt) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data);
      // this.setState({ dataFromServer: message });
      console.log(message);
      if (message.type === "chaal") {
        this.fillLine2(message.coordinates);
      } else {
        this.newChange(message.word);
      }
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
    };
  }

  handleChaal = (event) => {
    var currentCoord = event.target.dataset.coord;
    console.log(currentCoord);
    this.ws.send(
      JSON.stringify({
        type: "chaal",
        coordinates: currentCoord
      })
    );
  };

  initialBoard = (size) => {
    let state = {
      boardSize: size,
      numRed: 0,
      numBlue: 0,
      turn: "red",
      winMessage: "",
      lineCoordinates: {},
      boxColors: {}
    };
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < state.boardSize + 1; j++) {
        for (let k = 0; k < state.boardSize; k++) {
          state.lineCoordinates[i + "," + j + "," + k] = 0;
        }
      }
    }
    for (let i = 0; i < state.boardSize; i++) {
      for (let j = 0; j < state.boardSize; j++) {
        state.boxColors[i + "," + j] = "rgb(255,255,255)";
      }
    }
    return state;
  };

  fillLine = (event) => {
    var currentCoord = event.target.dataset.coord;
    if (this.state.lineCoordinates[currentCoord] === 0) {
      //event.target.style.backgroundColor =  this.state.turn
      let newState = this.state.lineCoordinates;
      newState[currentCoord] = this.state.turn === "red" ? 1 : -1;
      this.setState((prevState) => ({
        lineCoordinates: newState
      }));

      var splitCoord = currentCoord.split(",");
      var i = splitCoord[0];
      var j = splitCoord[1];
      var k = splitCoord[2];

      let newBoxColors = this.state.boxColors;

      var madeSquare = 0;

      if (i === "0") {
        if (this.checkSquare(j, k) === 4) {
          madeSquare = 1;
          newBoxColors[j + "," + k] =
            this.state.turn === "red"
              ? "rgba(255,0,0,0.5)"
              : "rgba(0,0,255,0.5)";
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
        if (this.checkSquare(parseFloat(j) - 1, k) === 4) {
          madeSquare = 1;
          newBoxColors[parseFloat(j) - 1 + "," + k] =
            this.state.turn === "red"
              ? "rgba(255,0,0,0.5)"
              : "rgba(0,0,255,0.5)";
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
      } else {
        if (this.checkSquare(k, j) === 4) {
          madeSquare = 1;
          newBoxColors[k + "," + j] =
            this.state.turn === "red"
              ? "rgba(255,0,0,0.5)"
              : "rgba(0,0,255,0.5)";
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
        if (this.checkSquare(k, parseFloat(j) - 1) === 4) {
          madeSquare = 1;
          newBoxColors[k + "," + (parseFloat(j) - 1)] =
            this.state.turn === "red"
              ? "rgba(255,0,0,0.5)"
              : "rgba(0,0,255,0.5)";
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
      }
      if (madeSquare === 0) {
        this.setState((prevState) => ({
          turn: prevState.turn === "red" ? "blue" : "red"
        }));
      } else {
        this.checkGameOver();
      }
    }
  };

  fillLine2 = (event) => {
    var currentCoord = event;
    if (this.state.lineCoordinates[currentCoord] === 0) {
      //event.target.style.backgroundColor =  this.state.turn
      let newState = this.state.lineCoordinates;
      newState[currentCoord] = this.state.turn === "red" ? 1 : -1;
      this.setState((prevState) => ({
        lineCoordinates: newState
      }));

      var splitCoord = currentCoord.split(",");
      var i = splitCoord[0];
      var j = splitCoord[1];
      var k = splitCoord[2];

      let newBoxColors = this.state.boxColors;

      var madeSquare = 0;

      if (i === "0") {
        if (this.checkSquare(j, k) === 4) {
          madeSquare = 1;
          newBoxColors[j + "," + k] =
            this.state.turn === "red"
              ? "rgba(255,0,0,0.5)"
              : "rgba(0,0,255,0.5)";
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
        if (this.checkSquare(parseFloat(j) - 1, k) === 4) {
          madeSquare = 1;
          newBoxColors[parseFloat(j) - 1 + "," + k] =
            this.state.turn === "red"
              ? "rgba(255,0,0,0.5)"
              : "rgba(0,0,255,0.5)";
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
      } else {
        if (this.checkSquare(k, j) === 4) {
          madeSquare = 1;
          newBoxColors[k + "," + j] =
            this.state.turn === "red"
              ? "rgba(255,0,0,0.5)"
              : "rgba(0,0,255,0.5)";
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
        if (this.checkSquare(k, parseFloat(j) - 1) === 4) {
          madeSquare = 1;
          newBoxColors[k + "," + (parseFloat(j) - 1)] =
            this.state.turn === "red"
              ? "rgba(255,0,0,0.5)"
              : "rgba(0,0,255,0.5)";
          this.setState((prevState) => ({
            numRed:
              prevState.turn === "red"
                ? prevState.numRed + 1
                : prevState.numRed,
            numBlue:
              prevState.turn === "blue"
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
      }
      if (madeSquare === 0) {
        this.setState((prevState) => ({
          turn: prevState.turn === "red" ? "blue" : "red"
        }));
      } else {
        this.checkGameOver();
      }
    }
  };

  checkSquare = (j, k) => {
    var checker1 = Math.abs(this.state.lineCoordinates["0," + j + "," + k]);
    var checker2 = Math.abs(
      parseFloat(j) + 1 > this.state.boardSize
        ? 0
        : this.state.lineCoordinates["0," + (parseFloat(j) + 1) + "," + k]
    );
    var checker3 = Math.abs(this.state.lineCoordinates["1," + k + "," + j]);
    var checker4 = Math.abs(
      parseFloat(k) + 1 > this.state.boardSize
        ? 0
        : this.state.lineCoordinates["1," + (parseFloat(k) + 1) + "," + j]
    );
    return checker1 + checker2 + checker3 + checker4;
  };

  checkGameOver = () => {
    this.setState((prevState) => ({
      winMessage:
        prevState.numRed + prevState.numBlue == prevState.boardSize ** 2
          ? this.makeWinMessage(prevState)
          : ""
    }));
  };

  makeWinMessage = (state) => {
    var winMessage;
    if (state.numRed > state.numBlue) {
      winMessage = "Red wins! Select a board size to start a new game.";
    } else if (state.numRed < state.numBlue) {
      winMessage = "Blue wins! Select a board size to start a new game.";
    } else {
      winMessage = "Draw! Select a board size to start a new game.";
    }
    return winMessage;
  };

  changeBoardSize = (event) => {
    if (window.confirm("Are you sure you would like to start a new game?")) {
      console.log(event);
      var newState;
      if (event.target.id === "small") {
        newState = this.initialBoard(5);
      } else if (event.target.id === "medium") {
        newState = this.initialBoard(8);
      } else if (event.target.id === "large") {
        newState = this.initialBoard(11);
      }
      this.setState((prevState) => newState);
    }
  };

  selectColor = (int) => {
    if (int === 0) {
      return "rgb(255,255,255)";
    } else if (int === 1) {
      return "rgb(255,0,0)";
    } else if (int === -1) {
      return "rgb(0,0,255)";
    }
  };

  tint = (event) => {
    var currentCoord = event.target.dataset.coord;
    if (this.state.lineCoordinates[currentCoord] === 0) {
      if (this.state.turn === "red") {
        event.target.style.backgroundColor = "rgba(255,0,0,0.5)";
      } else {
        event.target.style.backgroundColor = "rgba(0,0,255,0.5)";
      }
    }
  };

  untint = (event) => {
    var currentCoord = event.target.dataset.coord;
    if (this.state.lineCoordinates[currentCoord] === 0) {
      event.target.style.backgroundColor = "rgb(255,255,255)";
    }
  };

  newChange = (event) => {
    var newState;
    if (event === "small") {
      newState = this.initialBoard(3);
    }
    this.setState((prevState) => newState);
  };

  makeBoard = (boardSize) => {
    var cols = [];
    for (let i = 0; i <= 2 * boardSize; i++) {
      var row = [];
      for (let j = 0; j <= 2 * boardSize; j++) {
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            row.push(
              React.createElement(
                "div",
                {
                  className: "dot",
                  id: "dot" + Math.floor(i / 2) + "," + Math.floor(j / 2)
                },
                ""
              )
            );
          } else {
            row.push(
              React.createElement(
                "div",
                {
                  className: "horizContainer",
                  "data-coord":
                    "0," + Math.floor(i / 2) + "," + Math.floor(j / 2),
                  onClick: this.handleChaal,
                  style: {
                    backgroundColor: this.selectColor(
                      this.state.lineCoordinates[
                        "0," + Math.floor(i / 2) + "," + Math.floor(j / 2)
                      ]
                    )
                  },
                  onMouseEnter: this.tint,
                  onMouseLeave: this.untint
                },
                ""
              )
            );
          }
        } else {
          if (j % 2 === 0) {
            row.push(
              React.createElement(
                "div",
                {
                  className: "vertContainer",
                  "data-coord":
                    "1," + Math.floor(j / 2) + "," + Math.floor(i / 2),
                  onClick: this.handleChaal,
                  style: {
                    backgroundColor: this.selectColor(
                      this.state.lineCoordinates[
                        "1," + Math.floor(j / 2) + "," + Math.floor(i / 2)
                      ]
                    )
                  },
                  onMouseEnter: this.tint,
                  onMouseLeave: this.untint
                },
                ""
              )
            );
          } else {
            row.push(
              React.createElement(
                "div",
                {
                  className: "box",
                  id: "box" + Math.floor(i / 2) + "," + Math.floor(j / 2),
                  style: {
                    backgroundColor: this.state.boxColors[
                      Math.floor(i / 2) + "," + Math.floor(j / 2)
                    ]
                  }
                },
                ""
              )
            );
          }
        }
      }
      cols.push(React.createElement("div", { className: "row" }, row));
    }

    return React.createElement("div", { id: "game-board" }, cols);
  };

  render() {
    return (
      <div id="game">
        <div id="header">
          <h1 id="welcome">Dots &amp; Boxes </h1>
          <p id="score">
            {" "}
            Red:{this.state.numRed} Blue:{this.state.numBlue}{" "}
          </p>
          Board size :
          <button
            id="small"
            onClick={(e) => {
              this.ws.send(
                JSON.stringify({
                  type: "size",
                  word: "small"
                })
              );
            }}
          >
            {" "}
            5x5{" "}
          </button>
          <button id="medium" onClick={this.changeBoardSize}>
            {" "}
            8x8{" "}
          </button>
          <button id="large" onClick={this.changeBoardSize}>
            {" "}
            11x11{" "}
          </button>
          <p id="winner"> {this.state.winMessage} </p>
        </div>
        <div id="board">{this.makeBoard(this.state.boardSize)}</div>
      </div>
    );
  }
}

// ReactDOM.render(<App/>,document.getElementById('root'))

export default App;
