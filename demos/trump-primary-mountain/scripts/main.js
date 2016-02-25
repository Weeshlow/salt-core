function numberWithCommas(t){return t.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",")}!function(){"use strict";function t(t){var i=t[0]>.04045?Math.pow((t[0]+.055)/1.055,2.4):t[0]/12.92,a=t[1]>.04045?Math.pow((t[1]+.055)/1.055,2.4):t[1]/12.92,n=t[2]>.04045?Math.pow((t[2]+.055)/1.055,2.4):t[2]/12.92,o=.4124564*i+.3575761*a+.1804375*n,e=.2126729*i+.7151522*a+.072175*n,r=.0193339*i+.119192*a+.9503041*n;return o/=.95047,e/=1,r/=1.08883,o=o>.008856?Math.pow(o,1/3):7.787037*o+16/116,e=e>.008856?Math.pow(e,1/3):7.787037*e+16/116,r=r>.008856?Math.pow(r,1/3):7.787037*r+16/116,[116*e-16,500*(o-e),200*(e-r),t[3]]}function i(t){var i=(t[0]+16)/116,a=i+t[1]/500,n=i-t[2]/200;a=a>.206893034?a*a*a:(a-4/29)/7.787037,i=i>.206893034?i*i*i:(i-4/29)/7.787037,n=n>.206893034?n*n*n:(n-4/29)/7.787037,a=.95047*a,i=1*i,n=1.08883*n;var o=3.2404542*a+-1.5371385*i+n*-.4985314,e=a*-.969266+1.8760108*i+.041556*n,r=.0556434*a+i*-.2040259+1.0572252*n;return o=o>.00304?1.055*Math.pow(o,1/2.4)-.055:12.92*o,e=e>.00304?1.055*Math.pow(e,1/2.4)-.055:12.92*e,r=r>.00304?1.055*Math.pow(r,1/2.4)-.055:12.92*r,[Math.max(Math.min(o,1),0),Math.max(Math.min(e,1),0),Math.max(Math.min(r,1),0),t[3]]}function a(t,i){return Math.sqrt((t[0]-i[0])*(t[0]-i[0])+(t[1]-i[1])*(t[1]-i[1])+(t[2]-i[2])*(t[2]-i[2])+(t[3]-i[3])*(t[3]-i[3]))}var n={},o=200,e=function(n){var e=[],r=_.map(n,function(i){return t([i[0]/255,i[1]/255,i[2]/255,i[3]/255])}),h=_.map(r,function(t,i,n){return i>0?a(t,n[i-1]):0}),s=_.reduce(h,function(t,i){return t+i},0);h=_.map(h,function(t){return t/s});for(var l,u,d,m=0,c=0,p=0;o>p;p++)l=p/(o-1),l>m+h[c+1]&&c+1<r.length-1&&(c+=1,m+=h[c]),u=(l-m)/h[c+1],d=i([r[c][0]+(r[c+1][0]-r[c][0])*u,r[c][1]+(r[c+1][1]-r[c][1])*u,r[c][2]+(r[c+1][2]-r[c][2])*u,r[c][3]+(r[c+1][3]-r[c][3])*u]),e.push([Math.round(255*d[0]),Math.round(255*d[1]),Math.round(255*d[2]),Math.round(255*d[3])]);return e},r=e([[4,32,64,80],[8,64,129,127],[8,104,172,255],[43,140,190,255],[78,179,211,255],[123,204,196,255],[168,221,181,255],[204,235,197,255],[224,243,219,255],[247,252,240,255]]),h=e([[64,0,19,80],[128,0,38,127],[189,0,38,255],[227,26,28,255],[252,78,42,255],[253,141,60,255],[254,178,76,255],[254,217,118,255],[255,237,160,255]]),s=e([[0,64,38,80],[0,90,50,127],[35,132,67,255],[65,171,93,255],[120,198,121,255],[173,221,142,255],[217,240,163,255],[247,252,185,255],[255,255,229,255]]),l=e([[38,26,64,80],[68,47,114,127],[225,43,2,255],[2,220,1,255],[255,210,2,255],[255,255,255,255]]),u=e([[0,22,64,80],[0,57,102,127],[49,61,102,255],[225,43,2,255],[255,210,2,255],[255,255,255,255]]),d=e([[0,0,0,127],[64,64,64,255],[255,255,255,255]]),m=e([[128,0,38,127],[189,0,38,255],[227,26,28,255],[252,78,42,255],[253,141,60,255]]),c=e([[0,64,38,80],[0,90,50,127],[35,132,67,255],[65,171,93,255],[120,198,121,255]]),p=function(t){return function(i,a){var n=t[Math.floor(i*(o-1))];return a[0]=n[0],a[1]=n[1],a[2]=n[2],a[3]=n[3],a}};n.cool=p(r),n.hot=p(h),n.verdant=p(s),n.spectral=p(l),n.temperature=p(u),n.grey=p(d);var f=p(m),g=p(c);n.valence=function(t,i){return t>.5?f(2*(t-.5),i):g(2*t,i)},n.valence=function(t,i){return t>.5?g(2*(t-.5),i):.5>t?f(2*(.5-t),i):(i[0]=0,i[1]=0,i[2]=0,i[3]=0,i)},window.Color=n}(),function(){"use strict";var t={};t.twoSidedLinear=function(t,i,a,n,o){var e=i-t,r=t+a/100*e,h=t+n/100*e,s=Math.min(Math.max(r,o),h);return(s/Math.max(Math.abs(h),Math.abs(r))+1)/2},t.log10=function(t,i,a,n,o){var e=Math.log(o-t+1)/Math.log(i-t+1);return e=(e-a/100)/((n-a)/100),Math.min(Math.max(e,0),1)},window.Value=t}(),function(){L.BackdropLayer=L.TileLayer.extend({options:{noWrap:!0},redraw:function(){return this._map&&(this._reset({hard:!0}),this._update()),this},_createTile:function(){var t=L.DomUtil.create("div","leaflet-tile leaflet-tile-backdrop");return t.style.width=t.style.height=this.options.tileSize+"px",t.onselectstart=t.onmousemove=L.Util.falseFn,t},_loadTile:function(t,i){t._layer=this,t._tilePoint=i,this._tileOnLoad.call(t)}})}(),function(){"use strict";var t=10,i=10,a=24,n="log",o=10,e=20,r=function(t){var i=2*Math.PI,a=i*t.radius,n=t.arcLength>a/10?a/10:t.arcLength,o=n/t.radius,e=t.t+o;return e>i&&(e%=i,t.radius=t.radius+t.radiusInc),t.t=e,t.x=t.radius*Math.cos(e),t.y=t.radius*Math.sin(e),t},h=function(t,i){return 2*Math.abs(t.x-i.x)<t.width+i.width&&2*Math.abs(t.y-i.y)<t.height+i.height},s=function(t,i){return t.x+t.width/2>i.x+i.width/2||t.x-t.width/2<i.x-i.width/2||t.y+t.height/2>i.y+i.height/2||t.y-t.height/2<i.y-i.height/2},l=function(t,i,a,n){var o,e={x:t.x,y:t.y,height:i.height,width:i.width};for(o=0;o<a.length;o++)if(h(e,a[o]))return!0;return s(e,n)?(t.collisions++,t.arcLength=t.radius,!0):!1},u=function(t,i){var a,n={};return a=$('<div class="word-cloud-label-temp" style="font-size:'+i+'px;">'+t+"</div>"),$("body").append(a),n.width=a.outerWidth(),n.height=a.outerHeight(),a.remove(),n},d=function(t,i,a,n){var o=Math.max(Math.min(t,a),i);if("log"===n){var e=Math.log10(i||1),r=Math.log10(a||1),h=1/(r-e||1);return(Math.log10(o||1)-e)*h}var s=a-i;return(o-i)/s},m=function(t,i,a,n){n=n||{};var o=n.maxFontSize||22,e=n.minFontSize||12,r=d(t,i,a,n.type);return e+r*(o-e)},c=function(t,n,o,e,h,s){var c,p,f,g,w,y,v,x={width:256-2*i,height:256-2*a,x:0,y:0},M=[];for(t.sort(function(t,i){return i.count-t.count}),p=0;p<t.length;p++){f=t[p].text,g=t[p].count,y=m(g,n,o,{maxFontSize:s,minFontSize:h,type:e}),c=100*d(g,n,o,e),w=u(f,y),v={radius:1,radiusInc:5,arcLength:5,x:0,y:0,t:0,collisions:0};for(var L=t.length;v.collisions<L;)if(v=r(v),!l(v,w,M,x)){M.push({word:f,entry:t[p].entry,fontSize:y,percentLabel:10*Math.round(c/10),x:v.x,y:v.y,width:w.width,height:w.height});break}}return M},p=function(i,a,r,h){var s,l=n,u=o,d=e,m=$("<div></div>"),p=_.map(a,function(t,i){return{count:t,text:i}}),f=Math.min(p.length,t),g=[],w=r.min,y=r.max;if(0!==f){s=c(p,w,y,l,u,d);var v=$('<div class="count-summary"></div>');m=m.append(v),s.forEach(function(t){g.push(t.entry);var i=$('<div class="word-cloud-label word-cloud-label-'+t.percentLabel+'" style="font-size:'+t.fontSize+"px;left:"+(128+t.x-t.width/2)+"px;top:"+(128+t.y-t.height/2)+"px;width:"+t.width+"px;height:"+t.height+'px;"data-word="'+t.word+'">'+t.word+"</div>");t.word===h&&i.addClass("highlight"),m=m.append(i)}),i.html(m)}};L.WordcloudLayer=L.TileLayer.extend({options:{async:!0,tms:!0,unloadInvisibleTiles:!0,noWrap:!0},initialize:function(t,i){this._url=t,L.setOptions(this,i)},onAdd:function(t){var i=this;L.TileLayer.prototype.onAdd.call(this,t),t.on("zoomend",this.onZoom,this),t.on("click",this.onClick,this),$(this._container).on("mouseover",function(t){i.onHover(t)})},onRemove:function(t){t.off("zoomend",this.onZoom),t.off("click",this.onClick),$(this._container).off("mouseover"),this.highlight=null,L.TileLayer.prototype.onRemove.call(this,t)},onZoom:function(){$(this._container).removeClass("highlight"),this.highlight=null},onHover:function(t){var i=$(t.originalEvent.target);$(".word-cloud-label").removeClass("hover");var a=i.attr("data-word");a&&$(".word-cloud-label[data-word="+a+"]").addClass("hover")},onClick:function(t){var i=$(t.originalEvent.target),a=i.attr("data-word");this.highlightWord(a)},highlightWord:function(t){$(".word-cloud-label").removeClass("highlight"),t?($(this._container).addClass("highlight"),$(".word-cloud-label[data-word="+t+"]").addClass("highlight"),this.highlight=t):($(this._container).removeClass("highlight"),this.highlight=null)},redraw:function(){this._map&&(this._reset({hard:!0}),this._update());for(var t in this._tiles)this._redrawTile(this._tiles[t]);return this},_redrawTile:function(t){this.drawTile(t,t._tilePoint,this._map._zoom)},_createTile:function(){var t=L.DomUtil.create("div","leaflet-tile leaflet-wordcloud");return t.width=t.height=this.options.tileSize,t.onselectstart=t.onmousemove=L.Util.falseFn,t},_loadTile:function(t,i){t._layer=this,t._tilePoint=i,this._adjustTilePoint(i),this._redrawTile(t),this.options.async||this.tileDrawn(t)},drawTile:function(t,i,a){var n=this,o=this.getTileUrl(i);$.ajax(o).then(function(i){var o=$(t).empty();p(o,i,n.options.dataExtents[a],n.highlight),n.tileDrawn(t)})},tileDrawn:function(t){this._tileOnLoad.call(t)},refresh:function(){}})}(),function(){"use strict";var t=function(t,i){var a=new XMLHttpRequest;a.open("GET",t,!0),a.responseType="arraybuffer",a.onload=function(t){i(200==this.status?new Float64Array(this.response):null)},a.send()};L.BinaryTileLayer=L.TileLayer.Canvas.extend({options:{async:!0,tms:!0,noWrap:!0,transform:"log10",ramp:"temperature"},initialize:function(t,i){this._url=t,L.setOptions(this,i)},_loadTile:function(t,i){t._layer=this,t._tilePoint=i,this._adjustTilePoint(i),this._redrawTile(t),this.options.async||this.tileDrawn(t)},drawTile:function(i,a,n){var o=this,e=this.options,r=this.getTileUrl(a),h=Value[e.transform],s=Color[e.ramp],l=[];t(r,function(t){if(!t)return void o.tileDrawn(i);var a=i.getContext("2d"),r=a.getImageData(0,0,i.width,i.height),u=r.data,d=e.dataBounds[n];t.forEach(function(t,i){var a=h(d.min,d.max,0,100,t);a>0&&(l=s(a,l),u[4*i]=l[0],u[4*i+1]=l[1],u[4*i+2]=l[2],u[4*i+3]=l[3])}),a.putImageData(r,0,0),o.tileDrawn(i)})}})}();var map=new L.Map("map-container",{zoomControl:!1,center:[0,0],zoom:1,minZoom:0,maxZoom:5,scrollWheelZoom:!1});map.attributionControl.setPrefix('<a href="http://leafletjs.com" target="_top">Leaflet</a>');var zoomHome=L.Control.zoomHome();zoomHome.addTo(map);var bounds={x:{min:1454284828297,max:1456272098064},y:{min:0,max:2754918}},xPos=$("#x-position"),xLabel=xPos.find(".label"),yPos=$("#y-position"),yLabel=yPos.find(".label"),isShowing=!0;map.on("mousemove",function(t){if(t.latlng.lat<85&&t.latlng.lat>-85&&t.latlng.lng>-180&&t.latlng.lng<180){isShowing||(isShowing=!0,xPos.show(),yPos.show()),xPos.css({left:t.containerPoint.x,height:map.getSize().y-t.containerPoint.y});var i=(t.latlng.lng+180)/360*(bounds.x.max-bounds.x.min)+bounds.x.min;xLabel.html(moment(i).format("MMM D, h:mmA")),yPos.css({top:t.containerPoint.y,width:t.containerPoint.x});var a=(t.latlng.lat+85)/170*(bounds.y.max-bounds.y.min)+bounds.y.min;yLabel.html(numberWithCommas(a))}else isShowing&&(xPos.hide(),yPos.hide(),isShowing=!1)}),map.on("mouseout",function(){xPos.hide(),yPos.hide(),isShowing=!1}),(new L.BackdropLayer).addTo(map);var attribution='<a href="http://unchartedsoftware.github.io/salt">Uncharted Salt</a>';$.ajax("//s3.amazonaws.com/embed.pantera.io/trump-primary-mountain/tweets/metadata.json").then(function(t){var i=new L.BinaryTileLayer("//s3.amazonaws.com/embed.pantera.io/trump-primary-mountain/tweets/{z}/{x}/{y}.bin",{attribution:attribution,tms:!0,transform:"log10",ramp:"temperature",zIndex:1,dataBounds:t});i.addTo(map);var a=new L.WordcloudLayer("//s3.amazonaws.com/embed.pantera.io/trump-primary-mountain/hashtags/{z}/{x}/{y}.json",{attribution:attribution,zIndex:2,dataExtents:{0:{min:106731,max:610539},1:{min:1607,max:296884},2:{min:311,max:145956},3:{min:185,max:114902},4:{min:43,max:93533},5:{min:9,max:55422}}});a.addTo(map),map.on("layeradd",function(t){t.layer.options.dim&&t.layer.options.dim.setOpacity(.5)}),map.on("layerremove",function(t){t.layer.options.dim&&t.layer.options.dim.setOpacity(1)}),L.control.layers({},{"Trump Tweet Count":i,"Trump Hashtags":a},{collapsed:!1}).addTo(map),$("#story a[data-zoom]").on("click",function(t){var i=$(t.target),n=parseFloat(i.data("zoom")),o=parseFloat(i.data("x")),e=parseFloat(i.data("y")),r=i.data("hashtag");n!==map.getZoom()?map.once("moveend",function(){a.highlightWord(r)}):a.highlightWord(r),map.setView([e,o],n)})});