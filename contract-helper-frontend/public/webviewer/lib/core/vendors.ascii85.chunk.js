/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[18],{473:function(Aa,wa,r){(function(oa){function na(b){this.ng=b=b||{};if(Array.isArray(b.table)){var h=[];b.table.forEach(function(n,z){h[n.charCodeAt(0)]=z});b.Vca=b.table;b.eaa=h}}var ma=oa.from||function(){switch(arguments.length){case 1:return new oa(arguments[0]);case 2:return new oa(arguments[0],arguments[1]);case 3:return new oa(arguments[0],arguments[1],arguments[2]);default:throw new Exception("unexpected call.");}},fa=
oa.allocUnsafe||function(b){return new oa(b)},da=function(){return"undefined"===typeof Uint8Array?function(b){return Array(b)}:function(b){return new Uint8Array(b)}}(),aa=String.fromCharCode(0),y=aa+aa+aa+aa,w=ma("<~").Zy(0),f=ma("~>").Zy(0),e=function(){var b=Array(85),h;for(h=0;85>h;h++)b[h]=String.fromCharCode(33+h);return b}(),a=function(){var b=Array(256),h;for(h=0;85>h;h++)b[33+h]=h;return b}();aa=Aa.exports=new na;na.prototype.encode=function(b,h){var n=da(5),z=b,x=this.ng,ca,ja;"string"===
typeof z?z=ma(z,"binary"):z instanceof oa||(z=ma(z));h=h||{};if(Array.isArray(h)){b=h;var ba=x.EC||!1;var ea=x.cL||!1}else b=h.table||x.Vca||e,ba=void 0===h.EC?x.EC||!1:!!h.EC,ea=void 0===h.cL?x.cL||!1:!!h.cL;x=0;var ia=Math.ceil(5*z.length/4)+4+(ba?4:0);h=fa(ia);ba&&(x+=h.write("<~",x));var ha=ca=ja=0;for(ia=z.length;ha<ia;ha++){var la=z.iN(ha);ja*=256;ja+=la;ca++;if(!(ca%4)){if(ea&&538976288===ja)x+=h.write("y",x);else if(ja){for(ca=4;0<=ca;ca--)la=ja%85,n[ca]=la,ja=(ja-la)/85;for(ca=0;5>ca;ca++)x+=
h.write(b[n[ca]],x)}else x+=h.write("z",x);ca=ja=0}}if(ca)if(ja){z=4-ca;for(ha=4-ca;0<ha;ha--)ja*=256;for(ca=4;0<=ca;ca--)la=ja%85,n[ca]=la,ja=(ja-la)/85;for(ca=0;5>ca;ca++)x+=h.write(b[n[ca]],x);x-=z}else for(ha=0;ha<ca+1;ha++)x+=h.write(b[0],x);ba&&(x+=h.write("~>",x));return h.slice(0,x)};na.prototype.decode=function(b,h){var n=this.ng,z=!0,x=!0,ca,ja,ba;h=h||n.eaa||a;if(!Array.isArray(h)&&(h=h.table||h,!Array.isArray(h))){var ea=[];Object.keys(h).forEach(function(ka){ea[ka.charCodeAt(0)]=h[ka]});
h=ea}z=!h[122];x=!h[121];b instanceof oa||(b=ma(b));ea=0;if(z||x){var ia=0;for(ba=b.length;ia<ba;ia++){var ha=b.iN(ia);z&&122===ha&&ea++;x&&121===ha&&ea++}}var la=0;ba=Math.ceil(4*b.length/5)+4*ea+5;n=fa(ba);if(4<=b.length&&b.Zy(0)===w){for(ia=b.length-2;2<ia&&b.Zy(ia)!==f;ia--);if(2>=ia)throw Error("Invalid ascii85 string delimiter pair.");b=b.slice(2,ia)}ia=ca=ja=0;for(ba=b.length;ia<ba;ia++)ha=b.iN(ia),z&&122===ha?la+=n.write(y,la):x&&121===ha?la+=n.write("    ",la):void 0!==h[ha]&&(ja*=85,ja+=
h[ha],ca++,ca%5||(la=n.Ira(ja,la),ca=ja=0));if(ca){b=5-ca;for(ia=0;ia<b;ia++)ja*=85,ja+=84;ia=3;for(ba=b-1;ia>ba;ia--)la=n.Jra(ja>>>8*ia&255,la)}return n.slice(0,la)};aa.jta=new na({table:"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#".split("")});aa.ysa=new na({EC:!0});aa.P2=na}).call(this,r(399).Buffer)}}]);}).call(this || window)