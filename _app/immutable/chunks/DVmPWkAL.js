import{Y as i,O as f,ad as p,M as _,ae as h,af as E,h as d,g as o,a as T,s as g}from"./Dnvco1zB.js";function y(n){var t=document.createElement("template");return t.innerHTML=n,t.content}function r(n,t){var e=_;e.nodes_start===null&&(e.nodes_start=n,e.nodes_end=t)}function x(n,t){var e=(t&h)!==0,c=(t&E)!==0,a,m=!n.startsWith("<!>");return()=>{if(d)return r(o,null),o;a===void 0&&(a=y(m?n:"<!>"+n),e||(a=f(a)));var s=c||p?document.importNode(a,!0):a.cloneNode(!0);if(e){var l=f(s),v=s.lastChild;r(l,v)}else r(s,s);return s}}function N(n=""){if(!d){var t=i(n+"");return r(t,t),t}var e=o;return e.nodeType!==3&&(e.before(e=i()),g(e)),r(e,e),e}function L(){if(d)return r(o,null),o;var n=document.createDocumentFragment(),t=document.createComment(""),e=i();return n.append(t,e),r(t,e),n}function O(n,t){if(d){_.nodes_end=o,T();return}n!==null&&n.before(t)}const M="5";var u;typeof window<"u"&&((u=window.__svelte??(window.__svelte={})).v??(u.v=new Set)).add(M);export{O as a,r as b,L as c,N as d,x as t};
