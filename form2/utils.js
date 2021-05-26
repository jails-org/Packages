
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
				const isFile = (el.type && (el.type == 'file'))

				if (isCheckbox && el.checked) {
					return acc[el.name] = el.value
				}

				if (isFile && el.value) {
					return acc[el.name] = el.files
				}

				acc[el.name] = el.value

			}
		}, {})

	return data
}
