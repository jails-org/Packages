import litestore from '../store'
import reactor, {soda} from '../reactor'

export {
	soda
}

export default options => {

	const R = reactor(options)

	return Base => {

		const base = R( Base )
		const id = +base.elm.getAttribute( Base.reactor.REACTORID )
		const initialmodel = base.reactor.model[id]

		base.arch = ( {model, actions, store} ) => {

			model = initialmodel || model
			const thestore = litestore( Object.assign({}, model) )

			thestore.actions( actions )
			thestore.subscribe( state => {
				const newstate = Object.assign({}, state)
				base.reactor( newstate )
			})

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
}
