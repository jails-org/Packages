# store

A simple unidirectional store for data persistency, it's a simplification of [Redux](http://redux.js.org/) pattern.

## Usage

### Using it with coupled actions

#### mystore.js

```js
import store from 'jails.packages/store'

let myStore

export default myStore = store({
	name :'Clark Kent',
	age  :33
})

myStore.actions({

	CHANGE_NAME( state, {name} ){
		return {
			name
		}
	}
})

```

#### application.js
```js
import myStore from './mystore'

//Bla bla bla code....

myStore.subscribe((state, { action, oldstate, payload })=>{
	console.log( 'The action dispatched was', action )
	console.log( 'All the state', state )
	console.log( 'IF you need the old state', oldstate )
	console.log( 'Payload used :', payload )
})

myStore.dispatch('CHANGE_NAME', {
	name :'Eduardo Ottaviani'
})
```

---

### Using it directly without actions

#### application.js

```js
import store from 'jails.packages/store'

let myStore = store({
	name :'Clark Kent',
	age  :33
})

myStore.subscribe((state, { action, oldstate })=>{
	console.log( 'The action dispatched was', action )
	console.log( 'All the state', state )
	console.log( 'IF you need the old state', oldstate )
})

myStore.set( state =>{
	state.name = 'Eduardo Ottaviani'
	//No need to return the entired state.
})

//After .set() call, the callback of .subscribe will be called.
```
