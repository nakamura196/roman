/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[20,21],{486:function(e,t){var n={utf8:{stringToBytes:function(e){return n.bin.stringToBytes(unescape(encodeURIComponent(e)))},bytesToString:function(e){return decodeURIComponent(escape(n.bin.bytesToString(e)))}},bin:{stringToBytes:function(e){for(var t=[],i=0;i<e.length;i++)t.push(255&e.charCodeAt(i));return t},bytesToString:function(e){for(var t=[],i=0;i<e.length;i++)t.push(String.fromCharCode(e[i]));return t.join("")}}};e.exports=n},501:function(e,t,n){"use strict";n.r(t);n(27);var r={props:{markers:{type:Array,require:!1,default:function(){return[]}},center:{type:Array,require:!1,default:function(){return[51.505,-.159]}},geojson:{type:Object,require:!1,default:function(){return null}}},data:function(){return{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',zoom:5}},computed:{options:function(){return{onEachFeature:function(e,t){t.setStyle(e.properties.style),t.bindPopup("<div>".concat(e.properties.label,"</div>"))}}},onEachFeatureFunction:function(){return function(e,t){t.bindPopup('<div><a @click="search('.concat(e.properties.uri,')">').concat(e.properties.label,"</a></div>"))}}}},o=n(71),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("l-map",{staticStyle:{"z-index":"0",height:"600px",width:"100%"},attrs:{zoom:e.zoom,center:e.center}},[n("l-tile-layer",{attrs:{url:e.url,attribution:e.attribution}}),e._v(" "),e.geojson&&Object.keys(e.geojson).length>0?n("l-geo-json",{attrs:{geojson:e.geojson,options:e.options}}):e._e(),e._v(" "),e._l(e.markers,(function(marker,t){return n("l-marker",{key:t,attrs:{"lat-lng":marker.latLng,icon:marker.icon}},[n("l-popup",[n("a",[e._v(e._s(marker.label))])])],1)}))],2)],1)}),[],!1,null,null,null);t.default=component.exports},506:function(e,t,n){var r,o,c,l,f;r=n(524),o=n(486).utf8,c=n(525),l=n(486).bin,(f=function(e,t){e.constructor==String?e=t&&"binary"===t.encoding?l.stringToBytes(e):o.stringToBytes(e):c(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||e.constructor===Uint8Array||(e=e.toString());for(var n=r.bytesToWords(e),d=8*e.length,a=1732584193,b=-271733879,h=-1732584194,y=271733878,i=0;i<n.length;i++)n[i]=16711935&(n[i]<<8|n[i]>>>24)|4278255360&(n[i]<<24|n[i]>>>8);n[d>>>5]|=128<<d%32,n[14+(d+64>>>9<<4)]=d;var v=f._ff,m=f._gg,w=f._hh,x=f._ii;for(i=0;i<n.length;i+=16){var k=a,N=b,O=h,dd=y;a=v(a,b,h,y,n[i+0],7,-680876936),y=v(y,a,b,h,n[i+1],12,-389564586),h=v(h,y,a,b,n[i+2],17,606105819),b=v(b,h,y,a,n[i+3],22,-1044525330),a=v(a,b,h,y,n[i+4],7,-176418897),y=v(y,a,b,h,n[i+5],12,1200080426),h=v(h,y,a,b,n[i+6],17,-1473231341),b=v(b,h,y,a,n[i+7],22,-45705983),a=v(a,b,h,y,n[i+8],7,1770035416),y=v(y,a,b,h,n[i+9],12,-1958414417),h=v(h,y,a,b,n[i+10],17,-42063),b=v(b,h,y,a,n[i+11],22,-1990404162),a=v(a,b,h,y,n[i+12],7,1804603682),y=v(y,a,b,h,n[i+13],12,-40341101),h=v(h,y,a,b,n[i+14],17,-1502002290),a=m(a,b=v(b,h,y,a,n[i+15],22,1236535329),h,y,n[i+1],5,-165796510),y=m(y,a,b,h,n[i+6],9,-1069501632),h=m(h,y,a,b,n[i+11],14,643717713),b=m(b,h,y,a,n[i+0],20,-373897302),a=m(a,b,h,y,n[i+5],5,-701558691),y=m(y,a,b,h,n[i+10],9,38016083),h=m(h,y,a,b,n[i+15],14,-660478335),b=m(b,h,y,a,n[i+4],20,-405537848),a=m(a,b,h,y,n[i+9],5,568446438),y=m(y,a,b,h,n[i+14],9,-1019803690),h=m(h,y,a,b,n[i+3],14,-187363961),b=m(b,h,y,a,n[i+8],20,1163531501),a=m(a,b,h,y,n[i+13],5,-1444681467),y=m(y,a,b,h,n[i+2],9,-51403784),h=m(h,y,a,b,n[i+7],14,1735328473),a=w(a,b=m(b,h,y,a,n[i+12],20,-1926607734),h,y,n[i+5],4,-378558),y=w(y,a,b,h,n[i+8],11,-2022574463),h=w(h,y,a,b,n[i+11],16,1839030562),b=w(b,h,y,a,n[i+14],23,-35309556),a=w(a,b,h,y,n[i+1],4,-1530992060),y=w(y,a,b,h,n[i+4],11,1272893353),h=w(h,y,a,b,n[i+7],16,-155497632),b=w(b,h,y,a,n[i+10],23,-1094730640),a=w(a,b,h,y,n[i+13],4,681279174),y=w(y,a,b,h,n[i+0],11,-358537222),h=w(h,y,a,b,n[i+3],16,-722521979),b=w(b,h,y,a,n[i+6],23,76029189),a=w(a,b,h,y,n[i+9],4,-640364487),y=w(y,a,b,h,n[i+12],11,-421815835),h=w(h,y,a,b,n[i+15],16,530742520),a=x(a,b=w(b,h,y,a,n[i+2],23,-995338651),h,y,n[i+0],6,-198630844),y=x(y,a,b,h,n[i+7],10,1126891415),h=x(h,y,a,b,n[i+14],15,-1416354905),b=x(b,h,y,a,n[i+5],21,-57434055),a=x(a,b,h,y,n[i+12],6,1700485571),y=x(y,a,b,h,n[i+3],10,-1894986606),h=x(h,y,a,b,n[i+10],15,-1051523),b=x(b,h,y,a,n[i+1],21,-2054922799),a=x(a,b,h,y,n[i+8],6,1873313359),y=x(y,a,b,h,n[i+15],10,-30611744),h=x(h,y,a,b,n[i+6],15,-1560198380),b=x(b,h,y,a,n[i+13],21,1309151649),a=x(a,b,h,y,n[i+4],6,-145523070),y=x(y,a,b,h,n[i+11],10,-1120210379),h=x(h,y,a,b,n[i+2],15,718787259),b=x(b,h,y,a,n[i+9],21,-343485551),a=a+k>>>0,b=b+N>>>0,h=h+O>>>0,y=y+dd>>>0}return r.endian([a,b,h,y])})._ff=function(a,b,e,t,n,s,r){var o=a+(b&e|~b&t)+(n>>>0)+r;return(o<<s|o>>>32-s)+b},f._gg=function(a,b,e,t,n,s,r){var o=a+(b&t|e&~t)+(n>>>0)+r;return(o<<s|o>>>32-s)+b},f._hh=function(a,b,e,t,n,s,r){var o=a+(b^e^t)+(n>>>0)+r;return(o<<s|o>>>32-s)+b},f._ii=function(a,b,e,t,n,s,r){var o=a+(e^(b|~t))+(n>>>0)+r;return(o<<s|o>>>32-s)+b},f._blocksize=16,f._digestsize=16,e.exports=function(e,t){if(null==e)throw new Error("Illegal argument "+e);var n=r.wordsToBytes(f(e,t));return t&&t.asBytes?n:t&&t.asString?l.bytesToString(n):r.bytesToHex(n)}},524:function(e,t){var n,r;n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r={rotl:function(e,b){return e<<b|e>>>32-b},rotr:function(e,b){return e<<32-b|e>>>b},endian:function(e){if(e.constructor==Number)return 16711935&r.rotl(e,8)|4278255360&r.rotl(e,24);for(var i=0;i<e.length;i++)e[i]=r.endian(e[i]);return e},randomBytes:function(e){for(var t=[];e>0;e--)t.push(Math.floor(256*Math.random()));return t},bytesToWords:function(e){for(var t=[],i=0,b=0;i<e.length;i++,b+=8)t[b>>>5]|=e[i]<<24-b%32;return t},wordsToBytes:function(e){for(var t=[],b=0;b<32*e.length;b+=8)t.push(e[b>>>5]>>>24-b%32&255);return t},bytesToHex:function(e){for(var t=[],i=0;i<e.length;i++)t.push((e[i]>>>4).toString(16)),t.push((15&e[i]).toString(16));return t.join("")},hexToBytes:function(e){for(var t=[],n=0;n<e.length;n+=2)t.push(parseInt(e.substr(n,2),16));return t},bytesToBase64:function(e){for(var t=[],i=0;i<e.length;i+=3)for(var r=e[i]<<16|e[i+1]<<8|e[i+2],o=0;o<4;o++)8*i+6*o<=8*e.length?t.push(n.charAt(r>>>6*(3-o)&63)):t.push("=");return t.join("")},base64ToBytes:function(e){e=e.replace(/[^A-Z0-9+\/]/gi,"");for(var t=[],i=0,r=0;i<e.length;r=++i%4)0!=r&&t.push((n.indexOf(e.charAt(i-1))&Math.pow(2,-2*r+8)-1)<<2*r|n.indexOf(e.charAt(i))>>>6-2*r);return t}},e.exports=r},525:function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},654:function(e,t,n){"use strict";n.r(t);n(35),n(18),n(26),n(43),n(32),n(5),n(44),n(49),n(33);var r=n(19),o=(n(72),n(79),n(59),n(27),n(552)),c=n.n(o),l=n(506),f=n(501);function d(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var y=(new c.a).setColorGradient("#4CAF50","#F44336").setMidpoint(10),v=n(553),m={components:{NewMap:f.default},data:function(){return{markers:[],center:[46.5,6.5],geojson:{},colors:[],cy:null,places:[]}},computed:{cyElements:{get:function(){return this.$store.getters.getCyElements},set:function(e){this.$store.commit("setCyElements",e)}},clickedNodeIdOnNetwork:{get:function(){return this.$store.getters.getClickedNodeIdOnNetwork},set:function(e){this.$store.commit("setClickedNodeIdOnNetwork",e)}}},watch:{clickedNodeIdOnNetwork:function(e){if(e){var t,n=this.clickedNodeIdOnNetwork,r=this.cy,o=l(n),c=r.elements().dijkstra("#".concat(o)),f={},h=d(this.places);try{for(h.s();!(t=h.n()).done;){var v=t.value,m=l(v),w=c.distanceTo(r.$("#".concat(m)));f[v]=w}}catch(e){h.e(e)}finally{h.f()}var x,k=d(this.geojson.features);try{for(k.s();!(x=k.n()).done;){var N=x.value,O=N.properties.uri;f[O]&&(N.properties.style.color=y.getColor(f[O]))}}catch(e){k.e(e)}finally{k.f()}}},cyElements:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,c,l,f,h,y,v,data,m,w,x,k,N,O;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=[],r=e.cyElements,o=r.elements.nodes){t.next=5;break}return t.abrupt("return");case 5:c=d(o);try{for(c.s();!(l=c.n()).done;)"https://pleiades.stoa.org/places/vocab#Place"===(f=l.value).data.type&&n.push(f.data.uri)}catch(e){c.e(e)}finally{c.f()}if(e.places=n,0!==n.length){t.next=10;break}return t.abrupt("return");case 10:return h="PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n      PREFIX dct: <http://purl.org/dc/terms/>\n      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>\n      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n      PREFIX pleiades: <https://pleiades.stoa.org/places/vocab#>\n      PREFIX osspatial: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/>\n      PREFIX osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/>\n\n      SELECT distinct * WHERE {\n        ?placeUri ex:name ?title; a pleiades:Place . \n        filter (?placeUri in (".concat(n.map((function(e){return"<".concat(e,">")})).join(", "),"))\n        {\n          { ?placeUri wgs84:lat ?lat; wgs84:long ?long . } \n          UNION \n          # { ?placeUri pleiades:hasLocation/osspatial:partiallyOverlaps/geo:hasGeometry/osgeo:asGeoJSON ?geo }\n          { ?placeUri pleiades:hasLocation/osgeo:asGeoJSON ?geo }\n          UNION\n          { ?placeUri osspatial:within/osgeo:extent/osgeo:asGeoJSON ?geo }\n           UNION\n          { ?placeUri osspatial:partiallyOverlaps/osgeo:extent/osgeo:asGeoJSON ?geo }\n        \n        }\n      }"),"https://ogawa.aws.ldas.jp/sparql",y="".concat("https://ogawa.aws.ldas.jp/sparql","?query=").concat(encodeURIComponent(h)),t.next=15,e.$axios.get(y);case 15:v=t.sent,data=v.data,data=e.$utils.convertVtoD(data),m=[],w=[],x=d(data),t.prev=21,x.s();case 23:if((k=x.n()).done){t.next=33;break}if(!(N=k.value).geo){t.next=30;break}return w.push({type:"Feature",geometry:JSON.parse(N.geo),properties:{label:N.title,uri:N.placeUri,style:{color:"red"}}}),t.abrupt("continue",31);case 30:N.lat&&m.push({uri:N.placeUri,label:N.title,latLng:[N.lat,N.long]});case 31:t.next=23;break;case 33:t.next=38;break;case 35:t.prev=35,t.t0=t.catch(21),x.e(t.t0);case 38:return t.prev=38,x.f(),t.finish(38);case 41:O={type:"FeatureCollection",features:w},e.geojson=O,e.markers=m,e.setCy();case 45:case"end":return t.stop()}}),t,null,[[21,35,38,41]])})))()}},mounted:function(){},methods:{setCy:function(){var e=v(this.cyElements);this.cy=e},add_node:function(){this.cy.add([{group:"nodes",data:{id:"node"+this.count},position:{x:300,y:200}},{group:"edges",data:{id:"edge"+this.count,source:"node"+this.count,target:"cat"}}])},getPlaces:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o,c,l,f,data,h,y,v,m,w,x;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:for(o in r=[],e)"https://pleiades.stoa.org/places/vocab#Place"===e[o].type&&r.push(o);return c="PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n      PREFIX dct: <http://purl.org/dc/terms/>\n      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>\n      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n      PREFIX pleiades: <https://pleiades.stoa.org/places/vocab#>\n      PREFIX osspatial: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/>\n      PREFIX osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/>\n\n      SELECT distinct * WHERE {\n        ?placeUri ex:name ?title; a pleiades:Place . \n        filter (?placeUri in (".concat(r.map((function(e){return"<".concat(e,">")})).join(", "),"))\n        {\n          { ?placeUri wgs84:lat ?lat; wgs84:long ?long . } \n          UNION \n          # { ?placeUri pleiades:hasLocation/osspatial:partiallyOverlaps/geo:hasGeometry/osgeo:asGeoJSON ?geo }\n          { ?placeUri pleiades:hasLocation/osgeo:asGeoJSON ?geo }\n          UNION\n          { ?placeUri osspatial:within/osgeo:extent/osgeo:asGeoJSON ?geo }\n           UNION\n          { ?placeUri osspatial:partiallyOverlaps/osgeo:extent/osgeo:asGeoJSON ?geo }\n        \n        }\n      }"),"https://ogawa.aws.ldas.jp/sparql",l="".concat("https://ogawa.aws.ldas.jp/sparql","?query=").concat(encodeURIComponent(c)),n.next=7,t.$axios.get(l);case 7:f=n.sent,data=f.data,data=t.$utils.convertVtoD(data),h=[],y=[],v=d(data),n.prev=13,v.s();case 15:if((m=v.n()).done){n.next=25;break}if(!(w=m.value).geo){n.next=22;break}return y.push({type:"Feature",geometry:JSON.parse(w.geo),properties:{label:w.title,uri:w.placeUri,style:{color:"red"}}}),n.abrupt("continue",23);case 22:w.lat&&h.push({uri:w.placeUri,label:w.title,latLng:[w.lat,w.long]});case 23:n.next=15;break;case 25:n.next=30;break;case 27:n.prev=27,n.t0=n.catch(13),v.e(n.t0);case 30:return n.prev=30,v.f(),n.finish(30);case 33:x={type:"FeatureCollection",features:y},t.geojson=x,t.markers=h;case 36:case"end":return n.stop()}}),n,null,[[13,27,30,33]])})))()}}},w=n(71),component=Object(w.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("NewMap",{attrs:{geojson:e.geojson,center:e.center,markers:e.markers}})],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{NewMap:n(501).default})}}]);