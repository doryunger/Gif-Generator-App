(this["webpackJsonpreact-hooks-file-upload"]=this["webpackJsonpreact-hooks-file-upload"]||[]).push([[0],{14:function(e,t,a){e.exports=a(39)},19:function(e,t,a){},20:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(12),r=a.n(o),l=(a(19),a(20),a(21),a(2)),c=a(13),s=a.n(c).a.create({baseURL:"http://localhost:8000",headers:{"Content-type":"application/json"}}),d=function(e,t){var a=new FormData;return a.append("file",e),s.post("https://doryunger.com/gif/upload",a,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:t})},u=["mp4","mov","avi"],m=function(){var e=Object(n.useState)(void 0),t=Object(l.a)(e,2),a=t[0],o=t[1],r=Object(n.useState)(void 0),c=Object(l.a)(r,2),s=c[0],m=c[1],p=Object(n.useState)(0),b=Object(l.a)(p,2),v=b[0],h=b[1],f=Object(n.useState)(""),g=Object(l.a)(f,2),E=g[0],j=g[1],O=Object(n.useState)(""),y=Object(l.a)(O,2),w=y[0],S=y[1],N=Object(n.useState)([]),k=Object(l.a)(N,2),C=(k[0],k[1],Object(n.useState)("hidden")),G=Object(l.a)(C,2),x=G[0],F=G[1],T=Object(n.useState)(!0),U=Object(l.a)(T,2),W=U[0],B=U[1],D=Object(n.useState)("hidden"),I=Object(l.a)(D,2),J=I[0],M=I[1],z=Object(n.useState)("hidden"),H=Object(l.a)(z,2),L=H[0],P=H[1];return i.a.createElement("div",null,i.a.createElement("label",{className:"btn btn-default"},i.a.createElement("input",{type:"file",onChange:function(e){var t=e.target.files[0],a=t.size/1024/1024,n=t.type;n=n.substring(n.search("/")+1),a<6&&u.includes(n)?(o(e.target.files),B(!1)):(a>6&&alert("File is too big"),u.includes(n)||alert("File type not supported"),o(void 0),B(!0))}})),i.a.createElement("button",{className:"btn btn-success",disabled:W,onClick:function(){var e=a[0];B(!0),h(0),m(e),F("visible"),P("visible"),d(e,(function(e){h(Math.round(50*e.loaded/e.total))})).then((function(e){M("visible"),P("hidden"),h(100),500==e.status&&(j(e.data),alert(e.data)),S(e.data),setTimeout((function(){h(0),F("hidden"),B(!0)}),1500)})).catch((function(){h(0),j("Could not upload the file!"),m(void 0),B(!0)})),o(void 0)}},"Upload"),i.a.createElement("div",{className:"alert alert-light",role:"alert"},E),i.a.createElement("img",{id:"waiting",src:"https://i.imgur.com/iH6Z31k.gif",style:{position:"relative",left:"40%",visibility:"".concat(L),width:"150px",height:"100px"}}),s&&i.a.createElement("div",{className:"progress",style:{visibility:" ".concat(x)}},i.a.createElement("div",{className:"progress-bar progress-bar-info progress-bar-striped",role:"progressbar","aria-valuenow":v,"aria-valuemin":"0","aria-valuemax":"100",style:{width:v+"%"}},v,"%")),i.a.createElement("div",{className:"card"},i.a.createElement("div",{className:"card-header"}," GIF Output"),i.a.createElement("div",{className:"gifDisplay"},i.a.createElement("img",{src:"data:image/gif;base64,".concat(w),style:{visibility:" ".concat(J)}}))))};var p=function(){return i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"headers"},"Gif Generator"),i.a.createElement("p",{id:"intro"},"Welcome to the Gif Generator!",i.a.createElement("br",null),"The app allows you to convert video files* to animated gif image.",i.a.createElement("br",null),"Choose a video file from your device and upload it in order to convert it to gif.",i.a.createElement("br",null),"* Currently supports mp4, avi and mov formats"),i.a.createElement(m,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);