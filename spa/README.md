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

	//Required, When assets are ready before the requests
	onload  : jails.start,

	//Optional, hook for transition between pages
	transition( outlet, next ){
		// doSomething( outlet )
		// Switch outlet content then do something later
		// next().then(()=> { doSomethingAfter() })
	},

	options :{
        // Options for Grapnel, e.g:
		pushState :true
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

#### callback( { params, state, outlet })
It's called after outlet is rendered with the new content.

#### onload ( outlet, {state} )
This callback will be called only after resources are downloaded.

#### transition( outlet, next )
Like a middleware, used to do actions before and after content is changed.

---

##### `outlet`
Should be a `htmlElement` with `[data-outlet]` on it.

##### `state` : enter | end | load
