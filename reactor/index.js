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

			let status = { diffs:[] }

			morphdom( Base.elm, soda( html, state ), lifecycle( Base.elm, status ) )

			if( status.hascomponent ){
				Base.jails.start( Base.elm )
				status.hascomponent = false
			}
			status.diffs = status.diffs.forEach( n => {
				Base.jails.destroy( n )
				Base.jails.start( n.parentNode )
				return false
			})
			status.diffs = []
		}
	}

	const lifecycle = ( root, status ) => ({

		onBeforeElChildrenUpdated( node ){
			if( node.getAttribute && node.getAttribute('data-static') )
				return false
		},

		onElUpdated( node ){
			const id = node.__reactorid
			if(id && (id!= Base.__reactorid))
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
