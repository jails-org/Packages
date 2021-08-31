import validator from '../validator'
import { getRules, formatError, debounce } from './utils'
import { INPUT, VALIDATE_INPUT, SELECTABLE, VALIDATE_SELECTABLE } from './constants'

export default function formField ({ main, elm, msg, injection, emit, trigger, update}) {
	
	const { validators } = injection

	main( _ => [
		events,
		exposing,
		validate
	])

	const events = ({ on }) => {
		on('input', VALIDATE_INPUT, debounce(oninput, 100))
		on('change', VALIDATE_SELECTABLE, oninput)
		on('blur', `${INPUT}, ${SELECTABLE}`, onblur)
		on('focus', `${INPUT}, ${SELECTABLE}`, onfocus)
	}

	const exposing = ({ expose }) => {
		expose({ map, set })
	}

	const validate = () => {
		const input = elm.querySelector('[data-rules]')
		if( input ) {
			validator({ [input.name]: getRules(input) }, validators)
				.catch( _ => msg.set(s =>  s.isValid = false ) )
				.finally( emitchange )
		}
	}

	const set = (name, value, data = {}) => {
		const input = elm.querySelector(`[name=${name}]`)
		if( input ) {
			msg.set( s => { 
				s.value = value
				s.data = data
				s.touched = true
			})
			setTimeout(_ => {
				trigger('input', `[name=${name}]`)
				trigger('change', `[name=${name}]`)
			})
			
		}			
	}

	/**
	 * @function oninput
	 * @param {*} event
	 */
	 const oninput = (event) => {
		const { name, value } = event.target
		const isCheckbox = event.target.type == 'checkbox' || event.target.type == 'radio'

		validator({ [name]: getRules(event.target) }, validators)
			.then(_ => {
				msg.set(s => {
					s.error = null
					s.isValid = true 
					if( isCheckbox ) {
						s.value = event.target.checked? value : ''
					}else {
						s.value = value
					}					
				})
			})
			.catch( _ => msg.set( s => {
				s.isValid = false 
				if( isCheckbox ) {
					s.value = event.target.checked? value : ''
				}else {
					s.value = value
				}	
			}))
			.finally( emitchange )
	}

	/**
	 * @function blur
	 * @param {*} event
	 */
	 const onblur = (event) => {
		const { name, value } = event.target
		const isCheckbox = event.target.type == 'checkbox' || event.target.type == 'radio'
		validator({ [name]: getRules(event.target) }, validators)
			.then(_ => {
				msg.set(s => {
					s.error = null
					s.isValid = true
					s.focus = false
					if( isCheckbox ) {
						s.value = event.target.checked? value : ''
					}else {
						s.value = value
					}	
				})
			})
			.catch(errors => {
				msg.set(s => {
					s.error = formatError(errors[name])
					s.isValid = false
					s.focus = false
					if( isCheckbox ) {
						s.value = event.target.checked? value : ''
					}else {
						s.value = value
					}	
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
		fn({ elm, state: msg.getState() })
	}

	update( props => {
		if( props.data && JSON.stringify(props.data) != JSON.stringify(msg.getState().data) ) {
			const {name, value, type, checked} = elm.querySelector('input, select')
			let hasValue = false
			msg.set( s => {
				s.data = Object.assign({}, s.data, props.data) 
				if( type == 'checkbox' || type == 'radio' ) {
					s.value = s.data[name] || (checked?value:'')
				}else {
					s.value = s.data[name] || s.value
				}
				s.touched = Boolean(s.value)
				hasValue = Boolean(s.value && s.data[name])
			})
			if( hasValue ) {
				trigger('input', `[name=${name}]`)
				trigger('change', `[name=${name}]`)
			}
		}			
	})
}

export const model = {
	touched: false,
	focus  : false,
	error  : null,
	isValid: true,
	data   : {},
	value  : null
}

export const view = (state) => {
	
	const touched = state.touched? 'touched' : ''
	const error   = state.error? 'error' : ''
	const focus   = state.focus? 'focus' : ''
	const valid   = state.value && state.isValid && state.touched ? 'valid' : ''
	
	return Object.assign({}, state, {
		fieldClass : `${touched} ${error} ${focus} ${valid}`.trim()
	})
}
