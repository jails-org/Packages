/*
	Input :
		{ [name] :{ value :'my value', rules :{ required:true } } }
	Output:
		IF not valid -> { errors :{ [name] :{ required:true } } }
		ELSE -> data
*/

export default ( data, rules ) => {

	return new Promise( ( resolve, reject ) => {

		let errors = {}

		Object.keys( data ).forEach( name => {

			const item = data[ name ]

			Object.keys( item.rules || {} ).forEach( rule => {

				if( !rules[rule] )
					return console.warn(`[Validation] There is no rule => ${rule}`)

				const validation = rules[ rule ]( {
					value :item.value,
					data  :item.rules[ rule ],
					fields:data
				})

				if( !validation ){
					errors[ name ] = errors[ name ] || {}
					errors[ name ][ rule ] = {data :item}
				}
			})
		})

		return Object.keys( errors ).length ? reject( errors ) : resolve( data )
	})
}
