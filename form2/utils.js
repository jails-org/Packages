
export const getRules = (el) => {
	const therules = (new Function(`return ${el.dataset.rules}`))()
	const rules = therules ? therules : null
	const isCheckbox = (el.type && (el.type == 'checkbox'))
	const value = isCheckbox
		? el.checked ? el.value : ''
		: el.form[el.name].value
	return { value, rules }
}

/**
 * @function errorList
 * @description Transforms errors map into a list
 * @param {Object} errors
 */
export const formatError = (error) => {
	return Object.keys(error).reduce( (acc, item) => {
		acc[item] = true
		return acc
	}, {})
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
	const formData = new FormData(form)
	const acc = {}
	for(let item of formData.entries()) {
		acc[item[0]] = item[1]
	}
	return acc
}
