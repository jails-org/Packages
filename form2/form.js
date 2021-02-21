import { getFormData } from './utils'

export default function form ({ main, get, elm, emit, update, msg }) {

	const fields = get('form-field')

	main( _ => [
		events,
		initialState,
		exposing
	])

	const events = ({ on }) => {
		on('form-field:change', validate)
		on('submit', onsubmit)
	}

	const initialState = () => {
		if( 'isvalid' in elm.dataset ) {
			msg.set( s => s.isValid = Boolean(elm.dataset.isvalid) )
		}
	}

	const exposing = ({ expose }) => {
		expose({ validate })
	}

	const validate = () => {

		let isFormValid = true

		fields('map', ({ isValid }) => {
			if( !isValid ) {
				isFormValid = false
			}
		})

		if( isFormValid != msg.getState().isValid ){
			msg.set( s => s.isValid = isFormValid )
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
	update( (state) => {
		if( state.data ) {
			msg.set( s => s.data = state.data )
		}
	})
}

export const model = {
	isValid: false,
	data : {}
}
