(()=>{"use strict";var t={n:e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const e=require("express");var n=t.n(e);const r=require("react-router-config"),o=require("express-http-proxy");var c=t.n(o);const i=require("react");var u=t.n(i);const a=require("react-dom/server"),l=require("react-router-dom"),s=require("react-redux"),f=require("isomorphic-style-loader/StyleContext");var p=t.n(f);function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}const m=require("redux"),h=require("redux-thunk");var b=t.n(h);const d=require("axios");var v=t.n(d);v().create({baseURL:"/"});var g="HOME/CHANGE_HOME_LIST";function O(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?O(Object(n),!0).forEach((function(e){E(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function E(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var j={name:"Jack Ma",newsList:[]},P=(0,m.combineReducers)({home:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case g:return w(w({},t),{},{newsList:e.list});default:return t}}});const S=function(){return u().createElement("div",null,u().createElement(l.Link,{to:"/"},"index"),u().createElement("br",null),u().createElement(l.Link,{to:"/home"},"home"),u().createElement("br",null),u().createElement(l.Link,{to:"/login"},"login"))};var k=function(){return function(t,e,n){return n.get("/api/news").then((function(e){var n;t((n=e.data.data,{type:g,list:n}))})).catch((function(t){return console.log(111,t)}))}};function R(t){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function x(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function C(t,e){return(C=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function D(t,e){return!e||"object"!==R(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function L(t){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var A=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&C(t,e)}(i,t);var e,n,r,o,c=(r=i,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=L(r);if(o){var n=L(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return D(this,t)});function i(){return _(this,i),c.apply(this,arguments)}return e=i,(n=[{key:"getHomeNewsList",value:function(){return this.props.list.map((function(t){return u().createElement("div",{key:t.id},t.title)}))}},{key:"render",value:function(){return u().createElement("div",null,u().createElement("div",null,"Home! ",this.props.name),this.getHomeNewsList(),u().createElement("button",{onClick:function(){return alert(1)}},"click"))}},{key:"componentDidMount",value:function(){this.props.list.length||this.props.getHomeList()}}])&&x(e.prototype,n),i}(u().Component);A.loadData=function(t){return t.dispatch(k())};const q=(0,s.connect)((function(t){return{list:t.home.newsList,name:t.home.name}}),(function(t){return{getHomeList:function(){t(k())}}}))(A);function H(t){return(H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function M(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function T(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function N(t,e){return(N=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function I(t,e){return!e||"object"!==H(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function F(t){return(F=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}const U=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&N(t,e)}(i,t);var e,n,r,o,c=(r=i,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=F(r);if(o){var n=F(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return I(this,t)});function i(){return M(this,i),c.apply(this,arguments)}return e=i,(n=[{key:"componentWillMount",value:function(){this.props.staticContext&&(this.props.staticContext.notFound=!0)}},{key:"render",value:function(){return u().createElement("div",null,"404, Not Found ~")}}])&&T(e.prototype,n),i}(u().Component),J=[{path:"/",component:function(t){return u().createElement("div",null,u().createElement(S,null),u().createElement("div",{className:"App_Wrap"},(0,r.renderRoutes)(t.route.routes)))},key:"/App",routes:[{path:"/home",component:q,loadData:q.loadData,exact:!0,key:"/"},{path:"/login",component:function(){return u().createElement("div",null,"Login")},key:"/login"},{component:U,key:"/notfound"}]}];var W=n()();W.use(n().static("public")),W.use("/api",c()("http://localhost:4000",{proxyReqPathResolver:function(t){return"/api".concat(t.url)}})),W.get("*",(function(t,e){var n=function(t){return(0,m.createStore)(P,(0,m.applyMiddleware)(b().withExtraArgument(function(t){return v().create({baseURL:"http://localhost:4000",headers:{cookie:t.get("cookie")||""}})}(t))))}(t),o=(0,r.matchRoutes)(J,t.path),c=[];o.forEach((function(t){if(t.route.loadData){var e=new Promise((function(e,r){t.route.loadData(n).then(e).then(e)}));c.push(e)}})),Promise.all(c).then((function(){var o={css:[]},c=function(t,e,n,o){var c,i=new Set,f=(0,a.renderToString)(u().createElement(p().Provider,{value:{insertCss:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.forEach((function(t){return i.add(t._getCss())}))}}},u().createElement(s.Provider,{store:t},u().createElement(l.StaticRouter,{context:o,location:n.path},(0,r.renderRoutes)(e))))),m=(c=i,function(t){if(Array.isArray(t))return y(t)}(c)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(c)||function(t,e){if(t){if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(t,e):void 0}}(c)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).join("\n");return"\n    <!DOCTYPE html>\n    <html>\n    <head>\n      <title></title>\n      <style>".concat(m,'</style>\n    </head>\n    <body>\n      <div id="root">').concat(f,"</div>\n      <script>\n          window.context = {\n            state: ").concat(JSON.stringify(t.getState()),'\n          };\n      <\/script>\n      <script src="/index.js"><\/script>\n    </body>\n    </html>\n  ')}(n,J,t,o);if("REPLACE"===o.action)return e.redirect(301,o.url);o.notFound&&(e.statusCode=404),e.send(c)}))})),W.listen(3e3,(function(){return console.log("react isomorphism app listening on port ".concat(3e3))}))})();