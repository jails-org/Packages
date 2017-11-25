import assetsloader from '../assets-loader'
import Grapnel from 'Grapnel'

export const Router = Grapnel
export const loader = assetsloader

export default ( {options, initialize, routes, callback, onload } ) => {

	const cache	  = {}
	const noop	  = (() => null)
	const change  = callback || noop
	const ready   = onload || noop
	const router  = new Router( options )
	const start   = initialize || noop
	const outlet  = document.querySelector('[data-outlet]')

	start( router )

	for( let route in routes ){

		router.get( route, (req, res, next) => {

			const assets 	= routes[route]( req.params, {req, res, next} )
			const selector	= `[data-component*=${assets.component}]`
			const component	= document.querySelector( selector )
			const key 		= assets.component

			change( outlet, {state :'enter'} )

			if( !component ){
				if( cache[ key ] ){
					outlet.innerHTML = ''
					outlet.appendChild( cache[key] )
					change( outlet, {state:'end'} )
				}else{
					const {css, js, templateUrl:html} = assets
					assetsloader({css, js, html})
						.then(( {html, js, css} ) => {
							outlet.innerHTML = html
							cache[ key ] = outlet.querySelector( selector )
							ready( outlet, {state:'loaded', html, js, css} )
							change( outlet, {state:'end', html, js, css } )
						})
				}
			}else{
				cache[ key ] = outlet.querySelector( selector )
			}
		})
	}
}
