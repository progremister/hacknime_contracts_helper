/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[6],{467:function(Aa,wa,r){r.r(wa);var oa=r(0);Aa=r(48);var na=r(178),ma=r(398),fa=r(223),da=window;r=function(){function aa(y,w){this.DX=function(f){f=f.split(".");return f[f.length-1].match(/(jpg|jpeg|png|gif)$/i)};w=w||{};this.url=y;this.filename=w.filename||y;this.rf=w.customHeaders;this.qra=!!w.useDownloader;this.withCredentials=!!w.withCredentials}aa.prototype.NF=function(y){this.rf=y};aa.prototype.getCustomHeaders=function(){return this.rf};
aa.prototype.getFileData=function(y){var w=this,f=this,e=new XMLHttpRequest,a=0===this.url.indexOf("blob:")?"blob":"arraybuffer";e.open("GET",this.url,!0);e.withCredentials=this.withCredentials;e.responseType=a;this.rf&&Object.keys(this.rf).forEach(function(h){e.setRequestHeader(h,w.rf[h])});var b=/^https?:/i.test(this.url);e.addEventListener("load",function(h){return Object(oa.b)(this,void 0,void 0,function(){var n,z,x,ca,ja,ba;return Object(oa.d)(this,function(ea){switch(ea.label){case 0:if(200!==
this.status&&(b||0!==this.status))return[3,10];f.trigger(aa.Events.DOCUMENT_LOADING_PROGRESS,[h.loaded,h.loaded]);if("blob"!==this.responseType)return[3,4];n=this.response;return f.DX(f.filename)?[4,Object(fa.b)(n)]:[3,2];case 1:return z=ea.ca(),f.fileSize=z.byteLength,y(new Uint8Array(z)),[3,3];case 2:x=new FileReader,x.onload=function(ia){ia=new Uint8Array(ia.target.result);f.fileSize=ia.length;y(ia)},x.readAsArrayBuffer(n),ea.label=3;case 3:return[3,9];case 4:ea.ig.push([4,8,,9]);ca=new Uint8Array(this.response);
if(!f.DX(f.filename))return[3,6];n=new Blob([ca.buffer]);return[4,Object(fa.b)(n)];case 5:return z=ea.ca(),f.fileSize=z.byteLength,y(new Uint8Array(z)),[3,7];case 6:f.fileSize=ca.length,y(ca),ea.label=7;case 7:return[3,9];case 8:return ea.ca(),f.trigger(aa.Events.ERROR,["pdfLoad","Out of memory"]),[3,9];case 9:return[3,11];case 10:ja=h.currentTarget,ba=Object(na.b)(ja),f.trigger(aa.Events.ERROR,["pdfLoad",this.status+" "+ja.statusText,ba]),ea.label=11;case 11:return f.cA=null,[2]}})})},!1);e.onprogress=
function(h){f.trigger(aa.Events.DOCUMENT_LOADING_PROGRESS,[h.loaded,0<h.total?h.total:0])};e.addEventListener("error",function(){f.trigger(aa.Events.ERROR,["pdfLoad","Network failure"]);f.cA=null},!1);e.send();this.cA=e};aa.prototype.getFile=function(){var y=this;return new Promise(function(w){da.utils.isJSWorker&&w(y.url);if(y.qra){var f=Object(oa.a)({url:y.url},y.rf?{customHeaders:y.rf}:{});w(f)}w(null)})};aa.prototype.abort=function(){this.cA&&(this.cA.abort(),this.cA=null)};aa.Events={DOCUMENT_LOADING_PROGRESS:"documentLoadingProgress",
ERROR:"error"};return aa}();Object(Aa.a)(r);Object(ma.a)(r);Object(ma.b)(r);wa["default"]=r}}]);}).call(this || window)