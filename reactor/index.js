import morphdom from 'morphdom'
import soda from 'sodajs'

export {
	morphdom,
	soda
}

export default option => Base =>{

	const id = Math.random()

	Base.__reactorid = id
	Base.elm.__reactorid = id

	if( Base.elm == document.body ){
		Base.reactor = state => { console.warn('Reactor can`t be used on document.body') }
	}else{

		let template = Base.elm.querySelector('template')
		let html = Base.elm.outerHTML

		if( template )
			html = html.replace(/<template*.>/g, '').replace(/<\/template>/g, '')

		Base.reactor = state => {

			let status = { diffs:[], hascomponent :false }

			morphdom( Base.elm, soda( html, state ), lifecycle( Base.elm, status ) )

			if( status.hascomponent )
				Base.jails.start( Base.elm.parentNode )

			if( status.diffs.length && !status.hascomponent ){
				status.diffs.forEach( n => Base.jails.destroy( n ) )
				Base.jails.start( Base.elm.parentNode )
				status.diffs = []
			}

			status.hascomponent = false
		}
	}

	const lifecycle = ( root, status ) => ({

		onBeforeElChildrenUpdated( node ){
			return !(node.getAttribute && node.getAttribute('data-static'))
		},

		onElUpdated( node ){
			const nodeid = node.__reactorid
			if(nodeid && ( nodeid!= id))
				status.diffs.push(node)
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
