export default ( {html, css, js} )=>{

	const promises = []

	if( css )
		promises.push( style( css ) )
	if( js )
		promises.push( script( js ) )
	if( html )
		promises.push( template( html ) )

	return Promise.all( promises )
		.then( data => {
			const [ css, js, html ] = data
			return { html, css, js }
		})
}

const template = url => {
	return new Promise( (resolve, reject) => {
		if( url ){
			let xhr = new XMLHttpRequest()
			xhr.onreadystatechange = () => {
				if( xhr.readyState == 4 )
					if( xhr.status == 200) resolve( xhr.responseText )
					else reject( xhr )
			}
			xhr.open('get', url)
			xhr.send(null)
		}
	})
}

const script = js => {
	return new Promise(( resolve, reject )=>{
		let s = document.createElement('script')
		s.onload = ()=> resolve( s )
		s.src = js
		document.head.appendChild( s )
	})
}

const style = css => {
	return new Promise(( resolve, reject )=>{
		const link = document.createElement('link')
		link.rel = 'stylesheet'
		link.href = css
		document.head.appendChild( link )
		resolve( link )
	})
}
