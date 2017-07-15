import vdom  from 'jails.packages/virtualdom'
import razor from 'razor-tmpl/browser/razor-tmpl'

export default ( elm, selector = 'template' )=>{

	let textarea = document.createElement('textarea')
	const template = elm.querySelector( selector )

	textarea.innerHTML = template.innerHTML.trim()

	const tplstring = textarea.value
	const engine = model => razor.render( tplstring, model )

	textarea = null
	return vdom( elm, engine )
}
