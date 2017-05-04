# spa

SPA module load assets, css, js and html asynchronously, designed for using on Single Page Applications.

## API

```js
SPA( String key, Object options )
```

It takes a unique key as first parameter and a object containing options containing assets location and an optional transition function to set up animation transitions.

A general setup for SPA applications using `router` and `spa` modules.

## Usage

```js
import jails      from 'jails-js'
import SPA        from 'jails.packages/spa'
import router     from 'jails.packages/router'

router('/:page', data =>{

	const {page} = data.params
	const {path} = data

	SPA( path, {
		//transition,   // Transition is optional
		css :`dist/${page}/index.css`,
		js  :`dist/${page}/index.js`,
		templateUrl :`templates/${page}/index.htm`
	})
})

router('*', data =>{
	router.redirect('/home')
})

router.start({ hashbang :true })

```

```html
<!-- Content will be rendered here: -->
<section data-outlet></section>
```

By visiting `/home` url, the application above will

- Load html from: `templates/home/index.htm`
- Load css  from: `dist/home/index.css`
- Load js   from: `dist/home/index.js`

** SPA only loads assets once, it always caches the assets for a unique key. **

### Transition function( state, data )

Transition callback gets the `state` of page : `change`, `loading` and `loaded`.

The second parameter `data` has references to outlet node, the previous content, the key fired on `spa` call, and a hash containing all keys and contents.
