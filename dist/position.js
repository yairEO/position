/**
  * @yaireo/position - Position a DOM element at a certain X,Y or next to another element
  *
  * @version v1.1.1
  * @homepage https://jsbin.com/beqosub/edit?html,css,output
  */

/**
 * positions a DOM element next to a certain position
 * @param {HTMLElement} target DOM element node
 * @param {Object} ref node reference for positioning or just {x,y} coordinates
 * @param {String} placement [above/below/center & left/right/center] or mix of two (only works if "ref" is an HTML Element)
 * @param {Array} prevPlacement used when calculated new position overflows
 * @param {Array} offset distance (in pixels) from original placement position ("10px 20px" or just "10px" for both horizontal & vertical)
 */

const position = props => {
  var {target, ref, offset, placement, prevPlacement, useRaf = true, track} = props,
      pos = {x:ref.x, y:ref.y, h:0, w:0},
      refRect = (ref && ref.x) ? {...ref} : {},
      refWindow,
      docElm = document.documentElement,
      vpSize = { w: docElm.clientWidth, h: docElm.clientHeight },
      targetSize = { w: target.clientWidth, h: target.clientHeight };

  raf = useRaf ? raf : cb => cb();
  prevPlacement = prevPlacement || [];
  placement = (placement||' ').split(' ').map((a,i) => a ? a : ['center', 'below'][i])  // [horizontal, vertical]
  offset = offset ? [offset[0] || 0, offset[1] || offset[0] || 0] : [0,0]; // [horizontal, vertical]

  // if "ref" is a DOM element, get [x,y] coordinates and adjust according to desired placement
  if( ref.parentNode ){
    refWindow = ref.ownerDocument.defaultView;
    refRect = ref.getBoundingClientRect() // [x,y] are top-left coordinates
    pos.x = refRect.x
    pos.y = refRect.y
    pos.w = refRect.width
    pos.h = refRect.height

    // if ref element is within an iframe, get it's position relative to the viewport and not its local window
    if( refWindow != refWindow.parent ){
      for (let frameElement of refWindow.parent.document.getElementsByTagName('iframe')) {
        if (frameElement.contentWindow  === refWindow) {
          let iframeRect = frameElement.getBoundingClientRect();
          pos.x += iframeRect.x
          pos.y += iframeRect.y
        }
      }
    }
  }

  // horizontal
  if( placement[0] == 'left' )       pos.x -= targetSize.w + offset[0];
  else if( placement[0] == 'right' ) pos.x += pos.w + offset[0];
  else                               pos.x -= targetSize.w/2 - pos.w/2;

  // vertical
  if( placement[1] == 'above' )      pos.y -= targetSize.h + offset[1];
  else if( placement[1] == 'below' ) pos.y += pos.h + offset[1];
  else                               pos.y -= targetSize.h/2 - pos.h/2;

  const overflow = {
    top   : pos.y < 0,
    bottom: pos.y + targetSize.h > vpSize.h,
    left  : pos.x < 0,
    right : pos.x + targetSize.w > vpSize.w
  }

  const reposition = p => position({...props, placement:p.join(' '), prevPlacement:placement})

  // horizontal fix for overflows
  if( overflow.left && prevPlacement[0] != 'right' )   return reposition(['right', placement[1]])
  if( overflow.right && prevPlacement[0] != 'left' )   return reposition(['left', placement[1]])
  // vertical fix for overflows
  if( overflow.bottom && prevPlacement[1] != 'above' ) return reposition([placement[0], 'above'])
  if( overflow.top && prevPlacement[1] != 'below' )    return reposition([placement[0], 'below'])

  // update target's position
  raf(() => {
    target.setAttribute('positioned', true);
    target.setAttribute('data-placement', placement.join(' '));
    target.setAttribute('data-pos-overflow', Object.entries(overflow).reduce((acc, [k,v]) => v ? `${acc} ${k}` : acc , '').trim());
    [
      ['pos-left', overflow.right ? vpSize.w - targetSize.w : pos.x],
      ['pos-top', pos.y], // pos.y > offset[1] ? pos.y : 0
      ['pos-target-width', targetSize.w],
      ['pos-target-height', targetSize.h],
      ['pos-ref-width', refRect.width || 0],
      ['pos-ref-height', refRect.height || 0],
      ['pos-ref-left', refRect.x],
      ['pos-ref-top', refRect.y],
      ['window-scroll-y', window.scrollY],
      ['window-scroll-x', window.scrollX]
    ].forEach(([k,v]) => target.style.setProperty('--'+k, Math.round(v)))
  })

  // auto-reposition on any ancestor scroll
  if( track?.scroll && !target.position__trackedScroll ){
    // mark the node as tracked
    target.position__trackedScroll = true;

    // if any ancestor of refElement was scrolled, re-position the target
    window.addEventListener('scroll', onScroll, true)

    function onScroll(e){
      // make sure the scrolled element contains the ref element
      if( e.target.contains(refElement) )
        position(props)
    }
  }

  return {pos, placement}
}

let raf = requestAnimationFrame || (cb => setTimeout(cb, 1000/60))

export default position