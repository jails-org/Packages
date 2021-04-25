!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("form2",[],t):"object"==typeof exports?exports.form2=t():e.form2=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.formField=t.form=void 0;var o=n(1),u=r(o),i=n(3),a=r(i);t.form=u,t.formField=a},function(e,t,n){"use strict";function r(e){var t=e.main,n=e.get,r=e.elm,u=e.emit,i=e.update,a=e.msg,c=n("form-field");t(function(e){return[f,l]});var f=function(e){var t=e.on;t("form-field:change",d),t("submit",p)},l=function(e){var t=e.expose;t({validate:d,setFields:s})},s=function(e){for(var t in e)c("set",t,e[t],e)},d=function(){var e=!0;c("map",function(t){var n=t.elm,r=t.state;n.querySelector("[data-rules]")&&!r.isValid&&(e=!1)}),e!=a.getState().isValid&&(a.set(function(t){return t.isValid=e}),u("form:"+(e?"valid":"invalid"),(0,o.getFormData)(r)))},p=function(e){var t=a.getState(),n=t.isValid;n&&u("form:submit",(0,o.getFormData)(r)),e.preventDefault()};i(function(e){a.set(function(t){return t.data=e.data})})}Object.defineProperty(t,"__esModule",{value:!0}),t.model=void 0,t.default=r;var o=n(2);t.model={isValid:!1,data:{}}},function(e,t){"use strict";function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});t.getRules=function(e){var t=new Function("return "+e.dataset.rules)(),n=t?t:null,r=e.type&&"checkbox"==e.type,o=r?e.checked?e.value:"":e.form[e.name].value;return{value:o,rules:n}},t.formatError=function(e){var t=Object.keys(e),r=t[0];return n({},r,!0)},t.debounce=function(e,t){var n=void 0;return function(){var r=this,o=arguments;clearTimeout(n),n=setTimeout(function(){return e.apply(r,o)},t)}},t.getFormData=function(e){var t=Array.from(e.elements).reduce(function(e,t){if(t.name){var n=t.type&&"checkbox"==t.type,r=n?t.checked?t.value:"":t.form[t.name].value;e[t.name]=r}return e},{});return t}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e){var t=e.main,n=e.elm,r=e.msg,u=e.injection,i=e.emit,l=e.trigger,s=u.validators;t(function(e){return[d,p,m]});var d=function(e){var t=e.on;t("input",f.VALIDATE_INPUT,(0,c.debounce)(y,250)),t("change",f.VALIDATE_SELECTABLE,y),t("blur",f.INPUT,b),t("focus",f.INPUT+", "+f.SELECTABLE,g)},p=function(e){var t=e.expose;t({map:x,set:v})},m=function(){var e=n.querySelector("[data-rules]");e&&(0,a.default)(o({},e.name,(0,c.getRules)(e)),s).catch(function(e){return r.set(function(e){return e.isValid=!1})}).finally(h)},v=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},u=n.querySelector("[name="+e+"]");u&&(r.set(function(n){n[e]=t,n.data=o,n.touched=!0}),l("input","[name="+e+"]"),l("change","[name="+e+"]"))},y=function(e){var t=e.target,n=t.name,u=t.value,i="checkbox"==e.target.type;(0,a.default)(o({},n,(0,c.getRules)(e.target)),s).then(function(t){r.set(function(t){t.error=null,t.isValid=!0,i?t[n]=e.target.checked?u:"":t[n]=u})}).catch(function(t){return r.set(function(t){t.isValid=!1,i?t[n]=e.target.checked?u:"":t[n]=u})}).finally(h)},b=function(e){var t=e.target.name;(0,a.default)(o({},t,(0,c.getRules)(e.target)),s).then(function(e){r.set(function(e){e.error=null,e.isValid=!0,e.focus=!1})}).catch(function(e){r.set(function(n){n.error=(0,c.formatError)(e[t]),n.isValid=!1,n.focus=!1})}).finally(h)},h=function(){i("form-field:change",{element:n,state:r.getState()})},g=function(e){r.set(function(e){e.focus=!0,e.touched=!0})},x=function(e){e({elm:n,state:r.getState()})}}Object.defineProperty(t,"__esModule",{value:!0}),t.view=t.model=void 0,t.default=u;var i=n(4),a=r(i),c=n(2),f=n(6);t.model={touched:!1,focus:!1,error:null,isValid:!0,data:{}},t.view=function(e){var t=e.touched?"touched":"",n=e.error?"error":"",r=e.focus?"focus":"";return Object.assign({},e,{fieldClass:(t+" "+n+" "+r).trim()})}},function(e,t,n){var r,o,u;(function(e){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(i,a){"object"==n(t)&&"object"==n(e)?e.exports=a():(o=[],r=a,u="function"==typeof r?r.apply(t,o):r,!(void 0!==u&&(e.exports=u)))}(void 0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return new Promise(function(n,r){var o={};return Object.keys(e).forEach(function(n){var r=e[n];Object.keys(r.rules||{}).forEach(function(u){if(!t[u])return console.warn("[Validation] There is no rule => "+u);var i=t[u]({value:r.value,data:r.rules[u],fields:e});i||(o[n]=o[n]||{},o[n][u]={data:r})})}),Object.keys(o).length?r(o):n(e)})}}])})}).call(t,n(5)(e))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.INPUT='input:not([type="checkbox"]):not([type="radio"])',t.SELECTABLE='input[type="checkbox"],input[type="radio"],select',t.VALIDATE_INPUT='input[data-rules]:not([type="checkbox"]):not([type="radio"])',t.VALIDATE_SELECTABLE='input[data-rules][type="checkbox"],input[data-rules][type="radio"],select[data-rules]'}])});