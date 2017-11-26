# spa

A module for building SPA applications using `Jails`.

`Dependencies` : [assetsLoader](https://github.com/Jails-org/Packages/assets-loader), [Grapnel](https://github.com/baseprime/grapnel)

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

	options :{
        // Options for Grapnel, e.g:
		pushState :true
	},

	// Optional callback
	callback ({outlet, req, res, router, next}){

	},

	//Required, When assets are ready before the requests
	onload  : jails.start,

	//Optional, hook for transition between pages
	transition( next, {outlet, req, res, router, next} ){
		// doSomething()
		// Switch outlet content
		// next()
		// then do something later
		// .then(()=> { doSomethingAfter() })
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
	}
})
```

You can also pull internal resources used in spa module, like Router and assetsLoader:

```js
import jails from 'jails-js'
import {Router, loader} from 'jails.packages/spa'

console.log( Router, loader )
```

---

#### onload ( outlet, {state} )
This callback will be called only after resources are downloaded.

#### transition( outlet, next )
Like a middleware, used to do actions before and after content is changed.

#### callback({router, req, res, next, outlet})
A callback called on every page change
---

##### `outlet`
Should be a `htmlElement` with `[data-outlet]` on it.

##### `state` : enter | end | load
