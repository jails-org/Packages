const LinkQ = ( data, chain = {previous :null} ) => {

	data = data.value && data.value.apply? data.value() : data

	return {

		isroot : !chain.previous,

		get( prop ){
			if( prop.value && prop.value.apply )
				return LinkQ( data[prop.value()], {previous :LinkQ(data, chain)} )
			return LinkQ( data[prop] == undefined? { error :`property ${prop} not found`, node :data } : data[prop], {previous :LinkQ(data, chain)} )
		},

		select( ...path ){
			return path.reduce(( acc, prop ) => acc.get(prop), this )
		},

		prev(){
			if( chain.previous && chain.previous.prev ){
				if( chain.previous.isroot )
					return LinkQ( chain.previous.value() )
				return LinkQ( chain.previous.value(), {previous :chain.previous.prev() })
			}
			return LinkQ( data )
		},

		then( fn ){
			if( data && !data.error ) {
				try{ fn( data ) }
				catch( error ){ return LinkQ({error}) }
			}
			return this
		},

		otherwise( fn ){
			if( data == null || data == undefined || data.error )
				fn( data )
			return this
		},

		value(){
			return data
		},

		reset(){
			let instance = this.prev()
			let max = 50 // Avoiding infinite loop
			while( !instance.isroot || !max ){
				instance = instance.prev()
				max--
			}
			return instance
		},

		data(){
			const instance = this.reset()
			return instance.value()
		}
	}
}

export default LinkQ
