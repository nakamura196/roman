(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{475:function(t,e,r){"use strict";r.r(e);var n=r(19),o=(r(73),r(74),r(79),r(115)),c=r.n(o),d={props:{id:{type:String,require:!0,default:""}},data:function(){return{baseUrl:"https://nakamura196.github.io/ogawa",text:""}},computed:{},watch:{},mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,d,l,m,w,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$utils.getIdFromUri(t.id),e.next=3,c.a.get(t.baseUrl+"/xml/BG_1_TEI.xml");case 3:for(w in n=e.sent,o=new window.DOMParser,d=o.parseFromString(n.data,"text/xml"),l=t.$utils.getWordListByFactoid(d,r),m=[],l)f=d.querySelector("w[*|id='".concat(w,"']")).textContent.trim(),m.push(f);t.text=m.join(" ");case 10:case"end":return e.stop()}}),e)})))()},methods:{}},l=r(71),component=Object(l.a)(d,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",[t._v("\n  "+t._s(t.text)+"\n")])}),[],!1,null,null,null);e.default=component.exports}}]);