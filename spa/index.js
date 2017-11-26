import assetsloader from '../assets-loader'
import Grapnel from 'Grapnel'

const noop = (()=>null)

export const Router = Grapnel
export const loader = assetsloader

export default ( {
	options,
	routes,
	initialize = noop,
	onload = noop,
	callback = noop,
	transition = ((next) => next())
}) => {

	const cache	  = {}
	const router  = new Router( options )
	const outlet  = document.querySelector('[data-outlet]')

	initialize( router, outlet )

	for( let route in routes ){

		router.get( route, (req, res, next) => {

			const assets 	= routes[route]( req.params, {req, res, next} )
			const selector	= `[data-component*=${assets.component}]`
			const component	= document.querySelector( selector )
			const key 		= assets.component
			const params 	= {router, req, res, next, outlet}

			if( !component ){
				if( cache[ key ] ){
					transition(()=>{
						return new Promise((resolve)=>{
							outlet.innerHTML = ''
							outlet.appendChild( cache[key] )
							resolve( outlet )
							if( callback ) callback( params )
						})
					}, params)
				}else{
					const {css, js, templateUrl:html} = assets
					transition(()=>{
						return assetsloader({css, js, html})
							.then(( {html} )=> {
								outlet.innerHTML = html
								cache[ key ] = outlet.querySelector( selector )
								if( onload ) onload( outlet )
								if( callback ) callback( params )
								return outlet
							})
					}, params)
				}
			}else{
				cache[ key ] = outlet.querySelector( selector )
			}
		})
	}
}
