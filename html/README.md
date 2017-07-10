# html

Jails Html system designed to work with DOM, template systems and DOM diffing.

> Dependencies : `jails.packages.virtualdom`

---

## .template( HTMLElement, [cssSelector = 'template'])
Returns a render function which will compile a `template` tag content using `ejs` syntax generating html output.

** IMPORTANT ** : Template must have only 1 root node, just like JSX.

### Usage

```html
<div id="target">
	<template>
		<ul>
			<% items.map(function( item ){ %>
				<%= item %>
			<% }) %>
		</ul>
	</template>
</div>
```

```js
import Html from 'jails.packages/html'

const tpl = document.getElementById('tpl-user')
const render = Html.template( tpl )

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
