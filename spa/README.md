# spa

A module for building SPA applications using `Jails`.

`Dependencies` : [htmlLoader](https://github.com/Javiani/html-loader), [Grapnel](https://github.com/baseprime/grapnel)

---

- It lazy loads html, css, js content accordingly to url routes.
- Caches content loaded.
- Export an interface for callbacks and routing definitions.

More about options and routing references please check out [Grapnel](https://github.com/baseprime/grapnel)

## Usage

```js
import jails from 'jails-js'
import SPA   from 'jails.packages/spa'

SPA({

	//Call jails.start when new content is loaded
	callback : jails.start,

	options :{
        // Options for Grapnel, e.g:
		// pushState :true
	},

	initialize( router ){
        // Optional routes definition.
        // Redirecting to a default route
		router.get('', ()=> router.navigate('/') )
	},

	routes :{
        //Define where loader should get all assets
		'/:page?' :( {page = 'home'} ) => ({
			templateUrl :`front/apps/${page}/index.htm`,
			css :`public/${page}/index.css`,
			js  :`public/${page}/index.js`
		})
	},

	callback( {page, state, outlet} ){
		if( state == 'loaded')
			jails.start( outlet )
            //Jails .start will start all lazy loaded components.
	}
})
```

You can also pull Router and HtmlLoader from this package doing this:

```js
import jails from 'jails-js'
import {Router, htmlLoader} from 'jails.packages/spa'

console.log( Router, htmlLoader )
```

#### callback( { params, state, outlet })
It's called after outlet is rendered with the new content.

##### `params`
The Router params

##### `state`
Possible states : loaded | changed
- Loaded for the very first time
- Changed for visiting the same page already cached.

##### `outlet`
Should be a `htmlElement` with `[data-outlet]` on it.

#### update( response )
Overrides the outlet appendChild default behavior. You have to get the outlet and append data for your own.
