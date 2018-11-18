export default ( data = {} ) => {

	const publisher = pubsub()
	const UPDATE = '__update__'
	
	let state = JSON.parse(JSON.stringify(data))

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

			if( update.call )
				return publisher.subscribe(UPDATE, ({state, action, payload}) => update( state, {action, payload} ))

			publisher.subscribe(UPDATE, ({state, action, payload}) => {
				if( action in update )
					update[action]( state, {action, payload} )
			})
		}
	}
}

const pubsub = (topics, _async) => {

	topics = {}
	_async = {}

	return {
		publish(name, params) {
			if (!(name in topics))
				_async[name] = params
			else
				topics[name].forEach((topic) => topic(params))
		},
		subscribe(name, method) {
			topics[name] = topics[name] || []
			topics[name].push( method )
			if (name in _async)
				topics[name].forEach((topic) => topic(_async[name]))
			return () => {
				topics[name] = topics[name].filter((topic) =>  topic == method)
			}
		}
	}
}