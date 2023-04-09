import{I as Q,f as v,J as S,K as X,e as x,N as Ve,q as j,s as U,O as Se,P as ee,L as H,R as be,x as ke,S as P,T as ne,l as C,U as ot,V as it,W as I,X as lt,Y as G,Z as ce,$ as Be,a0 as fe,a1 as ye,a2 as ve,a3 as rt,k as ut,a4 as $e,z as Fe,a5 as st,a6 as dt,a7 as ct,a8 as ft,a9 as he,aa as J,ab as vt,ac as ht,d as He,o as te,c as pe,w as B,i as L,ad as mt,j as gt,ae,G as we,B as bt,Q as yt,E as pt,D as wt,F as Ct,af as qt,m as St}from"./index.0eca893f.js";import{c as kt,u as xt,a as zt,b as Tt,d as Lt,e as _t,f as Z,g as Bt,Q as Oe,h as Ce,i as $t}from"./QItem.f5998447.js";import{u as Re,a as We}from"./use-dark.7b50dac8.js";var Ot=Q({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:i}){const n=v(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>S("div",{class:n.value},X(i.default))}}),Et=Q({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:i}){const n=v(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>S("div",{class:n.value,role:"toolbar"},X(i.default))}});function Pt(){const e=x(!Ve.value);return e.value===!1&&j(()=>{e.value=!0}),e}const Ae=typeof ResizeObserver!="undefined",Ee=Ae===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var qe=Q({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:i}){let n=null,r,t={width:-1,height:-1};function a(d){d===!0||e.debounce===0||e.debounce==="0"?s():n===null&&(n=setTimeout(s,e.debounce))}function s(){if(n!==null&&(clearTimeout(n),n=null),r){const{offsetWidth:d,offsetHeight:u}=r;(d!==t.width||u!==t.height)&&(t={width:d,height:u},i("resize",t))}}const{proxy:f}=H();if(Ae===!0){let d;const u=l=>{r=f.$el.parentNode,r?(d=new ResizeObserver(a),d.observe(r),s()):l!==!0&&ee(()=>{u(!0)})};return j(()=>{u()}),U(()=>{n!==null&&clearTimeout(n),d!==void 0&&(d.disconnect!==void 0?d.disconnect():r&&d.unobserve(r))}),Se}else{let l=function(){n!==null&&(clearTimeout(n),n=null),u!==void 0&&(u.removeEventListener!==void 0&&u.removeEventListener("resize",a,be.passive),u=void 0)},w=function(){l(),r&&r.contentDocument&&(u=r.contentDocument.defaultView,u.addEventListener("resize",a,be.passive),s())};const d=Pt();let u;return j(()=>{ee(()=>{r=f.$el,r&&w()})}),U(l),f.trigger=a,()=>{if(d.value===!0)return S("object",{style:Ee.style,tabindex:-1,type:"text/html",data:Ee.url,"aria-hidden":"true",onLoad:w})}}}}),Qt=Q({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:i,emit:n}){const{proxy:{$q:r}}=H(),t=ke(ne,P);if(t===P)return console.error("QHeader needs to be child of QLayout"),P;const a=x(parseInt(e.heightHint,10)),s=x(!0),f=v(()=>e.reveal===!0||t.view.value.indexOf("H")>-1||r.platform.is.ios&&t.isContainer.value===!0),d=v(()=>{if(e.modelValue!==!0)return 0;if(f.value===!0)return s.value===!0?a.value:0;const c=a.value-t.scroll.value.position;return c>0?c:0}),u=v(()=>e.modelValue!==!0||f.value===!0&&s.value!==!0),l=v(()=>e.modelValue===!0&&u.value===!0&&e.reveal===!0),w=v(()=>"q-header q-layout__section--marginal "+(f.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(u.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),p=v(()=>{const c=t.rows.value.top,z={};return c[0]==="l"&&t.left.space===!0&&(z[r.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),c[2]==="r"&&t.right.space===!0&&(z[r.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),z});function h(c,z){t.update("header",c,z)}function m(c,z){c.value!==z&&(c.value=z)}function $({height:c}){m(a,c),h("size",c)}function k(c){l.value===!0&&m(s,!0),n("focusin",c)}C(()=>e.modelValue,c=>{h("space",c),m(s,!0),t.animate()}),C(d,c=>{h("offset",c)}),C(()=>e.reveal,c=>{c===!1&&m(s,e.modelValue)}),C(s,c=>{t.animate(),n("reveal",c)}),C(t.scroll,c=>{e.reveal===!0&&m(s,c.direction==="up"||c.position<=e.revealOffset||c.position-c.inflectionPoint<100)});const y={};return t.instances.header=y,e.modelValue===!0&&h("size",a.value),h("space",e.modelValue),h("offset",d.value),U(()=>{t.instances.header===y&&(t.instances.header=void 0,h("size",0),h("offset",0),h("space",!1))}),()=>{const c=ot(i.default,[]);return e.elevated===!0&&c.push(S("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),c.push(S(qe,{debounce:0,onResize:$})),S("header",{class:w.value,style:p.value,onFocusin:k},c)}}}),Dt=Q({name:"QList",props:{...Re,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:i}){const n=H(),r=We(e,n.proxy.$q),t=v(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(r.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>S(e.tag,{class:t.value},X(i.default))}});const xe={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},Mt=Object.keys(xe);xe.all=!0;function Pe(e){const i={};for(const n of Mt)e[n]===!0&&(i[n]=!0);return Object.keys(i).length===0?xe:(i.horizontal===!0?i.left=i.right=!0:i.left===!0&&i.right===!0&&(i.horizontal=!0),i.vertical===!0?i.up=i.down=!0:i.up===!0&&i.down===!0&&(i.vertical=!0),i.horizontal===!0&&i.vertical===!0&&(i.all=!0),i)}function Qe(e,i){return i.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof i.handler=="function"&&e.target.nodeName.toUpperCase()!=="INPUT"&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(i.uid)===-1)}function me(e,i,n){const r=ye(e);let t,a=r.left-i.event.x,s=r.top-i.event.y,f=Math.abs(a),d=Math.abs(s);const u=i.direction;u.horizontal===!0&&u.vertical!==!0?t=a<0?"left":"right":u.horizontal!==!0&&u.vertical===!0?t=s<0?"up":"down":u.up===!0&&s<0?(t="up",f>d&&(u.left===!0&&a<0?t="left":u.right===!0&&a>0&&(t="right"))):u.down===!0&&s>0?(t="down",f>d&&(u.left===!0&&a<0?t="left":u.right===!0&&a>0&&(t="right"))):u.left===!0&&a<0?(t="left",f<d&&(u.up===!0&&s<0?t="up":u.down===!0&&s>0&&(t="down"))):u.right===!0&&a>0&&(t="right",f<d&&(u.up===!0&&s<0?t="up":u.down===!0&&s>0&&(t="down")));let l=!1;if(t===void 0&&n===!1){if(i.event.isFirst===!0||i.event.lastDir===void 0)return{};t=i.event.lastDir,l=!0,t==="left"||t==="right"?(r.left-=a,f=0,a=0):(r.top-=s,d=0,s=0)}return{synthetic:l,payload:{evt:e,touch:i.event.mouse!==!0,mouse:i.event.mouse===!0,position:r,direction:t,isFirst:i.event.isFirst,isFinal:n===!0,duration:Date.now()-i.event.time,distance:{x:f,y:d},offset:{x:a,y:s},delta:{x:r.left-i.event.lastX,y:r.top-i.event.lastY}}}}let Vt=0;var ge=it({name:"touch-pan",beforeMount(e,{value:i,modifiers:n}){if(n.mouse!==!0&&I.has.touch!==!0)return;function r(a,s){n.mouse===!0&&s===!0?rt(a):(n.stop===!0&&fe(a),n.prevent===!0&&Be(a))}const t={uid:"qvtp_"+Vt++,handler:i,modifiers:n,direction:Pe(n),noop:Se,mouseStart(a){Qe(a,t)&&lt(a)&&(G(t,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),t.start(a,!0))},touchStart(a){if(Qe(a,t)){const s=a.target;G(t,"temp",[[s,"touchmove","move","notPassiveCapture"],[s,"touchcancel","end","passiveCapture"],[s,"touchend","end","passiveCapture"]]),t.start(a)}},start(a,s){if(I.is.firefox===!0&&ce(e,!0),t.lastEvt=a,s===!0||n.stop===!0){if(t.direction.all!==!0&&(s!==!0||t.modifiers.mouseAllDir!==!0&&t.modifiers.mousealldir!==!0)){const u=a.type.indexOf("mouse")>-1?new MouseEvent(a.type,a):new TouchEvent(a.type,a);a.defaultPrevented===!0&&Be(u),a.cancelBubble===!0&&fe(u),Object.assign(u,{qKeyEvent:a.qKeyEvent,qClickOutside:a.qClickOutside,qAnchorHandled:a.qAnchorHandled,qClonedBy:a.qClonedBy===void 0?[t.uid]:a.qClonedBy.concat(t.uid)}),t.initialEvent={target:a.target,event:u}}fe(a)}const{left:f,top:d}=ye(a);t.event={x:f,y:d,time:Date.now(),mouse:s===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:f,lastY:d}},move(a){if(t.event===void 0)return;const s=ye(a),f=s.left-t.event.x,d=s.top-t.event.y;if(f===0&&d===0)return;t.lastEvt=a;const u=t.event.mouse===!0,l=()=>{r(a,u);let h;n.preserveCursor!==!0&&n.preservecursor!==!0&&(h=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),u===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),kt(),t.styleCleanup=m=>{if(t.styleCleanup=void 0,h!==void 0&&(document.documentElement.style.cursor=h),document.body.classList.remove("non-selectable"),u===!0){const $=()=>{document.body.classList.remove("no-pointer-events--children")};m!==void 0?setTimeout(()=>{$(),m()},50):$()}else m!==void 0&&m()}};if(t.event.detected===!0){t.event.isFirst!==!0&&r(a,t.event.mouse);const{payload:h,synthetic:m}=me(a,t,!1);h!==void 0&&(t.handler(h)===!1?t.end(a):(t.styleCleanup===void 0&&t.event.isFirst===!0&&l(),t.event.lastX=h.position.left,t.event.lastY=h.position.top,t.event.lastDir=m===!0?void 0:h.direction,t.event.isFirst=!1));return}if(t.direction.all===!0||u===!0&&(t.modifiers.mouseAllDir===!0||t.modifiers.mousealldir===!0)){l(),t.event.detected=!0,t.move(a);return}const w=Math.abs(f),p=Math.abs(d);w!==p&&(t.direction.horizontal===!0&&w>p||t.direction.vertical===!0&&w<p||t.direction.up===!0&&w<p&&d<0||t.direction.down===!0&&w<p&&d>0||t.direction.left===!0&&w>p&&f<0||t.direction.right===!0&&w>p&&f>0?(t.event.detected=!0,t.move(a)):t.end(a,!0))},end(a,s){if(t.event!==void 0){if(ve(t,"temp"),I.is.firefox===!0&&ce(e,!1),s===!0)t.styleCleanup!==void 0&&t.styleCleanup(),t.event.detected!==!0&&t.initialEvent!==void 0&&t.initialEvent.target.dispatchEvent(t.initialEvent.event);else if(t.event.detected===!0){t.event.isFirst===!0&&t.handler(me(a===void 0?t.lastEvt:a,t).payload);const{payload:f}=me(a===void 0?t.lastEvt:a,t,!0),d=()=>{t.handler(f)};t.styleCleanup!==void 0?t.styleCleanup(d):d()}t.event=void 0,t.initialEvent=void 0,t.lastEvt=void 0}}};if(e.__qtouchpan=t,n.mouse===!0){const a=n.mouseCapture===!0||n.mousecapture===!0?"Capture":"";G(t,"main",[[e,"mousedown","mouseStart",`passive${a}`]])}I.has.touch===!0&&G(t,"main",[[e,"touchstart","touchStart",`passive${n.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,i){const n=e.__qtouchpan;n!==void 0&&(i.oldValue!==i.value&&(typeof value!="function"&&n.end(),n.handler=i.value),n.direction=Pe(i.modifiers))},beforeUnmount(e){const i=e.__qtouchpan;i!==void 0&&(i.event!==void 0&&i.end(),ve(i,"main"),ve(i,"temp"),I.is.firefox===!0&&ce(e,!1),i.styleCleanup!==void 0&&i.styleCleanup(),delete e.__qtouchpan)}});const De=150;var Ft=Q({name:"QDrawer",inheritAttrs:!1,props:{...xt,...Re,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...zt,"onLayout","miniState"],setup(e,{slots:i,emit:n,attrs:r}){const t=H(),{proxy:{$q:a}}=t,s=We(e,a),{preventBodyScroll:f}=Bt(),{registerTimeout:d,removeTimeout:u}=Tt(),l=ke(ne,P);if(l===P)return console.error("QDrawer needs to be child of QLayout"),P;let w,p=null,h;const m=x(e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint),$=v(()=>e.mini===!0&&m.value!==!0),k=v(()=>$.value===!0?e.miniWidth:e.width),y=x(e.showIfAbove===!0&&m.value===!1?!0:e.modelValue===!0),c=v(()=>e.persistent!==!0&&(m.value===!0||Ne.value===!0));function z(o,g){if(V(),o!==!1&&l.animate(),O(0),m.value===!0){const T=l.instances[Y.value];T!==void 0&&T.belowBreakpoint===!0&&T.hide(!1),D(1),l.isContainer.value!==!0&&f(!0)}else D(0),o!==!1&&ue(!1);d(()=>{o!==!1&&ue(!0),g!==!0&&n("show",o)},De)}function b(o,g){A(),o!==!1&&l.animate(),D(0),O(R.value*k.value),se(),g!==!0?d(()=>{n("hide",o)},De):u()}const{show:q,hide:_}=Lt({showing:y,hideOnRouteChange:c,handleShow:z,handleHide:b}),{addToHistory:V,removeFromHistory:A}=_t(y,_,c),F={belowBreakpoint:m,hide:_},E=v(()=>e.side==="right"),R=v(()=>(a.lang.rtl===!0?-1:1)*(E.value===!0?1:-1)),ze=x(0),W=x(!1),oe=x(!1),Te=x(k.value*R.value),Y=v(()=>E.value===!0?"left":"right"),ie=v(()=>y.value===!0&&m.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:k.value:0),le=v(()=>e.overlay===!0||e.miniToOverlay===!0||l.view.value.indexOf(E.value?"R":"L")>-1||a.platform.is.ios===!0&&l.isContainer.value===!0),N=v(()=>e.overlay===!1&&y.value===!0&&m.value===!1),Ne=v(()=>e.overlay===!0&&y.value===!0&&m.value===!1),Ie=v(()=>"fullscreen q-drawer__backdrop"+(y.value===!1&&W.value===!1?" hidden":"")),je=v(()=>({backgroundColor:`rgba(0,0,0,${ze.value*.4})`})),Le=v(()=>E.value===!0?l.rows.value.top[2]==="r":l.rows.value.top[0]==="l"),Ue=v(()=>E.value===!0?l.rows.value.bottom[2]==="r":l.rows.value.bottom[0]==="l"),Xe=v(()=>{const o={};return l.header.space===!0&&Le.value===!1&&(le.value===!0?o.top=`${l.header.offset}px`:l.header.space===!0&&(o.top=`${l.header.size}px`)),l.footer.space===!0&&Ue.value===!1&&(le.value===!0?o.bottom=`${l.footer.offset}px`:l.footer.space===!0&&(o.bottom=`${l.footer.size}px`)),o}),Ye=v(()=>{const o={width:`${k.value}px`,transform:`translateX(${Te.value}px)`};return m.value===!0?o:Object.assign(o,Xe.value)}),Ke=v(()=>"q-drawer__content fit "+(l.isContainer.value!==!0?"scroll":"overflow-auto")),Ge=v(()=>`q-drawer q-drawer--${e.side}`+(oe.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(s.value===!0?" q-drawer--dark q-dark":"")+(W.value===!0?" no-transition":y.value===!0?"":" q-layout--prevent-focus")+(m.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${$.value===!0?"mini":"standard"}`+(le.value===!0||N.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(Le.value===!0?" q-drawer--top-padding":""))),Je=v(()=>{const o=a.lang.rtl===!0?e.side:Y.value;return[[ge,at,void 0,{[o]:!0,mouse:!0}]]}),Ze=v(()=>{const o=a.lang.rtl===!0?Y.value:e.side;return[[ge,_e,void 0,{[o]:!0,mouse:!0}]]}),et=v(()=>{const o=a.lang.rtl===!0?Y.value:e.side;return[[ge,_e,void 0,{[o]:!0,mouse:!0,mouseAllDir:!0}]]});function re(){nt(m,e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint)}C(m,o=>{o===!0?(w=y.value,y.value===!0&&_(!1)):e.overlay===!1&&e.behavior!=="mobile"&&w!==!1&&(y.value===!0?(O(0),D(0),se()):q(!1))}),C(()=>e.side,(o,g)=>{l.instances[g]===F&&(l.instances[g]=void 0,l[g].space=!1,l[g].offset=0),l.instances[o]=F,l[o].size=k.value,l[o].space=N.value,l[o].offset=ie.value}),C(l.totalWidth,()=>{(l.isContainer.value===!0||document.qScrollPrevented!==!0)&&re()}),C(()=>e.behavior+e.breakpoint,re),C(l.isContainer,o=>{y.value===!0&&f(o!==!0),o===!0&&re()}),C(l.scrollbarWidth,()=>{O(y.value===!0?0:void 0)}),C(ie,o=>{M("offset",o)}),C(N,o=>{n("onLayout",o),M("space",o)}),C(E,()=>{O()}),C(k,o=>{O(),de(e.miniToOverlay,o)}),C(()=>e.miniToOverlay,o=>{de(o,k.value)}),C(()=>a.lang.rtl,()=>{O()}),C(()=>e.mini,()=>{e.modelValue===!0&&(tt(),l.animate())}),C($,o=>{n("miniState",o)});function O(o){o===void 0?ee(()=>{o=y.value===!0?0:k.value,O(R.value*o)}):(l.isContainer.value===!0&&E.value===!0&&(m.value===!0||Math.abs(o)===k.value)&&(o+=R.value*l.scrollbarWidth.value),Te.value=o)}function D(o){ze.value=o}function ue(o){const g=o===!0?"remove":l.isContainer.value!==!0?"add":"";g!==""&&document.body.classList[g]("q-body--drawer-toggle")}function tt(){p!==null&&clearTimeout(p),t.proxy&&t.proxy.$el&&t.proxy.$el.classList.add("q-drawer--mini-animate"),oe.value=!0,p=setTimeout(()=>{p=null,oe.value=!1,t&&t.proxy&&t.proxy.$el&&t.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function at(o){if(y.value!==!1)return;const g=k.value,T=Z(o.distance.x,0,g);if(o.isFinal===!0){T>=Math.min(75,g)===!0?q():(l.animate(),D(0),O(R.value*g)),W.value=!1;return}O((a.lang.rtl===!0?E.value!==!0:E.value)?Math.max(g-T,0):Math.min(0,T-g)),D(Z(T/g,0,1)),o.isFirst===!0&&(W.value=!0)}function _e(o){if(y.value!==!0)return;const g=k.value,T=o.direction===e.side,K=(a.lang.rtl===!0?T!==!0:T)?Z(o.distance.x,0,g):0;if(o.isFinal===!0){Math.abs(K)<Math.min(75,g)===!0?(l.animate(),D(1),O(0)):_(),W.value=!1;return}O(R.value*K),D(Z(1-K/g,0,1)),o.isFirst===!0&&(W.value=!0)}function se(){f(!1),ue(!0)}function M(o,g){l.update(e.side,o,g)}function nt(o,g){o.value!==g&&(o.value=g)}function de(o,g){M("size",o===!0?e.miniWidth:g)}return l.instances[e.side]=F,de(e.miniToOverlay,k.value),M("space",N.value),M("offset",ie.value),e.showIfAbove===!0&&e.modelValue!==!0&&y.value===!0&&e["onUpdate:modelValue"]!==void 0&&n("update:modelValue",!0),j(()=>{n("onLayout",N.value),n("miniState",$.value),w=e.showIfAbove===!0;const o=()=>{(y.value===!0?z:b)(!1,!0)};if(l.totalWidth.value!==0){ee(o);return}h=C(l.totalWidth,()=>{h(),h=void 0,y.value===!1&&e.showIfAbove===!0&&m.value===!1?q(!1):o()})}),U(()=>{h!==void 0&&h(),p!==null&&(clearTimeout(p),p=null),y.value===!0&&se(),l.instances[e.side]===F&&(l.instances[e.side]=void 0,M("size",0),M("offset",0),M("space",!1))}),()=>{const o=[];m.value===!0&&(e.noSwipeOpen===!1&&o.push(ut(S("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),Je.value)),o.push($e("div",{ref:"backdrop",class:Ie.value,style:je.value,"aria-hidden":"true",onClick:_},void 0,"backdrop",e.noSwipeBackdrop!==!0&&y.value===!0,()=>et.value)));const g=$.value===!0&&i.mini!==void 0,T=[S("div",{...r,key:""+g,class:[Ke.value,r.class]},g===!0?i.mini():X(i.default))];return e.elevated===!0&&y.value===!0&&T.push(S("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),o.push($e("aside",{ref:"content",class:Ge.value,style:Ye.value},T,"contentclose",e.noSwipeClose!==!0&&m.value===!0,()=>Ze.value)),S("div",{class:"q-drawer-container"},o)}}}),Ht=Q({name:"QPageContainer",setup(e,{slots:i}){const{proxy:{$q:n}}=H(),r=ke(ne,P);if(r===P)return console.error("QPageContainer needs to be child of QLayout"),P;Fe(st,!0);const t=v(()=>{const a={};return r.header.space===!0&&(a.paddingTop=`${r.header.size}px`),r.right.space===!0&&(a[`padding${n.lang.rtl===!0?"Left":"Right"}`]=`${r.right.size}px`),r.footer.space===!0&&(a.paddingBottom=`${r.footer.size}px`),r.left.space===!0&&(a[`padding${n.lang.rtl===!0?"Right":"Left"}`]=`${r.left.size}px`),a});return()=>S("div",{class:"q-page-container",style:t.value},X(i.default))}});const{passive:Me}=be,Rt=["both","horizontal","vertical"];var Wt=Q({name:"QScrollObserver",props:{axis:{type:String,validator:e=>Rt.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:i}){const n={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let r=null,t,a;C(()=>e.scrollTarget,()=>{d(),f()});function s(){r!==null&&r();const w=Math.max(0,ct(t)),p=ft(t),h={top:w-n.position.top,left:p-n.position.left};if(e.axis==="vertical"&&h.top===0||e.axis==="horizontal"&&h.left===0)return;const m=Math.abs(h.top)>=Math.abs(h.left)?h.top<0?"up":"down":h.left<0?"left":"right";n.position={top:w,left:p},n.directionChanged=n.direction!==m,n.delta=h,n.directionChanged===!0&&(n.direction=m,n.inflectionPoint=n.position),i("scroll",{...n})}function f(){t=dt(a,e.scrollTarget),t.addEventListener("scroll",u,Me),u(!0)}function d(){t!==void 0&&(t.removeEventListener("scroll",u,Me),t=void 0)}function u(w){if(w===!0||e.debounce===0||e.debounce==="0")s();else if(r===null){const[p,h]=e.debounce?[setTimeout(s,e.debounce),clearTimeout]:[requestAnimationFrame(s),cancelAnimationFrame];r=()=>{h(p),r=null}}}const{proxy:l}=H();return C(()=>l.$q.lang.rtl,s),j(()=>{a=l.$el.parentNode,f()}),U(()=>{r!==null&&r(),d()}),Object.assign(l,{trigger:u,getPosition:()=>n}),Se}}),At=Q({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:i,emit:n}){const{proxy:{$q:r}}=H(),t=x(null),a=x(r.screen.height),s=x(e.container===!0?0:r.screen.width),f=x({position:0,direction:"down",inflectionPoint:0}),d=x(0),u=x(Ve.value===!0?0:he()),l=v(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),w=v(()=>e.container===!1?{minHeight:r.screen.height+"px"}:null),p=v(()=>u.value!==0?{[r.lang.rtl===!0?"left":"right"]:`${u.value}px`}:null),h=v(()=>u.value!==0?{[r.lang.rtl===!0?"right":"left"]:0,[r.lang.rtl===!0?"left":"right"]:`-${u.value}px`,width:`calc(100% + ${u.value}px)`}:null);function m(b){if(e.container===!0||document.qScrollPrevented!==!0){const q={position:b.position.top,direction:b.direction,directionChanged:b.directionChanged,inflectionPoint:b.inflectionPoint.top,delta:b.delta.top};f.value=q,e.onScroll!==void 0&&n("scroll",q)}}function $(b){const{height:q,width:_}=b;let V=!1;a.value!==q&&(V=!0,a.value=q,e.onScrollHeight!==void 0&&n("scrollHeight",q),y()),s.value!==_&&(V=!0,s.value=_),V===!0&&e.onResize!==void 0&&n("resize",b)}function k({height:b}){d.value!==b&&(d.value=b,y())}function y(){if(e.container===!0){const b=a.value>d.value?he():0;u.value!==b&&(u.value=b)}}let c=null;const z={instances:{},view:v(()=>e.view),isContainer:v(()=>e.container),rootRef:t,height:a,containerHeight:d,scrollbarWidth:u,totalWidth:v(()=>s.value+u.value),rows:v(()=>{const b=e.view.toLowerCase().split(" ");return{top:b[0].split(""),middle:b[1].split(""),bottom:b[2].split("")}}),header:J({size:0,offset:0,space:!1}),right:J({size:300,offset:0,space:!1}),footer:J({size:0,offset:0,space:!1}),left:J({size:300,offset:0,space:!1}),scroll:f,animate(){c!==null?clearTimeout(c):document.body.classList.add("q-body--layout-animate"),c=setTimeout(()=>{c=null,document.body.classList.remove("q-body--layout-animate")},155)},update(b,q,_){z[b][q]=_}};if(Fe(ne,z),he()>0){let _=function(){b=null,q.classList.remove("hide-scrollbar")},V=function(){if(b===null){if(q.scrollHeight>r.screen.height)return;q.classList.add("hide-scrollbar")}else clearTimeout(b);b=setTimeout(_,300)},A=function(F){b!==null&&F==="remove"&&(clearTimeout(b),_()),window[`${F}EventListener`]("resize",V)},b=null;const q=document.body;C(()=>e.container!==!0?"add":"remove",A),e.container!==!0&&A("add"),vt(()=>{A("remove")})}return()=>{const b=ht(i.default,[S(Wt,{onScroll:m}),S(qe,{onResize:$})]),q=S("div",{class:l.value,style:w.value,ref:e.container===!0?void 0:t,tabindex:-1},b);return e.container===!0?S("div",{class:"q-layout-container overflow-hidden",ref:t},[S(qe,{onResize:k}),S("div",{class:"absolute-full",style:p.value},[S("div",{class:"scroll",style:h.value},[q])])]):q}}});const Nt=He({__name:"EssentialLink",props:{title:null,caption:{default:""},link:{default:"#"},icon:{default:""}},setup(e){return(i,n)=>(te(),pe($t,{clickable:"",tag:"a",target:"_blank",href:e.link},{default:B(()=>[e.icon?(te(),pe(Oe,{key:0,avatar:""},{default:B(()=>[L(mt,{name:e.icon},null,8,["name"])]),_:1})):gt("",!0),L(Oe,null,{default:B(()=>[L(Ce,null,{default:B(()=>[ae(we(e.title),1)]),_:1}),L(Ce,{caption:""},{default:B(()=>[ae(we(e.caption),1)]),_:1})]),_:1})]),_:1},8,["href"]))}}),Yt=He({__name:"MainLayout",setup(e){const i=[{title:"Source Code",caption:"Github",icon:"code",link:"https://github.com/Jimly-Firdaus/Tucil3_13521102_13521140"}],n=x(!1);function r(){n.value=!n.value}return(t,a)=>{const s=bt("router-view");return te(),pe(At,{view:"lHh Lpr lFf"},{default:B(()=>[L(Qt,{elevated:""},{default:B(()=>[L(Et,null,{default:B(()=>[L(yt,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:r}),L(Ot,null,{default:B(()=>[ae(" Path Finder App ")]),_:1}),pt("div",null,"With Quasar v"+we(t.$q.version),1)]),_:1})]),_:1}),L(Ft,{modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=f=>n.value=f),"show-if-above":"",bordered:""},{default:B(()=>[L(Dt,null,{default:B(()=>[L(Ce,{header:""},{default:B(()=>[ae(" Essential Links ")]),_:1}),(te(),wt(Ct,null,qt(i,f=>L(Nt,St({key:f.title},f),null,16)),64))]),_:1})]),_:1},8,["modelValue"]),L(Ht,null,{default:B(()=>[L(s)]),_:1})]),_:1})}}});export{Yt as default};