import loader from 'html-loader'
import Grapnel 	  from 'grapnel'

export default ({
	update, load, callback, routes
})=>{

	const fnroutes = routes || (()=>{})
	const render = update || output
	const router = new Grapnel()
	const outlet = document.querySelector('[data-outlet]')

	/* @Routing / @Assets */
	router.get( '/:page', get )
	router.get( '/:page/*', get )
	fnroutes( router )

	/* @Functions */
	function get( req, res, next ){
		const {page} = req.params
		loader( load(page) )
			.then( response =>{
				response.page = page
				response.outlet = outlet
				return response
			})
			.then( render )
	}

	function output( response ){
		outlet.innerHTML = ''
		outlet.appendChild( response.data.html )
		if( callback ) callback( response )
	}
}

export const Router = Grapnel

export const htmlLoader = loader
