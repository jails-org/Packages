# spa

A module for building SPA applications using `Jails`.
---

The `spa` package uses the amazing `Pjax` library to fetch the next page content and update the current page without having to refresh the entire page.

## Usage

You need to specify your 3 required dynamic contents in your application:
- **data-outlet** : Should be used on the holder where the new content will be replaced.
- **data-stylesheet** : Should be used in your `<link>` element.
- **data-script** : Should be used in your page `<script>` element.

--- 

```html
<!-- ... -->
<link rel="stylesheet" href="home.css" data-stylesheet />
<script async src="home.js" data-script></script>
<!-- ... -->
<body>
    <div data-outlet>
        <h1>Hello World!, I'm at home!</h1>
    </div>
</body>
<!-- ... -->
```

```js
import jails from 'jails-js'
import SPA   from 'jails.packages/spa'

jails
    .use(spa({ cacheBust :false }))
    .start() 
```

More about options references please check out [Pjax](https://github.com/MoOx/pjax).

---

## Page Transition
In addition to those pjax options, you can also specify a `transition` before the `outlet` element update.

```js
jails
    .use(spa({ 
        cacheBust :false,
        transition(outlet, next){
            // do something here
            // then update content calling next()
            next()
        }
    }))
    .start() 
```
---
