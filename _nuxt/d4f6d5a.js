(window.webpackJsonp=window.webpackJsonp||[]).push([[13,15,18,19],{475:function(e,t,n){"use strict";n.r(t);var r=n(19),o=(n(73),n(74),n(79),n(115)),c=n.n(o),l={props:{id:{type:String,require:!0,default:""}},data:function(){return{baseUrl:"https://nakamura196.github.io/ogawa",text:""}},computed:{},watch:{},mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,l,d,f,h,m;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.$utils.getIdFromUri(e.id),t.next=3,c.a.get(e.baseUrl+"/xml/BG_1_TEI.xml");case 3:for(h in r=t.sent,o=new window.DOMParser,l=o.parseFromString(r.data,"text/xml"),d=e.$utils.getWordListByFactoid(l,n),f=[],d)m=l.querySelector("w[*|id='".concat(h,"']")).textContent.trim(),f.push(m);e.text=f.join(" ");case 10:case"end":return t.stop()}}),t)})))()},methods:{}},d=n(71),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",[e._v("\n  "+e._s(e.text)+"\n")])}),[],!1,null,null,null);t.default=component.exports},486:function(e,t,n){"use strict";n.r(t);n(27);var r={props:{markers:{type:Array,require:!1,default:function(){return[]}},center:{type:Array,require:!1,default:function(){return[51.505,-.159]}},geojson:{type:Object,require:!1,default:function(){return null}}},data:function(){return{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',zoom:5}},computed:{options:function(){return{onEachFeature:this.onEachFeatureFunction}},onEachFeatureFunction:function(){return function(e,t){t.bindPopup('<div><a @click="search('.concat(e.properties.uri,')">').concat(e.properties.label,"</a></div>"))}}}},o=n(71),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("l-map",{staticStyle:{"z-index":"0",height:"600px",width:"100%"},attrs:{zoom:e.zoom,center:e.center}},[n("l-tile-layer",{attrs:{url:e.url,attribution:e.attribution}}),e._v(" "),e.geojson&&Object.keys(e.geojson).length>0?n("l-geo-json",{attrs:{geojson:e.geojson,options:e.options}}):e._e(),e._v(" "),e._l(e.markers,(function(marker,t){return n("l-marker",{key:t,attrs:{"lat-lng":marker.latLng}},[n("l-popup",[n("a",[e._v(e._s(marker.label))])])],1)}))],2)],1)}),[],!1,null,null,null);t.default=component.exports},508:function(e,t,n){"use strict";n.r(t);n(35),n(18),n(26),n(43),n(32),n(5),n(44),n(49),n(33);var r=n(19),o=(n(73),n(27),n(79),n(210),n(41),n(51),n(472));function c(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,d=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){d=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(d)throw o}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var d=!1,f={components:{network:o.a},props:{id:{type:String,require:!0,default:""}},data:function(){return{isLemma:!1,nodes:[],edges:[],nodesMap:{},edgesMap:{},options:{},orgNodes:[],orgEdges:[]}},computed:{selectedFactoidIdOnText:{get:function(){return this.$store.getters.getSelectedFactoidIdOnText},set:function(e){this.$store.commit("setSelectedFactoidIdOnText",e)}}},watch:{isLemma:function(){this.drawNetwork()},id:function(){var e=this.id,t=this.$refs.network;t&&(t.selectNodes([e]),this.neighbourhoodHighlight([e]))}},mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,data,o,l,d,f,h,m,y,v,w,x,_,E,j,F,O,R,k,I,C;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"\n    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n    PREFIX ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n    SELECT * WHERE {\n      ?s a/rdfs:subClassOf* ex:Factoid;\n        ex:description ?desc . \n      ?s ?p ?ref . \n      ?ref a/rdfs:subClassOf* ?er;\n        ex:referencesEntity ?referencesEntity;\n        ex:sourceDescription ?sourceDescription . \n      optional {\n        ?referencesEntity ex:name ?referencesEntityName;\n        a ?referencesEntityType .\n      }\n      optional { ?ref ex:referencesEntityInContext ?referencesEntityInContext } \n      optional { \n        {\n          ?s ?v ?o . ?o a ?typeOfO .\n        }\n        UNION\n        {\n          ?o ?v ?s . ?o a ?typeOfS .\n        }\n        ?o a/rdfs:subClassOf* ex:Factoid .\n      }\n    }","https://dydra.com/junogawa/romanfactoid/sparql",n="".concat("https://dydra.com/junogawa/romanfactoid/sparql","?query=").concat(encodeURIComponent("\n    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n    PREFIX ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n    SELECT * WHERE {\n      ?s a/rdfs:subClassOf* ex:Factoid;\n        ex:description ?desc . \n      ?s ?p ?ref . \n      ?ref a/rdfs:subClassOf* ?er;\n        ex:referencesEntity ?referencesEntity;\n        ex:sourceDescription ?sourceDescription . \n      optional {\n        ?referencesEntity ex:name ?referencesEntityName;\n        a ?referencesEntityType .\n      }\n      optional { ?ref ex:referencesEntityInContext ?referencesEntityInContext } \n      optional { \n        {\n          ?s ?v ?o . ?o a ?typeOfO .\n        }\n        UNION\n        {\n          ?o ?v ?s . ?o a ?typeOfS .\n        }\n        ?o a/rdfs:subClassOf* ex:Factoid .\n      }\n    }")),t.next=5,e.$axios.get(n);case 5:r=t.sent,data=r.data,console.log({data:data}),o={},l={},d=c(data),t.prev=11,d.s();case 13:if((f=d.n()).done){t.next=46;break}if("https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#EntityReference"!==(h=f.value).er){t.next=17;break}return t.abrupt("continue",44);case 17:if(m=h.s,o[m]||(o[m]={id:m,label:h.desc,shape:"dot",color:"orange",shadow:!0,original_color:"orange",type:"factoid"}),y=h.referencesEntity,o[y]){t.next=40;break}v=h.referencesEntityType,console.log({referencesEntityType:v,obj:h}),w="gray",t.t0=v,t.next="https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Location"===t.t0?27:"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#Community"===t.t0?29:"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#ConceptualObject"===t.t0?31:"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObject"===t.t0?33:"https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Group"===t.t0?35:"https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Person"===t.t0?37:39;break;case 27:return w="#98fb98",t.abrupt("break",39);case 29:return w="red",t.abrupt("break",39);case 31:case 33:return w="yellow",t.abrupt("break",39);case 35:return w="orange",t.abrupt("break",39);case 37:return w="#03A9F4",t.abrupt("break",39);case 39:o[y]={id:y,label:h.referencesEntityName,shape:"dot",color:w,shadow:!0,original_color:w};case 40:x="".concat(m,"-").concat(y),l[x]={from:m,to:y,color:"gray",arrows:{to:{enabled:!0,type:"arrow"}}},_=m,h.o&&(E=h.o,j="".concat(_,"-").concat(E),F=null,O=null,h.typeOfO?(F=_,O=E):(F=E,O=_),l[j]={from:F,to:O,color:"gray",arrows:{to:{enabled:!0,type:"arrow"}}});case 44:t.next=13;break;case 46:t.next=51;break;case 48:t.prev=48,t.t1=t.catch(11),d.e(t.t1);case 51:return t.prev=51,d.f(),t.finish(51);case 54:for(I in e.nodesMap=o,e.edgesMap=l,R=[],k=[],o)R.push(o[I]);for(C in l)k.push(l[C]);e.orgEdges=k,e.orgNodes=R,e.drawNetwork();case 63:case"end":return t.stop()}}),t,null,[[11,48,51,54]])})))()},mounted2:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,data,o,l,d,f,h,m,y,v,w,x,_,E,j,F,O,R,k,I,C,N,L;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"PREFIX ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n        SELECT * WHERE {\n          ?s ?v ?o; ex:description ?desc_s . \n          OPTIONAL {\n            ?s ?related_so ?s_o .\n            {\n              ?s_o ex:referencesEntityInContext ?entityInContext_s; \n              ex:referencesEntity ?referencesEntity_s .\n            }\n            UNION\n            {\n              ?s_o ex:referencesEntity ?referencesEntity_s .\n            }\n            ?referencesEntity_s ex:name ?referencesEntityName_s; rdf:type ?referencesEntityType_s\n          }\n          ?o ex:description ?desc_o .\n          filter (?v = ex:mentionedAsPrecedent || ?v = ex:mentionedAsParallel || ?v = ex:hasContent)\n\n          OPTIONAL {\n            ?o ?related_oo ?o_o .\n            {\n              ?o_o ex:referencesEntityInContext ?entityInContext_o; ex:referencesEntity ?referencesEntity_o .\n            }\n            UNION\n            {\n              ?o_o ex:referencesEntity ?referencesEntity_o .\n            }\n            ?referencesEntity_o ex:name ?referencesEntityName_o; rdf:type ?referencesEntityType_o . \n          }\n        }","https://dydra.com/junogawa/romanfactoid/sparql",n="".concat("https://dydra.com/junogawa/romanfactoid/sparql","?query=").concat(encodeURIComponent("PREFIX ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n        SELECT * WHERE {\n          ?s ?v ?o; ex:description ?desc_s . \n          OPTIONAL {\n            ?s ?related_so ?s_o .\n            {\n              ?s_o ex:referencesEntityInContext ?entityInContext_s; \n              ex:referencesEntity ?referencesEntity_s .\n            }\n            UNION\n            {\n              ?s_o ex:referencesEntity ?referencesEntity_s .\n            }\n            ?referencesEntity_s ex:name ?referencesEntityName_s; rdf:type ?referencesEntityType_s\n          }\n          ?o ex:description ?desc_o .\n          filter (?v = ex:mentionedAsPrecedent || ?v = ex:mentionedAsParallel || ?v = ex:hasContent)\n\n          OPTIONAL {\n            ?o ?related_oo ?o_o .\n            {\n              ?o_o ex:referencesEntityInContext ?entityInContext_o; ex:referencesEntity ?referencesEntity_o .\n            }\n            UNION\n            {\n              ?o_o ex:referencesEntity ?referencesEntity_o .\n            }\n            ?referencesEntity_o ex:name ?referencesEntityName_o; rdf:type ?referencesEntityType_o . \n          }\n        }")),t.next=5,e.$axios.get(n);case 5:r=t.sent,data=r.data,o={},l={},d=c(data),t.prev=10,d.s();case 12:if((f=d.n()).done){t.next=49;break}h=f.value,m=0,y=["s","o"];case 16:if(!(m<y.length)){t.next=43;break}if(v=y[m],w=h[v],o[w]||(o[w]={id:w,label:h["desc_".concat(v)],shape:"dot",color:"orange",shadow:!0,original_color:"orange",type:"factoid"}),x=h["referencesEntity_".concat(v)],o[x]){t.next=38;break}_=h["referencesEntityType_".concat(v)],E="#03A9F4",t.t0=_,t.next="https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Location"===t.t0?27:"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#Community"===t.t0?29:"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#ConceptualObject"===t.t0?31:"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObject"===t.t0?33:"https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Group"===t.t0?35:37;break;case 27:return E="#98fb98",t.abrupt("break",37);case 29:return E="red",t.abrupt("break",37);case 31:case 33:return E="yellow",t.abrupt("break",37);case 35:return E="orange",t.abrupt("break",37);case 37:o[x]={id:x,label:h["referencesEntityName_".concat(v)],shape:"dot",color:E,shadow:!0,original_color:E};case 38:j="".concat(w,"-").concat(x),l[j]={from:w,to:x,color:"gray",arrows:{to:{enabled:!0,type:"arrow"}}};case 40:m++,t.next=16;break;case 43:F=h.s,O=h.o,R="".concat(F,"-").concat(O),l[R]={from:F,to:O,color:"gray",arrows:{to:{enabled:!0,type:"arrow"}}};case 47:t.next=12;break;case 49:t.next=54;break;case 51:t.prev=51,t.t1=t.catch(10),d.e(t.t1);case 54:return t.prev=54,d.f(),t.finish(54);case 57:return t.next=59,e.getAssociatedObjects(o,l);case 59:for(N in k=t.sent,o=k.nodesMap,l=k.edgesMap,e.nodesMap=o,e.edgesMap=l,I=[],C=[],o)I.push(o[N]);for(L in l)C.push(l[L]);e.orgEdges=C,e.orgNodes=I,e.drawNetwork();case 71:case"end":return t.stop()}}),t,null,[[10,51,54,57]])})))()},methods:{getAssociatedObjects:function(e,t){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var o,l,filter,d,f,h,data,m,y,v,w,x,_,E,j,F,O,R,k,I,C,label,N;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:for(l in o=[],e)"factoid"===e[l].type&&o.push("?s = <".concat(l,">"));if(0!==o.length){r.next=4;break}return r.abrupt("return",{nodesMap:e,edgesMap:t});case 4:return filter=o.join(" || "),"https://dydra.com/junogawa/romanfactoid/sparql",d="PREFIX ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n      SELECT * WHERE {\n        ?s ?v ?ao . ?ao ex:hasLemma ?lemma; a ?type .\n        FILTER (".concat(filter,")\n        SERVICE <https://dydra.com/i2k/lemmabank/sparql> {\n          ?lemma rdfs:label ?label .\n        }\n      }"),f="".concat("https://dydra.com/junogawa/romanfactoid/sparql","?query=").concat(encodeURIComponent(d)),r.next=10,n.$axios.get(f);case 10:h=r.sent,data=h.data,m={},y=c(data);try{for(y.s();!(v=y.n()).done;)w=v.value,x=w.label,_=w.ao,E=w.s,m[E]||(m[E]={}),m[E][_]||(m[E][_]={type:w.type,labels:[]}),(j=m[E][_].labels).includes(x)||j.push(x)}catch(e){y.e(e)}finally{y.f()}for(O in F={"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#ConceptualObjectReference":{color:"pink"},"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObjectReference":{color:"gray"}},m)for(R in m[O])k=m[O][R],I=k.type,(C=k.labels).sort(),label=C.join(" / "),e[label]||(N=F[I].color,e[label]={id:label,label:label,color:N,shape:"dot",type:"lemma",shadow:!0,size:10,original_color:N}),t["".concat(O,"-").concat(label)]={from:O,to:label,arrows:"to",color:"gray"};return r.abrupt("return",{nodesMap:e,edgesMap:t});case 18:case"end":return r.stop()}}),r)})))()},drawNetwork:function(){var e,t=this.orgEdges,n=this.orgNodes,r=[],o=[],l=[],d=this.isLemma,f=c(n);try{for(f.s();!(e=f.n()).done;){var h=e.value;(d||"lemma"!==h.type)&&(r.push(h),l.push(h.id))}}catch(e){f.e(e)}finally{f.f()}var m,y=c(t);try{for(y.s();!(m=y.n()).done;){var v=m.value,w=v.from,x=v.to;l.includes(w)&&l.includes(x)&&o.push(v)}}catch(e){y.e(e)}finally{y.f()}this.nodes=r,this.edges=o},neighbourhoodHighlightByHand:function(e){this.neighbourhoodHighlight(e.nodes),this.onNodeSelected(e)},neighbourhoodHighlight:function(e){var t=JSON.parse(JSON.stringify(this.nodesMap)),n=this.$refs.network;if(e.length>0){var i,r;d=!0;var o=e[0];for(var c in t)t[c].color="rgba(200,200,200,0.5)",void 0===t[c].hiddenLabel&&(t[c].hiddenLabel=t[c].label,t[c].label=void 0);var l=n.getConnectedNodes(o),f=[];for(i=1;i<2;i++)for(r=0;r<l.length;r++)f=f.concat(n.getConnectedNodes(l[r]));for(i=0;i<f.length;i++)t[f[i]].color="rgba(150,150,150,0.75)",void 0!==t[f[i]].hiddenLabel&&(t[f[i]].label=t[f[i]].hiddenLabel,t[f[i]].hiddenLabel=void 0);for(i=0;i<l.length;i++)t[l[i]].color=t[l[i]].original_color,void 0!==t[l[i]].hiddenLabel&&(t[l[i]].label=t[l[i]].hiddenLabel,t[l[i]].hiddenLabel=void 0);t[o].color={border:"black",background:t[o].original_color,highlight:{background:t[o].original_color,border:"black"}},void 0!==t[o].hiddenLabel&&(t[o].label=t[o].hiddenLabel,t[o].hiddenLabel=void 0)}else if(!0===d){for(var h in t)t[h].color=t[h].original_color,void 0!==t[h].hiddenLabel&&(t[h].label=t[h].hiddenLabel,t[h].hiddenLabel=void 0);d=!1}var m=[],y=this.isLemma;for(var v in t)if(t[v]){var w=t[v];if(!y&&"lemma"===w.type)continue;m.push(w)}this.nodes=m},neighbourhoodHighlight2:function(e){console.log({params:e});var t=JSON.parse(JSON.stringify(this.nodesMap)),n=this.$refs.network;if(e.nodes.length>0){var i,r;d=!0;var o=e.nodes[0];for(var c in t)t[c].color="rgba(200,200,200,0.5)",void 0===t[c].hiddenLabel&&(t[c].hiddenLabel=t[c].label,t[c].label=void 0);var l=n.getConnectedNodes(o),f=[];for(i=1;i<2;i++)for(r=0;r<l.length;r++)f=f.concat(n.getConnectedNodes(l[r]));for(i=0;i<f.length;i++)t[f[i]].color="rgba(150,150,150,0.75)",void 0!==t[f[i]].hiddenLabel&&(t[f[i]].label=t[f[i]].hiddenLabel,t[f[i]].hiddenLabel=void 0);for(i=0;i<l.length;i++)t[l[i]].color=t[l[i]].original_color,void 0!==t[l[i]].hiddenLabel&&(t[l[i]].label=t[l[i]].hiddenLabel,t[l[i]].hiddenLabel=void 0);t[o].color=t[o].original_color,void 0!==t[o].hiddenLabel&&(t[o].label=t[o].hiddenLabel,t[o].hiddenLabel=void 0)}else if(!0===d){for(var h in t)t[h].color=t[h].original_color,void 0!==t[h].hiddenLabel&&(t[h].label=t[h].hiddenLabel,t[h].hiddenLabel=void 0);d=!1}var m=[];for(var y in t)t[y]&&m.push(t[y]);this.nodes=m},onNodeSelected:function(e){var t=e.nodes;if(t.length>0){var n=t[0],r=this.nodesMap[n];if("factoid"===r.type)this.selectedFactoidIdOnText=this.$utils.getIdFromUri(r.id);else{if(!r.context)return;this.selectedEntityIdOnText=this.$utils.getIdFromUri(r.context)}}}}},h=n(71),m=n(72),y=n.n(m),v=n(650),component=Object(h.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.nodes.length>0?n("div",{staticClass:"mb-5"},[n("network",{ref:"network",staticClass:"mt-5",staticStyle:{width:"100%",height:"500px",border:"1px solid lightgray"},attrs:{nodes:e.nodes,edges:e.edges,options:e.options},on:{click:e.neighbourhoodHighlightByHand}}),e._v(" "),n("div",{staticClass:"mt-4"},[n("v-switch",{attrs:{label:"Lemma"},model:{value:e.isLemma,callback:function(t){e.isLemma=t},expression:"isLemma"}})],1)],1):e._e()}),[],!1,null,null,null);t.default=component.exports;y()(component,{VSwitch:v.a})},578:function(e,t,n){"use strict";n.r(t);n(35),n(18),n(26),n(43),n(32),n(5),n(44),n(49),n(33);var r=n(19),o=(n(27),n(79),n(73),n(115)),c=n.n(o),l=n(508),d=n(475);function f(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var m={components:{FactoidNetwork2:l.default,TeiText:d.default},props:{id:{type:String,require:!0,default:""}},data:function(){return{xml:"",geo:{},markers:[],center:[51.505,-.159],geojson:null,item:{},isMapDisplayed:!1}},computed:{},watch:{id:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.geo={},e.markers=[],t.next=4,e.getItem();case 4:case"end":return t.stop()}}),t)})))()},getItem:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,l,i,d,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"https://dydra.com/junogawa/romanfactoid/sparql",n=e.id,r="\n        prefix fpo: <https://github.com/johnBradley501/FPO/raw/master/fpo.owl#>\n        prefix owl: <http://www.w3.org/2002/07/owl#>\n        prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n        select distinct * where {\n            ?s ex:description ?description .\n            filter (?s = <".concat("http://www.example.com/roman-ontology/resource/Factoid/"+n,"> ) .\n\n            optional {\n              { ?s ex:atWhere/ex:referencesEntity/owl:sameAs ?placeUri . }\n              UNION\n              { ?s ex:fromWhere/ex:referencesEntity/owl:sameAs ?placeUri . }\n              UNION\n              { ?s ex:toWhere/ex:referencesEntity/owl:sameAs ?placeUri . }\n              UNION\n              { ?s ex:nearWhere/ex:referencesEntity/owl:sameAs ?placeUri . }\n            }\n        }"),t.next=6,c.a.get("".concat("https://dydra.com/junogawa/romanfactoid/sparql","?query=").concat(encodeURIComponent(r)));case 6:for(o=t.sent.data,l={},i=0;i<o.length;i++){if(d=o[i],0===i){for(f in d)l[f]=d[f];l.placeUri=[]}l.placeUri.push(d.placeUri)}e.item=l;case 10:case"end":return t.stop()}}),t)})))()},getPlaceInfo:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,c,l,d,h,m,y,data,v,w,x,_,E,j,marker,F;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.item,r=[],o=f(n.placeUri);try{for(o.s();!(c=o.n()).done;)l=c.value,r.push("?placeUri = <".concat(l,">"))}catch(e){o.e(e)}finally{o.f()}return d=r.join(" || "),"https://triplydb.com/_api/datasets/wouter/pleiades/services/pleiades/sparql",h="PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n      PREFIX dct: <http://purl.org/dc/terms/>\n      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>\n\n      PREFIX pleiades: <https://pleiades.stoa.org/places/vocab#>\n      PREFIX osspatial: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/>\n      PREFIX osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/>\n\n      SELECT * WHERE {\n        ?placeUri dct:title ?title .\n        optional {\n          { ?placeUri wgs84:lat ?lat; wgs84:long ?long . }\n          UNION\n          { ?placeUri pleiades:hasLocation/osspatial:partiallyOverlaps/geo:hasGeometry/osgeo:asGeoJSON ?geo }\n        }\n        filter(".concat(d,")\n      }"),m="".concat("https://triplydb.com/_api/datasets/wouter/pleiades/services/pleiades/sparql","?query=").concat(encodeURIComponent(h)),t.next=10,e.$axios.get(m);case 10:if(y=t.sent,(data=y.data).length>0){v=[],w=[],x=[],_=f(data);try{for(_.s();!(E=_.n()).done;)(j=E.value).lat?(marker={latLng:[j.lat,j.long],label:j.title},w.push(marker),x=[j.lat,j.long]):v.push({type:"Feature",geometry:JSON.parse(j.geo),properties:{label:j.title,uri:j.placeUri}})}catch(e){_.e(e)}finally{_.f()}v.length>0&&(F={type:"FeatureCollection",features:v},e.geojson=F),w.length>0&&(e.markers=w,e.center=x)}case 13:case"end":return t.stop()}}),t)})))()}}},y=n(71),v=n(72),w=n.n(v),x=n(650),component=Object(y.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.item.description?n("h2",{staticClass:"mb-5"},[e._v("\n    "+e._s(e.item.description)+" ("+e._s(e.$utils.createFactoidTitleFromId(e.id))+")\n  ")]):e._e(),e._v(" "),e.xml?[n("h3",{staticClass:"mt-5"},[e._v("このFactoidの典拠")]),e._v(" "),n("span",{domProps:{innerHTML:e._s(e.xml)}})]:e._e(),e._v(" "),e.markers.length>0||e.geojson?[n("v-switch",{attrs:{label:"Display Map"},model:{value:e.isMapDisplayed,callback:function(t){e.isMapDisplayed=t},expression:"isMapDisplayed"}}),e._v(" "),n("Map",{directives:[{name:"show",rawName:"v-show",value:e.isMapDisplayed,expression:"isMapDisplayed"}],attrs:{markers:e.markers,center:e.center,geojson:e.geojson}})]:e._e(),e._v(" "),n("FactoidNetwork2",{attrs:{id:e.item.s}}),e._v(" "),e._e()],2)}),[],!1,null,null,null);t.default=component.exports;w()(component,{Map:n(486).default,FactoidNetwork2:n(508).default,TeiText:n(475).default}),w()(component,{VSwitch:x.a})}}]);