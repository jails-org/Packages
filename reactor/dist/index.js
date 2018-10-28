!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("reactor",[],t):"object"==typeof exports?exports.reactor=t():e.reactor=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e){return JSON.parse(JSON.stringify(e))}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body,t=document.createElement("div"),r=Array.prototype.slice.call(e.querySelectorAll("[data-component]"));r.forEach(function(e,t){return e.setAttribute(d,c++)}),t.innerHTML=e.innerHTML.replace(/<template*.>/g,"").replace(/<\/template>/g,"");var n=Array.prototype.slice.call(t.querySelectorAll("[data-component]")),i=n.filter(function(e){return!e.getAttribute(d)});i.forEach(function(e){return e.setAttribute(d,c++)}),n.forEach(function(e){var t=+e.getAttribute(d);f[t]||(f[t]=e.outerHTML)})}Object.defineProperty(t,"__esModule",{value:!0}),t.soda=t.morphdom=void 0;var a=r(1),u=n(a),l=r(2),s=n(l);t.morphdom=u.default,t.soda=s.default;var c=0,d="data-reactor-id",f={},p={},v={};t.default=function(e){return o(),function(e){if(e.elm==document.body)e.reactor=function(e){return console.warn("Reactor can`t be used on document.body")};else{var t=+e.elm.getAttribute(d),r=f[t],n=e.elm;e.reactor=function(a){if(!a)return i(v);Object.assign(v,a);var l=Object.assign({},i(v),a),m={hascomponent:!1};n=(0,u.default)(n,(0,s.default)(r,l),o(n,m)),m.hascomponent&&(e.jails.observer||e.jails.start(n),e.elm.getAttribute(d)||(e.elm.setAttribute(d,c++),f[c]=n.outerHTML.replace(/<template*.>/g,"").replace(/<\/template>/g,""))),m.hascomponent=!1,p[t]=l}}var o=function(t,r){return{getNodeKey:function(e){var t=e.getAttribute&&e.getAttribute(d);if(t)return+t},onBeforeElChildrenUpdated:function(t,r){if(t.getAttribute&&t.getAttribute("data-static")&&t!=e.elm)return!1},onNodeAdded:function(e){e.getAttribute&&e.getAttribute("data-component")&&!e.j&&(r.hascomponent=!0)},onBeforeNodeDiscarded:function(t){t.getAttribute&&t.getAttribute("data-component")&&t.j&&e.jails.destroy(t)}}};return e.reactor.templates=f,e.reactor.model=p,e.reactor.REACTORID=d,e.reactor.SST=v,e}}},function(e,t){"use strict";function r(e){!d&&v.createRange&&(d=v.createRange(),d.selectNode(v.body));var t;return d&&d.createContextualFragment?t=d.createContextualFragment(e):(t=v.createElement("body"),t.innerHTML=e),t.childNodes[0]}function n(e,t){var r=e.nodeName,n=t.nodeName;return r===n||!!(t.actualize&&r.charCodeAt(0)<91&&n.charCodeAt(0)>90)&&r===n.toUpperCase()}function i(e,t){return t&&t!==p?v.createElementNS(t,e):v.createElement(e)}function o(e,t){for(var r=e.firstChild;r;){var n=r.nextSibling;t.appendChild(r),r=n}return t}function a(e,t){var r,n,i,o,a,u,l=t.attributes;for(r=l.length-1;r>=0;--r)n=l[r],i=n.name,o=n.namespaceURI,a=n.value,o?(i=n.localName||i,u=e.getAttributeNS(o,i),u!==a&&e.setAttributeNS(o,i,a)):(u=e.getAttribute(i),u!==a&&e.setAttribute(i,a));for(l=e.attributes,r=l.length-1;r>=0;--r)n=l[r],n.specified!==!1&&(i=n.name,o=n.namespaceURI,o?(i=n.localName||i,g(t,o,i)||e.removeAttributeNS(o,i)):g(t,null,i)||e.removeAttribute(i))}function u(e,t,r){e[r]!==t[r]&&(e[r]=t[r],e[r]?e.setAttribute(r,""):e.removeAttribute(r,""))}function l(){}function s(e){return e.id}function c(e){return function(t,a,u){function c(e){x?x.push(e):x=[e]}function d(e,t){if(e.nodeType===b)for(var r=e.firstChild;r;){var n=void 0;t&&(n=N(r))?c(n):(C(r),r.firstChild&&d(r,t)),r=r.nextSibling}}function f(e,t,r){S(e)!==!1&&(t&&t.removeChild(e),C(e),d(e,r))}function p(e){if(e.nodeType===b)for(var t=e.firstChild;t;){var r=N(t);r&&(k[r]=t),p(t),t=t.nextSibling}}function m(e){T(e);for(var t=e.firstChild;t;){var r=t.nextSibling,i=N(t);if(i){var o=k[i];o&&n(t,o)&&(t.parentNode.replaceChild(o,t),g(o,t))}m(t),t=r}}function g(r,i,o){var u,l=N(i);if(l&&delete k[l],!a.isSameNode||!a.isSameNode(t)){if(!o){if(R(r,i)===!1)return;if(e(r,i),O(r),M(r,i)===!1)return}if("TEXTAREA"!==r.nodeName){var s,d,p,E,x=i.firstChild,T=r.firstChild;e:for(;x;){for(p=x.nextSibling,s=N(x);T;){if(d=T.nextSibling,x.isSameNode&&x.isSameNode(T)){x=p,T=d;continue e}u=N(T);var S=T.nodeType,C=void 0;if(S===x.nodeType&&(S===b?(s?s!==u&&((E=k[s])?T.nextSibling===E?C=!1:(r.insertBefore(E,T),d=T.nextSibling,u?c(u):f(T,r,!0),T=E):C=!1):u&&(C=!1),C=C!==!1&&n(T,x),C&&g(T,x)):S!==y&&S!=_||(C=!0,T.nodeValue!==x.nodeValue&&(T.nodeValue=x.nodeValue))),C){x=p,T=d;continue e}u?c(u):f(T,r,!0),T=d}if(s&&(E=k[s])&&n(E,x))r.appendChild(E),g(E,x);else{var G=A(x);G!==!1&&(G&&(x=G),x.actualize&&(x=x.actualize(r.ownerDocument||v)),r.appendChild(x),m(x))}x=p,T=d}for(;T;)d=T.nextSibling,(u=N(T))?c(u):f(T,r,!0),T=d}var j=h[r.nodeName];j&&j(r,i)}}if(u||(u={}),"string"==typeof a)if("#document"===t.nodeName||"HTML"===t.nodeName){var E=a;a=v.createElement("html"),a.innerHTML=E}else a=r(a);var x,N=u.getNodeKey||s,A=u.onBeforeNodeAdded||l,T=u.onNodeAdded||l,R=u.onBeforeElUpdated||l,O=u.onElUpdated||l,S=u.onBeforeNodeDiscarded||l,C=u.onNodeDiscarded||l,M=u.onBeforeElChildrenUpdated||l,G=u.childrenOnly===!0,k={};p(t);var j=t,w=j.nodeType,V=a.nodeType;if(!G)if(w===b)V===b?n(t,a)||(C(t),j=o(t,i(a.nodeName,a.namespaceURI))):j=a;else if(w===y||w===_){if(V===w)return j.nodeValue!==a.nodeValue&&(j.nodeValue=a.nodeValue),j;j=a}if(j===a)C(t);else if(g(j,a,G),x)for(var L=0,$=x.length;L<$;L++){var P=k[x[L]];P&&f(P,P.parentNode,!1)}return!G&&j!==t&&t.parentNode&&(j.actualize&&(j=j.actualize(t.ownerDocument||v)),t.parentNode.replaceChild(j,t)),j}}var d,f,p="http://www.w3.org/1999/xhtml",v="undefined"==typeof document?void 0:document,m=v?v.body||v.createElement("div"):{};f=m.hasAttributeNS?function(e,t,r){return e.hasAttributeNS(t,r)}:m.hasAttribute?function(e,t,r){return e.hasAttribute(r)}:function(e,t,r){return null!=e.getAttributeNode(t,r)};var g=f,h={OPTION:function(e,t){u(e,t,"selected")},INPUT:function(e,t){u(e,t,"checked"),u(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),g(t,null,"value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var r=t.value;e.value!==r&&(e.value=r);var n=e.firstChild;if(n){var i=n.nodeValue;if(i==r||!r&&i==e.placeholder)return;n.nodeValue=r}},SELECT:function(e,t){if(!g(t,null,"multiple")){for(var r=-1,n=0,i=t.firstChild;i;){var o=i.nodeName;if(o&&"OPTION"===o.toUpperCase()){if(g(i,null,"selected")){r=n;break}n++}i=i.nextSibling}e.selectedIndex=n}}},b=1,y=3,_=8,E=c(a);e.exports=E},function(e,t,r){!function(t,r){e.exports=r()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=r(1),u=r(2),l="undefined"!=typeof document?document:{},s=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"soda-";n(this,e),this._prefix=t}return o(e,[{key:"setDocument",value:function(e){l=e}},{key:"run",value:function(e,t){var r=this,n=l.createElement("div");l.documentMode<9&&(n.style.display="none",l.body.appendChild(n)),n.innerHTML=e,(0,u.nodes2Arr)(n.childNodes).map(function(e){r.compileNode(e,t)});var i=n.innerHTML;return l.documentMode<9&&l.body.removeChild(n),i}},{key:"prefix",value:function(e){this._prefix=e}},{key:"_getPrefixReg",value:function(){return new RegExp("^"+this._prefix)}},{key:"_getPrefixedDirectiveMap",value:function(){var t=this,r={};return e.sodaDirectives.map(function(e){var n=t._prefix+e.name;r[n]=e}),r}},{key:"_removeSodaMark",value:function(e,t){e.removeAttribute(t)}},{key:"compileNode",value:function(t,r){var n=this,o=this._getPrefixReg(),s=e.sodaDirectives,c=this._getPrefixedDirectiveMap(),d=function e(t,r){t.nodeType===(t.TEXT_NODE||3)&&(t.nodeValue=t.nodeValue.replace(a.VALUE_OUT_REG,function(e,t){var o=n.parseSodaExpression(t,r);return"object"===("undefined"==typeof o?"undefined":i(o))&&(o=JSON.stringify(o,null,2)),o})),t.attributes&&t.attributes.length&&(s.map(function(e){var i=e.name,o=e.opt,a=n._prefix+i;if((0,u.exist)(t.getAttribute(a))){var s=t.getAttribute(a);o.link.bind(n)({expression:s,scope:r,el:t,parseSodaExpression:n.parseSodaExpression.bind(n),getValue:n.getValue.bind(n),compileNode:n.compileNode.bind(n),document:l}),n._removeSodaMark(t,a)}}),(0,u.nodes2Arr)(t.attributes).filter(function(e){return!c[e.name]}).map(function(e){if(o.test(e.name)){var i=e.name.replace(o,"");if(i&&(0,u.exist)(e.value)){var a=n.parseComplexExpression(e.value,r);a!==!1&&(0,u.exist)(a)&&t.setAttribute(i,a),n._removeSodaMark(t,e.name)}}else(0,u.exist)(e.value)&&(e.value=n.parseComplexExpression(e.value,r))})),(0,u.nodes2Arr)(t.childNodes).map(function(t){e(t,r)})};d(t,r)}},{key:"getEvalFunc",value:function(t){var r=new Function("getValue","sodaFilterMap","return function sodaExp(scope){ return "+t+"}")(this.getValue,e.sodaFilterMap);return r}},{key:"getValue",value:function(e,t){a.CONST_REGG.lastIndex=0;t.replace(a.CONST_REGG,function(t){return"undefined"==typeof e[t]?t:e[t]});if("true"===t)return!0;if("false"===t)return!1;var r=function t(r,n){var i=n.indexOf(".");if(i>-1){var o=n.substr(0,i);if(n=n.substr(i+1),"undefined"!=typeof e[o]&&a.CONST_REG.test(o)&&(o=e[o]),"undefined"!=typeof r[o]&&null!==r[o])return t(r[o],n);return""}n=n.trim(),"undefined"!=typeof e[n]&&a.CONST_REG.test(n)&&(n=e[n]);var u;if("undefined"!=typeof r[n])u=r[n];else{u=""}return u};return r(e,t)}},{key:"parseComplexExpression",value:function(e,t){var r=this,n=a.ONLY_VALUE_OUT_REG.exec(e);if(n){var i=n[1];return this.parseSodaExpression(i,t)}return e.replace(a.VALUE_OUT_REG,function(e,n){return r.parseSodaExpression(n,t)})}},{key:"parseSodaExpression",value:function(e,t){var r=this;e=e.replace(a.STRING_REG,function(e,r,n){var i=(0,u.getRandom)();return t[i]=r||n,i}),e=e.replace(a.OR_REG,a.OR_REPLACE).split("|");for(var n=0;n<e.length;n++)e[n]=(e[n].replace(new RegExp(a.OR_REPLACE,"g"),"||")||"").trim();for(var i=e[0]||"",o=e.slice(1);a.ATTR_REG_NG.test(i);)a.ATTR_REG.lastIndex=0,i=i.replace(a.ATTR_REG,function(e,n){var i=(0,u.getAttrVarKey)(),o=r.parseSodaExpression(n,t);return t[i]=o,"."+i});return i=i.replace(a.OBJECT_REG,function(e){return"getValue(scope,'"+e.trim()+"')"}),i=this.parseFilter(o,i),this.getEvalFunc(i)(t)}},{key:"parseFilter",value:function(t,r){var n=e.sodaFilterMap,i=function e(){var i=t.shift();if(i){for(var i=i.split(":"),o=i.slice(1)||[],u=(i[0]||"").trim(),l=0;l<o.length;l++)a.OBJECT_REG_NG.test(o[l])&&(o[l]="getValue(scope,'"+o[l]+"')");n[u]&&(o.unshift(r),o=o.join(","),r="sodaFilterMap['"+u+"']("+o+")"),e()}};return i(),r}}],[{key:"filter",value:function(e,t){this.sodaFilterMap[e]=t}},{key:"getFilter",value:function(e){return this.sodaFilterMap[e]}},{key:"directive",value:function(e,t){var r=t.priority,n=void 0===r?0:r,i=void 0;for(i=0;i<this.sodaDirectives.length;i++){var o=this.sodaDirectives[i],a=o.opt.priority,u=void 0===a?0:a;if(n<u);else if(n>=u)break}this.sodaDirectives.splice(i,0,{name:e,opt:t})}},{key:"discribe",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{compile:!0};this.template[e]={funcOrStr:t,option:r}}},{key:"getTmpl",value:function(e,t){var r=this.template[e],n=r.funcOrStr,i=r.option,o=void 0===i?{}:i,a=void 0;return a="function"==typeof n?n.apply(null,t):n,{template:a,option:o}}}]),e}();s.sodaDirectives=[],s.sodaFilterMap={},s.template={},t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.IDENTOR_REG=/[a-zA-Z_\$]+[\w\$]*/g,t.STRING_REG=/"([^"]*)"|'([^']*)'/g,t.NUMBER_REG=/\d+|\d*\.\d+/g,t.OBJECT_REG=/[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/g,t.OBJECT_REG_NG=/[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/,t.ATTR_REG=/\[([^\[\]]*)\]/g,t.ATTR_REG_NG=/\[([^\[\]]*)\]/,t.ATTR_REG_DOT=/\.([a-zA-Z_\$]+[\w\$]*)/g,t.NOT_ATTR_REG=/[^\.|]([a-zA-Z_\$]+[\w\$]*)/g,t.OR_REG=/\|\|/g,t.OR_REPLACE="OR_OPERATOR",t.CONST_PRIFIX="_$C$_",t.CONST_REG=/^_\$C\$_/,t.CONST_REGG=/_\$C\$_[^\.]+/g,t.VALUE_OUT_REG=/\{\{([^\}]*)\}\}/g,t.ONLY_VALUE_OUT_REG=/^\{\{([^\}]*)\}\}$/},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.assign=t.nodes2Arr=t.exist=t.getRandom=t.getAttrVarKey=void 0;var n=r(1),i=(t.getAttrVarKey=function(){return n.CONST_PRIFIX+~~(1e6*Math.random())},t.getRandom=function(){return"$$"+~~(1e6*Math.random())},t.exist=function(e){return null!==e&&void 0!==e&&""!==e&&"undefined"!=typeof e},t.nodes2Arr=function(e){for(var t=[],r=0;r<e.length;r++)t.push(e[r]);return t},Object.getOwnPropertySymbols),o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,u=function(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)};t.assign=Object.assign||function(e,t){for(var r,n,l=u(e),s=1;s<arguments.length;s++){r=Object(arguments[s]);for(var c in r)o.call(r,c)&&(l[c]=r[c]);if(i){n=i(r);for(var d=0;d<n.length;d++)a.call(r,n[d])&&(l[n[d]]=r[n[d]])}}return l}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var i=r(0),o=n(i),a=r(2);r(4),r(5),r(6),r(7),r(8),r(9),r(10);var u=new o.default,l=function(e,t){return u.run(e,t)},s={prefix:function(e){u.prefix(e)},filter:function(e,t){o.default.filter(e,t)},directive:function(e,t){o.default.directive(e,t)},setDocument:function(e){u.setDocument(e)},discribe:function(e,t,r){o.default.discribe(e,t,r)},Soda:o.default},c=(0,a.assign)(l,s);e.exports=c},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var i=r(0),o=n(i);o.default.directive("repeat",{priority:10,link:function(e){var t,r,n,i=this,o=e.scope,a=e.el,u=e.expression,l=e.getValue,s=(e.parseSodaExpression,e.compileNode),c=/\s+by\s+([^\s]+)$/,d=u.replace(c,function(e,t){return t&&(n=(t||"").trim()),""}),f=/([^\s]+)\s+in\s+([^\s]+)|\(([^,]+)\s*,\s*([^)]+)\)\s+in\s+([^\s]+)/,p=f.exec(d);if(p){if(p[1]&&p[2]){if(t=(p[1]||"").trim(),r=(p[2]||"").trim(),!t||!r)return}else p[3]&&p[4]&&p[5]&&(n=(p[3]||"").trim(),t=(p[4]||"").trim(),r=(p[5]||"").trim());n=n||"$index";var v=l(o,r)||[],m=function(e){var r=a.cloneNode(!0),u=Object.create(o);u[n]=e,u[t]=v[e],r.removeAttribute(i._prefix+"repeat"),a.parentNode.insertBefore(r,a),s(r,u)};if("length"in v)for(var g=0;g<v.length;g++)m(g);else for(var g in v)v.hasOwnProperty(g)&&m(g);a.parentNode.removeChild(a),a.childNodes&&a.childNodes.length&&(a.innerHTML="")}}})},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var i=r(0),o=n(i);o.default.directive("if",{priority:9,link:function(e){var t=e.expression,r=e.parseSodaExpression,n=e.scope,i=e.el,o=r(t,n);o||(i.parentNode&&i.parentNode.removeChild(i),i.innerHTML="")}})},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var i=r(0),o=n(i),a=function(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)","g")},u=function(e,t){return e.className?void(e.className.match(a(t))||(e.className+=" "+t)):void(e.className=t)};o.default.directive("class",{link:function(e){var t=e.scope,r=e.el,n=e.expression,i=e.parseSodaExpression,o=i(n,t);o&&u(r,o)}})},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var i=r(0),o=n(i);o.default.directive("html",{link:function(e){var t=e.expression,r=e.scope,n=e.el,i=e.parseSodaExpression,o=i(t,r);o&&(n.innerHTML=o)}})},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var i=r(0),o=n(i);o.default.directive("replace",{link:function(e){var t=e.scope,r=e.el,n=e.expression,i=e.parseSodaExpression,o=e.document,a=i(n,t);if(a){var u=o.createElement("div");if(u.innerHTML=a,r.parentNode)for(;u.childNodes[0];)r.parentNode.insertBefore(u.childNodes[0],r)}r.parentNode&&r.parentNode.removeChild(r)}})},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var i=r(0),o=n(i);o.default.directive("style",{link:function(e){var t=e.scope,r=e.el,n=e.expression,i=e.parseSodaExpression,o=i(n,t),a=function(e,t){var r=/opacity|z-index/;return r.test(e)?parseFloat(t):isNaN(t)?t:t+"px"};if(o){var u=[];for(var l in o)if(o.hasOwnProperty(l)){var s=a(l,o[l]);u.push([l,s].join(":"))}for(var c=r.style,l=0;l<c.length;l++){var d=c[l];o[d]||u.push([d,c[d]].join(":"))}var f=u.join(";");r.setAttribute("style",f)}}})},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var i=r(0),o=n(i);o.default.directive("include",{priority:8,link:function(e){var t=e.scope,r=e.el,n=e.parseSodaExpression,i=e.expression,a=/\{\{([^\}]*)\}\}/g,u=i.replace(a,function(e,r){return n(r,t)});u=u.split(":");var l=u[0],s=u.slice(1),c=o.default.getTmpl(l,s),d=c.template,f=c.option,p=void 0===f?{}:f;d&&(p.compile?r.outerHTML=this.run(d,t):r.outerHTML=d)}})}])})}])});