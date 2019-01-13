# pandora

![pandora box](https://educationalresearchtechniques.files.wordpress.com/2016/07/11.jpg?w=200)

**A Simple, Agnostic and Isomorphic State Manager Container.**

Inspired by [Redux](https://github.com/reduxjs/redux) and [Elm Architecture](https://guide.elm-lang.org/architecture/).

It can be used for creating a **Single Source of Truth** container for your an application or as multiples local stores for you components aswell. 


- It is agnostic, meaning that is compatible with any javascript framework.
- It is isomorphic, so you can test your store instances in node environment with no *browser dependency*.


## Usage

```js
import {pandora, log} from 'jails.packages/pandora'

const model = {
    items: [],
    data : null
}

const actions = {
    
    ADD_TO_LIST :(state, {payload, action}, store) => ({
        items : state.items.concat( payload.newitem )
    }),

    FETCH :(state, {payload, action}, {dispatch}) => {
        
        fetch(payload.url)
            .then((data) => dispatch('SET_DATA', { data }))
        // Store will not fire callback function since this action don't return anything.
        // Hence, haschange will be false
        // But all subscriptions will be called
        
        // TIP: It's a good idea to return a { loading:true } on request actions.
        // So you can use this state on your view in order to give some user feedback.
    },

    SET_DATA :(state, {payload, action}, store) => ({
        data :payload.data
    })
}

const store = pandora({
    model, // Required
    actions, // Required
    middlewares :[ log('APP') ], // Optional
    autostart :true, // Optional [Boolean] default: true,
    callback :null // Optional [Function] - Callback will be called always when the state changes 
})

// Subscribes on store
store.subscribe(( state, {action, payload}) => {
    console.log('Heyy, store changed!!', state, action, payload )
})

// Dispatches some action
store.dispatch('ADD_TO_LIST', { newitem :'My first item' })
store.dispatch('FETCH')

// Changes without dispatching action - Side Effects
// It will cause an update in the store and will call all the subscribers and the callback function if there's any.
store.set( state => state.items.push('My second item') )

store.getActions() // Return all actions object registered
store.setActions({ ... }) // Replaces all actions with a new set
store.getState() // Return the current state of the store

// Subscribing to a expecific action
store.subscribe({ 
    ADD_TO_LIST : (state, {payload, action, haschanged}) => {
        console.log(state, payload, action, haschanged)
    }
})

```

## Good to know

- The `dispatch` is asynchronous, it will await for the next browser's tick in order to execute code, so if you 
need to do some dom changes after the call, use `.then` Promise interface, as dispatch returns always a promise.
- You can call multiples `dispatch` inline, the store will batch all those calls and will trigger `callback` only once.
- Subscribers, callback and actions functions get the same parameters when store changes in the following format: 
    - `Function(state, { action, payload })`. 
    - There's **one difference**, `subscribers` gets the `haschanged` flag along `action` and `payload` in order to notify subscriber that state has changed.

- Callback is just a subscriber function that will check if `haschanged` is true before calling your function, so it is wise to register your component or application's `render` function as a callback for performance optimization.
- The action's returned object will be **merged** with the current state, so you don't need to return the entire model in the action's functions


Please, check out `middlewares.js` file if you're interested in creating middlewares.