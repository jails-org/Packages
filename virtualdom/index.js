import morphdom from 'morphdom'
import jails    from 'jails-js'

export const virtualdom = morphdom

export default ( node, render )=>{

	let oldnode

	return ( state )=>{

		let hascomponent = false
		let result

		if(!oldnode)
			oldnode = node.appendChild(document.createElement('div'))

		result = render( state )

		oldnode = morphdom( oldnode, result.trim? result.trim() :result, {
			onBeforeNodeAdded( newnode ){
				if( newnode.getAttribute && newnode.getAttribute('data-component') ){
					hascomponent = true
				}
			}
		})

		if( hascomponent ){
			jails.start( oldnode )
		}
	}
}
