import morphdom from 'morphdom'
import soda from 'sodajs'

export default option => jails =>{

	const component = jails.component

	jails.component = (name, node, options) =>{

		let base = component( name, node, options )

		if( node == document.body ){
			base.reactor = state => { console.warn('Reactor can`t be used on document.body') }
		}
		else{
			let template = node.querySelector('template')
			let html = node.outerHTML

			if( template )
				html = html.replace(/\<template*.\>/g, '').replace(/\<\/template\>/g, '')

			base.reactor = state => {
				let status = {}
				morphdom( node, soda(html, state), lifecycle(node, status) )
				if( status.hascomponent )
					jails.start( node )
			}
		}

		return base
	}

	const lifecycle = (root, status) => ({

		onNodeAdded: function(node) {
			if( node.getAttribute && node.getAttribute('data-component') )
				status.hascomponent = true
		},

		onBeforeNodeDiscarded: function(node) {
			if( node.getAttribute ){
				let name = node.getAttribute('data-component')
				if( name )
					jails.destroy( root, `[data-component*=${name}]`)
			}
		}
	})
}
