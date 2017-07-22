# template

Jails Html system designed to work with DOM, template systems and DOM diffing.

> Dependencies : `jails.packages.virtualdom`, `tangular`

---

## template( HTMLElement, [cssSelector = 'template'])
Returns a render function which will compile a `template` tag content using [tangular](https://github.com/totaljs/Tangular) syntax generating html output.

**IMPORTANT** : Template must have only 1 root node, just like JSX.

### Usage

```html
<div id="target">
    <template>
        <ul>
			{{foreach item in items}}
				<li>@item</li>
			{{end}}
        </ul>
    </template>
</div>
```

```js
import template from 'jails.packages/template'

const target = document.getElementById('target')
const render = template( target )

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
