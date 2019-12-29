!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("pandora",[],n):"object"==typeof exports?exports.pandora=n():e.pandora=n()}(this,function(){return function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var o=t(1);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return o[e]}})});var i=t(3);Object.defineProperty(n,"pandora",{enumerable:!0,get:function(){return r(i).default}})},function(e,n,t){(function(e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.log=function(n){return function(t){return e&&"production"!==e.env.NODE_ENV&&(console.groupCollapsed(n+" / INITIAL STATE"),console.log("+ state",t.getState()),console.groupEnd(),t.subscribe(function(e,t){var r=t.action,o=t.payload,i=JSON.parse(JSON.stringify(e));console.groupCollapsed(n+" / ACTION => "+(r||"SET")),console.log("+ payload",o),console.log("+ state",i),console.groupEnd()})),t}}}).call(n,t(2))},function(e,n){function t(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(f===setTimeout)return setTimeout(e,0);if((f===t||!f)&&setTimeout)return f=setTimeout,setTimeout(e,0);try{return f(e,0)}catch(n){try{return f.call(null,e,0)}catch(n){return f.call(this,e,0)}}}function i(e){if(l===clearTimeout)return clearTimeout(e);if((l===r||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(e);try{return l(e)}catch(n){try{return l.call(null,e)}catch(n){return l.call(this,e)}}}function u(){g&&p&&(g=!1,p.length?h=p.concat(h):m=-1,h.length&&c())}function c(){if(!g){var e=o(u);g=!0;for(var n=h.length;n;){for(p=h,h=[];++m<n;)p&&p[m].run();m=-1,n=h.length}p=null,g=!1,i(e)}}function a(e,n){this.fun=e,this.array=n}function s(){}var f,l,d=e.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:t}catch(e){f=t}try{l="function"==typeof clearTimeout?clearTimeout:r}catch(e){l=r}}();var p,h=[],g=!1,m=-1;d.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];h.push(new a(e,n)),1!==h.length||g||o(c)},a.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=s,d.addListener=s,d.once=s,d.off=s,d.removeListener=s,d.removeAllListeners=s,d.emit=s,d.prependListener=s,d.prependOnceListener=s,d.listeners=function(e){return[]},d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(e,n){"use strict";function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){var n=e.model,r=void 0===n?{}:n,o=e.actions,i=void 0===o?{}:o,u=e.middlewares,c=void 0===u?[]:u,a=e.autostart,s=void 0===a||a,f=e.callback,l=[],d=[],p=JSON.parse(JSON.stringify(r)),h="undefined"!=typeof window&&window.document&&window.document.createElement?requestAnimationFrame||setTimeout:function(e){return e()},g=function(e){i=e},m=function(e){e(p),d.forEach(function(e){return e(p,{haschanged:!0})})},v=function(){return Object.assign({},p)},y=function(){return i},b=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.autostart,r=void 0!==t&&t;e&&(e.call?(e.ref=e,d.push(e),r&&e(Object.assign({},p),{action:null,payload:null,haschanged:!0})):Object.keys(e).forEach(function(n){var t=e[n],o=function(n,t){t.action in e&&e[t.action](n,t)};o.ref=t,d.push(o),r&&o(Object.assign({},p),{action:n,payload:null,haschanged:!0})}))},w=function(e){d=d.filter(function(n){return n.ref!=e})},T=function(e,n){return new Promise(function(t){l.push({action:e,payload:n}),1==l.length&&h(function(){for(;l.length;)O(l[0].action,l[0].payload,t)})})},O=function(e,n,t){var r=!1;if(e in i){var o=Object.assign({},p),u=i[e](o,n,E);u&&(p=Object.assign(p,u),r=!0)}if(l.shift(),!l.length){var c={action:e,payload:n,haschanged:r};d.forEach(function(e){return e(p,c)}),t(p,c)}},j=function(e){return new Promise(function(n){var r=function e(t,r){var o=r.payload;n(Object.assign({},t,o)),w(e)};b(t({},e,r))})},E={set:m,when:j,getState:v,dispatch:T,subscribe:b,unsubscribe:w,getActions:y,setActions:g};return f&&(b(function(e,n){return n.haschanged?f(e,n):null}),s?f(p):null),c.forEach(function(e){return e(E)}),E}}])});