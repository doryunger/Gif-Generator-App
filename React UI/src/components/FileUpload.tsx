import React, { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";

const supportedTypes=['video','Video']
//Declaring a 'single source of truth' object which manage the derived states between elements
//The objects stores the states in accordance of the 3 phases of the application:
//1. Pre progress 2. In progress 3. post progress
const stateStore={'Pre-Progress':{"message":"","btnStatus":true,"progress":0,"progressBar":"hidden","imageDisplay":"hidden","source":"","waitingStat":"hidden","currentFile":undefined,"selectedFiles":undefined},'In-Progress':{"btnStatus":true,"progressBar":"visible","source":"","waitingStat":"visible"},'Post-Progress':{"progressBar":"hidden","progress":100,"imageDisplay":"visible","waitingStat":"hidden","selectedFiles":undefined}};

//Defining hooks for varaibles
const UploadFiles = () => {
  const [progressState, setProgressState]=useState(stateStore["Pre-Progress"])
  const [btnStatus, setStatus] = useState(true);

  //Checks if the chosen file is valid
  const selectFile = (event) => {
    let file =event.target.files[0];
    let size=file.size/1024/1024;
    let type=file.type;
    type=type.substring(0,type.search("/"));
    console.log(type);
    if (size<6 && supportedTypes.includes(type)){
      stateStore["Pre-Progress"]["selectedFiles"]=event.target.files;
      setStatus(false);
      setProgressState(stateStore["Pre-Progress"]);
    }
    else{
      if (size>6){
        alert('File is too big')
        
      }
      if (!supportedTypes.includes(type)){
        alert('File type not supported')
        
      }
      setStatus(true);
    }

  };
  //A custom hook that triggered whenever an upload process should take place
  //The hook spawn a useCallback hook to prevent useless re-rendering of child components 
  const useUploadHook = useCallback(async () => {
    //If no file has been selected it doesn't allow the upload process to commence and returning the same state
    if (progressState["selectedFiles"]==undefined)return
        await upload(progressState["selectedFiles"][0]);
        stateStore["Pre-Progress"]["selectedFiles"]=undefined;
    }, [progressState["selectedFiles"]]) 
      
  //If the file is valid it gets uploaded to the server
  const upload = (file) => {
    let currentFile = file;
    setStatus(true);
    stateStore["Pre-Progress"]["currentFile"]=currentFile;
    setProgressState(stateStore["Pre-Progress"]);
    //A call for /upload API ot convert the video into a GIF file
    UploadService.upload(currentFile, (event) => {
      if (Math.round((50 * event.loaded) / event.total)>1){
        stateStore["In-Progress"]["progress"]=Math.round((50 * event.loaded) / event.total);
        setProgressState(stateStore["In-Progress"]);
      }
    })
    //If the process went successfully a response with a binary representation of the image returns
      .then((response) => {
        stateStore["Post-Progress"]["source"]=response.data;
        setProgressState(stateStore["Post-Progress"]);
        if(response.status==500){
          stateStore["Post-Progress"]["progress"]=0;
          stateStore["Post-Progress"]["message"]=response.data;
          setProgressState(stateStore["Post-Progress"]);
          alert(response.data);
        }
        setStatus(true);
      })
      //Catch block in case of an error
      .catch(() => {
        stateStore["Post-Progress"]["progress"]=0;
        stateStore["Post-Progress"]["message"]="Could not upload the file!";
        setProgressState(stateStore["Post-Progress"]);
        setTimeout(function(){
          stateStore["Pre-Progress"]["currentFile"]=undefined;
          setProgressState(stateStore["Pre-Progress"]);
          setStatus(true);
      },1500) 
      });
  };

  return (
    <div>
     
      <label className="btn btn-default">
        <input type="file" onChange={selectFile} />
      </label>

      <button
        className="btn btn-success"
        disabled={btnStatus}
        onClick={useUploadHook}
      >
        Upload
      </button>

      <div className="alert alert-light" role="alert">
        {progressState["message"]}
      </div>
      <img id="waiting" src="https://i.imgur.com/6377s3E.gif" style={{position: 'relative',visibility:`${progressState["waitingStat"]}`}}></img>
      {(
        <div className="progress" style={{visibility:` ${progressState["progressBar"]}`}}>
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progressState["progress"]}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progressState["progres"] + "%" }}
          >
            {progressState["progress"]}%
          </div>
        </div>
      )}
      <div className="card" >
        <div className="card-header" > GIF Output</div>
        <div className="gifDisplay">
        <img src={`data:image/gif;base64,${progressState["source"]}`}  style={{visibility:` ${imgDis}`}} ></img>
        </div>
        </div>
      </div>
  );
};

export default UploadFiles;
