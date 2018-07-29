export default ()=>{

	return ( jails )=>{

		let components = jails.components

		markup( components )
		modules( components )
		profile( jails )
		checkorder( jails )
	}
}

const profile = ( jails )=>{

	let start = jails.start

	jails.start = function(){

		let timeend
		let time = new Date().getTime()

		start.apply(jails, arguments)
		timeend = new Date().getTime() - time
		console.info('[ Logger ]', 'jails.start:', timeend , 'ms')
	}
}

const markup = ( components )=>{

	const virtualDOM = document.createElement('html')
	virtualDOM.innerHTML = document.body.outerHTML
		.replace(/<template*.>/g, '')
		.replace(/<\/template>/g, '')

	for(let name in components)
		if( !virtualDOM.querySelector('[data-component*="'+name+'"]') ){
			console.info('[ Logger ]', name, 'was not found in markup on jails.start()')
		}
}

const modules = ( components )=>{

	each(document.querySelectorAll('[data-component]'), ( node, index) =>{
		each(node.getAttribute('data-component').split(/\s/), name =>{
			if(!(name in components)){
				console.info('[ Logger ]', name, 'was not loaded on jails.start()')
			}
		})
	})
}

const checkorder = (jails) =>{

	let base = jails.component
	let fromto = {}

	jails.component = function( name, node ){

		let object = base.apply( jails, arguments ),
			emit = object.emit,
			on   = object.on,
			get  = object.get,

			link = {
				emit :'http://github.com/jails-org/Jails/wiki/Common-Errors#no-component-is-listening-to-a-emit',
				method:'https://github.com/jails-org/Jails/wiki/Common-Errors#component-does-not-execute-a-method'
			}

		object.on = function(ev, callback){
			if(!(('on'+ev) in document))
				fromto[ev] = node
			on.apply(object, arguments)
		}

		object.emit = function(ev){
			if(!(ev in fromto))
				console.info('[ Logger ]', name, 'emited', ev, 'but there are no component listening.\n', link.emit)
			emit.apply(object, arguments)
		}

		object.get = function( n, query ){

			let fn = get.apply( object, arguments )

			return function( method ){

				let selector = '[data-component*="'+n+'"]'
				let found = false
				query = query? selector + query : selector

				each( node.querySelectorAll( query ), ( el )=>{
					if( el.j && el.j[n] && (method in el.j[n].methods) )
						found = true
				})

				if( node.matches(query) )
					if( node.j && node.j[n] && (method in node.j[n].methods) )
						found = true

				if(!found){
					console.info('[ Logger ]', name, 'called', '.'+method+'()', 'but there are no component with that method.\n', link.method)
				}

				fn.apply(null, arguments)
			}
		}

		return object
	}
}

const each = (list, callback)=>{
	for( let i = 0, len = list.length; i < len; i++ )
		callback(list[i], i, list)
}
