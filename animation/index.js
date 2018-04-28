export default ( box, callback ) => {

	const handler = ( event ) => {

		const type = event.animationName? 'animation' : 'transition'

		if( type == 'animation' ) {
			const action = `${type}end:${event.animationName}`
			callback(action, event)
		}else {
			const action = `${type}end:${event.propertyName}`
			callback(action, event)
		}
	}

	box.addEventListener(animationEnd, handler)
	box.addEventListener(transitionEnd, handler)

	return {
		off(){
			box.removeEventListener(animationEnd, handler)
			box.removeEventListener(transitionEnd, handler)
		}
	}
}

const animationEnd = (( object ) => {
	for( let key in object )
		if( key in document.body.style )
			return object[key]
})({
	animation      : 'animationend',
	OAnimation     : 'oAnimationEnd',
	MozAnimation   : 'animationend',
	WebkitAnimation: 'webkitAnimationEnd'
})

const transitionEnd = (( object ) => {
	for( let key in object )
		if( key in document.body.style )
			return object[key]
})({
	transition     : 'transitionend',
	OTransition    : 'oTransitionEnd',
	MozTransition  : 'transitionend',
	WebkitTransition: 'webkitTransitionEnd'
})
