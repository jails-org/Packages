# router

Grapnel, the smallest Javascript router with named parameters.

- Information & Docs : [Grapnel](https://github.com/baseprime/grapnel)

## Usage

### Component
```js
import jails from 'jails'
import Router from 'jails.packages/router'

jails('my-component', ( {init:main} ) => {

    const router = new Router()

    main(()=>[
        routes
    ])

    const routes = () => {
        // http://localhost:3000/#/home
        // http://localhost:3000/#/about
        router.get('/', log('home'))
        router.get('/about', log('about'))
    }

    const log = (page) => () => {
        console.log(`The page is: ${page}`)
    }
})

jails.start()
```
