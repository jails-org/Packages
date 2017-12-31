import litestore from '../store'
import reactor, {soda} from '../reactor'

export {
	soda
}

export default options => Base => {

	const base = reactor( options )( Base )

	base.arch = ( {model, actions, store} ) => {

		const thestore = litestore( Object.assign({}, model) )

		thestore.actions( actions )
		thestore.subscribe( state => base.reactor( Object.assign({}, state) ) )

		thestore.set( state => {
			for(let key in model)
				if( !(key in state) ) state[key] = model[key]
		})

		if( store ){
			const {dispatch} = thestore
			thestore.dispatch = ( action, payload ) => {
				dispatch( action, payload )
				store.dispatch( action, payload )
			}
		}

		return thestore
	}

	return base
}
