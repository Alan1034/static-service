import{r as g,c as b,o as L,a as A,b as O,d as P,i as w}from"./vendor-adcf46f0.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const x=(r,n)=>{const s=r.__vccOpts||r;for(const[i,t]of n)s[i]=t;return s},R={name:"App",components:{}};function I(r,n,s,i,t,e){const o=g("router-view");return L(),b(o)}const $=x(R,[["render",I]]),T="modulepreload",B=function(r){return"/index/"+r},h={},l=function(n,s,i){if(!s||s.length===0)return n();const t=document.getElementsByTagName("link");return Promise.all(s.map(e=>{if(e=B(e),e in h)return;h[e]=!0;const o=e.endsWith(".css"),d=o?'[rel="stylesheet"]':"";if(!!i)for(let a=t.length-1;a>=0;a--){const u=t[a];if(u.href===e&&(!o||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${d}`))return;const c=document.createElement("link");if(c.rel=o?"stylesheet":T,o||(c.as="script",c.crossOrigin=""),c.href=e,document.head.appendChild(c),o)return new Promise((a,u)=>{c.addEventListener("load",a),c.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>n()).catch(e=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=e,window.dispatchEvent(o),!o.defaultPrevented)throw e})},C=[{pathKey:"../views/colorlibrary/index.vue",path:"/colorlibrary",name:"颜色库",icon:"dashboard",hidden:!0},{pathKey:"fashionslibrary",path:"/fashionslibrary",name:"款式库",icon:"dashboard"},{pathKey:"",path:"/system",name:"系统管理",icon:"Setting",meta:{affix:!0},children:[{pathKey:"../views/system/tag/index.vue",path:"/system/tag",name:"标签管理"}]}],_=()=>l(()=>import("./Home-06198830.js"),["assets/Home-06198830.js","assets/vendor-adcf46f0.js","assets/Home-ad4aff37.css"]),D=()=>l(()=>import("./RouterLayout-6e66acdd.js"),["assets/RouterLayout-6e66acdd.js","assets/vendor-adcf46f0.js"]),K=()=>l(()=>import("./index-9501483e.js"),["assets/index-9501483e.js","assets/vendor-adcf46f0.js","assets/index-0dbae5b6.css"]),p=Object.assign({"../views/state/404/index.vue":()=>l(()=>import("./index-9501483e.js"),["assets/index-9501483e.js","assets/vendor-adcf46f0.js","assets/index-0dbae5b6.css"]),"../views/state/login-overtime/index.vue":()=>l(()=>import("./index-df3f6cee.js"),["assets/index-df3f6cee.js","assets/vendor-adcf46f0.js","assets/index-92102a9d.css"]),"../views/state/no-permission/index.vue":()=>l(()=>import("./index-c8d71d82.js"),["assets/index-c8d71d82.js","assets/vendor-adcf46f0.js","assets/index-eef08147.css"])});for(const r in p)console.log(r);const v=[{path:"/home",component:_},{path:"/",component:_},{path:"/:pathMatch(.*)*",name:"NotFound",component:K}],y=r=>{const n=[];return r.forEach(s=>{const{pathKey:i,name:t,children:e,path:o,hidden:d,meta:f}=s,c={path:o,name:t+i,component:()=>Promise.resolve(i&&p[i]?p[i]():D()),meta:{...s,...f},hidden:!!d};if(e){let a=null;e&&(a=y(e)),n.push({...c,children:a})}else n.push({...c})}),n},E=y(C);console.log(E);v.push(...E);const N=A({history:O(),routes:v});if(!document.getElementById("root")){const r=document.createElement("div");r.id="root",document.body.appendChild(r)}const m=P($);m.use(w);m.use(N);m.mount("#root");export{x as _};
