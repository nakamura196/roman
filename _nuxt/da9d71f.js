(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{494:function(t,e,n){"use strict";n.r(e);n(84);var r=n(28),o=n(46),c=n(37),l=n(29),d=n(10),f=(n(13),n(167));function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(l.a)(t);if(e){var o=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var h=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},m=function(t){Object(o.a)(n,t);var e=v(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return n}(f.Vue);h([Object(f.Prop)({required:!0})],m.prototype,"items",void 0);var y=m=h([Object(f.Component)({components:{}})],m),_=n(71),j=n(72),x=n.n(j),w=n(528),O=n(466),C=n(198),R=n(63),component=Object(_.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-sheet",{attrs:{color:"grey lighten-2"}},[n("v-container",{staticClass:"py-2",attrs:{fluid:""}},[n("v-breadcrumbs",{staticClass:"py-0 mx-0 px-0",attrs:{items:t.items},scopedSlots:t._u([{key:"divider",fn:function(){return[n("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);e.default=component.exports;x()(component,{VBreadcrumbs:w.a,VContainer:O.a,VIcon:C.a,VSheet:R.a})},645:function(t,e,n){"use strict";n.r(e);var r=n(19);n(73),n(27),n(35),n(18),n(26),n(43),n(32),n(5),n(44),n(49),n(33);function o(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,d=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return l=t.done,t},e:function(t){d=!0,o=t},f:function(){try{l||null==n.return||n.return()}finally{if(d)throw o}}}}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var l={components:{},data:function(){return{baseUrl:"https://nakamura196.github.io/ogawa",title:"Events",results:{},dialog:!1,factoids:{}}},head:function(){return{title:this.title}},computed:{items:function(){return[{text:this.$t("TOP"),disabled:!1,to:this.localePath({name:"index"})},{text:this.title}]}},mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,data,c,l,d,f,v,h,m,y;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://ogawa.aws.ldas.jp/sparql","https://dydra.com/junjun7613/hutimeperiod/sparql",n="\n      PREFIX cidoc: <http://www.cidoc-crm.org/cidoc-crm/>\n      PREFIX ex: <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#>\n      SELECT DISTINCT * WHERE {\n        ?s a cidoc:E5_Event; ex:description ?description . \n          {\n            ?s cidoc:P4_has_time_span ?jd . \n            SERVICE SILENT <".concat("https://dydra.com/junjun7613/hutimeperiod/sparql","> {\n              optional { ?jd rdfs:label ?year . }\n            }\n          }\n        # 関連するFactoidの抽出\n        OPTIONAL {\n          ?factoid ex:referencesEvent ?s; ex:description ?fLabel . \n        }\n      } ORDER BY ?jd\n      LIMIT 200\n    "),e.next=5,t.$axios.get("".concat("https://ogawa.aws.ldas.jp/sparql","?query=").concat(encodeURIComponent(n)));case 5:r=e.sent,data=r.data,c={},l=o(data);try{for(l.s();!(d=l.n()).done;)f=d.value,v=f.jd,c[v]||(c[v]={year:f.year,events:{}}),(h=c[v].events)[f.s]||(h[f.s]=f,h[f.s].factoids={}),m=f.factoid,y=h[f.s].factoids,m&&!y[m]&&(y[m]=f.fLabel)}catch(t){l.e(t)}finally{l.f()}t.results=c;case 11:case"end":return e.stop()}}),e)})))()}},d=l,f=n(71),v=n(72),h=n.n(v),m=n(223),y=n(484),_=n(471),j=n(466),x=n(568),w=n(535),O=n(569),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Breadcrumbs",{attrs:{items:t.items}}),t._v(" "),n("v-container",{staticClass:"my-5"},[n("h2",[t._v(t._s(t.title))]),t._v(" "),t._l(t.results,(function(e,r){return n("v-card",{key:r,staticClass:"mt-5",attrs:{flat:"",outlined:""}},[n("div",{staticClass:"pa-2"},[n("h3",[t._v(t._s(e.year))]),t._v(" "),n("ul",t._l(e.events,(function(e,r){return n("li",{key:r},[Object.keys(e.factoids).length>0?[n("a",{on:{click:function(n){t.dialog=!0,t.factoids=e.factoids}}},[t._v("\n                "+t._s(e.description)+"\n              ")])]:[t._v("\n              "+t._s(e.description)+"\n            ")]],2)})),0)])])}))],2),t._v(" "),n("v-dialog",{model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-card-title",{staticClass:"text-h5 grey lighten-2"},[t._v(" Factoids ")]),t._v(" "),n("v-card-text",[n("ul",t._l(t.factoids,(function(e,r){return n("li",{key:r,staticClass:"mt-4"},[n("nuxt-link",{attrs:{to:t.localePath({name:"text",query:{f_id:t.$utils.getIdFromUri(r)}})}},[t._v("\n              "+t._s(e)+"\n            ")])],1)})),0)]),t._v(" "),n("v-divider"),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"primary",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Close ")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{Breadcrumbs:n(494).default}),h()(component,{VBtn:m.a,VCard:y.a,VCardActions:_.a,VCardText:_.b,VCardTitle:_.c,VContainer:j.a,VDialog:x.a,VDivider:w.a,VSpacer:O.a})}}]);