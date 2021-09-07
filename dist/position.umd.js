/**
  * @yaireo/position - Position a DOM element at a certain X,Y or next to another element
  *
  * @version v1.0.7
  * @homepage https://jsbin.com/beqosub/edit?html,css,output
  */

(function(a,b){if("function"==typeof define&&define.amd)define(["exports"],b);else if("undefined"!=typeof exports)b(exports);else{var c={exports:{}};b(c.exports),a.position=c.exports}})("undefined"==typeof globalThis?"undefined"==typeof self?this:self:globalThis,function(a){"use strict";var b=Math.round;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;/**
 * positions a DOM element next to a certain position
 * @param {HTMLElement} target DOM element node
 * @param {Object} ref node reference for positioning or just {x,y} coordinates
 * @param {String} placement [above/below/center & left/right/center] or mix of two (only works if "ref" is an HTML Element)
 * @param {Array} prevPlacement used when calculated new position overflows
 * @param {Array} offset distance (in pixels) from original placement position ("10px 20px" or just "10px" for both horizontal & vertical)
 */const c=a=>{var e,{target:f,ref:g,offset:h,placement:i,prevPlacement:j,useRaf:k=!0}=a,l={x:g.x,y:g.y,h:0,w:0},m=g&&g.x?{...g}:{},n=document.documentElement,o={w:n.clientWidth,h:n.clientHeight},p={w:f.clientWidth,h:f.clientHeight};// [horizontal, vertical]
// if "ref" is a DOM element, get [x,y] coordinates and adjust according to desired placement
if(d=k?d:a=>a(),j=j||[],i=(i||" ").split(" ").map((b,a)=>b?b:["center","below"][a]),h=h?[h[0]||0,h[1]||h[0]||0]:[0,0],g.parentNode&&(e=g.ownerDocument.defaultView,m=g.getBoundingClientRect(),l.x=m.x,l.y=m.y,l.w=m.width,l.h=m.height,e!=e.parent))// if ref element is within an iframe, get it's position relative to the viewport and not its local window
for(let a of e.parent.document.getElementsByTagName("iframe"))if(a.contentWindow===e){let b=a.getBoundingClientRect();l.x+=b.x,l.y+=b.y}// horizontal
"left"==i[0]?l.x-=p.w+h[0]:"right"==i[0]?l.x+=l.w+h[0]:l.x-=p.w/2-l.w/2,"above"==i[1]?l.y-=p.h+h[1]:"below"==i[1]?l.y+=l.h+h[1]:l.y-=p.h/2-l.h/2;const q={top:0>l.y,bottom:l.y+p.h>o.h,left:0>l.x,right:l.x+p.w>o.w},r=b=>c({...a,placement:b.join(" "),prevPlacement:i});// horizontal fix for overflows
return q.left&&"right"!=j[0]?r(["right",i[1]]):q.right&&"left"!=j[0]?r(["left",i[1]]):q.bottom&&"above"!=j[1]?r([i[0],"above"]):q.top&&"below"!=j[1]?r([i[0],"below"]):(d(()=>{f.setAttribute("positioned",!0),f.setAttribute("data-placement",i.join(" ")),f.setAttribute("data-pos-overflow",Object.entries(q).reduce((a,[b,c])=>c?`${a} ${b}`:a,"").trim()),[["pos-left",l.x],// overflow.right ? vpSize.w - targetSize.w : pos.x
["pos-top",l.y],// pos.y > offset[1] ? pos.y : 0
["pos-target-width",p.w],["pos-target-height",p.h],["pos-ref-width",m.width||0],["pos-ref-height",m.height||0],["pos-ref-left",m.x],["pos-ref-top",m.y],["window-scroll-y",window.scrollY],["window-scroll-x",window.scrollX]].forEach(([a,c])=>f.style.setProperty("--"+a,b(c)))}),{pos:l,placement:i});// vertical fix for overflows
// update target's position
};let d=requestAnimationFrame||(a=>setTimeout(a,1e3/60));a.default=c});
