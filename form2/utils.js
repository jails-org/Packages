
export const getRules = (el) => {
	const therules = (new Function(`return ${el.dataset.rules}`))()
	const rules = therules ? therules : null
	const isCheckbox = (el.type && (el.type == 'checkbox'))
	const value = isCheckbox
		? el.checked ? el.value : ''
		: el.form[el.name].value
	return { value, rules }
}

export const formatError = (error) => {
	const errors = Object.keys(error)
	const name = errors[0]
	return { [name]: true }
}

export const debounce = (func, delay) => {
	let inDebounce
	return function () {
		const context = this
		const args = arguments
		clearTimeout(inDebounce)
		inDebounce = setTimeout(() => func.apply(context, args), delay)
	}
}

export const getFormData = (form) => {

	const data = Array.from(form.elements)
		.reduce((acc, el) => {
			if (el.name) {
				const therules = (new Function(`return ${el.dataset.rules}`))()
				const rules = therules ? therules : null
				const isCheckbox = (el.type && (el.type == 'checkbox'))
				const value = isCheckbox
					? el.checked ? el.value : ''
					: el.form[el.name].value
				acc[el.name] = value
			}
			return acc
		}, {})

	return data
}
