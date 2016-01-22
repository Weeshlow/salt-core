!function(){"use strict";var t=10,i=10,a=24,o="log",e=10,n=20,r=function(t){var i=2*Math.PI,a=i*t.radius,o=t.arcLength>a/10?a/10:t.arcLength,e=o/t.radius,n=t.t+e;return n>i&&(n%=i,t.radius=t.radius+t.radiusInc),t.t=n,t.x=t.radius*Math.cos(n),t.y=t.radius*Math.sin(n),t},h=function(t,i){return 2*Math.abs(t.x-i.x)<t.width+i.width&&2*Math.abs(t.y-i.y)<t.height+i.height},s=function(t,i){return t.x+t.width/2>i.x+i.width/2||t.x-t.width/2<i.x-i.width/2||t.y+t.height/2>i.y+i.height/2||t.y-t.height/2<i.y-i.height/2},l=function(t,i,a,o){var e,n={x:t.x,y:t.y,height:i.height,width:i.width};for(e=0;e<a.length;e++)if(h(n,a[e]))return!0;return s(n,o)?(t.collisions++,t.arcLength=t.radius,!0):!1},d=function(t,i){var a,o={};return a=$('<div class="word-cloud-label-temp" style="font-size:'+i+'px;">'+t+"</div>"),$("body").append(a),o.width=a.outerWidth(),o.height=a.outerHeight(),a.remove(),o},c=function(t,i,a,o){var e=Math.max(Math.min(t,a),i);if("log"===o){var n=Math.log10(i||1),r=Math.log10(a||1),h=1/(r-n||1);return(Math.log10(e||1)-n)*h}var s=a-i;return(e-i)/s},u=function(t,i,a,o){o=o||{};var e=o.maxFontSize||22,n=o.minFontSize||12,r=c(t,i,a,o.type);return n+r*(e-n)},m=function(t,o,e,n,h,s){var m,p,f,g,w,y,v,x={width:256-2*i,height:256-2*a,x:0,y:0},L=[];for(t.sort(function(t,i){return i.count-t.count}),p=0;p<t.length;p++){f=t[p].text,g=t[p].count,y=u(g,o,e,{maxFontSize:s,minFontSize:h,type:n}),m=100*c(g,o,e,n),w=d(f,y),v={radius:1,radiusInc:5,arcLength:5,x:0,y:0,t:0,collisions:0};for(var b=t.length;v.collisions<b;)if(v=r(v),!l(v,w,L,x)){L.push({word:f,entry:t[p].entry,fontSize:y,percentLabel:10*Math.round(m/10),x:v.x,y:v.y,width:w.width,height:w.height});break}}return L},p=function(i,a,r,h){var s,l=Math.min(a.tags?a.tags.length:0,t),d=o,c=e,u=n,p=$("<div></div>"),f=a.tags,g=[],w=r.min,y=r.max;if(0!==l){s=m(f,w,y,d,c,u);var v=$('<div class="count-summary"></div>');p=p.append(v),s.forEach(function(t){g.push(t.entry);var i=$('<div class="word-cloud-label word-cloud-label-'+t.percentLabel+'" style="font-size:'+t.fontSize+"px;left:"+(128+t.x-t.width/2)+"px;top:"+(128+t.y-t.height/2)+"px;width:"+t.width+"px;height:"+t.height+'px;"data-word="'+t.word+'">'+t.word+"</div>");t.word===h&&i.addClass("highlight"),p=p.append(i)}),i.html(p)}};L.WordcloudLayer=L.TileLayer.extend({options:{async:!0,tms:!0,unloadInvisibleTiles:!0,noWrap:!0},initialize:function(t,i){this._url=t,L.setOptions(this,i)},onAdd:function(t){var i=this;L.TileLayer.prototype.onAdd.call(this,t),t.on("zoomend",this.onZoom,this),t.on("click",this.onClick,this),$(this._container).on("mouseover",function(t){i.onHover(t)})},onRemove:function(t){t.off("zoomend",this.onZoom),t.off("click",this.onClick),$(this._container).off("mouseover"),this.highlight=null,L.TileLayer.prototype.onRemove.call(this,t)},onZoom:function(){$(this._container).removeClass("highlight"),this.highlight=null},onHover:function(t){var i=$(t.originalEvent.target);$(".word-cloud-label").removeClass("hover");var a=i.attr("data-word");a&&$(".word-cloud-label[data-word="+a+"]").addClass("hover")},onClick:function(t){var i=$(t.originalEvent.target);$(".word-cloud-label").removeClass("highlight");var a=i.attr("data-word");a?($(this._container).addClass("highlight"),$(".word-cloud-label[data-word="+a+"]").addClass("highlight"),this.highlight=a):($(this._container).removeClass("highlight"),this.highlight=null)},redraw:function(){this._map&&(this._reset({hard:!0}),this._update());for(var t in this._tiles)this._redrawTile(this._tiles[t]);return this},_redrawTile:function(t){this.drawTile(t,t._tilePoint,this._map._zoom)},_createTile:function(){var t=L.DomUtil.create("div","leaflet-tile leaflet-wordcloud");return t.width=t.height=this.options.tileSize,t.onselectstart=t.onmousemove=L.Util.falseFn,t},_loadTile:function(t,i){t._layer=this,t._tilePoint=i,this._adjustTilePoint(i),this._redrawTile(t),this.options.async||this.tileDrawn(t)},drawTile:function(t,i,a){var o=this,e=this.getTileUrl(i);$.ajax(e).then(function(i){var e=$(t).empty();p(e,i,o.options.dataExtents[a],o.highlight),o.tileDrawn(t)})},tileDrawn:function(t){this._tileOnLoad.call(t)},refresh:function(){}})}();var map=new L.Map("map",{zoomControl:!0,center:[40.72,-73.97],zoom:13,minZoom:10,maxZoom:16,scrollWheelZoom:!1});map.attributionControl.setPrefix('<a href="http://leafletjs.com" target="_top">Leaflet</a>'),L.tileLayer("//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",{attribution:"CartoDB Base Map"}).addTo(map);var attribution='<a href="http://unchartedsoftware.github.io/salt">Uncharted Salt</a>',taxiAttribution='<a href="http://chriswhong.com/open-data/foil_nyc_taxi/" target="_top">NYC Taxi Data</a>',dropoffsLayer=L.tileLayer("//s3.amazonaws.com/embed.pantera.io/saltdemos/taxi-twitter/nyc-yellow-dropoff-heatmap/{z}/{x}/{y}.png",{attribution:taxiAttribution,opacity:.8,tms:!0});var pickupsLayer=L.tileLayer("//s3.amazonaws.com/embed.pantera.io/saltdemos/taxi-twitter/nyc-yellow-pickup-heatmap/{z}/{x}/{y}.png",{attribution:taxiAttribution,opacity:.8,tms:!0});pickupsLayer.addTo(map);var words=new L.WordcloudLayer("//s3.amazonaws.com/embed.pantera.io/saltdemos/taxi-twitter/nyc-twitter-hashtags/{z}/{x}/{y}.json",{attribution:attribution,dataExtents:{10:{min:13,max:27375},11:{min:13,max:20083},12:{min:14,max:20083},13:{min:11,max:19450},14:{min:12,max:15139},15:{min:12,max:14524},16:{min:12,max:10768},17:{min:12,max:9400}}});
