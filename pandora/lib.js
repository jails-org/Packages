
export default ({ 

    model = {}, 
    actions = {}, 
    middlewares = [],
    autostart = true,
    callback

}) => {
    
    const calls = []
    let subscribers = []
    let SST = JSON.parse(JSON.stringify(model))

    const nextTick = (typeof window !== 'undefined' && window.document && window.document.createElement)
        ? (requestAnimationFrame || setTimeout)
        : (fn) => fn()

    // @Setters
    const setActions = (newlist) => {
        actions = newlist
    }

    const set = lambda => {
        lambda(SST)
        subscribers.forEach(subscriber => subscriber(SST, { haschanged: true }))
    }

    // @Getters
    const getState = () => {
        return Object.assign({}, SST)
    }

    const getActions = () => {
        return actions
    }

    const subscribe = ( fnOrObject ) => {
        if( !fnOrObject ) return 
        if (fnOrObject.call) {
            fnOrObject.ref = fnOrObject
            subscribers.push(fnOrObject)
            fnOrObject(Object.assign({}, SST), {action:null, payload:null, haschanged:true})
        } else {
            Object.keys(fnOrObject).forEach( action => {
                const handler = fnOrObject[action]
                const fn = (state, options) => {
                    if (options.action in fnOrObject)
                        fnOrObject[options.action](state, options)
                }
                fn.ref = handler
                subscribers.push(fn)
                fn( Object.assign({}, SST), {action, payload:null, haschanged :true} )
            })
        }
    }

    const unsubscribe = (fn) => {
        subscribers = subscribers.filter( subscriber => subscriber.ref != fn )
    }

    const dispatch = (action, payload) => {
        return new Promise(resolve => {
            calls.push({ action, payload })
            if (calls.length == 1) {
                nextTick(() => {
                    while (calls.length)
                        _dispatch(calls[0].action, calls[0].payload, resolve)
                })
            }
        })
    }

    const _dispatch = (action, payload, resolve) => {
        
        let haschanged = false

        if (action in actions) {
            const newstate = Object.assign({}, SST)
            const result = actions[action](newstate, payload, api)
            if (result) {
                SST = Object.assign(SST, result)
                haschanged = true
            }
        }

        calls.shift()

        if (!calls.length) {
            const params = { action, payload, haschanged }
            subscribers.forEach(subscriber => subscriber(SST, params))
            resolve(SST, params)
        }
    }
    
    //@Api 
    const api = { set, getState, dispatch, subscribe, unsubscribe, getActions, setActions }

    //@Hooks for render functions
    if( callback ){
        subscribe((state, options) => options.haschanged ? callback(state, options) : null)
        autostart ? callback(SST) : null
    }

    //@Middlewares
    middlewares.forEach(middleware => middleware(api))

    // @Exposing api
    return api
}
