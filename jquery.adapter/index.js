// For a complete compatibitily across browsers, including IE8, please use jQuery 1.9.1
// code.jquery.com/jquery-1.9.1.min.js

export default ( $ ) =>{

	return ( jails )=>{

		jails.events = {

			on :function(el, ev, callback){

				if( callback.call ){
					let cb = handler(callback)
					callback.$handler = cb
					$(el).on(ev, cb)
				}else{
					Object.keys(callback).forEach(( selector )=>{
						let cb = handler(callback[selector])
						callback[selector].$handler = cb
						$(el).on(ev, selector, cb)
					})
				}

				function handler( cb ){
					return function(e, data){
						e.detail = data? data.detail :e.detail
						e.detail = e.detail || {}
						return cb.apply(this, [e].concat(e.detail.args))
					}
				}
			},

			off:function(el, ev, callback){
				$(el).off(ev, callback.$handler)
			},

			trigger :function(el, ev, args){
				$(el).trigger(ev, {detail:args} )
			}
		}
	}
}
