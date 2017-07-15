# html

Jails Html system designed to work with DOM, template systems and DOM diffing.

> Dependencies : `jails.packages.virtualdom`

---

## .template( HTMLElement, [cssSelector = 'template'])
Returns a render function which will compile a `template` tag content using [razor](https://github.com/magicdawn/razor-tmpl) syntax generating html output.

**IMPORTANT** : Template must have only 1 root node, just like JSX.

### Usage

```html
<div id="target">
    <template>
        <ul>
            @each( item in items ){
                <li>@item</li>
            }
        </ul>
    </template>
</div>
```

```js
import Html from 'jails.packages/html'

const target = document.getElementById('target')
const render = Html.template( target )

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
