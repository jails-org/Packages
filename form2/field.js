import validator from 'jails.packages/validator'
import { getRules, formatError, debounce } from './utils'

const INPUT = 'input[data-rules]:not([type="checkbox"]):not([type="radio"])'
const SELECTABLE = 'input[data-rules][type="checkbox"],input[data-rules][type="radio"],select[data-rules]'

export default function formField ({ main, elm, msg, injection, emit, update }) {

	const { validators } = injection

	main( _ => [
		events,
		exposing
	])

	const events = ({ on }) => {
		on('keyup', INPUT, debounce(onchange, 250))
		on('blur', INPUT, onblur)
		on('change', SELECTABLE, onblur)
		on('focus', `${INPUT}, ${SELECTABLE}`, onfocus)
	}

	const exposing = ({ expose }) => {
		expose({ map })
	}

	/**
	 * @function change
	 * @param {*} event
	 */
	const onchange = (event) => {
		const { name } = event.target
		validator({ [name]: getRules(event.target) }, validators)
			.then(_ => {
				msg.set(s => {
					s.error = null
					s.isValid = Boolean(s.touched)
				})
			})
			.catch( _ => msg.set( s => s.isValid = false ))
			.finally( emitchange )
	}

	/**
	 * @function blur
	 * @param {*} event
	 */
	const onblur = (event) => {
		const { name } = event.target
		validator({ [name]: getRules(event.target) }, validators)
			.then(_ => {
				msg.set(s => {
					s.error = null
					s.isValid = Boolean(s.touched)
					s.focus = false
				})
			})
			.catch(errors => {
				msg.set(s => {
					s.error = formatError(errors[name])
					s.isValid = false
					s.focus = false
				})
			})
			.finally( emitchange )
	}

	const emitchange = () => {
		emit('form-field:change', { element: elm, state: msg.getState() })
	}

	/**
	 * @function touched
	 * @param {*} event
	 */
	const onfocus = (event) => {
		msg.set( s => {
			s.focus = true
			s.touched = true
		})
	}

	const map = (fn) => {
		fn( msg.getState() )
	}

	update( props => {
		if( props.data ) {
			msg.set( s => s.data = props.data )
		}
	})
}

export const model = {
	touched: false,
	focus  : false,
	error  : null,
	isValid: false,
	data   : {}
}

export const view = (state) => {
	const touched = state.touched? 'touched' : ''
	const error   = state.error? 'error' : ''
	const focus   = state.focus? 'focus' : ''
	return {
		...state,
		cssClass : `${touched} ${error} ${focus}`.trim()
	}
}
