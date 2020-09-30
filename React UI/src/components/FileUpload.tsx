import React, { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";

const supportedTypes=['video','Video']
//Defining hooks for varaibles
const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [srcy, setSrc] = useState("");
  const [fileInfos, setFileInfos] = useState([]);
  const [displayMode, setDisplay] = useState("hidden");
  const [btnStatus, setStatus] = useState(true);
  const [imgDis, setDis] = useState('hidden');
  const [waitingStat, setWaitstat] = useState('hidden');

  //Checks if the chosen file is valid
  const selectFile = (event) => {
    let file =event.target.files[0];
    let size=file.size/1024/1024;
    let type=file.type;
    type=type.substring(0,type.search("/"));
    console.log(type);
    if (size<6 && supportedTypes.includes(type)){
      setSelectedFiles(event.target.files);
      setStatus(false);
    }
    else{
      if (size>6){
        alert('File is too big')
        
      }
      if (!supportedTypes.includes(type)){
        alert('File type not supported')
        
      }
      setSelectedFiles(undefined);
      setStatus(true);
    }

  };
  //If the file is valid it gets uploaded to the server
  const upload = () => {
    let currentFile = selectedFiles[0];
    setStatus(true);
    setProgress(0);
    setMessage("");
    setCurrentFile(currentFile);
    setDisplay("visible");
    setWaitstat('visible');
    //A call for /upload API ot convert the video into a GIF file
    UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((50 * event.loaded) / event.total));
    })
    //If the process went successfully a response with a binary representation of the image returns
      .then((response) => {
        setDis('visible');
        setWaitstat('hidden');
        setProgress(100)
        setSrc(response.data);
        setTimeout(function(){
          setProgress(0);
          setDisplay("hidden");
      },1000) 
      })
      //Catch block in case of an error
      .catch(() => {
        setProgress(0);
         setDisplay("hidden");
         setWaitstat('hidden');
         setMessage("File could not be processed ");
         alert("File could not be processed");
      });
    setSelectedFiles(undefined);
  };

  return (
    <div>
     
      <label className="btn btn-default">
        <input type="file" onChange={selectFile} />
      </label>

      <button
        className="btn btn-success"
        disabled={btnStatus}
        onClick={upload}
      >
        Upload
      </button>

      <div className="alert alert-light" role="alert">
        {message}
      </div>
      <img id="waiting" src="https://i.imgur.com/6377s3E.gif" style={{position: 'relative',visibility:`${waitingStat}`}}></img>
      {currentFile && (
        <div className="progress" style={{visibility:` ${displayMode}`}}>
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}
      <div className="card" >
        <div className="card-header" > GIF Output</div>
        <div className="gifDisplay">
        <img src={`data:image/gif;base64,${srcy}`}  style={{visibility:` ${imgDis}`}} ></img>
        </div>
        </div>
      </div>
  );
};

export default UploadFiles;
