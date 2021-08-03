import React from "react";
import "./Sortvisualizer.css";
import { getMergeSortAnimations } from "../SortingAlogrithms/sortAlgorithms";
import { getSelectionAnimations } from "../SortingAlogrithms/sortAlgorithms";
import { getInsertionAnimations } from "../SortingAlogrithms/sortAlgorithms";

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

export default class SortVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: [] };
  }

  componentDidMount() {
    this.reset();
  }

  reset() {
    const array = [];
    let array_size = document.getElementsByClassName("sizeBar")[0].value;
    for (let i = 0; i < array_size; i++) {
      array.push(randomVals(10, 500));
    }
    this.setState({ array });
  }

  mergeSort() {
    let ANIMATION_SPEED_MS =
      document.getElementsByClassName("speedBar")[0].value;
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  selectionSort() {
    let ANIMATION_SPEED_MS =
      document.getElementsByClassName("speedBar")[0].value;
    const [animations, sortArray] = getSelectionAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparison1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  insertionSort() {
    let ANIMATION_SPEED_MS =
      document.getElementsByClassName("speedBar")[0].value;
    const [animations, sortArray] = getInsertionAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparison1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div>
        <div className="dashboard">
          <div className="selectAlg">
            <h3>Sorting </h3>
            <div className="pavement"></div>
            <button className="subButton" onClick={() => this.reset()}>
              Generate Array
            </button>
            <div className="pavement"></div>
            <div className="size">
              <label for="size">Size</label>
              <input
                className="sizeBar"
                type="range"
                min="2"
                max="125"
                name="size"
                step="1"
                onChange={() => this.reset()}
              />
            </div>

            <div className="speed">
              <label for="speed">
                (Faster)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Slower)
              </label>
              <input
                className="speedBar"
                type="range"
                min="1"
                max="100"
                name="speed"
                step="1"
              />
            </div>

            <div className="pavement"></div>
            <div className="buttonNav">
              <button onClick={() => this.selectionSort()}>
                Selection sort
              </button>
              <button onClick={() => this.insertionSort()}>
                Insertion sort
              </button>
              <button onClick={() => this.mergeSort()}>Merge sort</button>
            </div>
          </div>
        </div>

        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomVals(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
