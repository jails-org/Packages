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

export default option => {

	setTemplate()

	return Base => {

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

				newnode = morphdom( Base.elm, soda( html, newstate ), lifecycle( newnode, status ) )

				if( status.hascomponent ){
					if(!Base.jails.observer)
						Base.jails.start( newnode )
					if( !Base.elm.getAttribute(REACTORID) ){
						Base.elm.setAttribute( REACTORID, id++)
						templates[id] = newnode.outerHTML
							.replace(/<template*.>/g, '')
							.replace(/<\/template>/g, '')
					}
				}

				status.hascomponent = false
				model[tid] = newstate
				firstime   = false
			}
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

		Base.reactor.templates = templates
		Base.reactor.model = model
		Base.reactor.REACTORID = REACTORID

		return Base

	}
}

function setTemplate( context = document.body ){

	const virtual = document.createElement('div')
	const elements = Array.prototype.slice.call(context.querySelectorAll('[data-component]'))

	elements.forEach( (elm, index) => elm.setAttribute( REACTORID, id++ ) )

	virtual.innerHTML = context.innerHTML
		.replace(/<template*.>/g, '')
		.replace(/<\/template>/g, '')

	const virtualComponents = Array.prototype.slice.call(virtual.querySelectorAll('[data-component]'))
	const newItems = virtualComponents.filter(item => !item.getAttribute(REACTORID))

	newItems.forEach( elm => elm.setAttribute( REACTORID, id++ ))

	virtualComponents.forEach( elm => {
		const ID = +elm.getAttribute( REACTORID )
		if( !templates[ ID ] )
			templates[ ID ] = elm.outerHTML
	})
}
