# virtualdom

This module uses the fantastic [morphdom](https://github.com/patrick-steele-idem/morphdom) library for dom diffing aimming fasts dom changes.

---

Morphdom is template system agnostic, it can be used with dom elements or string of dom elements.
You can use `mustache` with dom diffing for example:

```js
import vdom from 'jails.packages/virtualdom'
import mustache from 'mustache'

const template = mustache.parse('<ul>{{#items}}<li>{{value}}</li>{{/items}}</ul>')
const targetElement = document.getElementById('target')
const engine = ( model )=> mustache.render(template, model)

const render = vdom( domElement, engine )

render([{value:1}, {value:2}, {value:3}])
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
