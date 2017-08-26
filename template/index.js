import {virtualdom} from '../virtualdom'
import jails from 'jails-js'

export default engine => (elm, options = {}) => {

	let hascomponents = false

	const selector 	= options.selector || 'template'
	const target    = elm.querySelectorAll( selector )
	const templates = Array.prototype.slice.call( target )

	const callback = {

		onBeforeElChildrenUpdated( fromel, toel ){

			const attributes = fromel.attributes
			const iscomponent = attributes.getNamedItem('data-component')
			const shouldnotupdate = attributes.getNamedItem('shouldnotupdate')

			if( iscomponent ){
				if( !fromel.j ) hascomponents = true
				if( shouldnotupdate ) return false
			}
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

			if( hascomponents ){
				jails.start( root )
				hascomponents = false
			}
		}

		template.parentNode.insertBefore( root, template )
		render( options.initialState )
		jails.start( root )

		return { render, template }
	})

	return {
		render( state ){
			Ts.map( item => item.render(state) )
		}
	}
}
