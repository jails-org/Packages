import { getFormData } from './utils'

export default function form ({ main, get, elm, emit, update, msg }) {

	const field = get('form-field')

	main( _ => [
		events,
		exposing
	])

	const events = ({ on }) => {
		on('form-field:change', validate)
		on('submit', onsubmit)
	}

	const exposing = ({ expose }) => {
		expose({ validate, setFields })
	}

	const setFields = ( fields ) => {
		for( const name in fields )
			field('set', name, fields[name], fields)
		msg.set( s => s.data = Object.assign({}, s.data, fields) )
	}

	const validate = () => {
		let isFormValid = true
		let updateData = {}
		field('map', ({ elm, state }) => {
			if( elm.querySelector('[data-rules]') && !state.isValid ) {
				isFormValid = false
			}
			const input = elm.querySelector('input, select, textarea')
			if( input.type == 'checkbox' || input.type == 'radio' ) {
				// updateData[input.name] = input.checked? input.value || input.name : ''
			}else {
				updateData[input.name] = input.value
			}
			
		})

		if( isFormValid != msg.getState().isValid ){

			msg.set( s => {
				s.isValid = isFormValid
				s.data = Object.assign(s.data, updateData)
			})
			emit(`form:${isFormValid? 'valid': 'invalid'}`, getFormData(elm))
		}		
	}

	const onsubmit = (e) => {
		const { isValid } = msg.getState()
		if( isValid ) {
			emit('form:submit', getFormData(elm))
		}
		e.preventDefault()
	}

	/**
	 * @function update
	 * @description Updating form with parent states
	 */
	update( (props) => {
		if( props && JSON.stringify(props) != JSON.stringify(msg.getState().data) ) {
			msg.set( s => s.data = Object.assign({}, s.data, props.data) )
		}
	})
}

export const model = {
	isValid: false,
	data : {}
}
