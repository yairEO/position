/**
  * @yaireo/position - Position a DOM element at a certain X,Y or next to another element
  *
  * @version v1.0.5
  * @homepage https://jsbin.com/beqosub/edit?html,css,output
  */

(function(a,b){if("function"==typeof define&&define.amd)define(["exports"],b);else if("undefined"!=typeof exports)b(exports);else{var c={exports:{}};b(c.exports),a.position=c.exports}})("undefined"==typeof globalThis?"undefined"==typeof self?this:self:globalThis,function(a){"use strict";var b=Math.round;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;/**
 * positions a DOM element next to a certain position
 * @param {HTMLElement} target DOM element node
 * @param {Object} ref node reference for positioning or just {x,y} coordinates
 * @param {String} placement [above/below/center & left/right/center] or mix of two (only works if "ref" is an HTML Element)
 * @param {Array} prevPlacement used when calculated new position overflows
 * @param {Array} offset distance (in pixels) from original placement position ("10px 20px" or just "10px" for both horizontal & vertical)
 */const c=a=>{var{target:e,ref:f,offset:g,placement:h,prevPlacement:i,useRaf:j=!0}=a,k={x:f.x,y:f.y},l=f&&f.x?{...f}:{},m=document.documentElement,n={w:m.clientWidth,h:m.clientHeight},o={w:e.clientWidth,h:e.clientHeight};d=j?d:a=>a(),i=i||[],h=(h||" ").split(" ").map((b,a)=>b?b:["center","below"][a]),g=g?[g[0]||0,g[1]||g[0]||0]:[0,0],f instanceof Element&&(l=f.getBoundingClientRect(),k.x=l.x,k.y=l.y,k.w=l.width,k.h=l.height,"left"==h[0]?k.x-=o.w+g[0]:"right"==h[0]?k.x+=k.w+g[0]:k.x-=o.w/2-k.w/2,"above"==h[1]?k.y-=o.h+g[1]:"below"==h[1]?k.y+=k.h+g[1]:k.y-=o.h/2-k.h/2);const p={top:0>k.y,bottom:k.y+o.h>n.h,left:0>k.x,right:k.x+o.w>n.w},q=b=>c({...a,placement:b.join(" "),prevPlacement:h});// horizontal fix for overflows
return p.left&&"right"!=i[0]?q(["right",h[1]]):p.right&&"left"!=i[0]?q(["left",h[1]]):p.bottom&&"above"!=i[1]?q([h[0],"above"]):p.top&&"below"!=i[1]?q([h[0],"below"]):(d(()=>{e.setAttribute("positioned",!0),e.setAttribute("data-placement",h.join(" ")),e.setAttribute("data-pos-overflow",Object.entries(p).reduce((a,[b,c])=>c?`${a} ${b}`:a,"").trim()),[["pos-left",k.x],// overflow.right ? vpSize.w - targetSize.w : pos.x
["pos-top",k.y],// pos.y > offset[1] ? pos.y : 0
["pos-target-width",o.w],["pos-target-height",o.h],["pos-ref-width",l.width||0],["pos-ref-height",l.height||0],["pos-ref-left",l.x],["pos-ref-top",l.y],["window-scroll-y",window.scrollY],["window-scroll-x",window.scrollX]].forEach(([a,c])=>e.style.setProperty("--"+a,b(c)))}),{pos:k,placement:h});// vertical fix for overflows
// update target's position
};let d=requestAnimationFrame||(a=>setTimeout(a,1e3/60));a.default=c});
