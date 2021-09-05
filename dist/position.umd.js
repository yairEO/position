/**
  * @yaireo/position - Position a DOM element at a certain X,Y or next to another element
  *
  * @version v1.0.2
  * @homepage https://yaireo.github.io/position
  */

(function(a,b){if("function"==typeof define&&define.amd)define(["exports"],b);else if("undefined"!=typeof exports)b(exports);else{var c={exports:{}};b(c.exports),a.position=c.exports}})("undefined"==typeof globalThis?"undefined"==typeof self?this:self:globalThis,function(a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;/**
 * positions a DOM element next to a certain position
 * @param {HTMLElement} target DOM element node
 * @param {Object} ref node reference for positioning or just {x,y} coordinates
 * @param {String} placement [above/below/center & left/right/center] or mix of two (only works if "ref" is an HTML Element)
 * @param {Array} prevPlacement used when calculated new position overflows
 * @param {Array} offset distance (in pixels) from original placement position ("10px 20px" or just "10px" for both horizontal & vertical)
 */const b=a=>{var{target:d,ref:e,offset:f,placement:g,prevPlacement:h}=a,i={x:e.x,y:e.y},j=e&&e.x?{...e}:{},k=document.documentElement,l={w:k.clientWidth,h:k.clientHeight},m={w:d.clientWidth,h:d.clientHeight};h=h||[],g=(g||" ").split(" ").map((b,a)=>b?b:["center","below"][a]),f=f?[f[0]||0,f[1]||f[0]||0]:[],e instanceof Element&&(j=e.getBoundingClientRect(),i.x=j.x,i.y=j.y,i.w=j.width,i.h=j.height,"left"==g[0]?i.x-=m.w+f[0]:"right"==g[0]?i.x+=i.w+f[0]:i.x-=m.w/2-i.w/2,"above"==g[1]?i.y-=m.h+f[1]:"below"==g[1]?i.y+=i.h+f[1]:i.y-=m.h/2-i.h/2);const n={top:0>i.y,bottom:i.y+m.h>l.h,left:0>i.x,right:i.x+m.w>l.w},o=c=>b({...a,placement:c.join(" "),prevPlacement:g});// horizontal fix for overflows
return n.left&&"right"!=h[0]?o(["right",g[1]]):n.right&&"left"!=h[0]?o(["left",g[1]]):n.bottom&&"above"!=h[1]?o([g[0],"above"]):n.top&&"below"!=h[1]?o([g[0],"below"]):(c(()=>{d.setAttribute("positioned",!0),d.setAttribute("data-placement",g.join(" ")),d.setAttribute("data-pos-overflow",Object.entries(n).reduce((a,[b,c])=>c?`${a} ${b}`:a,"").trim()),[["pos-left",i.x],// overflow.right ? vpSize.w - targetSize.w : pos.x
["pos-top",i.y],// pos.y > offset[1] ? pos.y : 0
["pos-target-width",m.w],["pos-target-height",m.h],["pos-ref-width",e.width||0],["pos-ref-height",e.height||0],["pos-ref-left",j.x],["pos-ref-top",j.y],["window-scroll-y",window.scrollY],["window-scroll-x",window.scrollX]].forEach(([a,b])=>d.style.setProperty("--"+a,b))}),{pos:i,placement:g});// vertical fix for overflows
// update target's position
},c=requestAnimationFrame||(a=>setTimeout(a,1e3/60));a.default=b});
