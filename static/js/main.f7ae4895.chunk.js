(this["webpackJsonpschool-bus-timetable"]=this["webpackJsonpschool-bus-timetable"]||[]).push([[0],{143:function(e,t,n){},166:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(13),i=n.n(c),l=(n(143),n(46)),o=n(17),s=n(118),d=n(7),j=n(114),u=n.n(j),b=n(116),h=n(48),m=n(223),O=n(120),f=n(172),x=n(225),g=n(217),p=n(219),v=n(218),y=n(14),k=function(e){var t=Object(r.useState)(!1),n=Object(d.a)(t,2),a=n[0],c=n[1],i=Object(r.useCallback)((function(){return c(!0)}),[]),l=Object(r.useCallback)((function(){return c(!1)}),[]);return""!==e.remarks?Object(y.jsxs)("div",{children:[Object(y.jsx)(h.a,{variant:"contained",color:"primary",onClick:i,children:"\u5099\u8003"}),Object(y.jsx)(m.a,{open:a,onClose:l,children:Object(y.jsx)(O.a,{style:{whiteSpace:"pre-wrap",minWidth:300,minHeight:300},children:Object(y.jsx)(f.a,{style:{padding:"2rem",fontSize:"2rem",display:"flex",justifyContent:"center",alignItems:"center",lineHeight:"2em"},children:e.remarks})})})]}):Object(y.jsx)(y.Fragment,{})},C=function(){var e=function(e){var t=e.value;return void 0!==t?"".concat(t.getHours().toString().padStart(2,"0"),":").concat(t.getMinutes().toString().padStart(2,"0")):t};return[{headerName:"ID",field:"id",hide:!0,type:"number"},{headerName:"\u767a\u8eca",field:"start",flex:2,valueFormatter:e,align:"center",headerAlign:"center"},{headerName:"\u7d4c\u75311",field:"via1",flex:2,valueFormatter:e,align:"center",headerAlign:"center"},{headerName:"\u7d4c\u75312",field:"via2",flex:2,valueFormatter:e,align:"center",headerAlign:"center"},{headerName:"\u7d42\u70b9",field:"goal",flex:2,valueFormatter:e,align:"center",headerAlign:"center"},{headerName:"\u5099\u8003",field:"remarks",flex:1,align:"center",headerAlign:"center",renderCell:function(e){return Object(y.jsx)(k,{remarks:e.value})}}]}(),F=function(e){var t=Object(r.useState)([]),n=Object(d.a)(t,2),a=n[0],c=n[1],i=Object(r.useCallback)((function(e,t){var n=e.remarks,r=Object(s.a)(e,["remarks"]);return Object.assign.apply(Object,[{remarks:n,id:t}].concat(Object(o.a)(Object.entries(r).map((function(e){return Object(l.a)({},e[0],""!==(t=e[1])?new Date(t):void 0);var t})))))}),[]);return Object(r.useEffect)((function(){u.a.get("".concat("https://script.google.com/macros/s/AKfycbyLqwd2q-JoOBW3OIRH3oCMR0WhOKxICeBn9vMFQvRx2JE6J_TMxxyPhp6EEph6GFNA/exec","?direction=").concat(e.direction)).then((function(e){return c(e.data.values.map(i))})).catch((function(){return alert("\u901a\u4fe1\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u518d\u8aad\u8fbc\u3057\u3066\u4e0b\u3055\u3044\u3002")}))}),[e.direction,i]),Object(y.jsx)("div",{children:Object(y.jsxs)(x.a,{children:[Object(y.jsx)(g.a,{expandIcon:Object(y.jsx)(v.a,{}),children:Object(y.jsx)(f.a,{children:e.title})}),Object(y.jsx)(p.a,{children:Object(y.jsx)(b.a,{rows:a,columns:C,autoPageSize:!0,autoHeight:!0})})]})})};var S=function(){return Object(y.jsx)("div",{className:"App",children:Object(y.jsxs)("body",{children:[Object(y.jsx)(F,{direction:"outward",title:"\u99c5->\u5b66\u6821"}),Object(y.jsx)(F,{direction:"homeward",title:"\u5b66\u6821->\u99c5"})]})})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,227)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),c(e),i(e)}))},A=n(220),N=n(49),I=n(76),E=n(77),H=Object(N.a)({palette:{primary:{main:I.a[500]},secondary:{main:E.a[500]}}});i.a.render(Object(y.jsx)(a.a.StrictMode,{children:Object(y.jsx)(A.a,{theme:H,children:Object(y.jsx)(S,{})})}),document.getElementById("root")),w()}},[[166,1,2]]]);
//# sourceMappingURL=main.f7ae4895.chunk.js.map