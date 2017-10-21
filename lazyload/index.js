export default f_import => base => {

	let once = true

	return () => {

		if( once )
			f_import().then( module => {
				module.default( base )
				base.__initialize( base )
				once = false
			})
	}
}
