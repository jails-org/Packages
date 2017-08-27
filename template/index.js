import {virtualdom} from '../virtualdom'
import jails from 'jails-js'

export default engine => (elm, options = {}) => {

	const selector 	= options.selector || 'template'
	const target    = elm.querySelectorAll( selector )
	const templates = Array.prototype.slice.call( target )

	const callback = {

		onBeforeElChildrenUpdated( fromel, toel ){
			const attributes = fromel.attributes
			const iscomponent = attributes.getNamedItem('data-component')
			const shouldnotupdate = attributes.getNamedItem('shouldnotupdate')
			return !( iscomponent && shouldnotupdate )
		}
	}

	const Ts = templates.map( template => {

		const root = document.createElement('div')
		root.setAttribute('data-root-template', true)

		const textarea = document.createElement('textarea')
		textarea.innerHTML = `<div data-root-template="true">${template.innerHTML.trim()}</div>`

		const tpl = engine( textarea.value )

		const render = (state = {}) => {
			virtualdom( root, tpl( state ), callback )
			jails.start( root )
		}

		template.parentNode.insertBefore( root, template )
		render( options.initialState )

		return { render, template }
	})

	return {
		render( state ){
			Ts.map( item => item.render(state) )
		}
	}
}
