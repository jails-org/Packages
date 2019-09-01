# spa
Make your static pages a Single Page Application

>version: `1.0.0-beta`

**Remember** : Use a top level component to `preventDefault` all the links and changing browser history using pushState. Spa, will only depend on url changes in order to load the new content.

We recommend to use `jails.packages/router` for browser history navigation.

## Usage

### Markup
Choose a html element to be your `outlet` by marking it as `data-outlet` and `data-static`.

**home.html**
```html
    <body>
        <div data-outlet data-static>
            <div data-component="home">
                <h1> Hello World, I'm at HOME!!</h1>
                <a href="/about.html">Go About</a>
            </div>
        </div>
```

The outlet element need to be present in your other pages aswell, so Spa can grab that and replace the current outlet to the next.

**about.html**
```html
    <body>
        <div data-outlet data-static>
            <div data-component="about">
                <h1> Now I'm on About Page!!</h1>
                <a href="/home.html">Go Home</a>
            </div>
        </div>
```

### Entrypoint js

**index.js**
```js
import jails from 'jails'
import Router from 'jails.packages/router'
import Spa from 'jails.packages/spa'

//Register your common components here 
//import * as application from 'application'
//... jails.register('applicatoin', application )

//Then Start your SPA
Spa({
    
    start : _ => jails.start(),
    
    // OPTIONAL: Transition is a function that intercepts the outlet replace function, 
    // Use it if you want to add some transitions from one outlet to another, 
    // Adding loading state, etc.
    // Next is a function that makes the replacement
    transition: (oldoutlet, newoutlet, next) => next(),
    
    // Routes needs the js module, the html module and a path function that returns true or false,
    // so Spa will change the outlet content when it's true
	routes: [
		{
			name: 'home',
			module: _   => import('./apps/home'),
			template: _ => import('../index.pug'),
			path: _ => location.href.match('/index.html')
		},
		{
			name: 'about',
			module: _   => import('./apps/about'),
			template: _ => import('../about.pug'),
			path: _ => location.href.match('/about.html') 
		}
	]
})

```
