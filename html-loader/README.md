# html-loader
Loads your html files and assets dynamically

`html-loader` is a lazy html page loader, specially useful in Single Page Applications.

## Input
- The `html`, `css`, `js` files path.

## Output
- A promise with script, css and html `DOMElement`'s.
- Loads `Javascript` and `Css` automatically
- The `html`, `css` and `js` files are cached and loaded only once


## Usage / Example

```js
import HtmlLoader from 'html-loader'
import Grapnel from 'grapnel' // Router

const router = new Grapnel()
const outlet = document.querySelector('[data-outlet]')

router.get('/:page', req =>{

    let page = req.params.page

    HtmlLoader({
        templateUrl :`templates/${page}/index.htm`,
        css :`dist/${page}/index.css`,
        js  :`dist/${page}/index.js`
    }).then( response =>{

        // Response contains html node, js and css. Also it tells you whenever the content is being loaded or if it just changed
        // response : { data :{ html, js, css }, state :'load' }

        outlet.innerHTML = ''
        outlet.appendChild( response.data.html )

        if( response.state == 'loaded' )
            console.log('It is loaded \o/')

        if( response.state == 'changed' )
            console.log('It just changed! No need to load assets again...')
    })
})
```

### state
The state will be `loaded` when assets are loaded for the very first time, and `changed` when `HtmlLoader` is called again for the same `templateUrl`.

### key
You can set a custom key to be used as primary key instead of the default `templateUrl`.

```js
router.get('/my/long/url/home', req =>{
    HtmlLoader({
        key :'home',
        templateUrl :`templates/home/index.htm`,
        css :`dist/home/index.css`,
        js  :`dist/home/index.js`
    })
})

router.get('/my/other/long/url/home', req =>{
    HtmlLoader({
        key :'home',
        templateUrl :`templates/home/index.htm`,
        css :`dist/home/index.css`,
        js  :`dist/home/index.js`
    })
})

```

In the example below, we just tell to `HtmlLoader` that the primary key for cached items is `home` so it will download all files once.

# Dependencies
In order to keep development manageable I'm using `Promises A+`. If your browser do not support it you can use a polyfill to address that issue.
I recommend the [promise-polyfill](https://github.com/taylorhakes/promise-polyfill).
