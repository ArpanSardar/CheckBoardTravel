import React, { Component } from "react";
import PlayArea from "./PlayArea";

class index extends Component {
  state = {
    boxCount: "",
    permittedMoveCount: "",
    moveCounter: 0,
    steps: [],
    startPlay: false,
    currentBox: 1,
    err: "",
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleMove);
  }

  handleInputChange = (e) => {
    if (e.currentTarget.value < 50) {
      this.setState({
        [e.currentTarget.id]: e.currentTarget.value,
      });
    } else {
      this.setState({
        err: "Value should be less than 50.",
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      err: "",
    });

    if (this.state.boxCount && this.state.permittedMoveCount) {
      this.setState({
        startPlay: true,
      });
    } else {
      this.setState({
        err: "Please provide all information.",
      });
    }
  };

  handleMove = (e) => {
    //Left arrow = 37
    //Up arrow = 38
    //Right arrow = 39
    //Down array = 40
    const keyCodeArray = [37, 38, 39, 40];
    const pressedKeyCode = e.keyCode;

    if (keyCodeArray.includes(pressedKeyCode)) {
      const totalBoxCount = this.state.boxCount * this.state.boxCount;
      var currentBox = this.state.currentBox;
      const currentRow = Math.ceil(currentBox / this.state.boxCount);
      // const availableMoves = this.state.permittedMoveCount;
      // console.log("CURRENT ROW:", currentRow);

      // console.log("permittedMoveCount:", this.state.permittedMoveCount);
      // console.log("Steps:", this.state.steps.length);

      if (this.state.steps.length >= parseInt(this.state.permittedMoveCount)) {
        this.setState({
          err: "You have completed all moves.",
        });
      } else {
        if (pressedKeyCode === 37) {
          currentBox = currentBox > 1 ? currentBox - 1 : totalBoxCount;
        }
        if (pressedKeyCode === 38) {
          currentBox =
            currentRow <= parseInt(this.state.boxCount) &&
            currentBox > parseInt(this.state.boxCount)
              ? currentBox - parseInt(this.state.boxCount)
              : totalBoxCount - parseInt(this.state.boxCount) + currentBox;
        }
        if (pressedKeyCode === 39) {
          currentBox =
            currentBox >= 1 && currentBox < totalBoxCount ? currentBox + 1 : 1;
        }
        if (pressedKeyCode === 40) {
          currentBox =
            currentRow < parseInt(this.state.boxCount)
              ? currentBox + parseInt(this.state.boxCount)
              : currentBox -
                parseInt(this.state.boxCount) *
                  (parseInt(this.state.boxCount) - 1);
        }

        // console.log("UPDATED BOX:", currentBox);
        this.setState({
          currentBox: currentBox,
          steps: [
            ...this.state.steps,
            {
              row: Math.ceil(currentBox / this.state.boxCount),
              col:
                currentBox % this.state.boxCount === 0
                  ? this.state.boxCount
                  : currentBox % this.state.boxCount,
            },
          ],
        });
      }
    }
  };

  resetPlay = (e) => {
    e.preventDefault();
    this.setState({
      boxCount: "",
      permittedMoveCount: "",
      moveCounter: 0,
      steps: [],
      startPlay: false,
      currentBox: 1,
      err: "",
    });
  };

  render() {
    const {
      boxCount,
      permittedMoveCount,
      startPlay,
      currentBox,
      err,
      steps,
    } = this.state;
    // console.log("STEPS:", steps);
    // console.log("MOVE:", permittedMoveCount);
    return (
      <div className="playContainer">
        <div className="inputArea">
          <form onSubmit={this.handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td className="label">Box count:</td>
                  <td>
                    <input
                      type="number"
                      id="boxCount"
                      value={boxCount}
                      onChange={this.handleInputChange}
                      // required={true}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Total moves: </td>
                  <td>
                    <input
                      type="number"
                      id="permittedMoveCount"
                      value={permittedMoveCount}
                      onChange={this.handleInputChange}
                      // required={true}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button className="btn" type="submit">
                      Create play area
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-disabled"
                      onClick={this.resetPlay}
                    >
                      Reset
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <span className="errText">{err}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          <div className="label stepDisplayArea">
            Movement Path:
            <br />
            <span>
              {steps.length === parseInt(permittedMoveCount) &&
                steps.map((position) => `[${position.row},${position.col}], `)}
            </span>
          </div>
        </div>
        <br />
        {startPlay && (
          <PlayArea
            boxCount={boxCount}
            currentBox={currentBox}
            handleMove={this.handleMove}
          />
        )}
      </div>
    );
  }
}

export default index;
