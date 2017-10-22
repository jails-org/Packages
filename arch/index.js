import litestore from '../store'
import reactor   from '../reactor'

export default options => Base => {

	const base = reactor( options )( Base )

	base.arch = ( {model, actions, store} ) => {

		const thestore = store? store : litestore( Object.assign({}, model) )

		thestore.actions( actions )
		thestore.subscribe( state => base.reactor( Object.assign({}, state) ) )

		thestore.set( state => {
			for(let key in model)
				if( !(key in state) ) state[key] = model[key]
		})

		return thestore
	}

	return base
}
