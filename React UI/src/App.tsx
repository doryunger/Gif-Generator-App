import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div className="container">
      <div className="headers">Gif Generator
      </div>
		<p id="intro">Welcome to the Gif Generator!
		<br></br>
		The app allows you to convert video files* to animated gif image.
		<br></br>
		The video file should weight below 6MB.
		<br></br>
		* Currently supports mp4, avi and mov formats
		</p>
      <FileUpload />
    </div>
  );
}

export default App;
