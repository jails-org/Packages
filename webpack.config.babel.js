import path from 'path'
import glob from 'glob'
import {optimize} from 'webpack'

const uglioptions = { compress :{ warnings:false }, minimize :true }
const uglify 	  = new optimize.UglifyJsPlugin( uglioptions )
const plugins 	  = [uglify]

const loaders = [{
	loader: 'babel',
	test: /\.js$/,
	query:{
		presets:['es2015']
	}
}]

const library = (name)=>({
	plugins,
	entry 	:`./${name}/index.js`,
	externals :{ 'jails-js' :'jails-js', 'morphdom' :'morphdom', 'jails.packages/virtualdom' :'jails.packages/virtualdom' },
	module	:{ loaders },
	output  :{
		filename :`${name}/dist/index.js`,
		libraryTarget:'umd',
		library:name,
		umdNamedDefine :true
	}
})

export default glob.sync('./!(node_modules)/index.js').map( file =>{
	let name = path.basename(path.dirname(file))
	return library(name)
})
