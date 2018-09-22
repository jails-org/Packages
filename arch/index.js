import litestore from '../store'
import reactor, {soda} from '../reactor'

export {
	soda
}

export default options => {

	const R = reactor(options)

	return Base => {

		const base = R(Base)

		base.arch = ({ model, actions = {}, store, beforeUpdate }) => {

			const thestore = litestore(Object.assign({}, model))

			thestore.actions(actions.call ? actions(thestore) : actions)
			thestore.subscribe(state => {
				const newstate = Object.assign({}, state)
				base.reactor(beforeUpdate ? beforeUpdate(newstate) : newstate)
			})

			thestore.set(state => {
				for (let key in model)
					if (!(key in state)) state[key] = model[key]
			})

			if (store) {
				const { dispatch } = thestore
				thestore.dispatch = (action, payload) => {
					dispatch(action, payload)
					store.dispatch(action, payload)
				}
			}

			return thestore
		}

		return base
	}
}
