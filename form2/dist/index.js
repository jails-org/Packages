!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("form2",[],t):"object"==typeof exports?exports.form2=t():e.form2=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.formField=t.form=void 0;var o=n(1),u=r(o),a=n(3),i=r(a);t.form=u,t.formField=i},function(e,t,n){"use strict";function r(e){var t=e.main,n=e.get,r=e.elm,u=e.emit,a=e.update,i=e.msg,c=n("form-field");t(function(e){return[l,f,s]});var l=function(e){var t=e.on;t("form-field:change",d),t("submit",v)},f=function(){"isvalid"in r.dataset&&i.set(function(e){return e.isValid=Boolean(r.dataset.isvalid)})},s=function(e){var t=e.expose;t({validate:d})},d=function(){var e=!0;c("map",function(t){var n=t.isValid;n||(e=!1)}),e!=i.getState().isValid&&(i.set(function(t){return t.isValid=e}),u("form:"+(e?"valid":"invalid"),(0,o.getFormData)(r)))},v=function(e){var t=i.getState(),n=t.isValid;n&&u("form:submit",(0,o.getFormData)(r)),e.preventDefault()};a(function(e){i.set(function(t){return t.data=e.data})})}Object.defineProperty(t,"__esModule",{value:!0}),t.model=void 0,t.default=r;var o=n(2);t.model={isValid:!1,data:{}}},function(e,t){"use strict";function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});t.getRules=function(e){var t=new Function("return "+e.dataset.rules)(),n=t?t:null,r=e.type&&"checkbox"==e.type,o=r?e.checked?e.value:"":e.form[e.name].value;return{value:o,rules:n}},t.formatError=function(e){var t=Object.keys(e),r=t[0];return n({},r,!0)},t.debounce=function(e,t){var n=void 0;return function(){var r=this,o=arguments;clearTimeout(n),n=setTimeout(function(){return e.apply(r,o)},t)}},t.getFormData=function(e){var t=Array.from(e.elements).reduce(function(e,t){if(t.name){var n=(new Function("return "+t.dataset.rules)(),t.type&&"checkbox"==t.type),r=t.type&&"file"==t.type;e[t.name]=t.form[t.name].value,n&&(e[t.name]=t.checked?t.value:""),r&&t.value&&(e[t.name]=t.files)}return e},{});return t}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e){var t=e.main,n=e.elm,r=e.msg,u=e.injection,a=e.emit,s=e.update,d=e.trigger,v=u.validators;t(function(e){return[p,m]});var p=function(e){var t=e.on;t("input",l,(0,c.debounce)(y,250)),t("blur",l,b),t("change",f,b),t("focus",l+", "+f,g)},m=function(e){var t=e.expose;t({map:x})},y=function(e){var t=e.target,n=t.name,u=t.value;(0,i.default)(o({},n,(0,c.getRules)(e.target)),v).then(function(e){r.set(function(e){e.error=null,e.isValid=Boolean(u),e.value=u})}).catch(function(e){return r.set(function(e){e.isValid=!1,e.value=u})}).finally(h)},b=function(e){var t=e.target,n=t.name,u=t.value,a="checkbox"==e.target.type;(0,i.default)(o({},n,(0,c.getRules)(e.target)),v).then(function(t){r.set(function(t){t.error=null,t.isValid=Boolean(u),t.focus=!1,t.value=a?e.target.checked?u:"":u})}).catch(function(t){r.set(function(r){r.error=(0,c.formatError)(t[n]),r.isValid=!1,r.focus=!1,r.value=a?e.target.checked?u:"":u})}).finally(h)},h=function(){a("form-field:change",{element:n,state:r.getState()})},g=function(e){r.set(function(e){e.focus=!0,e.touched=!0})},x=function(e){e(r.getState())};s(function(e){var t=n.querySelector("input,select,textarea");r.set(function(n){n.data=e.data,n.value=n.touched?n.value:t.dataset.initialValue,n.value&&!n.touched&&(setTimeout(function(e){d("input","[name="+t.name+"]"),d("change","[name="+t.name+"]"),n.value=t.value}),n.touched=!0)})})}Object.defineProperty(t,"__esModule",{value:!0}),t.view=t.model=void 0,t.default=u;var a=n(4),i=r(a),c=n(2),l='input[data-rules]:not([type="checkbox"]):not([type="radio"])',f='input[data-rules][type="checkbox"],input[data-rules][type="radio"],select[data-rules]';t.model={touched:!1,focus:!1,error:null,isValid:!0,value:void 0,data:{}},t.view=function(e){var t=e.touched?"touched":"",n=e.error?"error":"",r=e.focus?"focus":"";return Object.assign({},e,{fieldClass:(t+" "+n+" "+r).trim()})}},function(e,t,n){var r,o,u;(function(e){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(a,i){"object"==n(t)&&"object"==n(e)?e.exports=i():(o=[],r=i,u="function"==typeof r?r.apply(t,o):r,!(void 0!==u&&(e.exports=u)))}(void 0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return new Promise(function(n,r){var o={};return Object.keys(e).forEach(function(n){var r=e[n];Object.keys(r.rules||{}).forEach(function(u){if(!t[u])return console.warn("[Validation] There is no rule => "+u);var a=t[u]({value:r.value,data:r.rules[u],fields:e});a||(o[n]=o[n]||{},o[n][u]={data:r})})}),Object.keys(o).length?r(o):n(e)})}}])})}).call(t,n(5)(e))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}}])});