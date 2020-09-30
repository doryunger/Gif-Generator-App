const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const multer = require('multer');
const upload = multer();
const port=8000;
var fs = require('fs');
var FormData = require('form-data');
const fetch = require("node-fetch");
var form = new FormData();
let info;
let error;
var respo;

app.use(express.urlencoded({
  extended: true
}))

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

const promiseWrapper = data => new Promise((resolve, reject) => {
    if (data==null) {
      
        return reject(error);

    }
          
         resolve(data.body);
        
  });

app.post('/upload',upload.any('file'),async(req, res,next)=> {
  
  //const file =req.file;
  const { headers, files } = req;
  const { buffer, originalname: filename } = files[0];
  const formFile = new FormData();
  form.append('file', buffer, { filename });
  //console.log(buffer);
  //fs.writeFile("first.mp4", buffer,function(err) { });
  var url="http://localhost:8080/gifgen"
  //form.append('file', 'test');
  //form.append('file',fs.createReadStream('./assets/car.jpg'))
  fetch(url, {
    method: 'post',
    body: form
  }).then(async (response)=>{ respo=response;
      
      //const { buffer, originalname: filename } = files[0];
      //console.log(buffer);
      //var buf = new Buffer(respo.body, 'base64');
      //fs.writeFile('out.gif', buf);
    
      fs.writeFile("test.gif", respo,function(err) { });
      
      try {
      info = await promiseWrapper(response).catch((err)=>console.log('caught it'));
    } catch (e) {
      error = e;
    }
    var buf = new Buffer(info.toString(),'binary');
    //var bufobject=info.toString('binary');
    for (const [key, value] of Object.entries(info)) {
      console.log(key, value);
    }
    fs.writeFile("tre.gif", buf,function(err) { });

    
    res.status(200);
    res.send({message:'sent'});
    next();

  //fs.writeFile("test.json", data,  "binary",function(err) { });
  /*fs.writeFile("file", JSON.stringify(data, null, 4), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});*/
  /*res.status(200);
  res.send({message:'sent'});
  next();*/

}).catch(error =>{console.log(error)});
});
/*app.get('/il', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});*/

app.listen(port, () => console.log(`Server started on port ${port}`));