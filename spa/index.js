import loader  from '../html-loader'
import Grapnel from 'grapnel'

export default ({
	options, initialize, routes, callback, update
})=>{

	let pageload = true

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

			if( pageload && outlet.hasChildNodes() && options.pushState ){
				assets.templateUrl = null
				pageload = false
			}

			loader( assets ).then( response =>{
				response.params = req.params
				response.outlet = outlet
				return response
			}).then( render )
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
