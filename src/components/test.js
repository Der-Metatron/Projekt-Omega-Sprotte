import React from "react";

class App extends Commponents {
  render() {
    const backgroundImageURL =
      "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg";
    const containerStyle = {
      backgroundImage: `url(${backgroundImageURL})`,
      width: "600px",
      height: "600px",
    };
    return (
      <div style={containerStyle}>
        <h1 style={{ color: "black" }}>Hi! Try edit me</h1>
      </div>
    );
  }
}
