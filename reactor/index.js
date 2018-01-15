import morphdom from 'morphdom'
import soda from 'sodajs'

export {
	morphdom,
	soda
}

let id = 0

const templates = {}
const model = {}
const REACTORID = 'data-reactor-id'

setTemplate()

export default option => Base => {

	if( Base.elm == document.body ){
		Base.reactor = state => console.warn('Reactor can`t be used on document.body')
	}else{

		const tid  	  = +Base.elm.getAttribute( REACTORID )
		const html 	  = templates[ tid ]

		let newnode   = Base.elm
		let firstime  = true

		Base.reactor = state => {

			let newstate = Object.assign({}, (firstime && model[tid])? model[tid] : state)
			let status = { hascomponent :false }
			newnode = morphdom( newnode, soda( html, newstate ), lifecycle( newnode, status ) )

			if( status.hascomponent ){
				setTemplate( newnode )
				Base.jails.start( newnode )
			}

			status.hascomponent = false
			model[tid] = newstate
			firstime   = false
		}

		Base.reactor.templates = templates
		Base.reactor.model = model
		Base.reactor.REACTORID = REACTORID
	}

	const lifecycle = ( root, status ) => ({

		onBeforeElChildrenUpdated( node, tonode ){
			return !(node.getAttribute && node.getAttribute('data-static'))
		},

		onNodeAdded( node ) {
			if( node.getAttribute && node.getAttribute('data-component') && !node.j ){
				status.hascomponent = true
			}
		},

		onBeforeNodeDiscarded( node ){
			if( node.getAttribute && node.getAttribute('data-component') && node.j ){
				const newid = +node.getAttribute( REACTORID )
				Base.jails.destroy( node )
				delete templates[newid]
			}
		}
	})

	return Base

}

function setTemplate( context = document.body ){

	const elements   = context.querySelectorAll('[data-component]')
	const components = Array.prototype.slice.call( elements )

	components.forEach( elm => {
		if( !elm.getAttribute( REACTORID ) )
			elm.setAttribute( REACTORID, id++ )
	})

	components.forEach( elm => {
		if( elm.getAttribute( REACTORID ) ){
			const newid = +elm.getAttribute( REACTORID )
			if( !templates[ newid ] ){
				templates[ newid ] = !elm.querySelector('template')
					? elm.outerHTML
					: elm.outerHTML
						.replace(/<template*.>/g, '')
						.replace(/<\/template>/g, '')
			}
		}
	})
}
