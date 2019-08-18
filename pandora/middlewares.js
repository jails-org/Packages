export const log = (name) => (store) => {

    if ( process && process.env.NODE_ENV !== 'production' ) {

        console.groupCollapsed(`${name} / INITIAL STATE`)
        console.log('+ state', store.getState())
        console.groupEnd()

        store.subscribe((state, { action, payload }) => {
            const newstate = JSON.parse(JSON.stringify(state))
            console.groupCollapsed(`${name} / ACTION => ${action || 'SET'}`)
            console.log('+ payload', payload)
            console.log('+ state', newstate)
            console.groupEnd()
        })
    }

    return store
}

