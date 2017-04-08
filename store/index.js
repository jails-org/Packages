export default ( state )=>{

	let topics = [], actions = []

	const update = ( newstate, action )=>{
		topics.forEach( method =>
			method( newstate, { action, newstate, oldstate :state })
		)
		state = newstate
	}

	return {

		set( fn ){
			let newstate = Object.assign({}, state)
			fn( newstate )
			update( newstate, '' )
		},

		get(){
			return state
		},

		subscribe( fn ){
			topics.push( fn )
			return ()=> topics = topics.filter( item =>item != fn )
		},

		dispatch( action, payload ){
			if( action in actions ){
				let newstate = Object.assign({}, actions[ action ].call( null, state, payload ))
				update( newstate || state, action )
			}
		},

		actions( newactions ){
			actions = Object.assign( actions, newactions )
		}
	}
}
