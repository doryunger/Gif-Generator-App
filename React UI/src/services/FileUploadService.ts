import http from "../http-common";

//Defines the upload method which sends data over the server
const upload = (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);
    //The endpoint is another API with convert any video to gif
    return http.post("https://doryunger.com/gif/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      //Initiate the progress bar
      onUploadProgress,
    });
};

export default {
  upload
};
