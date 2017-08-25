!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("spa",[],e):"object"==typeof exports?exports.spa=e():t.spa=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.htmlLoader=e.Router=void 0;var o=n(1),i=r(o),a=n(3),s=r(a);e.default=function(t){function e(t,e,n){var r=t.params.page;(0,i.default)(o(r)).then(function(t){return t.page=r,t.outlet=h,t}).then(p)}function n(t){h.innerHTML="",h.appendChild(t.data.html),a&&a(t)}var r=t.update,o=t.load,a=t.callback,u=t.routes,c=u||function(){},p=r||n,l=new s.default,h=document.querySelector("[data-outlet]");l.get("/:page",e),l.get("/:page/*",e),c(l)};e.Router=s.default,e.htmlLoader=i.default},function(t,e,n){var r,o,i;(function(t){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(a,s){"object"==n(e)&&"object"==n(t)?t.exports=s():(o=[],r=s,i="function"==typeof r?r.apply(e,o):r,!(void 0!==i&&(t.exports=i)))}(void 0,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="./dist/",e(0)}([function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),r={};e.default=function(t){var e=t.key,u=t.templateUrl,c=t.css,p=t.js,l=e||u;if(l in r)return new Promise(function(t,e){var n=r[l],o=n.js,i=n.css,a=n.html;t({state:"changed",data:{js:o,css:i,html:a}})});var h=[];return h.push(o({url:u})),c&&h.push(s({url:c})),p&&h.push(a({url:p})),Promise.all(h).then(function(t){var e=n(t,3),o=e[0],a=e[1],s=e[2],u={js:s,css:a,html:i(o)};return r[l]=u,{state:"loaded",data:u}})};var o=function(t){var e=t.method,n=t.url;return new Promise(function(t,r){var o=new XMLHttpRequest;o.onreadystatechange=function(){4==o.readyState&&(200==o.status?t(o.responseText):r(o))},o.open(e||"get",n),o.send(null)})},i=function(t){var e=document.createElement("div");return e.innerHTML=t,e},a=function(t){var e=t.url;return new Promise(function(t,n){var r=document.createElement("script");r.onload=function(){return t(r)},r.src=e,document.head.appendChild(r)})},s=function(t){var e=t.url;return new Promise(function(t,n){var r=document.createElement("link");r.rel="stylesheet",r.href=e,document.head.appendChild(r),t(r)})}}])})}).call(e,n(2)(t))},function(t,e){"use strict";t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e,n){(function(t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(o){function i(e){var n=this;return this.events={},this.state=null,this.options=e||{},this.options.env=this.options.env||(0===Object.keys(o).length&&t&&t.browser!==!0?"server":"client"),this.options.mode=this.options.mode||("server"!==this.options.env&&this.options.pushState&&o.history&&o.history.pushState?"pushState":"hashchange"),this.version="0.6.4","function"==typeof o.addEventListener&&(o.addEventListener("hashchange",function(){n.trigger("hashchange")}),o.addEventListener("popstate",function(t){return(!n.state||null!==n.state.previousState)&&void n.trigger("navigate")})),this}function a(t,e){this.stack=a.global.slice(0),this.router=t,this.runCallback=!0,this.callbackRan=!1,this.propagateEvent=!0,this.value=t.path();for(var n in e)this[n]=e[n];return this}function s(t){this.route=t,this.keys=[],this.regex=i.regexRoute(t,this.keys)}i.regexRoute=function(t,e,n,r){return t instanceof RegExp?t:(t instanceof Array&&(t="("+t.join("|")+")"),t=t.concat(r?"":"/?").replace(/\/\(/g,"(?:/").replace(/\+/g,"__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,function(t,n,r,o,i,a){return e.push({name:o,optional:!!a}),n=n||"",""+(a?"":n)+"(?:"+(a?n:"")+(r||"")+(i||r&&"([^/.]+?)"||"([^/]+?)")+")"+(a||"")}).replace(/([\/.])/g,"\\$1").replace(/__plus__/g,"(.+)").replace(/\*/g,"(.*)"),new RegExp("^"+t+"$",n?"":"i"))},i._forEach=function(t,e){return"function"==typeof Array.prototype.forEach?Array.prototype.forEach.call(t,e):function(t,e){for(var n=0,r=this.length;n<r;++n)t.call(e,this[n],n,this)}.call(t,e)},i.prototype.get=i.prototype.add=function(t){var e=this,n=Array.prototype.slice.call(arguments,1,-1),r=Array.prototype.slice.call(arguments,-1)[0],o=new s(t),i=function(){var i=o.parse(e.path());if(i.match){var s={route:t,params:i.params,req:i,regex:i.match},u=new a(e,s).enqueue(n.concat(r));if(e.trigger("match",u,i),!u.runCallback)return e;if(u.previousState=e.state,e.state=u,u.parent()&&u.parent().propagateEvent===!1)return u.propagateEvent=!1,e;u.callback()}return e},u="pushState"!==e.options.mode&&"server"!==e.options.env?"hashchange":"navigate";return i().on(u,i)},i.prototype.trigger=function(t){var e=this,n=Array.prototype.slice.call(arguments,1);return this.events[t]&&i._forEach(this.events[t],function(t){t.apply(e,n)}),this},i.prototype.on=i.prototype.bind=function(t,e){var n=this,r=t.split(" ");return i._forEach(r,function(t){n.events[t]?n.events[t].push(e):n.events[t]=[e]}),this},i.prototype.once=function(t,e){var n=!1;return this.on(t,function(){return!n&&(n=!0,e.apply(this,arguments),e=null,!0)})},i.prototype.context=function(t){var e=this,n=Array.prototype.slice.call(arguments,1);return function(){var r=arguments[0],o=arguments.length>2?Array.prototype.slice.call(arguments,1,-1):[],i=Array.prototype.slice.call(arguments,-1)[0],a="/"!==t.slice(-1)&&"/"!==r&&""!==r?t+"/":t,s="/"!==r.substr(0,1)?r:r.substr(1),u=a+s;return e.add.apply(e,[u].concat(n).concat(o).concat([i]))}},i.prototype.navigate=function(t){return this.path(t).trigger("navigate")},i.prototype.path=function(t){var e,n=this;return"string"==typeof t?("pushState"===n.options.mode?(e=n.options.root?n.options.root+t:t,o.history.pushState({},null,e)):o.location?o.location.hash=(n.options.hashBang?"!":"")+t:o._pathname=t||"",this):"undefined"==typeof t?e="pushState"===n.options.mode?o.location.pathname.replace(n.options.root,""):"pushState"!==n.options.mode&&o.location?o.location.hash?o.location.hash.split(n.options.hashBang?"#!":"#")[1]:"":o._pathname||"":t===!1?("pushState"===n.options.mode?o.history.pushState({},null,n.options.root||"/"):o.location&&(o.location.hash=n.options.hashBang?"!":""),n):void 0},i.listen=function(){var t,e;return arguments[0]&&arguments[1]?(t=arguments[0],e=arguments[1]):e=arguments[0],function(){for(var t in e)this.add.call(this,t,e[t]);return this}.call(new i(t||{}))},a.global=[],a.prototype.preventDefault=function(){this.runCallback=!1},a.prototype.stopPropagation=function(){this.propagateEvent=!1},a.prototype.parent=function(){var t=!(!this.previousState||!this.previousState.value||this.previousState.value!=this.value);return!!t&&this.previousState},a.prototype.callback=function(){this.callbackRan=!0,this.timeStamp=Date.now(),this.next()},a.prototype.enqueue=function(t,e){for(var n=Array.isArray(t)?e<t.length?t.reverse():t:[t];n.length;)this.stack.splice(e||this.stack.length+1,0,n.shift());return this},a.prototype.next=function(){var t=this;return this.stack.shift().call(this.router,this.req,this,function(){t.next.call(t)})},s.prototype.parse=function(t){var e=t.match(this.regex),n=this,r={params:{},keys:this.keys,matches:(e||[]).slice(1),match:e};return i._forEach(r.matches,function(t,e){var o=n.keys[e]&&n.keys[e].name?n.keys[e].name:e;r.params[o]=t?decodeURIComponent(t):void 0}),r},i.CallStack=a,i.Request=s,"function"!=typeof o.define||o.define.amd.grapnel?"object"===r(n)&&"object"===r(n.exports)?n.exports=e=i:o.Grapnel=i:o.define(function(t,e,n){return o.define.amd.grapnel=!0,i})}.call({},"object"===("undefined"==typeof window?"undefined":r(window))?window:void 0)}).call(e,n(4),n(2)(t))},function(t,e){"use strict";function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(p===setTimeout)return setTimeout(t,0);if((p===n||!p)&&setTimeout)return p=setTimeout,setTimeout(t,0);try{return p(t,0)}catch(e){try{return p.call(null,t,0)}catch(e){return p.call(this,t,0)}}}function i(t){if(l===clearTimeout)return clearTimeout(t);if((l===r||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(t);try{return l(t)}catch(e){try{return l.call(null,t)}catch(e){return l.call(this,t)}}}function a(){y&&f&&(y=!1,f.length?d=f.concat(d):v=-1,d.length&&s())}function s(){if(!y){var t=o(a);y=!0;for(var e=d.length;e;){for(f=d,d=[];++v<e;)f&&f[v].run();v=-1,e=d.length}f=null,y=!1,i(t)}}function u(t,e){this.fun=t,this.array=e}function c(){}var p,l,h=t.exports={};!function(){try{p="function"==typeof setTimeout?setTimeout:n}catch(t){p=n}try{l="function"==typeof clearTimeout?clearTimeout:r}catch(t){l=r}}();var f,d=[],y=!1,v=-1;h.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];d.push(new u(t,e)),1!==d.length||y||o(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=c,h.addListener=c,h.once=c,h.off=c,h.removeListener=c,h.removeAllListeners=c,h.emit=c,h.prependListener=c,h.prependOnceListener=c,h.listeners=function(t){return[]},h.binding=function(t){throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(t){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}}])});