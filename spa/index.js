import { registerApplication, start } from 'single-spa'

let firstload = true
const cache = {}

export default ({ start: bootstrap, routes, transition }) => {

    routes.forEach(({ name, module, template, path }) => {
        registerApplication(
            name,
            () => Promise.all([module(), template()])
                .then(([m, T]) => T)
                .then(renderPage(name, transition, bootstrap)),
            path
        )
    })

    start()
}

// @Render Function
const renderPage = (page, transition, bootstrap) => (template) => ({

    bootstrap: () => Promise.resolve(),
    unmount: () => Promise.resolve(),
    mount: () => {

        const outlet = document.querySelector('[data-outlet]')

        if (firstload) {
            return Promise.resolve()
                .then(_ => firstload = false)
                .then(_ => cache[page] = outlet)
                .then(_ => bootstrap())
        }

        if (page in cache) {
            transition
                ? transition(outlet, cache[page], () => outlet.parentNode.replaceChild(cache[page], outlet))
                : outlet.parentNode.replaceChild(cache[page], outlet)
            return Promise.resolve()
        }

        return Promise.resolve()
            .then(_ => {
                const html = document.createElement('html')
                html.innerHTML = template
                const newoutlet = html.querySelector('[data-outlet]')
                return Promise.resolve()
                    .then(_ => transition ? transition(outlet, newoutlet, () => outlet.parentNode.replaceChild(newoutlet, outlet)) : outlet.parentNode.replaceChild(newoutlet, outlet))
                    .then(_ => cache[page] = newoutlet)
            })
    }
})
