(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{570:function(t,n,e){var content=e(585);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(23).default)("0c6abf9a",content,!0,{sourceMap:!1})},584:function(t,n,e){"use strict";e(570)},585:function(t,n,e){var r=e(22)(!1);r.push([t.i,"#mynetwork{border:1px solid #d3d3d3}",""]),t.exports=r},643:function(t,n,e){"use strict";e.r(n);e(35),e(18),e(26),e(43),e(32),e(5),e(44),e(49),e(33);var r=e(19);e(73),e(27),e(30),e(52);function o(t,n){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=function(t,n){if(!t)return;if("string"==typeof t)return c(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return c(t,n)}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,d=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return l=t.done,t},e:function(t){d=!0,o=t},f:function(){try{l||null==e.return||e.return()}finally{if(d)throw o}}}}function c(t,n){(null==n||n>t.length)&&(n=t.length);for(var i=0,e=new Array(n);i<n;i++)e[i]=t[i];return e}var l={components:{network:e(472).a},data:function(){return{baseUrl:"https://nakamura196.github.io/ogawa",loading:!1,nodes:[],edges:[],options:{nodes:{borderWidth:1},edges:{color:"lightgray"}},title:this.$t("network"),fact:""}},head:function(){return{title:this.title}},watch:{fact:function(){this.updateFact()}},mounted:function(){this.updateFact()},methods:{onNodeSelected:function(t){var n=t.nodes;if(n.length>0){var s=n[0];this.fact=s}},updateFact:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var e,r,data,c,l,d,f,h,m,v,label,y,s;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.loading=!0,"https://dydra.com/junjun7613/romanfactoid_v2/sparql",e=t.fact,r="\n      select * where {\n        ?s <https://junjun7613.github.io/RomanFactoid_v2/Roman_Contextual_Factoid.owl#mentionedAsPrecedent> ?o . \n        ".concat(e?" filter (?s = <".concat(e,"> || ?o = <").concat(e,">) "):"","\n      }"),n.next=6,t.$axios.get("".concat("https://dydra.com/junjun7613/romanfactoid_v2/sparql","?query=").concat(encodeURIComponent(r)));case 6:data=n.sent.data,c={},l=[],d=o(data);try{for(d.s();!(f=d.n()).done;)h=f.value,m=h.s,v=m.split("/"),label=v[v.length-1],c[m]||(c[m]={id:m,label:label,shape:"dot"}),l.push({from:h.s,to:h.o,arrows:{to:{enabled:!0}}})}catch(t){d.e(t)}finally{d.f()}for(s in y=[],c)y.push(c[s]);t.nodes=y,t.edges=l,t.loading=!1;case 16:case"end":return n.stop()}}),n)})))()}}},d=(e(584),e(71)),f=e(72),h=e.n(f),m=e(223),v=e(466),y=e(195),component=Object(d.a)(l,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-container",[e("h2",[t._v(t._s(t.title))]),t._v(" "),e("p",{staticClass:"mt-5"},[t._v("ノードをクリックしてください。")]),t._v(" "),e("p",{staticClass:"mb-5"},[t._v("選択済み: "+t._s(t.fact||"None"))]),t._v(" "),e("v-btn",{staticClass:"primary my-5",on:{click:function(n){t.fact=""}}},[t._v("リセット")]),t._v(" "),t.loading?e("div",{staticClass:"pa-10 text-center"},[e("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1):t._e(),t._v(" "),e("network",{ref:"network",staticStyle:{width:"100%",height:"500px"},attrs:{id:"mynetwork",nodes:t.nodes,edges:t.edges,options:t.options}})],1)}),[],!1,null,null,null);n.default=component.exports;h()(component,{VBtn:m.a,VContainer:v.a,VProgressCircular:y.a})}}]);