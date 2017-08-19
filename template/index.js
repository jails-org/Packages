import vdom  from 'jails.packages/virtualdom'
import Tangular from 'tangular'

export default ( elm, selector = 'template' )=>{

	let textarea = document.createElement('textarea')
	const template = elm.querySelector( selector )

	textarea.innerHTML = template.innerHTML.trim()
	const engine = Tangular.compile( textarea.value )

	textarea = null
	return vdom( elm, engine )
}

export const T = Tangular
export const virtualdom = vdom
