import morphdom from 'morphdom'
import soda from 'sodajs'

export {
	morphdom,
	soda
}

export default option => Base =>{

	if( Base.elm == document.body ){
		Base.reactor = state => { console.warn('Reactor can`t be used on document.body') }
	}
	else{
		let template = Base.elm.querySelector('template')
		let html = Base.elm.outerHTML

		if( template )
			html = html.replace(/<template*.>/g, '').replace(/<\/template>/g, '')

		Base.reactor = state => {
			let status = {}
			morphdom( Base.elm, soda(html, state), lifecycle( Base.elm, status ) )
			if( status.hascomponent )
				Base.jails.start( Base.elm )
		}
	}

	const lifecycle = ( root, status ) => ({

		onBeforeElChildrenUpdated( node ){
			if( node.getAttribute && node.getAttribute('data-static') )
				return false
		},

		onNodeAdded( node ) {
			if( node.getAttribute && node.getAttribute('data-component') )
				status.hascomponent = true
		},

		onBeforeNodeDiscarded( node ){
			if( node.getAttribute ){
				let name = node.getAttribute('data-component')
				if( name )
					Base.jails.destroy( root, `[data-component*=${name}]`)
			}
		}
	})

	return Base
}
