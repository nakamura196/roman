(window.webpackJsonp=window.webpackJsonp||[]).push([[20,9,10,16],{479:function(e,t,n){"use strict";n.r(t);n(18),n(43),n(32),n(5),n(44),n(49),n(33);var r=n(19),o=(n(73),n(35),n(27),n(210),n(79),n(41),n(26),n(7),n(51),n(472));function c(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,d=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){d=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(d)throw o}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var d=function e(t,n){var r=[];if(t.length<n)return[];if(1===n)for(var i=0;i<t.length;i++)r[i]=[t[i]];else for(var o=0;o<t.length-n+1;o++)for(var c=e(t.slice(o+1),n-1),l=0;l<c.length;l++)r.push([t[o]].concat(c[l]));return r},f={components:{network:o.a},props:{id:{type:String,require:!0,default:""}},data:function(){return{isLemma:!0,orgNodes:[],orgEdges:[],nodes:[],nodesMap:{},edgesMap:{},contexts:{},edges:[],options:{nodes:{borderWidth:1},edges:{color:"lightgray"}},dialog:!1,selectedContexts:{},item:{},endpoint:"https://dydra.com/junogawa/romanfactoid/sparql",timeoutId:null}},computed:{selectedEntityIdOnText:{get:function(){return this.$store.getters.getSelectedEntityIdOnText},set:function(e){this.$store.commit("setSelectedEntityIdOnText",e)}},isRedraw:{get:function(){return this.$store.getters.getIsRedraw},set:function(e){this.$store.commit("setIsRedraw",e)}}},watch:{isLemma:function(){this.drawNetwork()},id:function(){this.init(this.id)}},mounted:function(){this.init(this.id)},methods:{init:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o,c,data,l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.isRedraw&&(t.orgNodes=[],t.orgEdges=[],t.nodes=[],t.edge=[],t.nodesMap={},t.isRedraw=!1),r=e,e){n.next=4;break}return n.abrupt("return");case 4:return o="\n      prefix fpo: <https://github.com/johnBradley501/FPO/raw/master/fpo.owl#>\n      prefix owl: <http://www.w3.org/2002/07/owl#>\n      prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n      select distinct * where {\n          ?s ex:eventSince ?eventSince; ex:eventUntil ?eventUntil;\n            ex:contextualAspectOf ?entity .\n          filter (?s = <".concat(r,"> ) .\n          ?entity ex:name ?name; rdf:type ?typeOfEntity .\n          ?eventSince ex:description ?eventSinceDescription .\n          ?eventUntil ex:description ?eventUntilDescription .\n          optional { ?s ex:hasLocation/ex:sourceDescritpion ?locationDescription . }\n      }"),n.next=7,t.$axios.get("".concat(t.endpoint,"?query=").concat(encodeURIComponent(o)));case 7:c=n.sent,data=c.data,l=data[0],t.item=l,t.getRelations(e);case 12:case"end":return n.stop()}}),n)})))()},getRelations:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,filter,o,l,f,data,m,h,y,v,x,w,O,j,_,R,C,E,k,P,S,I,F,D,B,$,V,L,A,M,N,U,T,z,G,W,H,J;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.item,filter="?entityInContext = <".concat(e,">"),o="prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n      SELECT DISTINCT *\n      WHERE {\n        ?entityInContext ex:contextualAspectOf ?entity0 .\n        ?entityReference ex:referencesEntityInContext ?entityInContext; ex:referencesEntity/rdf:type ?typeOfEntity .\n        filter (".concat(filter,") .\n        ?factoid ?hasReference ?entityReference .\n        ?hasReference rdfs:subPropertyOf* ?propertyClass .\n        filter (?propertyClass = ex:sceneObjectProperty || ?propertyClass = ex:sceneProperty).\n        ?factoid ?hasReference2 ?entityReference2 .\n        filter (?entityReference != ?entityReference2)\n        ?hasReference2 rdfs:subPropertyOf* ?propertyClass .\n        ?entityReference2 ex:referencesEntity ?entity; rdf:type ?typeOfEntityReference .\n        OPTIONAL {\n          ?entityReference2 ex:referencesEntityInContext ?entityInContext2 .\n          ?entityInContext2 rdf:type ?typeOfEntityInContext; ex:sourceDescription ?descriptionOfEntityInContext2 }\n        ?entity ex:name ?name; rdf:type ?typeOfEntity2 .\n      }"),l="".concat(t.endpoint,"?query=").concat(encodeURIComponent(o)),n.next=6,t.$axios.get(l);case 6:f=n.sent,data=f.data,m={},h={},e=data[0].entity0,h[e]=r,y=t.edgesMap,v=t.nodesMap,x=t.contexts,t.contexts=x,w=c(data);try{for(w.s();!(O=w.n()).done;)j=O.value,_=j.factoid,m[_]||(m[_]=[e]),R=m[_],C=j.entity,R.includes(C)||R.push(C),h[C]=j,j.entityInContext2&&(E=j.entityInContext2,x[C]||(x[C]={}),x[C][E]=j)}catch(e){w.e(e)}finally{w.f()}for(k in m){P=m[k],S=d(P,2),I=c(S);try{for(I.s();!(F=I.n()).done;){D=F.value,(B=[D[0],D[1]]).sort(),$=B.join("-"),y[$]||(y[$]={from:D[0],to:D[1],color:"gray",shadow:!0}),V=c(D);try{for(V.s();!(L=V.n()).done;)A=L.value,M="#03A9F4",N=null,U=h[A].typeOfEntityReference,T="",T=A===e?h[A].typeOfEntity:h[A].typeOfEntity2,["https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#ConceptualObjectReference","https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObjectReference"].includes(U)?M="yellow":["https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#Community"].includes(T)?(M="red",N=T):["https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Person"].includes(T)?N=T:["https://pleiades.stoa.org/places/vocab#Place"].includes(T)?(M="#98fb98",N=T):["https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Group"].includes(T)&&(M="orange",N=T),v[A]||(v[A]={id:A,label:h[A].name,color:M,shape:"dot",type:N,shadow:!0,size:15})}catch(e){V.e(e)}finally{V.f()}}}catch(e){I.e(e)}finally{I.f()}}if(!(Object.keys(m).length>0)){n.next=31;break}return n.prev=20,n.next=23,t.getAssociatedObjects(v,y,m);case 23:z=n.sent,v=z.nodesMap,y=z.edgesMap,n.next=31;break;case 28:n.prev=28,n.t0=n.catch(20),console.error({e:n.t0});case 31:for(H in G=[],W=[],v)G.push(v[H]);for(J in y)W.push(y[J]);t.orgNodes=G,t.orgEdges=W,t.nodesMap=v,t.edgesMap=y,t.relations=data,t.drawNetwork();case 41:case"end":return n.stop()}}),n,null,[[20,28]])})))()},drawNetwork:function(){var e,t=this.orgEdges,n=this.orgNodes,r=[],o=[],l=[],d=this.isLemma,f=c(n);try{for(f.s();!(e=f.n()).done;){var m=e.value;(d||"lemma"!==m.type)&&(r.push(m),l.push(m.id))}}catch(e){f.e(e)}finally{f.f()}var h,y=c(t);try{for(y.s();!(h=y.n()).done;){var v=h.value,x=v.from,w=v.to;l.includes(x)&&l.includes(w)&&o.push(v)}}catch(e){y.e(e)}finally{y.f()}this.nodes=r,this.edges=o},getAssociatedObjects:function(e,t,n){var o=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var l,d,filter,f,m,h,data,y,v,x,w,O,j,_,R,C,E,k,P,S,I,label,F,D,B,$;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:for(d in l=[],n)l.push("?s = <".concat(d,">"));return filter=l.join(" || "),"https://dydra.com/junogawa/romanfactoid/sparql",f="prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n      prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n      SELECT * WHERE {\n        ?s ?v ?ao . ?ao ex:hasLemma ?lemma; a ?type .\n        filter (".concat(filter,")\n        SERVICE <https://dydra.com/i2k/lemmabank/sparql> {\n          ?lemma rdfs:label ?label .\n        }\n      }"),m="".concat("https://dydra.com/junogawa/romanfactoid/sparql","?query=").concat(encodeURIComponent(f)),r.next=8,o.$axios.get(m);case 8:h=r.sent,data=h.data,y={},v=c(data);try{for(v.s();!(x=v.n()).done;)w=x.value,O=w.label,j=w.ao,_=w.s,y[_]||(y[_]={}),y[_][j]||(y[_][j]={type:w.type,lemma:w.lemma,labels:[]}),(R=y[_][j].labels).includes(O)||R.push(O)}catch(e){v.e(e)}finally{v.f()}for(E in C={"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#ConceptualObjectReference":{color:"pink",shape:"box"},"https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#PhysicalObjectReference":{color:"gray",shape:"diamond"}},y)for(k in y[E]){P=y[E][k],S=P.type,(I=P.labels).sort(),label=I.join(" / "),e[label]||(e[label]={id:label,label:label,color:C[S].color,shape:"dot",type:"lemma",shadow:!0,size:10}),F=n[E],D=c(F);try{for(D.s();!(B=D.n()).done;)$=B.value,t["".concat($,"-").concat(label)]={from:$,to:label,arrows:"to",shadow:!0}}catch(e){D.e(e)}finally{D.f()}}return r.abrupt("return",{nodesMap:e,edgesMap:t});case 16:case"end":return r.stop()}}),r)})))()},onNodeSelected:function(e){var t=e.nodes;if(t.length>0){var n=t[0],r=this.nodesMap[n];["https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Person","https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Location","https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Group","https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#Community"].includes(r.type)&&(this.dialog=!0,this.selectedContexts=this.contexts[r.id])}this.onNodeDblClicked(e)},onNodeDblClicked:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o,c,l,d,f,m;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.isRedraw=!1,!((r=e.nodes).length>0)){n.next=16;break}if(o=r[0],c=t.nodesMap[o],!["https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Person","https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Location","https://github.com/johnBradley501/FPO/raw/master/fpo.owl#Group","https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#Community"].includes(c.type)){n.next=16;break}if(!(l=t.contexts[c.id])){n.next=16;break}d=0,f=Object.keys(l);case 9:if(!(d<f.length)){n.next=16;break}return m=f[d],n.next=13,t.init(m);case 13:d++,n.next=9;break;case 16:case"end":return n.stop()}}),n)})))()}}},m=n(71),h=n(72),y=n.n(h),v=n(223),x=n(484),w=n(471),O=n(568),j=n(569),_=n(650),component=Object(m.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("network",{ref:"network",staticClass:"mt-5",staticStyle:{width:"100%",height:"500px"},attrs:{id:"mynetwork",nodes:e.nodes,edges:e.edges,options:e.options},on:{click:e.onNodeSelected}}),e._v(" "),n("div",{staticClass:"my-4"},[n("v-switch",{attrs:{label:"Lemma"},model:{value:e.isLemma,callback:function(t){e.isLemma=t},expression:"isLemma"}})],1),e._v(" "),n("v-dialog",{attrs:{persistent:"","max-width":"500"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",{staticClass:"text-h5"},[e._v(" Contexts ")]),e._v(" "),n("v-card-text",[n("ul",e._l(e.selectedContexts,(function(t,r){return n("li",{key:r,staticClass:"mt-4"},[n("a",{on:{click:function(t){e.selectedEntityIdOnText=r,e.isRedraw=!0}}},[e._v("\n              "+e._s(t.descriptionOfEntityInContext2)+"\n            ")])])})),0)]),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n          Close\n        ")])],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;y()(component,{VBtn:v.a,VCard:x.a,VCardActions:w.a,VCardText:w.b,VCardTitle:w.c,VDialog:O.a,VSpacer:j.a,VSwitch:_.a})},480:function(e,t,n){var content=n(481);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(23).default)("b1bed018",content,!0,{sourceMap:!1})},481:function(e,t,n){var r=n(22)(!1);r.push([e.i,".theme--light.v-breadcrumbs .v-breadcrumbs__divider,.theme--light.v-breadcrumbs .v-breadcrumbs__item--disabled{color:rgba(0,0,0,.38)}.theme--dark.v-breadcrumbs .v-breadcrumbs__divider,.theme--dark.v-breadcrumbs .v-breadcrumbs__item--disabled{color:hsla(0,0%,100%,.5)}.v-breadcrumbs{align-items:center;display:flex;flex-wrap:wrap;flex:0 1 auto;list-style-type:none;margin:0;padding:18px 12px}.v-breadcrumbs li{align-items:center;display:inline-flex;font-size:14px}.v-breadcrumbs li .v-icon{font-size:16px}.v-breadcrumbs li:nth-child(2n){padding:0 12px}.v-breadcrumbs__item{align-items:center;display:inline-flex;text-decoration:none;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-breadcrumbs__item--disabled{pointer-events:none}.v-breadcrumbs--large li,.v-breadcrumbs--large li .v-icon{font-size:16px}",""]),e.exports=r},494:function(e,t,n){"use strict";n.r(t);n(84);var r=n(28),o=n(46),c=n(37),l=n(29),d=n(10),f=(n(13),n(167));function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(l.a)(e);if(t){var o=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var h=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},y=function(e){Object(o.a)(n,e);var t=m(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return n}(f.Vue);h([Object(f.Prop)({required:!0})],y.prototype,"items",void 0);var v=y=h([Object(f.Component)({components:{}})],y),x=n(71),w=n(72),O=n.n(w),j=n(528),_=n(466),R=n(198),C=n(63),component=Object(x.a)(v,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-sheet",{attrs:{color:"grey lighten-2"}},[n("v-container",{staticClass:"py-2",attrs:{fluid:""}},[n("v-breadcrumbs",{staticClass:"py-0 mx-0 px-0",attrs:{items:e.items},scopedSlots:e._u([{key:"divider",fn:function(){return[n("v-icon",[e._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);t.default=component.exports;O()(component,{VBreadcrumbs:j.a,VContainer:_.a,VIcon:R.a,VSheet:C.a})},507:function(e,t,n){"use strict";n.r(t);var r=n(19),o=(n(73),n(27),n(115)),c=n.n(o),l=n(479),d={components:{EntityNetwork:l.default},props:{id:{type:String,require:!0,default:""}},data:function(){return{item:{}}},watch:{id:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,data,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.id,"entityInContext","http://www.example.com/roman-ontology/resource/".concat("entityInContext","/").concat(n),r="\n        prefix fpo: <https://github.com/johnBradley501/FPO/raw/master/fpo.owl#>\n        prefix owl: <http://www.w3.org/2002/07/owl#>\n        prefix ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n        select distinct * where {\n            ?s ex:eventSince ?eventSince; ex:eventUntil ?eventUntil;\n              ex:contextualAspectOf ?entity .\n            filter (?s = <".concat(n,"> ) .\n            ?entity ex:name ?name; rdf:type ?typeOfEntity .\n            ?eventSince ex:description ?eventSinceDescription .\n            ?eventUntil ex:description ?eventUntilDescription .\n            optional { ?s ex:hasLocation/ex:sourceDescritpion ?locationDescription . }\n        }"),t.next=6,c.a.get("".concat("https://dydra.com/junogawa/romanfactoid/sparql","?query=").concat(encodeURIComponent(r)));case 6:o=t.sent,data=o.data,console.log(data),l=data[0],console.log(l),e.item=l;case 12:case"end":return t.stop()}}),t)})))()}}},f=n(71),m=n(72),h=n.n(m),y=n(538),component=Object(f.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v(e._s(e.item.name)+" ("+e._s(e.id)+")")]),e._v(" "),n("h3",{staticClass:"mt-5"},[e._v("Context Information")]),e._v(" "),n("v-simple-table",{scopedSlots:e._u([{key:"default",fn:function(){return[n("tbody",[n("tr",[n("td",[e._v("ノート")]),e._v(" "),n("td",[e._v(e._s(e.item.description))])]),e._v(" "),n("tr",[n("td",[e._v("開始 Event")]),e._v(" "),n("td",[e._v(e._s(e.item.eventSinceDescription))])]),e._v(" "),n("tr",[n("td",[e._v("終了 Event")]),e._v(" "),n("td",[e._v(e._s(e.item.eventUntilDescription))])])])]},proxy:!0}])}),e._v(" "),n("EntityNetwork",{attrs:{id:e.item.s}})],1)}),[],!1,null,null,null);t.default=component.exports;h()(component,{EntityNetwork:n(479).default}),h()(component,{VSimpleTable:y.a})},509:function(e,t,n){"use strict";n.r(t);n(84);var r=n(28),o=n(46),c=n(37),l=n(29),d=n(10),f=(n(13),n(167));function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(l.a)(e);if(t){var o=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var h=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},y=function(e){Object(o.a)(n,e);var t=m(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return n}(f.Vue);h([Object(f.Prop)({required:!0})],y.prototype,"items",void 0);var v=y=h([Object(f.Component)({components:{}})],y),x=n(71),w=n(72),O=n.n(w),j=n(528),_=n(466),R=n(198),C=n(63),component=Object(x.a)(v,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-sheet",{attrs:{color:"grey lighten-2"}},[n("v-container",{staticClass:"py-2",attrs:{fluid:""}},[n("v-breadcrumbs",{staticClass:"py-0 mx-0 px-0",attrs:{items:e.items},scopedSlots:e._u([{key:"divider",fn:function(){return[n("v-icon",[e._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);t.default=component.exports;O()(component,{VBreadcrumbs:j.a,VContainer:_.a,VIcon:R.a,VSheet:C.a})},528:function(e,t,n){"use strict";n(7),n(5),n(9),n(13),n(8),n(17);var r=n(2),o=(n(79),n(480),n(95)),c=n(14);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f=Object(c.a)(o.a).extend({name:"v-breadcrumbs-item",props:{activeClass:{type:String,default:"v-breadcrumbs__item--disabled"},ripple:{type:[Boolean,Object],default:!1}},computed:{classes:function(){return Object(r.a)({"v-breadcrumbs__item":!0},this.activeClass,this.disabled)}},render:function(e){var t=this.generateRouteLink(),n=t.tag,data=t.data;return e("li",[e(n,d(d({},data),{},{attrs:d(d({},data.attrs),{},{"aria-current":this.isActive&&this.isLink?"page":void 0})}),this.$slots.default)])}}),m=n(1),h=Object(m.i)("v-breadcrumbs__divider","li"),y=n(45);function v(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}t.a=Object(c.a)(y.a).extend({name:"v-breadcrumbs",props:{divider:{type:String,default:"/"},items:{type:Array,default:function(){return[]}},large:Boolean},computed:{classes:function(){return function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({"v-breadcrumbs--large":this.large},this.themeClasses)}},methods:{genDivider:function(){return this.$createElement(h,this.$slots.divider?this.$slots.divider:this.divider)},genItems:function(){for(var e=[],t=!!this.$scopedSlots.item,n=[],i=0;i<this.items.length;i++){var r=this.items[i];n.push(r.text),t?e.push(this.$scopedSlots.item({item:r})):e.push(this.$createElement(f,{key:n.join("."),props:r},[r.text])),i<this.items.length-1&&e.push(this.genDivider())}return e}},render:function(e){var t=this.$slots.default||this.genItems();return e("ul",{staticClass:"v-breadcrumbs",class:this.classes},t)}})},636:function(e,t,n){"use strict";n.r(t);var r=n(509),o=n(507),c={components:{Breadcrumbs:r.default,EntityBlock:o.default},data:function(){return{id:this.$route.params.id}},computed:{bh:function(){return[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.$t("search"),disabled:!1,to:this.localePath({name:"search"}),exact:!0},{text:this.id}]}}},l=n(71),d=n(72),f=n.n(d),m=n(466),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Breadcrumbs",{attrs:{items:e.bh}}),e._v(" "),n("v-container",{staticClass:"my-5"},[n("EntityBlock",{attrs:{id:e.id}})],1)],1)}),[],!1,null,null,null);t.default=component.exports;f()(component,{Breadcrumbs:n(494).default,EntityBlock:n(507).default}),f()(component,{VContainer:m.a})}}]);