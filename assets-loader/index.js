export default ( {html, css, js} )=>{

	const promises = []

	promises.push( css? style( css ) : {} )
	promises.push( js? script( js ) : {} )
	promises.push( html? template( html ) : {} )

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
		s.async = true
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
		link.onload = () => resolve( link )
		document.head.appendChild( link )
	})
}
