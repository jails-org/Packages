# reactor

Reactor extends all jails components into reactive components.

> Version : `1.0.0`

> Dependencies :
- [morphdom](https://github.com/patrick-steele-idem/morphdom) - for dom diffing
- [sodajs](https://github.com/AlloyTeam/sodajs) -  as template system

---

## Usage

```js
import reactor from 'jails.packages/reactor'

jails
	.use( reactor() )
	.start()
```

## Component : `my-component`
```js
export default ( {init, reactor} ) =>{

	reactor({
		name :'Clark',
		lastname :'Kent'
	})

	init(()=>[

	])
}
```

## Markup
```html
<div data-component="my-component">
	<h1>Hi!, {{name}} {{lastname}}</h1>
</div>
```

You can use `template` tags to hide informations on page load.

```html
<div data-component="my-component">
	<template>
		<h1>Hi!, {{name}} {{lastname}}</h1>
	</template>
</div>
```

Reactor will dispatch `:destroy` custom event when a inner component has been discarted.
