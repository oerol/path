import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import Card from "./components/Card";
import ReviewButton from "./components/ReviewButton";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: "true",
      reviewMode: "false",
    };
  }

  render() {
    return (
      <React.Fragment>
        <div id="mainContent">
          <Card
            editable={this.state.editable}
            reviewMode={this.state.reviewMode}
          />
        </div>

        <div onClick={this.handleOnClick}>
          <ReviewButton></ReviewButton>
        </div>
      </React.Fragment>
    );
  }

  handleOnClick = () => {
    this.setState((prevState) => ({
      editable: !prevState.editable,
      reviewMode: !prevState.reviewMode,
    }));

    if (this.state.reviewMode) {
      document.getElementById("reviewButton").innerText = "Beenden";
      this.createCardPointer();
    } else {
      document.getElementById("reviewButton").innerText = "Review";

      if (document.getElementById("cardPointer")) {
        document.getElementById("cardPointer").remove();
      }
      let cards = document.getElementById("mainContent").children;

      for (let card of cards) {
        card.style.backgroundColor = "";
      }
    }

    document.getElementsByTagName("body")[0].classList.toggle("reviewMode");
    document
      .getElementById("mainContent")
      .children[0].classList.add("cardPointer2");
  };

  createCardPointer = () => {
    let pointerElement = document.createElement("div");
    let holder = document.getElementById("mainContent").firstChild;
    pointerElement.classList.add("cardPointer");
    pointerElement.setAttribute("id", "cardPointer");
    holder.insertBefore(pointerElement, holder.firstChild);
    pointerElement.style.animation = "fade-in 2s";
  };
}

export default App;
