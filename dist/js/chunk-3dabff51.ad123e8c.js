(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3dabff51"],{"1f57":function(e,n,t){"use strict";var a=t("bc3a"),r=t.n(a);function o(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{Authorization:"Bearer "+e.accessToken}:{}}function u(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function c(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function i(e,n,t){return n&&c(e.prototype,n),t&&c(e,t),e}var s="http://localhost:8080/",l=function(){function e(){u(this,e)}return i(e,[{key:"getPublicContent",value:function(){return r.a.get(s+"all")}},{key:"getUserBoard",value:function(){return r.a.get(s+"user",{headers:o()})}},{key:"getModeratorBoard",value:function(){return r.a.get(s+"mod",{headers:o()})}},{key:"getAdminBoard",value:function(){return r.a.get(s+"admin",{headers:o()})}}]),e}();n["a"]=new l},"77f5":function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"container"},[t("header",{staticClass:"jumbotron"},[t("h3",[e._v(e._s(e.content))])])])},r=[],o=t("1f57"),u={name:"Moderator",data:function(){return{content:""}},mounted:function(){var e=this;o["a"].getModeratorBoard().then((function(n){e.content=n.data}),(function(n){e.content=n.response&&n.response.data||n.message||n.toString()}))}},c=u,i=t("2877"),s=Object(i["a"])(c,a,r,!1,null,null,null);n["default"]=s.exports}}]);
//# sourceMappingURL=chunk-3dabff51.ad123e8c.js.map