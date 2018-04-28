# animation

This fires up a callback function every time animation/transition ends for a given `HTMLElement`.

## Usage

```js
import animation from 'jails.packages/animation'
const elm = document.querySelector('my-element')

animation(elm, ( action, payload ) => {
    console.log( action, payload )
})
```

Since `action` and `payload` are the same parameters used on `store.dispatch` function, you can integrate your `store` with animation package.


*Using `animateCss` library to add animation on `HTMLElements`.*

```js
import animation from 'packages/animation'

export default ({ init:main, elm, arch }) => {

	main(()=>[
		register,
		start
	])

	const register = () => {
		Msg.subscribe( log )
		animation(elm, Msg.dispatch)
	}

	const start = () => {
	   Msg.dispatch('animationstart')
	}

	const Msg = arch({
		model,
		actions
	})
}

const model = {
	animation :''
}

const actions = {
	'animationstart' :() => ({ animation:'bounce' }),
	'animationend:bounce' :() => ({ animation:'flash' })
}

const log = ( state, {action, payload}) => {
	console.group(`STORE / ACTION => ${action}`)
	console.log('state', state)
	console.log('payload', payload)
	console.groupEnd()
}

```

Html Markup:

```html
<div class="test" data-component="test">
	<button class="btn btn-primary animated {{animation}}">A</button>
</div>
```
