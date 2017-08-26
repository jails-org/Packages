# template

Jails Html system designed to work with DOM, template systems and DOM diffing.

> Dependencies : `jails.packages.virtualdom`, `tangular`

---

## template( HTMLElement, [options { initialState }])
Returns a object with `.render( state )` method used to update the view.

### Usage

```html
<ul id="target">
    <template>    
		{{#items}}
			<li>{{.}}</li>
		{{/items}}

		<div data-component="my-component" shouldnotupdate>
			<p>This component will not be updated, only mounted</p>
		</div>
    </template>
</ul>
```

```js
import tpl from 'jails.packages/template'
import mustache from 'mustache'

// tpl : string -> function

const template = tpl( html => {
	mustache.parse( html )
	return state => mustache.render( html, state )
})

const target = document.getElementById('target')
const render = template( target )

render([{value:1}, {value:2}, {value:3}])
```

### Result
```html
<ul id="target">
    <li>1</li>
    <li>2</li>
    <li>3</li>
<ul>
```
