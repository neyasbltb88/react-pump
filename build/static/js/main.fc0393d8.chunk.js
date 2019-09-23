(window["webpackJsonpreact-pump"]=window["webpackJsonpreact-pump"]||[]).push([[0],{25:function(e,t,n){e.exports=n(41)},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(20),s=n.n(r),i=(n(30),n(22)),c=n(11),u=n(1),l=n(3),p=n(5),d=n(4),m=n(6),g=function(e,t){var n=Math.floor(e+Math.random()*(t+1-e));return n},h=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t="",n=0;n<e;n++)t+=String.fromCharCode(g(97,122));return t},f=function e(t,n){var a=this;Object(u.a)(this,e),this.message=function(e,t){a.worker.port.postMessage(JSON.stringify({type:e,data:t}))},this.handler=function(e){try{var t=JSON.parse(e.data),n=t.type,o=t.data;"worker:error"===n&&(console.log("%c%s","color: #272822;background-color: #F92672;padding: 2px 10px;",n,o),alert("".concat(n," - ").concat(o)));var r=a.handlers[n];r&&r(o)}catch(s){console.log(s)}},this.worker=t,this.handlers=n,this.worker.port.addEventListener("message",this.handler,!1),this.worker.port.start()};var v=function(e,t){return function(e,t){var n,a,o=!1;return function r(){if(o)return n=arguments,void(a=this);e.apply(this,arguments),o=!0,setTimeout((function(){o=!1,n&&(r.apply(a,n),n=a=null)}),t)}}(e,t)},b=function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};Object(u.a)(this,e),this.handler=function(){var e={top:window.screenY,right:window.screenX+window.outerWidth,bottom:window.screenY+window.outerHeight,left:window.screenX};t.comparePosition(e)&&(t.cb(e),t.lastPosition=e),t.autoUpdate&&(t.raf=window.requestAnimationFrame((function(){return t.handler()})))},this.cb=n,this.handler=v(this.handler,50),this.lastPosition={top:null,right:null,bottom:null,left:null},this.raf=null,this.autoUpdate=!1,this.start()}return Object(l.a)(e,[{key:"comparePosition",value:function(e){var t=this;return Object.keys(e).some((function(n){return e[n]!==t.lastPosition[n]}))}},{key:"start",value:function(){this.autoUpdate=!0,this.handler()}},{key:"stop",value:function(){this.autoUpdate=!1,window.cancelAnimationFrame(this.raf)}}]),e}(),w=n(12);function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var y=function(e){return Object.keys(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(n,!0).forEach((function(t){Object(w.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},{resizable:"yes",location:"no",status:"no",scrollbars:"no",toolbar:"no",menubar:"no"},{},e)).reduce((function(t,n){return"".concat(t,",").concat(n,"=").concat(e[n])}),"").slice(1)},P=n(21),j=(n(31),function(e){var t=e.onClick,n=e.label,a=e.disabled,r=e.dense,s=e.children,i=e.color,c=e.className,u=void 0===c?"":c,l=Object(P.a)(e,["onClick","label","disabled","dense","children","color","className"]),p=s||n,d=s&&n?n:"",m="".concat(r?"Btn-dense":"Btn"," ").concat(u).trim(),g={"--primary":i};return o.a.createElement("button",Object.assign({style:i?g:{},className:m,onClick:t,disabled:a,title:d},l),p)}),k=(n(32),function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).messageHandler=n.props.messageHandler({"pumping:connected":function(){return n.onChangePumpingConnected(!0)},"pumping:disconnected":function(){return n.onChangePumpingConnected(!1)},"status:pumping":function(e){return n.onChangePumpingConnected(e)}}),n.state={opened:!1},n.onClick=function(){var e=y({width:300,height:550,left:(window.screen.availWidth||window.screen.width)/2-150,top:(window.screen.availHeight||window.screen.height)/2-275});window.open("".concat("/react-pump","/pumping"),"Pumping",e),n.setState({opened:!0})},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.messageHandler.message("checkStatus:pumping")}},{key:"onChangePumpingConnected",value:function(e){this.setState({opened:e})}},{key:"render",value:function(){var e=this.state.open,t=e?"\u041d\u0430\u0441\u043e\u0441 \u0437\u0430\u043f\u0443\u0449\u0435\u043d":"\u0417\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u043d\u0430\u0441\u043e\u0441";return o.a.createElement("div",{className:"Main"},o.a.createElement(j,{onClick:this.onClick,label:t,disabled:e}))}}]),t}(a.Component)),E=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return t.reduceRight((function(e,t){return t(e)}),e)}},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new SharedWorker("./services/worker.js");return new f(t,e)},C=function(e){return function(t){return o.a.createElement(e,Object.assign({messageHandler:S},t))}},H=function(e){return function(t){function n(){var e,t;Object(u.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(t=Object(p.a)(this,(e=Object(d.a)(n)).call.apply(e,[this].concat(o)))).state={position:{}},t.messageHandler=t.props.messageHandler(),t}return Object(m.a)(n,t),Object(l.a)(n,[{key:"onPosition",value:function(e){this.setState({position:e}),this.messageHandler.message("position:update",{target:window.name,position:e})}},{key:"componentDidMount",value:function(){var e=this;this.posWatcher=new b((function(t){return e.onPosition(t)}))}},{key:"componentWillUnmount",value:function(){this.posWatcher&&this.posWatcher.stop()}},{key:"render",value:function(){var t=this.state.position;return o.a.createElement(e,Object.assign({position:t},this.props))}}]),n}(a.Component)},D=function(e){return function(t){function n(e){var t;return Object(u.a)(this,n),(t=Object(p.a)(this,Object(d.a)(n).call(this,e))).runResize=function(e){requestAnimationFrame((function(){return t.smoothResize(e)}))},t.smoothResize=function(e){var n=t.state,a=n.delta,o=n.runResize;if(!o||e){a-=2,window.resizeBy(2,2),window.moveBy(-1,-1),a>0?(o=!0,t.runResize(!0)):(a=0,o=!1),t.setState({delta:a,runResize:o})}},t.comp=Object(a.createRef)(),t.messageHandler=t.props.messageHandler({"pump:down":function(e){var n=e.delta,a=e.ratio;t.comp.current.state.plagged&&t.onPumpDown(n,a)}}),t.state={delta:0,runResize:!1},t}return Object(m.a)(n,t),Object(l.a)(n,[{key:"onPumpDown",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.setState((function(a){return t.runResize(),{delta:a.delta+e/n}}))}},{key:"render",value:function(){return o.a.createElement(e,Object.assign({ref:this.comp},this.props))}}]),n}(a.Component)},M=n(14);function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var z=function(e){return function(t){function n(){var e,t;Object(u.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(t=Object(p.a)(this,(e=Object(d.a)(n)).call.apply(e,[this].concat(o)))).state={connectedSide:{left:!1,right:!1},Pumping:null,Pumpeds:new Map,Plugged:new Map},t.messageHandler=t.props.messageHandler({"position:update":function(e){return t.onPositionUpdate(e)},"pumped:disconnected":function(e){return t.onDisconnectedPumped(e)},"checkStatus:pumped":function(e){return t.onCheckStatusPumped(e)}}),t}return Object(m.a)(n,t),Object(l.a)(n,[{key:"onCheckStatusPumped",value:function(e){var t=this.state.Plugged,n=!!t.has(e)&&t.get(e);this.messageHandler.message("status:pumped",{target:e,plugged:n})}},{key:"onPositionUpdate",value:function(e){var t=e.target,n=e.position;"Pumping"===t&&this.setState({Pumping:n}),this.collisionCalc(t,n)}},{key:"collisionCalc",value:function(e,t){var n=this,a=null,o=new Map(Object(M.a)(this.state.Pumpeds)),r={left:!1,right:!1};"Pumping"===e?a=t:(a=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(n,!0).forEach((function(t){Object(w.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},this.state.Pumping),o.set(e,t)),o.forEach((function(e,t){var o=!1,s=!1;if(a.top<=e.bottom&&a.bottom>=e.top&&(o=!0),a.left<=e.right&&a.right>=e.left&&(s=!0),o&&s){var i=(a.right-a.left)/2+a.left-((e.right-e.left)/2+e.left)>0?"left":"right";r[i]=!0,n.onPlug(t,i)}else n.onUnplug(t)})),this.setState({connectedSide:r,Pumping:a,Pumpeds:o})}},{key:"onPlug",value:function(e,t){var n=this;t="left"===t?"right":"left",this.setState((function(a){var o=new Map(Object(M.a)(a.Plugged));return o.has(e)&&o.get(e)===t||(o.set(e,t),n.messageHandler.message("pumped:plugged",{target:e,side:t})),{Plugged:o}}))}},{key:"onUnplug",value:function(e){var t=this;this.setState((function(n){var a=new Map(Object(M.a)(n.Plugged));return a.delete(e)&&t.messageHandler.message("pumped:unplugged",e),{Plugged:a}}))}},{key:"onDisconnectedPumped",value:function(e){var t=new Map(Object(M.a)(this.state.Pumpeds)),n=this.state.Pumping;t.delete(e),this.setState({Pumpeds:t}),this.onUnplug(e),this.collisionCalc("Pumping",n)}},{key:"componentDidUpdate",value:function(){this.state.Pumping||this.setState({Pumping:this.props.position})}},{key:"render",value:function(){var t=this.state,n=t.Pumpeds,a=t.connectedSide,r=t.Plugged;return o.a.createElement(e,Object.assign({Pumpeds:n,connectedSide:a,Plugged:r},this.props))}}]),n}(a.Component)},A=C(k),R=(n(33),function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).lastDragPosition=null,n.onMouseDown=function(e){n.lastDragPosition=e.screenY,document.addEventListener("mousemove",n.onMouseMove),document.addEventListener("mouseup",n.onMouseUp,{once:!0})},n.onMouseMove=function(e){var t=n.lastDragPosition-e.screenY;n.props.handleResize(t),n.lastDragPosition=e.screenY},n.onMouseUp=function(){document.removeEventListener("mousemove",n.onMouseMove)},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return o.a.createElement("div",{className:"PumpHandle"},o.a.createElement("img",{onMouseDown:this.onMouseDown,src:"./img/pump-handle.svg",alt:"pump-handle",className:"pump-handle-svg",draggable:"false"}))}}]),t}(a.Component));n(34);function U(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?U(n,!0).forEach((function(t){Object(w.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):U(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var B=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).messageHandler=n.props.messageHandler({"position:update":function(e){return"Pumping"===e.target&&n.onPump(e.position)},"pumped:connected":function(){return n.messageHandler.message("checkStatus:pumpeds")},"status:pumpeds":function(e){return n.autoOpenPumpeds(e)}}),n.state={lastTitle:"",pumpedSize:300,autoOpen:!0,pumpRatio:10,Pumping:null},n.onClose=function(){n.closeAllPumpeds(),n.messageHandler.message("pumping:disconnected")},n.closeAllPumpeds=function(){return n.messageHandler.message("pumped:closeAll")},n.openPumped=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t="react-pump",a=t?"/"+t:"",o=n.state.pumpedSize,r=y(W({width:o,height:o,left:g(0,(window.screen.availWidth||window.screen.width)-o),top:g(0,(window.screen.availHeight||window.screen.height)-o)},e));window.open("".concat(a,"/pumped"),h(),r)},n.handleResize=function(e){window.resizeBy(0,e),window.moveBy(0,-e)},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"autoOpenPumpeds",value:function(e){if(this.state.autoOpen){var t=this.props.position,n=t.top,a=t.right,o=t.bottom,r=t.left,s=this.state.pumpedSize,i=[{left:r-s+15,top:n+o/2-s/2},{left:a-15,top:n+o/2-s/2}][e];i?this.openPumped(i):this.setState({autoOpen:!1})}}},{key:"onPump",value:function(e){var t=this.state,n=t.Pumping,a=t.pumpRatio,o=n.bottom-n.top-(e.bottom-e.top);if(0!==o){var r=o<0?"pump:up":"pump:down";this.messageHandler.message(r,{delta:Math.abs(o),ratio:a})}this.setState({Pumping:W({},e)})}},{key:"componentDidMount",value:function(){window.addEventListener("beforeunload",this.onClose),this.messageHandler.message("pumping:connected"),this.messageHandler.message("checkStatus:pumpeds");var e=document.title;document.title="\u041d\u0430\u0441\u043e\u0441",this.setState({lastTitle:e})}},{key:"componentDidUpdate",value:function(){this.state.Pumping||this.setState({Pumping:this.props.position})}},{key:"componentWillUnmount",value:function(){document.title=this.state.lastTitle}},{key:"render",value:function(){var e=this,t=this.props,n=t.connectedSide,a=t.Pumpeds,r=Object.keys(n).map((function(e){return n[e]?o.a.createElement("img",{key:e,src:"./img/pump-tube-".concat(e,".svg"),alt:"pump-tube-".concat(e),className:"pump-tube pump-tube-".concat(e,"-svg"),draggable:"false"}):null}));return o.a.createElement("div",{className:"Pumping"},o.a.createElement("div",{className:"btn-section"},o.a.createElement(j,{onClick:function(){return e.openPumped()},label:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0448\u0430\u0440\u0438\u043a",dense:!0},o.a.createElement("img",{src:"./img/balloon-plus.svg",alt:"balloon-plus",className:"balloon-plus-svg",draggable:"false",height:"20"})),o.a.createElement(j,{onClick:function(){return e.closeAllPumpeds()},label:"\u0423\u0431\u0440\u0430\u0442\u044c \u0432\u0441\u0435 \u0448\u0430\u0440\u0438\u043a\u0438",color:"#e91e63",disabled:!a.size,dense:!0,className:"closeAllPumpeds"},o.a.createElement("img",{src:"./img/balloon-close.svg",alt:"balloon-close",className:"balloon-close-svg",draggable:"false",height:"20"}),"(",a.size,")")),o.a.createElement("div",{className:"pump"},o.a.createElement(R,{handleResize:this.handleResize}),o.a.createElement("div",{className:"pump-plunger"},o.a.createElement("img",{src:"./img/pump-plunger.svg",alt:"pump-plunger",className:"pump-plunger-svg",draggable:"false"})),o.a.createElement("div",{className:"pump-body"},o.a.createElement("img",{src:"./img/pump-body.svg",alt:"pump-body",className:"pump-body-svg",draggable:"false"}),r)))}}]),t}(a.Component),x=E(C,H,z)(B),T=(n(35),function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).messageHandler=n.props.messageHandler({"pumped:close":function(e){return window.name===e&&window.close()},"pumped:closeAll":function(){return window.close()},"pumped:plugged":function(e){return window.name===e.target&&n.onChangePlug(!0,e.side)},"pumped:unplugged":function(e){return window.name===e&&n.onChangePlug(!1)},"status:pumped":function(e){return window.name===e.target&&e.plugged&&n.onChangePlug(!0,e.side)}}),n.state={lastTitle:"",plagged:!1,side:""},n.onClose=function(){n.messageHandler.message("pumped:disconnected",window.name)},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"onChangePlug",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";this.setState({plagged:e,side:t})}},{key:"componentDidMount",value:function(){var e=document.title;document.title="\u0428\u0430\u0440\u0438\u043a",window.addEventListener("beforeunload",this.onClose),this.messageHandler.message("pumped:connected",window.name),this.messageHandler.message("checkStatus:pumped",window.name),this.setState({lastTitle:e})}},{key:"componentWillUnmount",value:function(){document.title=this.state.lastTitle}},{key:"render",value:function(){var e=this.state.plagged?"#e91e63":"#576d7e";return o.a.createElement("div",{className:"Pumped"},o.a.createElement("svg",{className:"baloon",xmlns:"http://www.w3.org/2000/svg",width:"223",height:"300",viewBox:"0 0 222 300",version:"1.1"},o.a.createElement("path",{fill:e,transform:"matrix(0.02344759,0,0,-0.02344759,-0.03472868,300.11723)",d:"M 4430,12789 C 3509,12730 2661,12419 1950,11881 883,11074 192,9797 36,8345 -33,7704 2,6967 136,6240 328,5201 760,4156 1358,3285 1894,2504 2583,1846 3277,1451 c 140,-79 424,-214 558,-264 215,-80 439,-136 648,-162 60,-7 111,-16 115,-19 8,-9 -15,-237 -34,-326 -35,-167 -134,-411 -198,-487 -33,-40 -33,-73 2,-105 59,-57 173,-82 372,-83 213,0 331,25 393,83 36,34 34,62 -7,116 -114,150 -225,522 -226,758 0,54 -15,47 150,68 889,116 1919,814 2751,1865 480,607 892,1332 1182,2085 466,1210 624,2521 441,3659 -214,1337 -881,2491 -1874,3242 -876,663 -1971,982 -3120,908 z"})))}}]),t}(a.Component)),L=E(C,H,D)(T),Y=(n(36),function(){return o.a.createElement("div",{className:"App"},o.a.createElement(i.a,{basename:"react-pump"},o.a.createElement(c.a,{path:"/",component:A,exact:!0}),o.a.createElement(c.a,{path:"/pumping",component:x}),o.a.createElement(c.a,{path:"/pumped",component:L})))});s.a.render(o.a.createElement(Y,null),document.getElementById("root"))}},[[25,1,2]]]);
//# sourceMappingURL=main.fc0393d8.chunk.js.map