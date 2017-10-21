# lazyload

Lazyload is a module for transforming sync components to lazyloaded components

## Usage

```js
import lazyload from 'jails.packages/lazyload'

export default ( {init} ) => {

    init(()=> [
        lazyload(()=> System.import('./my-component.js')),
        register
    ])

    const register = ( {on}, loadcomponent ) => {
        on('click', {'input[name=user]': loadcomponent})
    }
}
```
