<p align="center">
  <a href='https://yaireo.github.io/position/'>
    <img src="./demo.apng?sanitize=true" alt="color picker demo video"/>
  </a>
<p>


<p align="center">
  <a href='https://www.npmjs.com/package/@yaireo/position'>
      <img src="https://badgen.net/npm/v/@yaireo/position?color=red" />
  </a>
  <img src="https://badgen.net/bundlephobia/minzip/@yaireo/position?color=green" />
  <img src="https://badgen.net/npm/dw/@yaireo/position?color=blue" />
</p>

<h1 align="center">
  Position a DOM element at a certain X,Y or next to another element
</h1>

## Install

```bash
npm i @yaireo/position -S
```

## Example
```js
import position from '@yarieo/position'

position({
  // the element wished to be positioned in a certain place
  target: targetElement,

  // reference DOM element or an Object like so: {x:10, y:20}
  ref: refElement,

  // [optional] default target plaement string, relative to the ref
  // first string value is horizontal and then vertical placement. Examples:
  // 'left center', 'right below', 'center center'
  placement:'center above',

  // [optional] distance from reference element
  offset: [20]
})
```

This scripts places an element next to another element (at a certain prefered relative place).
If you want to update the targer's position (relativce to the referece) when the page scrolls or resizes
I advice adding observers:

```js
const observerCallback = () => position({ target:targetElement, ref:refElement })

// create observers instances
const resizeObserver = new ResizeObserver(observerCallback)
const intersectionObserver = new IntersectionObserver(observerCallback, {root:document, threshold:1})

// start observing (using the instances created above)
resizeObserver.observe(document.body)
intersectionObserver.observe(targetElement)
```

## CSS

This script adds *CSS variables* (custom properties) on the *target* element:

| CSS Variable        |
| ------------------- |
| `pos-left`          |
| `pos-top`           |
| `pos-target-width`  |
| `pos-target-height` |
| `pos-ref-width`     |
| `pos-ref-height`    |
| `pos-ref-left`      |
| `pos-ref-top`       |
| `window-scroll-y`   |
| `window-scroll-x'`  |

Using the above mix of variables, write this CSS in your code to position the target:

```css
{
  --x: calc(var(--pos-left) + var(--window-scroll-x));
  --y: calc(var(--pos-top) + var(--window-scroll-y));
  position: absolute;
  z-index: 999999;
  top: 0;
  left: 0;
  transform: translate(calc(var(--x) * 1px),
                       calc(var(--y) * 1px));
}
```