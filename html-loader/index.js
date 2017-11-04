const pages = {}

export default ( {key, templateUrl, css, js} )=>{

	let hashname = key || templateUrl

	if( hashname in pages ){
		return new Promise( (resolve, reject) =>{
			const { js, css, html } = pages[ hashname ]
			resolve({ state :'changed', data :{ js, css, html } })
		})
	}else{

		let promises = []
		promises.push( fetch({ url :templateUrl }) )

		if( css )
			promises.push( style( {url:css} ) )
		if( js )
			promises.push( script( {url:js}) )

		return Promise.all( promises )
			.then( data =>{
				let [ html, css, js ] = data
				let response = { js, css, html :parseHtml( html ) }
				pages[hashname] = response
				return { state :'loaded', data :response }
			})
	}
}

const fetch = ({ method, url })=>{
	return new Promise((resolve, reject)=>{
		if( url ){
			let xhr = new XMLHttpRequest()
			xhr.onreadystatechange = ()=>{
				if( xhr.readyState == 4 )
					if( xhr.status == 200) resolve( xhr.responseText )
					else reject( xhr )
			}
			xhr.open( method || 'get', url)
			xhr.send(null)
		}else{
			resolve( null )
		}

	})
}

const parseHtml = html =>{
	let placeholder = document.createElement('div')
	placeholder.innerHTML = html
	return placeholder
}

const script = ( {url} )=>{
	return new Promise(( resolve, reject )=>{
		let js = document.createElement('script')
		js.onload = ()=> resolve( js )
		js.src = url
		document.head.appendChild( js )
	})
}

const style = ( {url} )=>{
	return new Promise(( resolve, reject )=>{
		let css = document.createElement('link')
		css.rel = 'stylesheet'
		css.href = url
		document.head.appendChild( css )
		resolve( css )
	})
}
