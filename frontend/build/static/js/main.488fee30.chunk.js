(this["webpackJsonphello-react"]=this["webpackJsonphello-react"]||[]).push([[0],{316:function(e,a,t){e.exports=t(590)},321:function(e,a,t){},322:function(e,a,t){e.exports=t.p+"static/media/logo.5d5d9eef.svg"},323:function(e,a,t){},590:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(14),o=t.n(l),i=(t(321),t(13)),s=t(39),c=t(25),m=t(53),u=t(54),d=t(40),p=t(56),g=(t(322),t(323),t(57)),h=t(644),v=t(21),f=t(660),E=t(647),S=t(655),b=t(642),w=t(645),y=t(637),C=t(117),x=t.n(C),k=t(85),j=t(634),O=t(646),N=t(656),D=t(659),P=t(158),L=t.n(P),B=t(641),A=t(41),R=t.n(A),M=t(110),U=Object(j.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)}}})),I=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(m.a)(this,Object(u.a)(a).call(this))).fnameChange=function(a){a.preventDefault(),e.setState({fname:a.target.value}),console.log(a.target.value),a.target.value.toString().length>=3?e.setState({validFname:!0}):e.setState({validFname:!1})},e.lnameChange=function(a){a.preventDefault(),e.setState({lname:a.target.value}),console.log(a.target.value),a.target.value.toString().length>=3?e.setState({validLname:!0}):e.setState({validLname:!1})},e.emailChange=function(a){a.preventDefault(),e.setState({email:a.target.value}),console.log(a.target.value),L.a.isEmail(a.target.value)?e.setState({validEmail:!0}):e.setState({validEmail:!1})},e.pwdChange=function(a){a.preventDefault(),e.setState({pwd:a.target.value}),console.log(a.target.value),a.target.value.toString().length>=8?e.setState({validPwd:!0}):e.setState({validPwd:!1})},e.roleChange=function(a){a.preventDefault(),e.setState({role:a.target.value}),a.target.value.toString().length>0?e.setState({validRole:!0}):e.setState({validRole:!1})},e.usernameChange=function(a){a.preventDefault(),e.setState({username:a.target.value}),console.log(a.target.value),a.target.value.toString().length>=5?e.setState({validUsername:!0}):e.setState({validUsername:!1})},e.submit=function(a){if(a.preventDefault(),e.state.fname.toString().length>=3?e.setState({validFname:!0}):e.setState({validFname:!1}),e.state.lname.toString().length>=3?e.setState({validLname:!0}):e.setState({validLname:!1}),e.state.username.toString().length>=5?e.setState({validUsername:!0}):e.setState({validUsername:!1}),L.a.isEmail(e.state.email)?e.setState({validEmail:!0}):e.setState({validEmail:!1}),e.state.pwd.toString().length>=8?e.setState({validPwd:!0}):e.setState({validPwd:!1}),e.state.role.toString().length>0?e.setState({validRole:!0}):e.setState({validRole:!1}),e.state.validFname&&e.state.validLname&&e.state.validUsername&&e.state.validEmail&&e.state.validPwd&&e.state.validRole){var t={first_name:e.state.fname,last_name:e.state.lname,username:e.state.username,email:e.state.email,password:e.state.pwd,is_customer:!1,is_room_manager:!1};"customer"==e.state.role&&(t.is_customer=!0),"roomManager"==e.state.role&&(t.is_room_manager=!0);console.log(JSON.stringify(t)),R.a.post("http://localhost:8000/signup",M.stringify(t),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(a){console.log(a),e.props.history.replace("/login")})).catch((function(e){e.response?console.log(e.response.data.message):console.log("Error: Network Error\n"+e)}))}},e.state={fname:"",lname:"",username:"",email:"",pwd:"",role:"",validFname:!0,validLname:!0,validUsername:!0,validEmail:!0,validPwd:!0,validRole:!1},e}return Object(p.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("form",{className:this.props.classes.form},r.a.createElement(y.a,{container:!0,spacing:2},r.a.createElement(y.a,{item:!0,xs:12,sm:6},r.a.createElement(S.a,{error:!this.state.validFname,autoComplete:"fname",name:"firstName",variant:"outlined",required:!0,fullWidth:!0,id:"firstName",label:"First Name",autoFocus:!0,onChange:this.fnameChange})),r.a.createElement(y.a,{item:!0,xs:12,sm:6},r.a.createElement(S.a,{error:!this.state.validLname,variant:"outlined",required:!0,fullWidth:!0,id:"lastName",label:"Last Name",name:"lastName",autoComplete:"lname",onChange:this.lnameChange})),r.a.createElement(y.a,{item:!0,xs:12},r.a.createElement(S.a,{error:!this.state.validUsername,variant:"outlined",required:!0,fullWidth:!0,id:"username",label:"Username",name:"username",autoComplete:"username",onChange:this.usernameChange})),r.a.createElement(y.a,{item:!0,xs:12},r.a.createElement(S.a,{error:!this.state.validEmail,variant:"outlined",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",onChange:this.emailChange})),r.a.createElement(y.a,{item:!0,xs:12},r.a.createElement(S.a,{error:!this.state.validPwd,variant:"outlined",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:this.pwdChange})),r.a.createElement(y.a,{item:!0,xs:12},r.a.createElement(B.a,null,"Signup as* :"),r.a.createElement(D.a,{onChange:this.roleChange},r.a.createElement(b.a,{control:r.a.createElement(N.a,{value:"roomManager",color:"primary"}),label:"Room Manager",name:"role"}),r.a.createElement(b.a,{control:r.a.createElement(N.a,{value:"customer",color:"primary"}),label:"Customer",name:"role"})))),r.a.createElement(h.a,{fullWidth:!0,variant:"contained",color:"primary",className:this.props.classes.submit,onClick:this.submit},"Signup"),r.a.createElement(y.a,{container:!0,justify:"flex-end"},r.a.createElement(y.a,{item:!0},r.a.createElement(w.a,{href:"/login",variant:"body2"},"Already have an account? Sign in")))))}}]),a}(r.a.Component);function T(e){var a=U();return r.a.createElement(O.a,{component:"main",maxWidth:"xs"},r.a.createElement(E.a,null),r.a.createElement("div",{className:a.paper},r.a.createElement(f.a,{className:a.avatar},r.a.createElement(x.a,null)),r.a.createElement(k.a,{component:"h1",variant:"h5"},"Create Account"),r.a.createElement(I,{classes:a,history:e.history})))}var _=t(17),W=t(118),F=t(651),z=t(652),H=t(643),q=t(155),G=t.n(q),J=t(119),V=t.n(J),K=t(653),X=t(273),$=t(4),Y=t(156),Q=t.n(Y),Z=t(654),ee=t(640),ae=t(592),te=t(648),ne=t(649),re=t(650),le=t(255),oe=t.n(le),ie=t(256),se=t.n(ie),ce=t(257),me=t.n(ce),ue=r.a.createElement("div",null,r.a.createElement(ae.a,{button:!0},r.a.createElement(te.a,null,r.a.createElement(oe.a,null)),r.a.createElement(ne.a,{primary:"Dashboard"})),r.a.createElement(ae.a,{button:!0},r.a.createElement(te.a,null,r.a.createElement(se.a,null)),r.a.createElement(ne.a,{primary:"Manage Rooms and TimeSlots"}))),de=r.a.createElement("div",null,r.a.createElement(re.a,{inset:!0},"Account"),r.a.createElement(ae.a,{button:!0},r.a.createElement(te.a,null,r.a.createElement(V.a,null)),r.a.createElement(ne.a,{primary:"Profile"})),r.a.createElement(ae.a,{button:!0},r.a.createElement(te.a,null,r.a.createElement(me.a,null)),r.a.createElement(ne.a,{primary:"Logout"}))),pe=t(658),ge=Object(j.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},toolbar:{paddingRight:24},toolbarIcon:Object(W.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{position:"absolute",zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:340,width:"calc(100% - ".concat(340,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"absolute",whiteSpace:"nowrap",width:340,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(_.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240}}}));function he(e){var a=ge(),t=r.a.useState(null),n=Object(i.a)(t,2),l=n[0],o=n[1],s=r.a.useState(e.auth),c=Object(i.a)(s,2),m=c[0],u=c[1],d=Boolean(l),p=(Object(g.f)(),function(){o(null)});return r.a.createElement("div",{className:a.root},r.a.createElement(F.a,{className:Object($.a)(a.appBar,m&&a.appBarShift)},r.a.createElement(z.a,{className:a.toolbar},e.auth&&r.a.createElement(H.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:function(){u(!0)},className:Object($.a)(a.menuButton,m&&a.menuButtonHidden)},r.a.createElement(G.a,null)),r.a.createElement(k.a,{variant:"h6",className:a.title,onClick:function(){e.history.replace("/")}},"Room Slot Booking"),e.auth&&r.a.createElement("div",null,r.a.createElement(H.a,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){o(e.currentTarget)},color:"inherit"},r.a.createElement(V.a,null)),r.a.createElement(X.a,{id:"menu-appbar",anchorEl:l,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:d,onClose:p},r.a.createElement(K.a,{onClick:p},"Profile"),r.a.createElement(K.a,{onClick:function(){e.setAuth(!1),v.reactLocalStorage.remove("token"),v.reactLocalStorage.remove("role")}},"Logout"))),!e.auth&&r.a.createElement(h.a,{color:"inherit",onClick:function(){e.history.push("/login")}},"Login"))),e.auth&&r.a.createElement(pe.a,{position:"absolute",variant:"permanent",classes:{paper:Object($.a)(a.drawerPaper,!m&&a.drawerPaperClose)},open:m},r.a.createElement("div",{className:a.toolbarIcon},r.a.createElement(H.a,{onClick:function(){u(!1)}},r.a.createElement(Q.a,null))),r.a.createElement(Z.a,null),r.a.createElement(ee.a,null,ue),r.a.createElement(Z.a,null),r.a.createElement(ee.a,null,de)))}var ve=Object(j.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)}}})),fe=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(m.a)(this,Object(u.a)(a).call(this))).pwdChange=function(a){a.preventDefault(),e.setState({pwd:a.target.value}),console.log(a.target.value),a.target.value.toString().length>=8?e.setState({validPwd:!0}):e.setState({validPwd:!1})},e.usernameChange=function(a){a.preventDefault(),e.setState({username:a.target.value}),console.log(a.target.value),a.target.value.toString().length>=5?e.setState({validUsername:!0}):e.setState({validUsername:!1})},e.submit=function(a){if(a.preventDefault(),e.state.username.toString().length>=5?e.setState({validUsername:!0}):e.setState({validUsername:!1}),e.state.pwd.toString().length>=8?e.setState({validPwd:!0}):e.setState({validPwd:!1}),e.state.validUsername&&e.state.validPwd){var t={username:e.state.username,password:e.state.pwd};console.log(JSON.stringify(t)),R.a.post("http://localhost:8000/login",M.stringify(t),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(a){e.setState({errors:""}),a.data.token&&(v.reactLocalStorage.remove("token"),v.reactLocalStorage.set("token",a.data.token)),e.props.setAuth(!0),e.props.history.replace("/"),R.a.get("http://localhost:8000/role",{headers:{Authorization:"token "+a.data.token}}).then((function(a){v.reactLocalStorage.remove("role"),v.reactLocalStorage.set("role",a.data.role),e.props.setRole(a.data.role)}))})).catch((function(a){if(a.response){console.log(a.response.data);var t=a.response.data,n="";for(var r in t)n+=t[r][0]+"\n";e.setState({errors:n})}else console.log("Error: Network Error\n"+a)}))}},e.state={username:"",pwd:"",role:"",validUsername:!0,validPwd:!0,validRole:!1,errors:""},e}return Object(p.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("form",{className:this.props.classes.form},r.a.createElement(y.a,{container:!0,spacing:2},r.a.createElement(y.a,{item:!0,xs:12},r.a.createElement(S.a,{error:!this.state.validUsername,variant:"outlined",required:!0,fullWidth:!0,id:"username",label:"Username",name:"username",autoComplete:"username",onChange:this.usernameChange})),r.a.createElement(y.a,{item:!0,xs:12},r.a.createElement(S.a,{error:!this.state.validPwd,variant:"outlined",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:this.pwdChange})),r.a.createElement(y.a,{item:!0,xs:12},r.a.createElement(B.a,{error:!0},this.state.errors))),r.a.createElement(h.a,{fullWidth:!0,variant:"contained",color:"primary",className:this.props.classes.submit,onClick:this.submit},"Login"),r.a.createElement(y.a,{container:!0,justify:"flex-end"},r.a.createElement(y.a,{item:!0},r.a.createElement(w.a,{href:"/signup",variant:"body2"},"Don't have an account? SignUp")))))}}]),a}(r.a.Component);function Ee(e){var a=ve();return r.a.createElement(O.a,{component:"main",maxWidth:"xs"},r.a.createElement(E.a,null),r.a.createElement("div",{className:a.paper},r.a.createElement(f.a,{className:a.avatar},r.a.createElement(x.a,null)),r.a.createElement(k.a,{component:"h1",variant:"h5"},"Login"),r.a.createElement(fe,{classes:a,auth:e.auth,setAuth:e.setAuth,history:e.history,setRole:e.setRole})))}var Se=t(591),be=t(31),we=t(68);function ye(e){return r.a.createElement(k.a,{component:"h2",variant:"h6",color:"primary",gutterBottom:!0},e.children)}function Ce(e,a){return{time:e,amount:a}}var xe=[Ce("00:00",0),Ce("03:00",300),Ce("06:00",600),Ce("09:00",800),Ce("12:00",1500),Ce("15:00",2e3),Ce("18:00",2400),Ce("21:00",2400),Ce("24:00",void 0)];function ke(){var e=Object(be.a)();return r.a.createElement(r.a.Fragment,null,r.a.createElement(ye,null,"Today"),r.a.createElement(we.d,null,r.a.createElement(we.c,{data:xe,margin:{top:16,right:16,bottom:0,left:24}},r.a.createElement(we.e,{dataKey:"time",stroke:e.palette.text.secondary}),r.a.createElement(we.f,{stroke:e.palette.text.secondary},r.a.createElement(we.a,{angle:270,position:"left",style:{textAnchor:"middle",fill:e.palette.text.primary}},"Sales ($)")),r.a.createElement(we.b,{type:"monotone",dataKey:"amount",stroke:e.palette.primary.main,dot:!1}))))}function je(e){e.preventDefault()}var Oe=Object(j.a)({depositContext:{flex:1}});function Ne(){var e=Oe();return r.a.createElement(r.a.Fragment,null,r.a.createElement(ye,null,"Recent NumRooms"),r.a.createElement(k.a,{component:"p",variant:"h4"},"$3,024.00"),r.a.createElement(k.a,{color:"textSecondary",className:e.depositContext},"on 15 March, 2019"),r.a.createElement("div",null,r.a.createElement(w.a,{color:"primary",href:"#",onClick:je},"View balance")))}var De=t(639),Pe=t(270),Le=t.n(Pe),Be=t(271),Ae=t.n(Be),Re=t(272),Me=t.n(Re);function Ue(e,a,t,n,r,l){return{id:e,date:a,name:t,shipTo:n,paymentMethod:r,amount:l}}Ue(0,"16 Mar, 2019","Elvis Presley","Tupelo, MS","VISA \u2800\u2022\u2022\u2022\u2022 3719",312.44),Ue(1,"16 Mar, 2019","Paul McCartney","London, UK","VISA \u2800\u2022\u2022\u2022\u2022 2574",866.99),Ue(2,"16 Mar, 2019","Tom Scholz","Boston, MA","MC \u2800\u2022\u2022\u2022\u2022 1253",100.81),Ue(3,"16 Mar, 2019","Michael Jackson","Gary, IN","AMEX \u2800\u2022\u2022\u2022\u2022 2000",654.39),Ue(4,"15 Mar, 2019","Bruce Springsteen","Long Branch, NJ","VISA \u2800\u2022\u2022\u2022\u2022 5919",212.79);var Ie=Object(j.a)((function(e){return{seeMore:{marginTop:e.spacing(3)},listPaper:{width:"100%",padding:"0 2%"},roomTitle:{float:"left"},delRoom:{float:"right",margin:"33px 0px 0 ",transform:"translateY(-50%)",cursor:"pointer"},numDays:{float:"right",margin:"0px 10% 0 0",transform:"translateY(-10%)",textAlign:"center",cursor:"pointer"},numDaysH3:{marginBottom:"5px"}}}));function Te(e){var a=Ie(),t=r.a.useState(!1),n=Object(i.a)(t,2),l=n[0],o=n[1],s=r.a.useState(""),c=Object(i.a)(s,2),m=c[0],u=c[1],d=r.a.useState(""),p=Object(i.a)(d,2),g=p[0],h=p[1],f=r.a.useState(e.room),E=Object(i.a)(f,2),b=E[0],w=E[1];return r.a.createElement(ae.a,null,r.a.createElement(Se.a,{className:a.listPaper},r.a.createElement(ne.a,{className:a.roomTitle},!l&&r.a.createElement("h3",null,b.name),l&&r.a.createElement("div",null,r.a.createElement(S.a,{type:"text",placeholder:b.name,onChange:function(e){e.preventDefault(),u(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("br",null))),r.a.createElement(te.a,{className:a.delRoom},r.a.createElement(Le.a,{onClick:function(a){a.preventDefault(),R.a.delete(_e+"/rooms/"+b.id,{headers:{Authorization:"token "+v.reactLocalStorage.get("token")}}).then((function(a){e.setDel(!e.del)}))}})),r.a.createElement(te.a,{className:a.delRoom},!l&&r.a.createElement(Ae.a,{onClick:function(e){e.preventDefault(),o(!0)}}),l&&r.a.createElement(Me.a,{onClick:function(e){e.preventDefault(),console.log(m.length);var a={};m.length&&(a.name=m),g.length&&(a.num_days_in_adv=g),R.a.patch(_e+"/rooms/"+b.id,a,{headers:{Authorization:"token "+v.reactLocalStorage.get("token")}}).then((function(e){w(e.data)})),o(!1)}})),r.a.createElement("div",{className:a.numDays},!l&&r.a.createElement("h3",{className:a.numDaysH3},b.num_days_in_adv),l&&r.a.createElement("div",null,r.a.createElement(De.a,{type:"number",placeholder:b.num_days_in_adv,onChange:function(e){e.preventDefault(),h(e.target.value)}}),r.a.createElement("br",null)),"days to book in advance")))}var _e="http://localhost:8000";function We(e){Ie();var a=e.rows;return r.a.createElement(r.a.Fragment,null,r.a.createElement(ye,null,"My Rooms"),r.a.createElement(ee.a,null,a.map((function(a){return r.a.createElement(Te,{key:a.id,room:a,setDel:e.setDel,del:e.del})})),!a.length&&r.a.createElement("p",{style:{textAlign:"center"}},"No rooms to display!")))}var Fe=Object(j.a)((function(e){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Object(W.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(_.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240}}}));function ze(){var e=Fe(),a=r.a.useState(!0),t=Object(i.a)(a,2),l=(t[0],t[1],r.a.useState([])),o=Object(i.a)(l,2),s=o[0],c=o[1],m=r.a.useState(!0),u=Object(i.a)(m,2),d=u[0],p=u[1],g=Object($.a)(e.paper,e.fixedHeight);return Object(n.useEffect)((function(){R.a.get("http://localhost:8000/rooms",{headers:{Authorization:"token "+v.reactLocalStorage.get("token")}}).then((function(e){c(e.data)}))}),[d]),r.a.createElement("div",{className:e.root},r.a.createElement(E.a,null),r.a.createElement("main",{className:e.content},r.a.createElement("div",{className:e.appBarSpacer}),r.a.createElement(O.a,{maxWidth:"lg",className:e.container},r.a.createElement(y.a,{container:!0,spacing:3},r.a.createElement(y.a,{item:!0,xs:12,md:8,lg:9},r.a.createElement(Se.a,{className:g},r.a.createElement(ke,null))),r.a.createElement(y.a,{item:!0,xs:12,md:4,lg:3},r.a.createElement(Se.a,{className:g},r.a.createElement(Ne,null))),r.a.createElement(y.a,{item:!0,xs:12},r.a.createElement(Se.a,{className:e.paper},r.a.createElement(We,{rows:s,setDel:p,del:d})))))))}var He=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(m.a)(this,Object(u.a)(a).call(this,e))).state={count:0},t.reset=t.reset.bind(Object(d.a)(t)),t}return Object(p.a)(a,e),Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;setInterval((function(){e.setState((function(e,a){return{count:e.count+1}}))}),1e3)}},{key:"reset",value:function(){this.setState({count:0})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Counter: ",this.state.count),r.a.createElement(qe,{callback:this.reset,show:!0}))}}]),a}(r.a.Component),qe=function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(t=Object(m.a)(this,(e=Object(u.a)(a)).call.apply(e,[this].concat(r)))).reset=function(e){e.preventDefault(),t.props.callback&&t.props.callback()},t}return Object(p.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){return this.props.show&&r.a.createElement("div",null,r.a.createElement(h.a,{onClick:this.reset},"Click"),r.a.createElement("a",{href:"#",className:"App-link",onClick:this.reset},"Click"))}}]),a}(r.a.Component);r.a.Component,r.a.createElement(He,{name:"Pratham"});var Ge=Object(g.g)((function(){var e=r.a.useState(!1),a=Object(i.a)(e,2),t=a[0],l=a[1],o=r.a.useState(),s=Object(i.a)(o,2),c=s[0],m=s[1],u=Object(g.f)();return Object(n.useEffect)((function(){v.reactLocalStorage.get("token")?l(!0):l(!1),m(v.reactLocalStorage.get("role"))})),r.a.createElement("div",null,r.a.createElement(he,{auth:t,setAuth:l,history:u}),r.a.createElement(g.c,null,r.a.createElement(g.a,{path:"/signup"},r.a.createElement(T,{history:u})),r.a.createElement(g.a,{path:"/login"},r.a.createElement(Ee,{auth:t,setAuth:l,setRole:m,history:u})),r.a.createElement(g.a,{path:"/"},"roomManager"==c&&r.a.createElement(ze,null),"customer"==c&&r.a.createElement("h1",null,"Room Manager Home Page"))))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Je=t(75);o.a.render(r.a.createElement(Je.a,null,r.a.createElement(Ge,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[316,1,2]]]);
//# sourceMappingURL=main.488fee30.chunk.js.map