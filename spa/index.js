import assetsloader from '../assets-loader'
import Grapnel from 'Grapnel'

export const Router = Grapnel
export const loader = assetsloader

export default ( {options, initialize, routes, transition, onload } ) => {

	const cache	  = {}
	const noop	  = (() => null)
	const change  = transition || ((outlet,next) => next())
	const start   = initialize || noop
	const callback= onload || noop
	const router  = new Router( options )

	const outlet  = document.querySelector('[data-outlet]')

	start( router, outlet )

	for( let route in routes ){

		router.get( route, (req, res, next) => {

			const assets 	= routes[route]( req.params, {req, res, next} )
			const selector	= `[data-component*=${assets.component}]`
			const component	= document.querySelector( selector )
			const key 		= assets.component

			if( !component ){
				if( cache[ key ] ){
					change(outlet, ()=>{
						return new Promise((resolve)=>{
							outlet.innerHTML = ''
							outlet.appendChild( cache[key] )
							resolve( outlet )
						})
					})
				}else{
					const {css, js, templateUrl:html} = assets
					change(outlet, ()=>{
						return assetsloader({css, js, html})
							.then(( {html} )=> {
								outlet.innerHTML = html
								cache[ key ] = outlet.querySelector( selector )
								if( callback ) callback( outlet )
								return outlet
							})
					})
				}
			}else{
				cache[ key ] = outlet.querySelector( selector )
			}
		})
	}
}
