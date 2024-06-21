/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[5],{475:function(Aa,wa,r){r.r(wa);var oa=r(0),na=r(497),ma=r(498),fa;(function(da){da[da.EXTERNAL_XFDF_NOT_REQUESTED=0]="EXTERNAL_XFDF_NOT_REQUESTED";da[da.EXTERNAL_XFDF_NOT_AVAILABLE=1]="EXTERNAL_XFDF_NOT_AVAILABLE";da[da.EXTERNAL_XFDF_AVAILABLE=2]="EXTERNAL_XFDF_AVAILABLE"})(fa||(fa={}));Aa=function(){function da(aa){this.aa=aa;this.state=fa.EXTERNAL_XFDF_NOT_REQUESTED}da.prototype.Hga=function(){var aa=this;return function(y,
w,f){return Object(oa.b)(aa,void 0,void 0,function(){var e,a,b,h,n,z,x,ca=this,ja;return Object(oa.d)(this,function(ba){switch(ba.label){case 0:if(this.state!==fa.EXTERNAL_XFDF_NOT_REQUESTED)return[3,2];e=this.aa.getDocument().st();return[4,this.Qea(e)];case 1:a=ba.ca(),b=this.G$(a),this.SJ=null!==(ja=null===b||void 0===b?void 0:b.parse())&&void 0!==ja?ja:null,this.state=null===this.SJ?fa.EXTERNAL_XFDF_NOT_AVAILABLE:fa.EXTERNAL_XFDF_AVAILABLE,ba.label=2;case 2:if(this.state===fa.EXTERNAL_XFDF_NOT_AVAILABLE)return f(y),
[2];h=new DOMParser;n=h.parseFromString(y,"text/xml");w.forEach(function(ea){ca.merge(n,ca.SJ,ea-1)});z=new XMLSerializer;x=z.serializeToString(n);f(x);return[2]}})})}};da.prototype.XN=function(aa){this.Qea=aa};da.prototype.ye=function(){this.SJ=void 0;this.state=fa.EXTERNAL_XFDF_NOT_REQUESTED};da.prototype.G$=function(aa){return aa?Array.isArray(aa)?new na.a(aa):"string"!==typeof aa?null:(new DOMParser).parseFromString(aa,"text/xml").querySelector("xfdf > add")?new na.a(aa):new ma.a(aa):null};da.prototype.merge=
function(aa,y,w){var f=this;0===w&&(this.cja(aa,y.Vp),this.eja(aa,y.AJ));var e=y.da[w];e&&(this.fja(aa,e.Wn),this.hja(aa,e.i2,y.ex),this.gja(aa,e.page,w),this.dja(aa,e.uU));e=this.aa.Rb();if(w===e-1){var a=y.ex;Object.keys(a).forEach(function(b){a[b].jL||f.yY(aa,b,a[b])})}};da.prototype.cja=function(aa,y){null!==y&&(aa=this.ow(aa),this.mr(aa,"calculation-order",y))};da.prototype.eja=function(aa,y){null!==y&&(aa=this.ow(aa),this.mr(aa,"document-actions",y))};da.prototype.fja=function(aa,y){var w=this,
f=this.nw(aa.querySelector("xfdf"),"annots");Object.keys(y).forEach(function(e){w.mr(f,'[name="'+e+'"]',y[e])})};da.prototype.hja=function(aa,y,w){var f=this;if(0!==y.length){var e=this.ow(aa);y.forEach(function(a){var b=a.getAttribute("field"),h=w[b];h&&(f.yY(aa,b,h),f.mr(e,"null",a))})}};da.prototype.yY=function(aa,y,w){var f=this.ow(aa),e=f.querySelector('ffield[name="'+y+'"]');null!==w.$C&&null===e&&this.mr(f,'ffield[name="'+y+'"]',w.$C);aa=this.nw(aa.querySelector("xfdf"),"fields");y=y.split(".");
this.dN(aa,y,0,w.value);w.jL=!0};da.prototype.gja=function(aa,y,w){null!==y&&(aa=this.ow(aa),aa=this.nw(aa,"pages"),this.mr(aa,'[number="'+(w+1)+'"]',y))};da.prototype.dja=function(aa,y){Object.keys(y).forEach(function(w){(w=aa.querySelector('annots [name="'+w+'"]'))&&w.parentElement.removeChild(w)})};da.prototype.dN=function(aa,y,w,f){if(w===y.length)y=document.createElementNS("","value"),y.textContent=f,this.mr(aa,"value",y);else{var e=y[w];this.nw(aa,'[name="'+e+'"]',"field").setAttribute("name",
e);aa=aa.querySelectorAll('[name="'+e+'"]');1===aa.length?this.dN(aa[0],y,w+1,f):(e=this.yda(aa),this.dN(w===y.length-1?e:this.Gqa(aa,e),y,w+1,f))}};da.prototype.yda=function(aa){for(var y=null,w=0;w<aa.length;w++){var f=aa[w];if(0===f.childElementCount||1===f.childElementCount&&"value"===f.children[0].tagName){y=f;break}}return y};da.prototype.Gqa=function(aa,y){for(var w=0;w<aa.length;w++)if(aa[w]!==y)return aa[w];return null};da.prototype.mr=function(aa,y,w){y=aa.querySelector(y);null!==y&&aa.removeChild(y);
aa.appendChild(w)};da.prototype.ow=function(aa){var y=aa.querySelector("pdf-info");if(null!==y)return y;y=this.nw(aa.querySelector("xfdf"),"pdf-info");y.setAttribute("xmlns","http://www.pdftron.com/pdfinfo");y.setAttribute("version","2");y.setAttribute("import-version","4");return y};da.prototype.nw=function(aa,y,w){var f=aa.querySelector(y);if(null!==f)return f;f=document.createElementNS("",w||y);aa.appendChild(f);return f};return da}();wa["default"]=Aa},486:function(Aa,wa){Aa=function(){function r(){}
r.prototype.DB=function(oa){var na={Vp:null,AJ:null,ex:{},da:{}};oa=(new DOMParser).parseFromString(oa,"text/xml");na.Vp=oa.querySelector("pdf-info calculation-order");na.AJ=oa.querySelector("pdf-info document-actions");na.ex=this.bka(oa);na.da=this.oka(oa);return na};r.prototype.bka=function(oa){var na=oa.querySelector("fields");oa=oa.querySelectorAll("pdf-info > ffield");if(null===na&&null===oa)return{};var ma={};this.S7(ma,na);this.Q7(ma,oa);return ma};r.prototype.S7=function(oa,na){if(null!==
na&&na.children){for(var ma=[],fa=0;fa<na.children.length;fa++){var da=na.children[fa];ma.push({name:da.getAttribute("name"),element:da})}for(;0!==ma.length;)for(na=ma.shift(),fa=0;fa<na.element.children.length;fa++)da=na.element.children[fa],"value"===da.tagName?oa[na.name]={value:da.textContent,$C:null,jL:!1}:da.children&&ma.push({name:na.name+"."+da.getAttribute("name"),element:da})}};r.prototype.Q7=function(oa,na){na.forEach(function(ma){var fa=ma.getAttribute("name");oa[fa]?oa[fa].$C=ma:oa[fa]=
{value:null,$C:ma,jL:!1}})};r.prototype.oka=function(oa){var na=this,ma={};oa.querySelectorAll("pdf-info widget").forEach(function(fa){var da=parseInt(fa.getAttribute("page"),10)-1;na.eE(ma,da);ma[da].i2.push(fa)});oa.querySelectorAll("pdf-info page").forEach(function(fa){var da=parseInt(fa.getAttribute("number"),10)-1;na.eE(ma,da);ma[da].page=fa});this.cW(oa).forEach(function(fa){var da=parseInt(fa.getAttribute("page"),10),aa=fa.getAttribute("name");na.eE(ma,da);ma[da].Wn[aa]=fa});this.OV(oa).forEach(function(fa){var da=
parseInt(fa.getAttribute("page"),10);fa=fa.textContent;na.eE(ma,da);ma[da].uU[fa]=!0});return ma};r.prototype.eE=function(oa,na){oa[na]||(oa[na]={Wn:{},uU:{},i2:[],page:null})};return r}();wa.a=Aa},497:function(Aa,wa,r){var oa=r(0),na=r(1);r.n(na);Aa=function(ma){function fa(da){var aa=ma.call(this)||this;aa.ida=Array.isArray(da)?da:[da];return aa}Object(oa.c)(fa,ma);fa.prototype.parse=function(){var da=this,aa={Vp:null,AJ:null,ex:{},da:{}};this.ida.forEach(function(y){aa=Object(na.merge)(aa,da.DB(y))});
return aa};fa.prototype.cW=function(da){var aa=[];da.querySelectorAll("add > *").forEach(function(y){aa.push(y)});da.querySelectorAll("modify > *").forEach(function(y){aa.push(y)});return aa};fa.prototype.OV=function(da){return da.querySelectorAll("delete > *")};return fa}(r(486).a);wa.a=Aa},498:function(Aa,wa,r){var oa=r(0);Aa=function(na){function ma(fa){var da=na.call(this)||this;da.jda=fa;return da}Object(oa.c)(ma,na);ma.prototype.parse=function(){return this.DB(this.jda)};ma.prototype.cW=function(fa){return fa.querySelectorAll("annots > *")};
ma.prototype.OV=function(){return[]};return ma}(r(486).a);wa.a=Aa}}]);}).call(this || window)