# mvc

A MVC module for building SPA applications using `Jails` in MVC pattern.

`Dependencies` : [htmlLoader](https://github.com/Javiani/html-loader), [Grapnel](https://github.com/baseprime/grapnel)

---

- It lazy loads html, css, js content accordingly to url routes.
- Caches content loaded.
- Export an interface for callbacks and routing definitions.

## Usage

```js
import jails from 'jails-js'
import MVC   from 'jails.packages/mvc'

MVC({

    routes( router ){
        // Optinal routes definition.
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

#### `state`
Possible states : loaded | changed
- Loaded for the very first time
- Changed for visiting the same page already cached.

#### `outlet`
Should be a `htmlElement` with `[data-outlet]` on it.
