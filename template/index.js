import vdom  from 'jails.packages/virtualdom'
import T from 'tangular'

export default ( elm, selector = 'template' )=>{

	let textarea = document.createElement('textarea')
	const template = elm.querySelector( selector )

	textarea.innerHTML = template.innerHTML.trim()
	const engine = T.compile( textarea.value )

	textarea = null
	return vdom( elm, engine )
}
