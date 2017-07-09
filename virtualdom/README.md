# virtualdom

This module uses the fantastic [morphdom](https://github.com/patrick-steele-idem/morphdom) library for dom diffing aimming fasts dom changes.

---

Morphdom is template system agnostic, it can be used with dom elements or string of dom elements.
You can use any template string systems and use dom diffing, for example:

```js
import vdom from 'jails.packages/virtualdom'

const target = document.getElementById('target')

const render = vdom( target, items =>
    return `<ul>
    	${items.map(item => `<li>${item}</li>`)}
    </ul>`
)

render([1, 2, 3])
```

### Result
```html
<div id="target">
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
	<ul>
</div>
```

`virtualdom` takes a HtmlElement and an function that can return either html string or domNodes, and returns a `render` function that expects a model ( Object literal).

Every `render` call will update only the changes to the dom tree.
