import litestore from '../store'
import reactor   from '../reactor'

export default options => Base => {

	const base = reactor( options )( Base )

	base.arch = ( {model, actions} ) => {

		let store = litestore( model )

		store.actions( actions )
		store.subscribe( state => base.reactor( Object.assign({}, state) ) )
		store.set( state => state )

		return store
	}

	return base
}
