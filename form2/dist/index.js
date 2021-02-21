!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("form2",[],t):"object"==typeof exports?exports.form2=t():e.form2=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.formField=t.form=void 0;var r=n(1),u=o(r),a=n(3),i=o(a);t.form=u,t.formField=i},function(e,t,n){"use strict";function o(e){var t=e.main,n=e.get,o=e.elm,u=e.emit,a=e.update,i=e.msg,c=n("form-field");t(function(e){return[f,l,s]});var f=function(e){var t=e.on;t("form-field:change",d),t("submit",v)},l=function(){"isvalid"in o.dataset&&i.set(function(e){return e.isValid=Boolean(o.dataset.isvalid)})},s=function(e){var t=e.expose;t({validate:d})},d=function(){var e=!0;c("map",function(t){var n=t.isValid;n||(e=!1)}),e!=i.getState().isValid&&(i.set(function(t){return t.isValid=e}),u("form:"+(e?"valid":"invalid"),(0,r.getFormData)(o)))},v=function(e){var t=i.getState(),n=t.isValid;n&&u("form:submit",(0,r.getFormData)(o)),e.preventDefault()};a(function(e){e.data&&i.set(function(t){return t.data=e.data})})}Object.defineProperty(t,"__esModule",{value:!0}),t.model=void 0,t.default=o;var r=n(2);t.model={isValid:!1,data:{}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.getRules=function(e){var t=new Function("return "+e.dataset.rules)(),n=t?t:null,o=e.type&&"checkbox"==e.type,r=o?e.checked?e.value:"":e.form[e.name].value;return{value:r,rules:n}},t.formatError=function(e){return Object.keys(e).reduce(function(e,t){return e[t]=!0,e},{})},t.debounce=function(e,t){var n=void 0;return function(){var o=this,r=arguments;clearTimeout(n),n=setTimeout(function(){return e.apply(o,r)},t)}},t.getFormData=function(e){var t=new FormData(e),n={},o=!0,r=!1,u=void 0;try{for(var a,i=t.entries()[Symbol.iterator]();!(o=(a=i.next()).done);o=!0){var c=a.value;n[c[0]]=c[1]}}catch(e){r=!0,u=e}finally{try{!o&&i.return&&i.return()}finally{if(r)throw u}}return n}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e){var t=e.main,n=e.elm,o=e.msg,u=e.injection,a=e.emit,s=e.update,d=u.validators;t(function(e){return[v,p]});var v=function(e){var t=e.on;t("keyup",f,(0,c.debounce)(m,250)),t("blur",f,y),t("change",l,y),t("focus",f+", "+l,h)},p=function(e){var t=e.expose;t({map:g})},m=function(e){var t=e.target,n=t.name,u=t.value;(0,i.default)(r({},n,(0,c.getRules)(e.target)),d).then(function(e){o.set(function(e){e.error=null,e.isValid=Boolean(e.touched),e.value=u})}).catch(function(e){return o.set(function(e){e.isValid=!1,e.value=u})}).finally(b)},y=function(e){var t=e.target,n=t.name,u=t.value;(0,i.default)(r({},n,(0,c.getRules)(e.target)),d).then(function(e){o.set(function(e){e.error=null,e.isValid=Boolean(e.touched),e.focus=!1,e.value=u})}).catch(function(e){o.set(function(t){t.error=(0,c.formatError)(e[n]),t.isValid=!1,t.focus=!1,t.value=u})}).finally(b)},b=function(){a("form-field:change",{element:n,state:o.getState()})},h=function(e){o.set(function(e){e.focus=!0,e.touched=!0})},g=function(e){e(o.getState())};s(function(e){e.data&&o.set(function(t){return t.data=e.data})})}Object.defineProperty(t,"__esModule",{value:!0}),t.view=t.model=void 0,t.default=u;var a=n(4),i=o(a),c=n(2),f='input[data-rules]:not([type="checkbox"]):not([type="radio"])',l='input[data-rules][type="checkbox"],input[data-rules][type="radio"],select[data-rules]';t.model={touched:!1,focus:!1,error:null,isValid:!1,data:{}},t.view=function(e){var t=e.touched?"touched":"",n=e.error?"error":"",o=e.focus?"focus":"";return Object.assign({},e,{fieldClass:(t+" "+n+" "+o).trim()})}},function(e,t,n){var o,r,u;(function(e){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(a,i){"object"==n(t)&&"object"==n(e)?e.exports=i():(r=[],o=i,u="function"==typeof o?o.apply(t,r):o,!(void 0!==u&&(e.exports=u)))}(void 0,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return new Promise(function(n,o){var r={};return Object.keys(e).forEach(function(n){var o=e[n];Object.keys(o.rules||{}).forEach(function(u){if(!t[u])return console.warn("[Validation] There is no rule => "+u);var a=t[u]({value:o.value,data:o.rules[u],fields:e});a||(r[n]=r[n]||{},r[n][u]={data:o})})}),Object.keys(r).length?o(r):n(e)})}}])})}).call(t,n(5)(e))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}}])});