(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{478:function(t,e,n){"use strict";var o=n(10),r=(n(41),n(7),n(26),n(498)),c=n(76),l=n(14),h=n(1),f=n(12),d=Object(l.a)(r.a,c.a);e.a=d.extend({name:"activatable",props:{activator:{default:null,validator:function(t){return["string","object"].includes(Object(o.a)(t))}},disabled:Boolean,internalActivator:Boolean,openOnHover:Boolean,openOnFocus:Boolean},data:function(){return{activatorElement:null,activatorNode:[],events:["click","mouseenter","mouseleave","focus"],listeners:{}}},watch:{activator:"resetActivator",openOnFocus:"resetActivator",openOnHover:"resetActivator"},mounted:function(){var t=Object(h.t)(this,"activator",!0);t&&["v-slot","normal"].includes(t)&&Object(f.b)('The activator slot must be bound, try \'<template v-slot:activator="{ on }"><v-btn v-on="on">\'',this),this.addActivatorEvents()},beforeDestroy:function(){this.removeActivatorEvents()},methods:{addActivatorEvents:function(){if(this.activator&&!this.disabled&&this.getActivator()){this.listeners=this.genActivatorListeners();for(var t=0,e=Object.keys(this.listeners);t<e.length;t++){var n=e[t];this.getActivator().addEventListener(n,this.listeners[n])}}},genActivator:function(){var t=Object(h.s)(this,"activator",Object.assign(this.getValueProxy(),{on:this.genActivatorListeners(),attrs:this.genActivatorAttributes()}))||[];return this.activatorNode=t,t},genActivatorAttributes:function(){return{role:"button","aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genActivatorListeners:function(){var t=this;if(this.disabled)return{};var e={};return this.openOnHover?(e.mouseenter=function(e){t.getActivator(e),t.runDelay("open")},e.mouseleave=function(e){t.getActivator(e),t.runDelay("close")}):e.click=function(e){var n=t.getActivator(e);n&&n.focus(),e.stopPropagation(),t.isActive=!t.isActive},this.openOnFocus&&(e.focus=function(e){t.getActivator(e),e.stopPropagation(),t.isActive=!t.isActive}),e},getActivator:function(t){var e;if(this.activatorElement)return this.activatorElement;var n=null;if(this.activator){var o=this.internalActivator?this.$el:document;n="string"==typeof this.activator?o.querySelector(this.activator):this.activator.$el?this.activator.$el:this.activator}else if(1===this.activatorNode.length||this.activatorNode.length&&!t){var r=this.activatorNode[0].componentInstance;n=r&&r.$options.mixins&&r.$options.mixins.some((function(t){return t.options&&["activatable","menuable"].includes(t.options.name)}))?r.getActivator():this.activatorNode[0].elm}else t&&(n=t.currentTarget||t.target);return this.activatorElement=(null==(e=n)?void 0:e.nodeType)===Node.ELEMENT_NODE?n:null,this.activatorElement},getContentSlot:function(){return Object(h.s)(this,"default",this.getValueProxy(),!0)},getValueProxy:function(){var t=this;return{get value(){return t.isActive},set value(e){t.isActive=e}}},removeActivatorEvents:function(){if(this.activator&&this.activatorElement){for(var t=0,e=Object.keys(this.listeners);t<e.length;t++){var n=e[t];this.activatorElement.removeEventListener(n,this.listeners[n])}this.listeners={}}},resetActivator:function(){this.removeActivatorEvents(),this.activatorElement=null,this.getActivator(),this.addActivatorEvents()}}})},485:function(t,e,n){"use strict";n.r(e);n(84),n(35),n(18),n(43),n(32),n(5),n(44),n(49),n(33);var o=n(28),r=n(40),c=n(46),l=n(37),h=n(29),f=n(10),d=(n(13),n(26),n(41),n(167)),v=n(495);function m(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,o=function(){};return{s:o,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,r=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw r}}}}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function O(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(h.a)(t);if(e){var r=Object(h.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var x=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},w=function(t){Object(c.a)(n,t);var e=O(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"getComponent",value:function(element){return"div"===element.name||"div1"===element.name?"div":"p"===element.name?"p":"span"}},{key:"wordAttributes",get:function(){return this.$store.getters.getWordAttributes}},{key:"entityAttributes",get:function(){return this.$store.getters.getEntityAttributes}},{key:"selectedFactoidIdOnText",get:function(){return this.$store.getters.getSelectedFactoidIdOnText},set:function(t){this.$store.commit("setSelectedFactoidIdOnText",t)}},{key:"selectedEntityIdOnText",get:function(){return this.$store.getters.getSelectedEntityIdOnText},set:function(t){this.$store.commit("setSelectedEntityIdOnText",t)}},{key:"selectedReferenceIdOnText",get:function(){return this.$store.getters.getSelectedReferenceIdOnText},set:function(t){this.$store.commit("setSelectedReferenceIdOnText",t)}},{key:"hasSpanId",value:function(element){if(element.attributes){var t=element.attributes["xml:id"];return this.wordAttributes[t]}return!1}},{key:"getSpanId",value:function(element){if(element.attributes){var t=element.attributes["xml:id"];return this.wordAttributes[t]}return[]}},{key:"isHightlighted",value:function(element){var t,e=!1,n=[],o=m(this.getSpanId(element));try{for(o.s();!(t=o.n()).done;){var span=t.value;n.push(span.id)}}catch(t){o.e(t)}finally{o.f()}return n.includes(this.selectedFactoidIdOnText)&&(e=!0),e}},{key:"getTypeColor",value:function(t){return"ContactFactoid"===t?"#FFEE58":"FamilialRelationshipFactoid"===t?"#42A5F5":"SocialRelationshipFactoid"===t?"#66BB6A":"ActionFactoid"===t?"#BDBDBD":"SituationFactoid"===t?"red":"#BDBDBD"}},{key:"clickFactoid",value:function(t){this.selectedEntityIdOnText="",this.selectedFactoidIdOnText=t}}]),n}(d.Vue);x([Object(d.Prop)({})],w.prototype,"element",void 0);var A=w=x([Object(d.Component)({name:"TEI",components:{TEI:L,TEI4Entity:v.default}})],w),T=n(71),E=n(72),j=n.n(E),k=n(2),I=(n(34),n(524),n(478)),S=n(38),N=n(498),$=n(214),_=n(499),D=n(76),C=n(1),R=n(12),B=n(14),F=Object(B.a)(S.a,N.a,$.a,_.a,D.a).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!(this.bottom||this.left||this.top||this.right),o=!1!==this.attach?e.offsetLeft:e.left,r=0;return this.top||this.bottom||n?r=o+e.width/2-content.width/2:(this.left||this.right)&&(r=o+(this.right?e.width:-content.width)+(this.right?10:-10)),this.nudgeLeft&&(r-=parseInt(this.nudgeLeft)),this.nudgeRight&&(r+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(r,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!1!==this.attach?e.offsetTop:e.top,o=0;return this.top||this.bottom?o=n+(this.bottom?e.height:-content.height)+(this.bottom?10:-10):(this.left||this.right)&&(o=n+e.height/2-content.height/2),this.nudgeTop&&(o-=parseInt(this.nudgeTop)),this.nudgeBottom&&(o+=parseInt(this.nudgeBottom)),!1===this.attach&&(o+=this.pageYOffset),"".concat(this.calcYOverflow(o),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(C.h)(this.maxWidth),minWidth:Object(C.h)(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(C.t)(this,"activator",!0)&&Object(R.b)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=I.a.options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===C.x.esc&&(t.getActivator(e),t.runDelay("close"))},e},genActivatorAttributes:function(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition:function(){var content=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[content]):content},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(k.a)(t,this.contentClass,!0),Object(k.a)(t,"menuable__content__active",this.isActive),Object(k.a)(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}}),component=Object(T.a)(A,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.getComponent(t.element),{tag:"component"},[t.element.text?[t._v("\n    "+t._s(t.element.text)+"\n  ")]:"w"===t.element.name?[t.hasSpanId(t.element)?[n("span",{staticStyle:{display:"inline-block"},style:t.isHightlighted(t.element)?"background-color: #E0E0E0;":""},[t._l(t.element.elements,(function(t,e){return[n("TEI",{key:e,attrs:{element:t}})]})),t._v("\n         \n        "),t._l(t.getSpanId(t.element),(function(e,o){return n("v-tooltip",{key:"l-"+o,attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(o){var r=o.on,c=o.attrs;return[n("div",t._g(t._b({staticStyle:{"margin-bottom":"4px",height:"8px",cursor:"pointer"},style:"background-color: "+t.getTypeColor(e.type),attrs:{id:e.id},on:{click:function(n){return t.clickFactoid(e.id)}}},"div",c,!1),r))]}}],null,!0)},[t._v(" "),n("span",[t._v(t._s(e.note))])])}))],2)]:[n("span",[t._l(t.element.elements,(function(t,e){return[n("TEI",{key:e,attrs:{element:t}})]}))],2)]]:"persName"===t.element.name||"orgName"===t.element.name||"placeName"===t.element.name?[n("TEI4Entity",{attrs:{element:t.element}})]:"milestone"===t.element.name?["chapter"===t.element.attributes.unit?[n("h3",{staticClass:"mt-10"},[t._v("Chapter. "+t._s(t.element.attributes.n))])]:"section"===t.element.attributes.unit?[n("h4",{staticClass:"mt-5"},[t._v("Section. "+t._s(t.element.attributes.n))])]:t._e()]:[t._l(t.element.elements,(function(t,e){return[n("TEI",{key:e,attrs:{element:t}})]}))]],2)}),[],!1,null,null,null),L=e.default=component.exports;j()(component,{TEI:n(485).default,TEI4Entity:n(495).default}),j()(component,{VTooltip:F})},492:function(t,e,n){"use strict";var o=n(2),r=n(10),c=(n(8),n(221)),l=n(1),h=n(14),f=n(12);e.a=Object(h.a)(c.a).extend({name:"detachable",props:{attach:{default:!1,validator:function(t){var e=Object(r.a)(t);return"boolean"===e||"string"===e||t.nodeType===Node.ELEMENT_NODE}},contentClass:{type:String,default:""}},data:function(){return{activatorNode:null,hasDetached:!1}},watch:{attach:function(){this.hasDetached=!1,this.initDetach()},hasContent:function(){this.$nextTick(this.initDetach)}},beforeMount:function(){var t=this;this.$nextTick((function(){t.activatorNode&&(Array.isArray(t.activatorNode)?t.activatorNode:[t.activatorNode]).forEach((function(e){if(e.elm&&t.$el.parentNode){var n=t.$el===t.$el.parentNode.firstChild?t.$el:t.$el.nextSibling;t.$el.parentNode.insertBefore(e.elm,n)}}))}))},mounted:function(){this.hasContent&&this.initDetach()},deactivated:function(){this.isActive=!1},beforeDestroy:function(){try{if(this.$refs.content&&this.$refs.content.parentNode&&this.$refs.content.parentNode.removeChild(this.$refs.content),this.activatorNode)(Array.isArray(this.activatorNode)?this.activatorNode:[this.activatorNode]).forEach((function(t){t.elm&&t.elm.parentNode&&t.elm.parentNode.removeChild(t.elm)}))}catch(t){console.log(t)}},methods:{getScopeIdAttrs:function(){var t=Object(l.p)(this.$vnode,"context.$options._scopeId");return t&&Object(o.a)({},t,"")},initDetach:function(){var t;this._isDestroyed||!this.$refs.content||this.hasDetached||""===this.attach||!0===this.attach||"attach"===this.attach||((t=!1===this.attach?document.querySelector("[data-app]"):"string"==typeof this.attach?document.querySelector(this.attach):this.attach)?(t.appendChild(this.$refs.content),this.hasDetached=!0):Object(f.c)("Unable to locate target ".concat(this.attach||"[data-app]"),this))}}})},493:function(t,e,n){"use strict";var o=n(66),r=(n(27),n(41),n(51),n(0)),c=n(1);e.a=r.default.extend().extend({name:"stackable",data:function(){return{stackElement:null,stackExclude:null,stackMinZIndex:0,isActive:!1}},computed:{activeZIndex:function(){if("undefined"==typeof window)return 0;var content=this.stackElement||this.$refs.content,t=this.isActive?this.getMaxZIndex(this.stackExclude||[content])+2:Object(c.u)(content);return null==t?t:parseInt(t)}},methods:{getMaxZIndex:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],base=this.$el,e=[this.stackMinZIndex,Object(c.u)(base)],n=[].concat(Object(o.a)(document.getElementsByClassName("v-menu__content--active")),Object(o.a)(document.getElementsByClassName("v-dialog__content--active"))),r=0;r<n.length;r++)t.includes(n[r])||e.push(Object(c.u)(n[r]));return Math.max.apply(Math,e)}}})},495:function(t,e,n){"use strict";n.r(e);n(84);var o=n(28),r=n(40),c=n(46),l=n(37),h=n(29),f=n(10),d=(n(13),n(26),n(167));function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(h.a)(t);if(e){var r=Object(h.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(l.a)(this,n)}}var m=function(t,e,n,desc){var o,r=arguments.length,c=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},y=function(t){Object(c.a)(n,t);var e=v(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"color",get:function(){switch(this.element.name){case"persName":return"red";case"orgName":return"green";case"placeName":return"blue";default:return""}}},{key:"selectedEntityIdOnText",get:function(){return this.$store.getters.getSelectedEntityIdOnText},set:function(t){this.$store.commit("setSelectedEntityIdOnText",t)}},{key:"isRedraw",get:function(){return this.$store.getters.getIsRedraw},set:function(t){this.$store.commit("setIsRedraw",t)}},{key:"selectedReferenceIdOnText",get:function(){return this.$store.getters.getSelectedReferenceIdOnText},set:function(t){this.$store.commit("setSelectedReferenceIdOnText",t)}},{key:"entityAttributes",get:function(){return this.$store.getters.getEntityAttributes}},{key:"selectedFactoidIdOnText",get:function(){return this.$store.getters.getSelectedFactoidIdOnText},set:function(t){this.$store.commit("setSelectedFactoidIdOnText",t)}},{key:"clickEntity",value:function(element){if(this.isRedraw=!0,element.attributes){var t=element.attributes["xml:id"];this.selectedReferenceIdOnText=t;var e=this.entityAttributes[t];this.selectedEntityIdOnText=e}}},{key:"isHightlighted",get:function(){return this.element.attributes["xml:id"]===this.selectedReferenceIdOnText?"background-color: #E0E0E0;":""}}]),n}(d.Vue);m([Object(d.Prop)({})],y.prototype,"element",void 0);var O=y=m([Object(d.Component)({components:{}})],y),x=n(71),component=Object(x.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{style:"color: "+t.color+"; cursor: pointer; "+t.isHightlighted,attrs:{id:t.element.attributes["xml:id"]},on:{dblclick:function(e){return t.clickEntity(t.element)}}},[t._l(t.element.elements,(function(t,e){return[n("TEI",{key:e,attrs:{element:t}})]}))],2)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{TEI:n(485).default})},498:function(t,e,n){"use strict";n(34),n(80);var o=n(0);e.a=o.default.extend().extend({name:"delayable",props:{openDelay:{type:[Number,String],default:0},closeDelay:{type:[Number,String],default:0}},data:function(){return{openTimeout:void 0,closeTimeout:void 0}},methods:{clearDelay:function(){clearTimeout(this.openTimeout),clearTimeout(this.closeTimeout)},runDelay:function(t,e){var n=this;this.clearDelay();var o=parseInt(this["".concat(t,"Delay")],10);this["".concat(t,"Timeout")]=setTimeout(e||function(){n.isActive={open:!0,close:!1}[t]},o)}}})},499:function(t,e,n){"use strict";var o=n(2),r=(n(34),n(18),n(7),n(5),n(9),n(13),n(8),n(17),n(493)),c=n(132),l=n(478),h=n(492),f=n(14),d=n(1);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var y=Object(f.a)(r.a,Object(c.b)(["top","right","bottom","left","absolute"]),l.a,h.a);e.a=y.extend().extend({name:"menuable",props:{allowOverflow:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[Number,String],default:"auto"},minWidth:[Number,String],nudgeBottom:{type:[Number,String],default:0},nudgeLeft:{type:[Number,String],default:0},nudgeRight:{type:[Number,String],default:0},nudgeTop:{type:[Number,String],default:0},nudgeWidth:{type:[Number,String],default:0},offsetOverflow:Boolean,openOnClick:Boolean,positionX:{type:Number,default:null},positionY:{type:Number,default:null},zIndex:{type:[Number,String],default:null}},data:function(){return{activatorNode:[],absoluteX:0,absoluteY:0,activatedBy:null,activatorFixed:!1,dimensions:{activator:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0,offsetLeft:0},content:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0}},relativeYOffset:0,hasJustFocused:!1,hasWindow:!1,inputActivator:!1,isContentActive:!1,pageWidth:0,pageYOffset:0,stackClass:"v-menu__content--active",stackMinZIndex:6}},computed:{computedLeft:function(){var a=this.dimensions.activator,t=this.dimensions.content,e=(!1!==this.attach?a.offsetLeft:a.left)||0,n=Math.max(a.width,t.width),o=0;if(o+=this.left?e-(n-a.width):e,this.offsetX){var r=isNaN(Number(this.maxWidth))?a.width:Math.min(a.width,Number(this.maxWidth));o+=this.left?-r:a.width}return this.nudgeLeft&&(o-=parseInt(this.nudgeLeft)),this.nudgeRight&&(o+=parseInt(this.nudgeRight)),o},computedTop:function(){var a=this.dimensions.activator,t=this.dimensions.content,e=0;return this.top&&(e+=a.height-t.height),!1!==this.attach?e+=a.offsetTop:e+=a.top+this.pageYOffset,this.offsetY&&(e+=this.top?-a.height:a.height),this.nudgeTop&&(e-=parseInt(this.nudgeTop)),this.nudgeBottom&&(e+=parseInt(this.nudgeBottom)),e},hasActivator:function(){return!!(this.$slots.activator||this.$scopedSlots.activator||this.activator||this.inputActivator)},absoluteYOffset:function(){return this.pageYOffset-this.relativeYOffset}},watch:{disabled:function(t){t&&this.callDeactivate()},isActive:function(t){this.disabled||(t?this.callActivate():this.callDeactivate())},positionX:"updateDimensions",positionY:"updateDimensions"},beforeMount:function(){this.hasWindow="undefined"!=typeof window,this.hasWindow&&window.addEventListener("resize",this.updateDimensions,!1)},beforeDestroy:function(){this.hasWindow&&window.removeEventListener("resize",this.updateDimensions,!1)},methods:{absolutePosition:function(){return{offsetTop:this.positionY||this.absoluteY,offsetLeft:this.positionX||this.absoluteX,scrollHeight:0,top:this.positionY||this.absoluteY,bottom:this.positionY||this.absoluteY,left:this.positionX||this.absoluteX,right:this.positionX||this.absoluteX,height:0,width:0}},activate:function(){},calcLeft:function(t){return Object(d.h)(!1!==this.attach?this.computedLeft:this.calcXOverflow(this.computedLeft,t))},calcTop:function(){return Object(d.h)(!1!==this.attach?this.computedTop:this.calcYOverflow(this.computedTop))},calcXOverflow:function(t,e){var n=t+e-this.pageWidth+12;return(t=(!this.left||this.right)&&n>0?Math.max(t-n,0):Math.max(t,12))+this.getOffsetLeft()},calcYOverflow:function(t){var e=this.getInnerHeight(),n=this.absoluteYOffset+e,o=this.dimensions.activator,r=this.dimensions.content.height,c=n<t+r;return c&&this.offsetOverflow&&o.top>r?t=this.pageYOffset+(o.top-r):c&&!this.allowOverflow?t=n-r-12:t<this.absoluteYOffset&&!this.allowOverflow&&(t=this.absoluteYOffset+12),t<12?12:t},callActivate:function(){this.hasWindow&&this.activate()},callDeactivate:function(){this.isContentActive=!1,this.deactivate()},checkForPageYOffset:function(){this.hasWindow&&(this.pageYOffset=this.activatorFixed?0:this.getOffsetTop())},checkActivatorFixed:function(){if(!1===this.attach){for(var t=this.getActivator();t;){if("fixed"===window.getComputedStyle(t).position)return void(this.activatorFixed=!0);t=t.offsetParent}this.activatorFixed=!1}},deactivate:function(){},genActivatorListeners:function(){var t=this,e=l.a.options.methods.genActivatorListeners.call(this),n=e.click;return e.click=function(e){t.openOnClick&&n&&n(e),t.absoluteX=e.clientX,t.absoluteY=e.clientY},e},getInnerHeight:function(){return this.hasWindow?window.innerHeight||document.documentElement.clientHeight:0},getOffsetLeft:function(){return this.hasWindow?window.pageXOffset||document.documentElement.scrollLeft:0},getOffsetTop:function(){return this.hasWindow?window.pageYOffset||document.documentElement.scrollTop:0},getRoundedBoundedClientRect:function(t){var rect=t.getBoundingClientRect();return{top:Math.round(rect.top),left:Math.round(rect.left),bottom:Math.round(rect.bottom),right:Math.round(rect.right),width:Math.round(rect.width),height:Math.round(rect.height)}},measure:function(t){if(!t||!this.hasWindow)return null;var rect=this.getRoundedBoundedClientRect(t);if(!1!==this.attach){var style=window.getComputedStyle(t);rect.left=parseInt(style.marginLeft),rect.top=parseInt(style.marginTop)}return rect},sneakPeek:function(t){var e=this;requestAnimationFrame((function(){var n=e.$refs.content;n&&"none"===n.style.display?(n.style.display="inline-block",t(),n.style.display="none"):t()}))},startTransition:function(){var t=this;return new Promise((function(e){return requestAnimationFrame((function(){t.isContentActive=t.hasJustFocused=t.isActive,e()}))}))},updateDimensions:function(){var t=this;this.hasWindow="undefined"!=typeof window,this.checkActivatorFixed(),this.checkForPageYOffset(),this.pageWidth=document.documentElement.clientWidth;var e={activator:m({},this.dimensions.activator),content:m({},this.dimensions.content)};if(!this.hasActivator||this.absolute)e.activator=this.absolutePosition();else{var n=this.getActivator();if(!n)return;e.activator=this.measure(n),e.activator.offsetLeft=n.offsetLeft,!1!==this.attach?e.activator.offsetTop=n.offsetTop:e.activator.offsetTop=0}this.sneakPeek((function(){if(t.$refs.content){if(t.$refs.content.offsetParent){var n=t.getRoundedBoundedClientRect(t.$refs.content.offsetParent);t.relativeYOffset=window.pageYOffset+n.top,e.activator.top-=t.relativeYOffset,e.activator.left-=window.pageXOffset+n.left}e.content=t.measure(t.$refs.content)}t.dimensions=e}))}}})},524:function(t,e,n){var content=n(525);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(23).default)("dc0628f2",content,!0,{sourceMap:!1})},525:function(t,e,n){var o=n(22)(!1);o.push([t.i,".v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);color:#fff;border-radius:4px;font-size:14px;line-height:22px;display:inline-block;padding:5px 16px;position:absolute;text-transform:none;width:auto;opacity:1;pointer-events:none}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{transition-duration:.15s}.v-tooltip__content[class*=leave-active]{transition-duration:75ms}",""]),t.exports=o}}]);