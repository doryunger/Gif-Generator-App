import React, { useState,useCallback } from "react";
import UploadService from "../services/FileUploadService";
import { connect, useSelector, useDispatch } from 'react-redux'
import {updateValues,selectedStatusObject} from '../createStateSlice'

const supportedTypes=['video','Video']
//Declaring a 'single source of truth' object which manage the derived states between elements
//The objects stores the states in accordance of the 3 phases of the application:
//1. Pre progress 2. In progress 3. post progress

//Defining hooks for varaibles
const UploadFiles = (props) => {
  //Declaring a selector object for pulling out data from the state store of Redux
  const progressStore = useSelector((state) => state.appProgress.value)
  const dispatch = useDispatch()
  
  const [btnStatus, setStatus] = useState(true);

  //Checks if the chosen file is valid
  const selectFile = (event) => {
    let file =event.target.files[0];
    let size=file.size/1024/1024;
    let type=file.type;
    type=type.substring(0,type.search("/"));
    if (size<6 && supportedTypes.includes(type)){
      setStatus(false);
      dispatch(updateValues({"Pre-Progress":{"selectedFiles":event.target.files}}));
      dispatch(selectedStatusObject("Pre-Progress"))
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
    if (progressStore["currentStore"]["selectedFiles"]==undefined)return
        await upload(progressStore["currentStore"]["selectedFiles"][0]);
        dispatch(updateValues({"Pre-Progress":{"selectedFiles":undefined}}));
    }, [progressStore["currentStore"]["selectedFiles"]]) 
      
  //If the file is valid it gets uploaded to the server
  const upload = (file) => {
    let currentFile = file;
    setStatus(true);
    dispatch(updateValues({"Pre-Progress":{"currentFile":currentFile}}));
    dispatch(selectedStatusObject("Pre-Progress"));
    //A call for /upload API ot convert the video into a GIF file
    UploadService.upload(currentFile, (event) => {
      if (Math.round((50 * event.loaded) / event.total)>1){
        dispatch(updateValues({"In-Progress":{"progress":Math.round((50 * event.loaded) / event.total)}}));
        dispatch(selectedStatusObject("In-Progress"));
      }
    })
    //If the process went successfully a response with a binary representation of the image returns
      .then((response) => {
        dispatch(updateValues({"Post-Progress":{"source":response.data}}));
        dispatch(selectedStatusObject("Post-Progress"));
        if(response.status==500){
          dispatch(updateValues({"Post-Progress":{"progress":0,"message":response.data}}));
          dispatch(selectedStatusObject("Post-Progress"));
          alert(response.data);
        }
        setStatus(true);
      })
      //Catch block in case of an error
      .catch(() => {
        dispatch(updateValues({"Post-Progress":{"progress":0,"message":"Could not upload the file!"}}));
        dispatch(selectedStatusObject("Post-Progress"));
        setStatus(true);
        setTimeout(function(){
          dispatch(updateValues({"Pre-Progress":{"currentFile":undefined}}));
          dispatch(selectedStatusObject("Pre-Progress"));
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
        {props.messge}
      </div>
      <img id="waiting" src="https://i.imgur.com/iH6Z31k.gif" style={{position: 'relative', left:'40%',visibility:`${props.waitingStat}`,width:'150px',height:'100px'}}></img>
      {(
        <div className="progress" style={{visibility:`${props.progressBar}`}}>
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={props.progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${props.progress}` + "%" }}
          >
            {props.progress}%
          </div>
        </div>
      )}
      <div className="card" >
        <div className="card-header" > GIF Output</div>
        <div className="gifDisplay">
        <img src={`data:image/gif;base64,${props.source}`}  style={{visibility:` ${props.imageDisplay}`}} ></img>
        </div>
        </div>
      </div>
  );
};

const mapStateToProps = function(state) {
 
  return {
    message:state.appProgress.value.currentStore.message,
    progressBar: state.appProgress.value.currentStore.progressBar,
    progress: state.appProgress.value.currentStore.progress,
    waitingStat: state.appProgress.value.currentStore.waitingStat,
    source:state.appProgress.value.currentStore.source,
    imageDisplay: state.appProgress.value.currentStore.imageDisplay
    
  }
}

export default connect(mapStateToProps)(UploadFiles);
