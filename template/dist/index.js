!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jails-js")):"function"==typeof define&&define.amd?define("template",["jails-js"],t):"object"==typeof exports?exports.template=t(require("jails-js")):e.template=t(e["jails-js"])}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=n(3),a=r(i);t.default=function(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=!1,i=n.selector||"template",u=t.querySelectorAll(i),d=Array.prototype.slice.call(u),l=function(e,t){if(e.attributes){var n=e.attributes,o=n.getNamedItem("data-component")||e.querySelector("[data-component]"),i=n.getNamedItem("shouldnotupdate");if(o&&(r=!0),i)return!1}},f={onBeforeNodeAdded:l,onBeforeElChildrenUpdated:l},c=d.map(function(t){var i=document.createElement("div");i.setAttribute("data-root-template",!0);var u=document.createElement("textarea");u.innerHTML='<div data-root-template="true">'+t.innerHTML.trim()+"</div>";var d=e(u.value),l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,o.virtualdom)(i,d(e),f),r&&(a.default.start(i),r=!1)};return t.parentNode.insertBefore(i,t),l(n.initialState),{render:l,template:t}});return{render:function(e){c.map(function(t){return t.render(e)})}}}}},function(e,t,n){var r,o,i;(function(e){"use strict";var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(u,d){"object"==a(t)&&"object"==a(e)?e.exports=d(n(3)):(o=[n(3)],r=d,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i)))}(void 0,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.virtualdom=void 0;var o=n(1),i=r(o),a=n(2),u=r(a);t.virtualdom=i.default,t.default=function(e,t){var n=void 0;return function(r){var o=!1,a=void 0;n||(n=e.appendChild(document.createElement("div"))),a=t(r),n=(0,i.default)(n,a.trim?a.trim():a,{onBeforeNodeAdded:function(e){e.getAttribute&&e.getAttribute("data-component")&&(o=!0)}}),o&&u.default.start(n)}}},function(e,t){function n(e){!c&&v.createRange&&(c=v.createRange(),c.selectNode(v.body));var t;return c&&c.createContextualFragment?t=c.createContextualFragment(e):(t=v.createElement("body"),t.innerHTML=e),t.childNodes[0]}function r(e,t){var n=e.nodeName,r=t.nodeName;return n===r||!!(t.actualize&&n.charCodeAt(0)<91&&r.charCodeAt(0)>90)&&n===r.toUpperCase()}function o(e,t){return t&&t!==s?v.createElementNS(t,e):v.createElement(e)}function i(e,t){for(var n=e.firstChild;n;){var r=n.nextSibling;t.appendChild(n),n=r}return t}function a(e,t){var n,r,o,i,a,u,d=t.attributes;for(n=d.length-1;n>=0;--n)r=d[n],o=r.name,i=r.namespaceURI,a=r.value,i?(o=r.localName||o,u=e.getAttributeNS(i,o),u!==a&&e.setAttributeNS(i,o,a)):(u=e.getAttribute(o),u!==a&&e.setAttribute(o,a));for(d=e.attributes,n=d.length-1;n>=0;--n)r=d[n],r.specified!==!1&&(o=r.name,i=r.namespaceURI,i?(o=r.localName||o,b(t,i,o)||e.removeAttributeNS(i,o)):b(t,null,o)||e.removeAttribute(o))}function u(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n,""))}function d(){}function l(e){return e.id}function f(e){return function(t,a,u){function f(e){A?A.push(e):A=[e]}function c(e,t){if(e.nodeType===y)for(var n=e.firstChild;n;){var r=void 0;t&&(r=S(n))?f(r):(V(n),n.firstChild&&c(n,t)),n=n.nextSibling}}function p(e,t,n){U(e)!==!1&&(t&&t.removeChild(e),V(e),c(e,n))}function s(e){if(e.nodeType===y)for(var t=e.firstChild;t;){var n=S(t);n&&(M[n]=t),s(t),t=t.nextSibling}}function m(e){T(e);for(var t=e.firstChild;t;){var n=t.nextSibling,o=S(t);if(o){var i=M[o];i&&r(t,i)&&(t.parentNode.replaceChild(i,t),b(i,t))}m(t),t=n}}function b(n,o,i){var u,d=S(o);if(d&&delete M[d],!a.isSameNode||!a.isSameNode(t)){if(!i){if(E(n,o)===!1)return;if(e(n,o),j(n),B(n,o)===!1)return}if("TEXTAREA"!==n.nodeName){var l,c,s,g,A=o.firstChild,T=n.firstChild;e:for(;A;){for(s=A.nextSibling,l=S(A);T;){if(c=T.nextSibling,A.isSameNode&&A.isSameNode(T)){A=s,T=c;continue e}u=S(T);var U=T.nodeType,V=void 0;if(U===A.nodeType&&(U===y?(l?l!==u&&((g=M[l])?T.nextSibling===g?V=!1:(n.insertBefore(g,T),c=T.nextSibling,u?f(u):p(T,n,!0),T=g):V=!1):u&&(V=!1),V=V!==!1&&r(T,A),V&&b(T,A)):U!==N&&U!=x||(V=!0,T.nodeValue!==A.nodeValue&&(T.nodeValue=A.nodeValue))),V){A=s,T=c;continue e}u?f(u):p(T,n,!0),T=c}if(l&&(g=M[l])&&r(g,A))n.appendChild(g),b(g,A);else{var I=C(A);I!==!1&&(I&&(A=I),A.actualize&&(A=A.actualize(n.ownerDocument||v)),n.appendChild(A),m(A))}A=s,T=c}for(;T;)c=T.nextSibling,(u=S(T))?f(u):p(T,n,!0),T=c}var w=h[n.nodeName];w&&w(n,o)}}if(u||(u={}),"string"==typeof a)if("#document"===t.nodeName||"HTML"===t.nodeName){var g=a;a=v.createElement("html"),a.innerHTML=g}else a=n(a);var A,S=u.getNodeKey||l,C=u.onBeforeNodeAdded||d,T=u.onNodeAdded||d,E=u.onBeforeElUpdated||d,j=u.onElUpdated||d,U=u.onBeforeNodeDiscarded||d,V=u.onNodeDiscarded||d,B=u.onBeforeElChildrenUpdated||d,I=u.childrenOnly===!0,M={};s(t);var w=t,_=w.nodeType,O=a.nodeType;if(!I)if(_===y)O===y?r(t,a)||(V(t),w=i(t,o(a.nodeName,a.namespaceURI))):w=a;else if(_===N||_===x){if(O===_)return w.nodeValue!==a.nodeValue&&(w.nodeValue=a.nodeValue),w;w=a}if(w===a)V(t);else if(b(w,a,I),A)for(var P=0,R=A.length;P<R;P++){var L=M[A[P]];L&&p(L,L.parentNode,!1)}return!I&&w!==t&&t.parentNode&&(w.actualize&&(w=w.actualize(t.ownerDocument||v)),t.parentNode.replaceChild(w,t)),w}}var c,p,s="http://www.w3.org/1999/xhtml",v="undefined"==typeof document?void 0:document,m=v?v.body||v.createElement("div"):{};p=m.hasAttributeNS?function(e,t,n){return e.hasAttributeNS(t,n)}:m.hasAttribute?function(e,t,n){return e.hasAttribute(n)}:function(e,t,n){return null!=e.getAttributeNode(t,n)};var b=p,h={OPTION:function(e,t){u(e,t,"selected")},INPUT:function(e,t){u(e,t,"checked"),u(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),b(t,null,"value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n);var r=e.firstChild;if(r){var o=r.nodeValue;if(o==n||!n&&o==e.placeholder)return;r.nodeValue=n}},SELECT:function(e,t){if(!b(t,null,"multiple")){for(var n=-1,r=0,o=t.firstChild;o;){var i=o.nodeName;if(i&&"OPTION"===i.toUpperCase()){if(b(o,null,"selected")){n=r;break}r++}o=o.nextSibling}e.selectedIndex=r}}},y=1,N=3,x=8,g=f(a);e.exports=g},function(t,n){t.exports=e}])})}).call(t,n(2)(e))},function(e,t){"use strict";e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(t,n){t.exports=e}])});