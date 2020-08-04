import validator from '../validator'

const INPUT = 'input[data-rules]:not([type="checkbox"]):not([type="radio"])'
const SELECTABLE = 'input[data-rules][type="checkbox"],input[data-rules][type="radio"]'

export default function form ({ main, elm:form, emit, msg, injection, update }) {
	
	const { validators } = injection
	
	main( _ => [
		events
	])

	const events = ({ on }) => {
		on('keyup', INPUT, onchange)
		on('blur', INPUT, onblur)
		on('change', SELECTABLE, onblur)
		on('submit', onsubmit)
	}

	/**
	 * @function change
	 * @param {*} event
	 */
	const onchange = (event) => {

		const name = event.target.name
		const { data } = getParams(form)

		validator({ [name]: data[name] }, validators)
			.then(_ => msg.set(s => s.errors[name] = undefined))
			.catch(_ => _)
			.finally(checkValid)
	}

	/**
	 * @function blur
	 * @param {*} event
	 */
	const onblur = (event) => {

		const name = event.target.name
		const { data } = getParams(form)

		validator(data, validators)
			.then(_ => msg.set(s => s.errors = {}))
			.catch(errors => {
				errors = errorsList(errors)
				msg.set(s => s.errors[name] = errors[name])
			})
			.finally(checkValid)
	}

	/**
	 * @function onsubmit
	 * @param {*} event
	 */
	const onsubmit = (event) => {
		
		const { data } = getParams(form)

		validator(data, validators)
			.then(_ => {
				emit(':submit', { event, data })
				msg.set(s => s.errors = {})
			})
			.catch(errors => {
				msg.set(s => s.errors = errorsList(errors))
				event.preventDefault()
			})
			.finally(checkValid)

		event.preventDefault()
	}

	/**
	 * @function checkValid
	 * @param {*} event
	 */
	const checkValid = () => {

		const { data } = getParams(form)
		const isValid = msg.getState().valid

		return validator(data, validators)
			.then(_ => {
				if (!isValid) {
					msg.set(s => s.valid = true)
					emit(':valid')
				}
			})
			.catch(_ => {
				if (isValid) {
					msg.set(s => s.valid = false)
					emit(':invalid')
				}
			})
	}
	
	/**
	 * @function update
	 * @description Updating form with parent states
	 */
	update( state => {
		msg.set( s => s.data = state )
	})
}

export const model = {
	errors: {},
	valid: false,
	data : {}
}

/**
 * @function getParams
 * @description Transform DOM form elements into Javascript Plain Object
 * @param {HTMLElement} form
 */
const getParams = (form) => {

	const data = Array.from(form.elements)
		.reduce((acc, el) => {
			if (el.name) {
				const therules = (new Function(`return ${el.dataset.rules}`))()
				const rules = therules ? therules : null
				const isCheckbox = (el.type && (el.type == 'checkbox'))
				const value = isCheckbox
					? el.checked ? el.value : ''
					: el.form[el.name].value
				acc[el.name] = { value, rules }
			}
			return acc
		}, {})

	return { data }
}

/**
 * @function errorList
 * @description Transforms errors map into a list
 * @param {Object} errors
 */
const errorsList = (errors) => {
	return Object.keys(errors).reduce((newerrors, name) => {
		newerrors[name] = Object.keys(errors[name])[0]
		return newerrors
	}, {})
}