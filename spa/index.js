import jails  from 'jails-js'

let   outlet
const pages   = {}
const head 	  = document.head

export default ( path, config )=>{
	outlet  = document.querySelector('[data-outlet]')
	config.transition = config.transition || append
	load( path, config )
}

const load = (page, config) =>{

	if( pages[ page ] ){
		config.transition(getdata('change', page))
	}else{
		config.transition(getdata('loading', page))
		fetch( config.templateUrl )
			.then( save(page) )
			.then( loadassets(page, config) )
	}
}

const getdata = (state, page, callback)=>{
	let obj = { content:pages[page], page, pages, state, outlet }
	return Object.assign(obj, {
		append(){
			append(obj)
			if( callback ) callback()
		}
	})
}

const save = ( page )=>{
	return html => {
		const content = document.createElement('div')
		content.innerHTML = html
		pages[ page ] = content.firstChild
		return html
	}
}

const loadassets = ( page, config )=>{
	return html =>{
		if( config.css )
			head.appendChild(createElement('link', {rel:'stylesheet', href: config.css}))
		if( config.js )
			getScript(config.js, onscriptloaded(page, config))
		else
			onscriptloaded(page, config).call()
	}
}

const onscriptloaded = ( page, config )=>{
	return ()=>{
		config.transition(getdata('loaded', page, ()=>jails.start( outlet )))
	}
}

const append = ( data )=>{

	switch( data.state ){
		case 'loading' :
			outlet.classList.add('loading')
			break
		case 'loaded' :
		case 'change' :
			outlet.classList.remove('loading')
			outlet.innerHTML = ''
			outlet.appendChild( data.content )
			break
	}
}

const createElement = (tag, attrs)=>{
	let elm = document.createElement(tag)
	Object.keys(attrs).forEach( name => elm.setAttribute(name, attrs[name]))
	return elm
}

const getScript = (src, onload)=>{
	let script = createElement('script', {src})
	script.onload = onload
	document.head.appendChild( script )
}

const fetch = (url)=>{

	const DONE = 4
	const OK = 200

	let xhr = new XMLHttpRequest()
	let promise = {}
	let success = [], failures = []

	xhr.open('GET', url)
	xhr.send(null)

	promise.then = ( fn )=>{
		success.push( fn )
		return promise
	}

	promise.fail = ( fn )=>{
		failures.push( fn )
		return promise
	}

	xhr.onreadystatechange = () =>{
		if (xhr.readyState === DONE) {
			if (xhr.status === OK){
				let data = xhr.responseText
				success.forEach( fn => data = fn(data) )
			}
		} else {
			failures.forEach( fn => fn(xhr.status) )
		}
	}

	return promise
}
