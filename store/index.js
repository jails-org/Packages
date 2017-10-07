export default ( state = {} ) => {

	const publisher = pubsub()
	const UPDATE = '__update__'

	return {

		get(){
			return state
		},

		set( fn ){
			fn( state )
			publisher.publish( UPDATE, { state } )
		},

		actions( actions ){
			for( let action in actions )
				publisher.subscribe( action, payload =>{
					state = Object.assign(state, actions[ action ]( state, payload ))
				})
		},

		dispatch( action, payload ){
			publisher.publish( action, payload )
			publisher.publish( UPDATE, { state, action, payload } )
		},

		subscribe( update ){
			return publisher.subscribe(UPDATE, ({state, action, payload}) => update( state, {action, payload} ))
		}
	}
}

const pubsub = () => {

	let topics = {}

	return {

		publish( name, params ){
			if( name in topics )
				topics[name].map( topic => topic( params ) )
		},

		subscribe( name, method ){

			topics[name] = topics[name] || []
			topics[name].push( method )

			return ()=>{
				topics[name] = topics[name].filter( topic => topic == method )
			}
		}
	}
}
