!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("store",[],n):"object"==typeof exports?exports.store=n():t.store=n()}(this,function(){return function(t){function n(o){if(e[o])return e[o].exports;var r=e[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e(),o="__update__";return{get:function(){return t},set:function(e){e(t),n.publish(o,{state:t})},actions:function(e){var o=function(o){n.subscribe(o,function(n){t=Object.assign(t,e[o](t,n))})};for(var r in e)o(r)},dispatch:function(e,r){n.publish(e,r),n.publish(o,{state:t,action:e,payload:r})},subscribe:function(t){return t.call?n.subscribe(o,function(n){var e=n.state,o=n.action,r=n.payload;return t(e,{action:o,payload:r})}):void n.subscribe(o,function(n){var e=n.state,o=n.action,r=n.payload;o in t&&t[o](e,{action:o,payload:r})})}}};var e=function(){var t={};return{publish:function(n,e){n in t&&t[n].map(function(t){return t(e)})},subscribe:function(n,e){return t[n]=t[n]||[],t[n].push(e),function(){t[n]=t[n].filter(function(t){return t==e})}}}}}])});