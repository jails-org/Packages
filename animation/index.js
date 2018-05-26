export default ( elm, config ) => {

	const handler = ( event ) => {

		const type = event.animationName? 'animation' : 'transition'
		
		switch( type ){
			case 'transition':
				const tname = event.target.getAttribute('data-animation-name')
				const ttarget = (tname? `${tname}@` :'') + event.propertyName
				if( ttarget in config )
					config[ttarget](event)
				break
			case 'animation':
				const aname = event.target.getAttribute('data-animation-name')
				const atarget = (aname? `${aname}@` :'') + event.animationName
				if( atarget in config )
					config[atarget](event)
		}
	}

	elm.addEventListener(animationEnd, handler)
	elm.addEventListener(transitionEnd, handler)

	//off()
	return () => {
		elm.removeEventListener(animationEnd, handler)
		elm.removeEventListener(transitionEnd, handler)
	}
}

const getPrefix = ( object ) => {
	for( let key in object )
		if( key in document.body.style )
			return object[key]	
}

const animationEnd = getPrefix({
	animation      : 'animationend',
	OAnimation     : 'oAnimationEnd',
	MozAnimation   : 'animationend',
	WebkitAnimation: 'webkitAnimationEnd'
})

const transitionEnd = getPrefix({
	transition     : 'transitionend',
	OTransition    : 'oTransitionEnd',
	MozTransition  : 'transitionend',
	WebkitTransition: 'webkitTransitionEnd'
})
