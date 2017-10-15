import morphdom from 'morphdom'
import soda from 'sodajs'

export {
	morphdom,
	soda
}

export default option => Base =>{

	Base.elm.setAttribute('_reactor_', '1')

	if( Base.elm == document.body ){
		Base.reactor = state => { console.warn('Reactor can`t be used on document.body') }
	}else{

		let template = Base.elm.querySelector('template')
		let html = Base.elm.outerHTML
		let newnode = Base.elm

		if( template )
			html = html.replace(/<template*.>/g, '').replace(/<\/template>/g, '')

		Base.reactor = state => {

			let status = { diffs:[], hascomponent :false }
			newnode = morphdom( newnode, soda( html, state ), lifecycle( newnode, status ) )

			if( status.hascomponent )
				Base.jails.start( Base.elm )
			else{
				status.diffs.forEach( n => Base.jails.destroy(n) )
				if( status.diffs.length){
					Base.jails.start(Base.elm)
					status.diffs = []
				}
			}
			status.hascomponent = false
		}
	}

	const lifecycle = ( root, status ) => ({

		onBeforeElChildrenUpdated( node, tonode ){
			if( node.getAttribute && node.getAttribute('data-component') )
				if(!node.getAttribute('_reactor_'))
					status.diffs.push(node)
			return !(node.getAttribute && node.getAttribute('data-static'))
		},

		onNodeAdded( node ) {
			if( node.getAttribute && node.getAttribute('data-component') )
				status.hascomponent = true
		},

		onBeforeNodeDiscarded( node ){
			if( node.getAttribute && node.getAttribute('data-component') )
				Base.jails.destroy( node )
		}
	})

	return Base
}
