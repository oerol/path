import React from "react";

class ReviewButton extends React.Component {
  componentDidUpdate() {
    if (!this.props.reviewMode) {
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

      let finishIndicatorElement = document.getElementById("finishIndicator");
      if (finishIndicatorElement) {
        finishIndicatorElement.remove();
      }
    }

    document.getElementsByTagName("body")[0].classList.toggle("reviewMode");
    document
      .getElementById("mainContent")
      .children[0].classList.add("cardPointer2");

    document.activeElement.blur();
  }

  createCardPointer = () => {
    let pointerElement = document.createElement("div");
    let holder = document.getElementById("mainContent").firstChild;
    pointerElement.classList.add("cardPointer");
    pointerElement.setAttribute("id", "cardPointer");
    holder.insertBefore(pointerElement, holder.firstChild);
    pointerElement.style.animation = "fade-in 2s";
  };
  render() {
    return (
      <React.Fragment>
        <button
          id="reviewButton"
          onClick={() => this.props.changeReviewMode()}
          onKeyUp={(e) => e.preventDefault()}
        >
          Review
        </button>
      </React.Fragment>
    );
  }
}

export default ReviewButton;
