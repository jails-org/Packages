import loader  from '../html-loader'
import Grapnel from 'grapnel'

export default ({
	options, initialize, routes, callback, update
})=>{

	let pageload = true
	let index
	let children

	const main = initialize || (()=>null)
	const render = update || output
	const router = new Grapnel( options )
	const outlet = document.querySelector('[data-outlet]')

	for( let route in routes )
		router.get( route, request( route ) )

	main( router )

	function request( route ){

		return function( req, res, next ){

			const assets = routes[route]( req.params, {req, res, next} )

			if( pageload && outlet.children.length && options.pushState ){
				assets.templateUrl = null
				index = route
				children = document.createElement('div')
				Array.prototype.slice.call(outlet.children).map( element => children.appendChild( element ) )
			}
			if( index === route && options.pushState ){
				render({ params :req.params, outlet, data:{html :children}, state :pageload?'loaded':'changed' })
				pageload = false
			}else{
				loader( assets ).then( response =>{
					response.params = req.params
					response.outlet = outlet
					return response
				}).then( render )
			}
		}
	}

	function output( response ){
		if( response.data.html ){
			outlet.innerHTML = ''
			outlet.appendChild( response.data.html )
		}
		if( callback )
			callback( response )
	}

	return router
}

export const Router = Grapnel

export const htmlLoader = loader
