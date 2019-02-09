# animation

Animation fires a callback function every time animation/transition ends for a given `HTMLElement`.

## Usage

```html
<style>
.my-element {
	opacity:0
	transition: opacity 2s;
}
.my-element.fade-in{
	opacity:1
}
</style>
<div class="my-element" data-animation-name="myElm"></div>
```

```js
import animation from 'jails.packages/animation'
const elm = document.querySelector('.my-element')

animation(elm, {
	'myElm:opacity' :() => //do some stuff after opacity animation
})

elm.classList.add('fade-in')
```

*Using `animateCss` library to add animation on `HTMLElements`.*

Html Markup:

```html
<div class="test" data-component="test">
	<button class="btn btn-primary {{animation}}" data-animation-name="button">A</button>
</div>
```

```js
import animation from 'packages/animation'

export default ({ init:main, elm, reactor }) => {
	
	const button = elm.querySelector('button')
	
	main(()=>[
		start
	])

	const start = () => {
		reactor({ animation :'animated bounce' })
	}

	animation( button,{
		'button@bounce' :() => reactor({ animation: 'animated flash' })
	})
}
```

The code above will start a bouncing animation on a button html element, after bounce animation it will blink, changing css class from `bounce` to `flash` using reactor to update the dom.

## off()

Animation function returns another function that unbind the `animationend` and `transitionend` events from the animated html element passed as argument. If your facing memory leaks please use that `off()` method when you unmount your component.