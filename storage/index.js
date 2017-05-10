class Storage {

	constructor( object ){
		this.instance = object
	}

	set( name, data ){
		this.instance.setItem( name, JSON.stringify( data ) )
		return data
	}

	get( name ){
		let value = this.instance.getItem( name )
		// This way I can distinguish what is a string and what is an object serialized.
		try{ value = JSON.parse( value ) }
		catch(e){ /* Noop */}
		return value
	}

	remove( name ){
		let data = this.get( name )
		this.instance.removeItem( name )
		return data
	}
}

export default {
	local 	:new Storage( localStorage ),
	session :new Storage( sessionStorage )
}
