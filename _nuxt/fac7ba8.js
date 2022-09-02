(window.webpackJsonp=window.webpackJsonp||[]).push([[27,19],{575:function(e,t,n){"use strict";n.r(t);n(27);var r={props:{markers:{type:Array,require:!1,default:function(){return[]}},center:{type:Array,require:!1,default:function(){return[51.505,-.159]}},geojson:{type:Object,require:!1,default:function(){return null}}},data:function(){return{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',zoom:5}},computed:{options:function(){return{onEachFeature:this.onEachFeatureFunction}},onEachFeatureFunction:function(){return function(e,t){t.bindPopup('<div><a @click="search('.concat(e.properties.uri,')">').concat(e.properties.label,"</a></div>"))}}}},o=n(71),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("l-map",{staticStyle:{"z-index":"0",height:"600px",width:"100%"},attrs:{zoom:e.zoom,center:e.center}},[n("l-tile-layer",{attrs:{url:e.url,attribution:e.attribution}}),e._v(" "),e.geojson&&Object.keys(e.geojson).length>0?n("l-geo-json",{attrs:{geojson:e.geojson,options:e.options}}):e._e(),e._v(" "),e._l(e.markers,(function(marker,t){return n("l-marker",{key:t,attrs:{"lat-lng":marker.latLng,icon:marker.icon}},[n("l-popup",[n("a",[e._v(e._s(marker.label))])])],1)}))],2)],1)}),[],!1,null,null,null);t.default=component.exports},587:function(e,t,n){var content=n(655);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(23).default)("0a81ecbf",content,!0,{sourceMap:!1})},654:function(e,t,n){"use strict";n(587)},655:function(e,t,n){var r=n(22)(!1);r.push([e.i,"#cy[data-v-444ffb88]{width:100%;height:80%;position:absolute;top:50px;left:1px;text-align:left}body[data-v-444ffb88]{font:14px helvetica neue,helvetica,arial,sans-serif}",""]),e.exports=r},720:function(e,t,n){"use strict";n.r(t);var r=n(19),o=(n(73),n(27),n(35),n(18),n(26),n(43),n(32),n(5),n(44),n(49),n(33),n(575));function c(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,d=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){d=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(d)throw o}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var d=n(602),f={components:{NewMap:o.default},data:function(){return{markers:[],center:[46.5,6.5]}},mounted2:function(){this.view_init()},mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,data,o,l,f,h,y,m,v,w,x,_,E,k,O,j,C,F,R,I,S,P,T,A;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"\n    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n    PREFIX ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n    SELECT * WHERE {\n      ?s a/rdfs:subClassOf*/rdfs:subClassOf ex:Factoid;\n        ex:description ?desc . \n      ?s ?p ?ref . \n      ?ref a/rdfs:subClassOf* ?er;\n        ex:referencesEntity ?referencesEntity;\n        ex:sourceDescription ?sourceDescription . \n      optional {\n        ?referencesEntity ex:name ?referencesEntityName;\n        a ?referencesEntityType .\n        filter (?referencesEntityType != skos:Concept)\n      }\n      optional { ?ref ex:referencesEntityInContext ?referencesEntityInContext } \n      optional { \n        {\n          ?s ?v ?o . ?o a ?typeOfO . ?o a/rdfs:subClassOf*/rdfs:subClassOf ex:Factoid .\n        }\n        UNION\n        {\n          ?o ?v ?s . ?o a ?typeOfS . ?o a/rdfs:subClassOf*/rdfs:subClassOf ex:Factoid .\n        }\n      }\n    }","https://ogawa.aws.ldas.jp/sparql",n="".concat("https://ogawa.aws.ldas.jp/sparql","?query=").concat(encodeURIComponent("\n    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n    PREFIX ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n    SELECT * WHERE {\n      ?s a/rdfs:subClassOf*/rdfs:subClassOf ex:Factoid;\n        ex:description ?desc . \n      ?s ?p ?ref . \n      ?ref a/rdfs:subClassOf* ?er;\n        ex:referencesEntity ?referencesEntity;\n        ex:sourceDescription ?sourceDescription . \n      optional {\n        ?referencesEntity ex:name ?referencesEntityName;\n        a ?referencesEntityType .\n        filter (?referencesEntityType != skos:Concept)\n      }\n      optional { ?ref ex:referencesEntityInContext ?referencesEntityInContext } \n      optional { \n        {\n          ?s ?v ?o . ?o a ?typeOfO . ?o a/rdfs:subClassOf*/rdfs:subClassOf ex:Factoid .\n        }\n        UNION\n        {\n          ?o ?v ?s . ?o a ?typeOfS . ?o a/rdfs:subClassOf*/rdfs:subClassOf ex:Factoid .\n        }\n      }\n    }")),t.next=5,e.$axios.get(n);case 5:r=t.sent,data=r.data,data=e.$utils.convertVtoD(data),o={},l={},f=c(data),t.prev=11,f.s();case 13:if((h=f.n()).done){t.next=45;break}if("https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#EntityReference"!==(y=h.value).er){t.next=17;break}return t.abrupt("continue",43);case 17:if(m=y.s,o[m]||(o[m]={id:m,label:y.desc,shape:"dot",color:"orange",shadow:!0,original_color:"orange",type:"factoid"}),v=y.referencesEntity,o[v]){t.next=39;break}w=y.referencesEntityType,x="gray",t.t0=w,t.next="https://pleiades.stoa.org/places/vocab#Place"===t.t0?26:"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#Community"===t.t0?28:"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#ConceptualObject"===t.t0?30:"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObject"===t.t0?32:"https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Group"===t.t0?34:"https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Person"===t.t0?36:38;break;case 26:return x="#98fb98",t.abrupt("break",38);case 28:return x="red",t.abrupt("break",38);case 30:case 32:return x="yellow",t.abrupt("break",38);case 34:return x="orange",t.abrupt("break",38);case 36:return x="#03A9F4",t.abrupt("break",38);case 38:o[v]={id:v,label:y.referencesEntityName,shape:"dot",color:x,shadow:!0,original_color:x,type:w};case 39:_="".concat(m,"-").concat(v),l[_]={from:m,to:v,color:"gray",arrows:{to:{enabled:!0,type:"arrow"}}},E=m,y.o&&(k=y.o,O=null,j=null,y.typeOfO?(O=E,j=k):(O=k,j=E),C="".concat(O,"-").concat(j),l[C]={from:O,to:j,color:"gray",arrows:{to:{enabled:!0,type:"arrow"}},type:"factoidRelation"});case 43:t.next=13;break;case 45:t.next=50;break;case 47:t.prev=47,t.t1=t.catch(11),f.e(t.t1);case 50:return t.prev=50,f.f(),t.finish(50);case 53:for(R in console.log({nodesMap:o,edgesMap:l}),F=[],o)I=o[R],I.type,F.push({data:{id:R,background_color:I.color}});for(P in S=[],l)T=l[P],S.push({data:{source:T.from,target:T.to}});A=d({container:document.getElementById("cy"),boxSelectionEnabled:!1,autounselectify:!0,style:d.stylesheet().selector("node").css({height:80,width:80,"background-fit":"cover","border-color":"#000","border-width":3,"border-opacity":.5,content:"data(name)","text-valign":"center"}).selector("edge").css({width:6,"target-arrow-shape":"triangle","line-color":"#ffaaaa","target-arrow-color":"#ffaaaa","curve-style":"bezier"}).selector("node[background_color]").css({"background-color":"data(background_color)","text-outline-color":"data(background_color)"}),elements:{nodes:F,edges:S},layout:{name:"breadthfirst",directed:!0,padding:10}}),e.cy=A;case 60:case"end":return t.stop()}}),t,null,[[11,47,50,53]])})))()},methods:{add_node:function(){this.cy.add([{group:"nodes",data:{id:"node"+this.count},position:{x:300,y:200}},{group:"edges",data:{id:"edge"+this.count,source:"node"+this.count,target:"cat"}}])},view_init:function(){var e=d({container:document.getElementById("cy"),boxSelectionEnabled:!1,autounselectify:!0,style:d.stylesheet().selector("node").css({height:80,width:80,"background-fit":"cover","border-color":"#000","border-width":3,"border-opacity":.5,content:"data(name)","text-valign":"center"}).selector("edge").css({width:6,"target-arrow-shape":"triangle","line-color":"#ffaaaa","target-arrow-color":"#ffaaaa","curve-style":"bezier"}),elements:{nodes:[{data:{id:"cat"}},{data:{id:"bird"}},{data:{id:"ladybug"}},{data:{id:"aphid"}},{data:{id:"rose"}},{data:{id:"grasshopper"}},{data:{id:"plant"}},{data:{id:"wheat"}}],edges:[{data:{source:"cat",target:"bird"}},{data:{source:"bird",target:"ladybug"}},{data:{source:"bird",target:"grasshopper"}},{data:{source:"grasshopper",target:"plant"}},{data:{source:"grasshopper",target:"wheat"}},{data:{source:"ladybug",target:"aphid"}},{data:{source:"aphid",target:"rose"}}]},layout:{name:"breadthfirst",directed:!0,padding:10}});this.cy=e,this.calc_test()},calc_test:function(){var e,t=this.cy,n=t.elements().dijkstra("#".concat("cat")),r=c(t.elements());try{for(r.s();!(e=r.n()).done;){var o=e.value[0]._private.data.id;if("cat"!==o){var l=n.pathTo(t.$("#".concat(o))),d=n.distanceTo(t.$("#".concat(o)));console.log(o,{pathToJ:l,distToJ:d})}}}catch(e){r.e(e)}finally{r.f()}}}},h=(n(654),n(71)),y=n(72),m=n.n(y),v=n(223),component=Object(h.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{attrs:{id:"view"}},[n("button",{on:{click:e.add_node}},[e._v("push")]),e._v(" "),n("v-btn",{on:{click:e.calc_test}},[e._v("test")]),e._v(" "),n("div",{attrs:{id:"cy"}})],1),e._v(" "),e._e()],1)}),[],!1,null,"444ffb88",null);t.default=component.exports;m()(component,{NewMap:n(575).default}),m()(component,{VBtn:v.a})}}]);