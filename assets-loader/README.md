# assets-loader
Loads your html, css or js files and assets dynamically

`assets-loader` is a lazy html page loader, specially useful in Single Page Applications.

## Input
- The `html`, `css`, `js` files path.

## Output
- A promise with script, css and html `DOMElement`'s.
- Loads `Javascript` and `Css` automatically


## Usage / Example

```js
import loader from 'jails.packages/assets-loader'
import Grapnel from 'grapnel' // Router

const router = new Grapnel()
const outlet = document.querySelector('[data-outlet]')

router.get('/:page', req =>{

    let page = req.params.page

    loader({
        html :`templates/${page}/index.htm`,
        css :`dist/${page}/index.css`,
        js  :`dist/${page}/index.js`
    }).then( response =>{
        //response.html, response.js, response.css
        outlet.innerHTML = ''
        outlet.appendChild( response.html )
    })
})
```

# Dependencies
In order to keep development manageable I'm using `Promises A+`. If your browser do not support it you can use a polyfill to address that issue.
I recommend the [promise-polyfill](https://github.com/taylorhakes/promise-polyfill).
