# spa

A module for building SPA applications using `Jails`.

`Dependencies` : [htmlLoader](https://github.com/Javiani/html-loader), [Grapnel](https://github.com/baseprime/grapnel)

---

- It lazy loads html, css, js content accordingly to url routes.
- Caches content loaded.
- Export an interface for callbacks and routing definitions.

## Usage

```js
import jails from 'jails-js'
import SPA   from 'jails.packages/spa'

SPA({

    routes( router ){
        // Optional routes definition.
        // Redirecting to a default route
        router.get('', ()=>router.navigate('/home') )
    },

    load( page ){
        //Define where htmlLoader should get all assets
        //{templateURL} is required
        return {
            templateUrl :`templates/${page}/index.htm`,
            css :`dist/${page}.css`,
            js  :`dist/${page}.js`
        }
    },

    callback( {page, state, outlet} ){

        if( state == 'loaded')
            jails.start( outlet )
            //Jails .start will start all lazy loaded components.
    }
})
```

#### load( page )
Gets the `/:page/` from url and expect an object returning `templateUrl` for `.html` files (required) and `js`, `css` files which are optional.

#### callback( { page, state, outlet })
It's called after outlet is rendered with the new content.

##### `page`
The visited page

##### `state`
Possible states : loaded | changed
- Loaded for the very first time
- Changed for visiting the same page already cached.

##### `outlet`
Should be a `htmlElement` with `[data-outlet]` on it.

#### update( response )
Overrides the outlet appendChild default behavior. You have to get the outlet and append data for your own.
