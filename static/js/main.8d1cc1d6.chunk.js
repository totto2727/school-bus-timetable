(this["webpackJsonpschool-bus-timetable"]=this["webpackJsonpschool-bus-timetable"]||[]).push([[0],{138:function(e,t,a){},161:function(e,t,a){"use strict";a.r(t);var i=a(0),r=a.n(i),n=a(13),c=a.n(n),o=(a(138),a(6)),d=a(76),l=a(112),s=a(105),u=a.n(s),b=a(106),f=a(18),h=function(e){var t=e.value;return void 0!==t?"".concat(t.getHours().toString().padStart(2,"0"),":").concat(t.getMinutes().toString().padStart(2,"0")):t},m=[{headerName:"ID",field:"id",hide:!0,type:"number"},{headerName:"\u65b9\u5411",field:"direction",flex:2,hide:!0},{headerName:"\u767a\u8eca",field:"start",flex:2,valueFormatter:h},{headerName:"\u7d4c\u75311",field:"via1",flex:2,valueFormatter:h},{headerName:"\u7d4c\u75312",field:"via2",flex:2,valueFormatter:h},{headerName:"\u7d42\u70b9",field:"goal",flex:2,valueFormatter:h},{headerName:"\u5099\u8003",field:"remarks",flex:12}],j=function(e){return""!==e?new Date(e):void 0},v=function(e){var t=Object(i.useState)([]),a=Object(o.a)(t,2),r=a[0],n=a[1];return Object(i.useEffect)((function(){u.a.get("".concat("https://script.google.com/macros/s/AKfycbzpWd0epw9-o6baEuK7dliYA95BD1ZoviIriL8AJPmEZZOwXKd1KVWqNqiIycO1Hdvq/exec","?direction=").concat(e.direction)).then((function(e){return n(e.data.values.map((function(e,t){var a=e.start,i=e.via1,r=e.via2,n=e.goal,c=Object(l.a)(e,["start","via1","via2","goal"]);return Object(d.a)(Object(d.a)({},c),{},{id:t,start:j(a),via1:j(i),via2:j(r),goal:j(n)})})))}))}),[e.direction,r]),Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:e.title}),Object(f.jsx)(b.a,{rows:r,columns:m,autoPageSize:!0,autoHeight:!0})]})};var g=function(){return Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)("body",{children:[Object(f.jsx)(v,{direction:"outward",title:"\u99c5->\u5b66\u6821"}),Object(f.jsx)(v,{direction:"homeward",title:"\u5b66\u6821->\u99c5"})]})})},O=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,214)).then((function(t){var a=t.getCLS,i=t.getFID,r=t.getFCP,n=t.getLCP,c=t.getTTFB;a(e),i(e),r(e),n(e),c(e)}))},p=a(209),x=a(46),N=a(212),w=a(73),F=Object(x.a)({palette:{primary:{main:N.a[500]},secondary:{main:w.a[500]}}});c.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(p.a,{theme:F,children:Object(f.jsx)(g,{})})}),document.getElementById("root")),O()}},[[161,1,2]]]);
//# sourceMappingURL=main.8d1cc1d6.chunk.js.map