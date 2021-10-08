import React from "react";
import "./App.css";
import Card from "./components/Card";
import ReviewButton from "./components/ReviewButton";
import PomodoroTimer from "./components/PomodoroTimer";
import Navigation from "./components/Navigation";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: true,
      reviewMode: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <div id="mainContent">
          <Card
            editable={this.state.editable}
            reviewMode={!this.state.reviewMode}
          />
        </div>

        <div>
          <ReviewButton
            changeReviewMode={() => this.handleOnClick()}
            reviewMode={!this.state.reviewMode}
          ></ReviewButton>
        </div>
        <PomodoroTimer durationInMinutes={10} />
      </React.Fragment>
    );
  }

  handleOnClick = (e) => {
    console.log(this.state.reviewMode);

    this.setState((prevState) => ({
      editable: !prevState.editable,
      reviewMode: !prevState.reviewMode,
    }));
  };
}

export default App;
