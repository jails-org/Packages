import morphdom from 'morphdom'
import jails    from 'jails-js'

export default ( node, render )=>{

	let oldnode

	return ( state )=>{

		let hascomponent = false

		if(!oldnode)
			oldnode = node.appendChild(document.createElement('div'))

		oldnode = morphdom( oldnode, render( state ), {
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
