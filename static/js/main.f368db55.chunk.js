(this["webpackJsonpschool-bus-timetable"]=this["webpackJsonpschool-bus-timetable"]||[]).push([[0],{173:function(e,t,a){},174:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(14),i=a.n(c),o=a(7),s=a(37),l=a(17),j=a(126),u=a(31),b=a(122),d=a.n(b),m=a(124),O=a(26),p=a(52),h=a(231),g=a(128),f=a(180),x=a(233),v=a(225),y=a(227),S=a(226),k=a(13),C=Object(O.a)((function(e){return{remarksPaper:{whiteSpace:"pre-wrap",minWidth:300,minHeight:300},remarksTypography:{padding:"2rem",fontSize:"2rem",display:"flex",justifyContent:"center",alignItems:"center",lineHeight:"3rem"},root:{"& .disable":{opacity:.5},"& .remarksPaper":{whiteSpace:"pre-wrap",minWidth:300,minHeight:300},"& .remarksTypography":{padding:"2rem",fontSize:"2rem",display:"flex",justifyContent:"center",alignItems:"center",lineHeight:"3rem"}}}})),N=function(e){var t=C(),a=Object(r.useState)(!1),n=Object(o.a)(a,2),c=n[0],i=n[1],s=Object(r.useCallback)((function(){return i(!0)}),[]),l=Object(r.useCallback)((function(){return i(!1)}),[]);return""!==e.remarks?Object(k.jsxs)("div",{className:t.root,children:[Object(k.jsx)(p.a,{variant:"contained",color:"primary",onClick:s,children:"\u5099\u8003"}),Object(k.jsx)(h.a,{open:c,onClose:l,children:Object(k.jsx)(g.a,{className:t.remarksPaper,children:Object(k.jsx)(f.a,{className:t.remarksTypography,children:e.remarks})})})]}):Object(k.jsx)(k.Fragment,{})},w=function(e){var t={field:"",flex:2,align:"center",headerAlign:"center",sortable:!1,disableColumnMenu:!0,valueFormatter:function(e){var t=e.value;return void 0!==t?"".concat(t.getHours().toString().padStart(2,"0"),":").concat(t.getMinutes().toString().padStart(2,"0")):t},cellClassName:function(e){return function(e){var t=e.value,a=new Date;return!t||t.getHours()>a.getHours()||t.getHours()===a.getHours()&&t.getMinutes()>=a.getMinutes()}(e)?"":"disable"}};return[{headerName:"ID",field:"id",hide:!0,type:"number"},Object(u.a)(Object(u.a)({},t),{},{headerName:"".concat(e.start1,"\u767a"),field:"start"}),Object(u.a)(Object(u.a)({},t),{},{headerName:"".concat(e.start2,"\u767a"),field:"via1",flex:2}),Object(u.a)(Object(u.a)({},t),{},{headerName:"".concat(e.start3,"\u767a"),field:"via2",flex:2}),Object(u.a)(Object(u.a)({},t),{},{headerName:"".concat(e.goal,"\u7740"),field:"goal",flex:2}),Object(u.a)(Object(u.a)({},t),{},{headerName:"\u5099\u8003",field:"remarks",flex:1,align:"center",valueFormatter:void 0,cellClassName:void 0,renderCell:function(e){return Object(k.jsx)(N,{remarks:e.value})}})]},F=function(e){var t=Object(r.useState)([]),a=Object(o.a)(t,2),n=a[0],c=a[1],i=C(),u=Object(r.useCallback)((function(e,t){var a=e.remarks,r=Object(j.a)(e,["remarks"]);return Object.assign.apply(Object,[{remarks:a,id:t}].concat(Object(l.a)(Object.entries(r).map((function(e){return Object(s.a)({},e[0],""!==(t=e[1])?new Date(t):void 0);var t})))))}),[]);return Object(r.useEffect)((function(){d.a.get("".concat("https://script.google.com/macros/s/AKfycbyFqCdqeo0DvFUJE8KCM3-6OzwckqNJGstPRtpppYbIu-JUmi_eUo_SkwpUmWhwlF4c/exec","?direction=").concat(e.direction)).then((function(e){return c(e.data.values.map(u))})).catch((function(){return alert("\u901a\u4fe1\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u518d\u8aad\u8fbc\u3057\u3066\u4e0b\u3055\u3044\u3002")}))}),[e.direction,u]),Object(k.jsx)("div",{className:i.root,children:Object(k.jsxs)(x.a,{style:{minWidth:"40rem"},children:[Object(k.jsx)(v.a,{expandIcon:Object(k.jsx)(S.a,{}),style:{fontWeight:"bold"},children:e.children}),Object(k.jsx)(y.a,{children:Object(k.jsx)(m.a,{rows:n,columns:w(e.busStop),autoPageSize:!0,autoHeight:!0})})]})})},H=a(92),I=a.n(H),P=a(93),M=a.n(P),U=a(91),E=a.n(U),J=function(){var e=Object(r.useState)(),t=Object(o.a)(e,2),a=t[0],n=t[1],c=Object(r.useCallback)((function(){navigator.geolocation.getCurrentPosition((function(e){console.log("\u7def\u5ea6"+e.coords.latitude,"\u7d4c\u5ea6"+e.coords.longitude),n(e)}),(function(e){alert("\u4f4d\u7f6e\u60c5\u5831\u306e\u53d6\u5f97\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u30a8\u30e9\u30fc\u30b3\u30fc\u30c9\uff1a"+e.code)}))}),[]);return Object(r.useEffect)(c,[c]),Object(k.jsxs)("div",{children:[Object(k.jsx)(F,{direction:"outward",busStop:{start1:"\u5343\u6b73\u99c5",start2:"\u5357\u5343\u6b73\u99c5",start3:"\u7814\u7a76\u5b9f\u9a13\u68df",goal:"\u672c\u90e8\u68df"},position:a,children:Object(k.jsxs)("div",{children:[Object(k.jsx)(E.a,{})," ",Object(k.jsx)(I.a,{})," ",Object(k.jsx)(M.a,{})," (\u884c\u304d)"]})}),Object(k.jsx)(F,{direction:"homeward",busStop:{start1:"\u672c\u90e8\u68df",start2:"\u7814\u7a76\u5b9f\u9a13\u68df",start3:"\u5357\u5343\u6b73\u99c5",goal:"\u5343\u6b73\u99c5"},position:a,children:Object(k.jsxs)("div",{children:[Object(k.jsx)(M.a,{})," ",Object(k.jsx)(I.a,{})," ",Object(k.jsx)(E.a,{})," (\u5e30\u308a)"]})})]})},D=function(e){e&&a.e(3).then(a.bind(null,235)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),r(e),n(e),c(e),i(e)}))},T=a(228),W=a(54),z=a(77),A=a(78),q=Object(W.a)({palette:{primary:{main:z.a[500]},secondary:{main:A.a[500]}},typography:{fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Noto Sans JP","Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(",")}});a(173);i.a.render(Object(k.jsx)(n.a.StrictMode,{children:Object(k.jsx)(T.a,{theme:q,children:Object(k.jsx)(J,{})})}),document.getElementById("root")),D()}},[[174,1,2]]]);
//# sourceMappingURL=main.f368db55.chunk.js.map