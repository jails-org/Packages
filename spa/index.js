import loader from '../assets-loader'
import arch from '../arch'

const pjax = loader({ js: '//cdn.jsdelivr.net/npm/pjax@0.2.6/pjax.min.js' })

export default (config = {}) => (jails) => {

	const pageLoadUrl = location.href
	const outlet = document.querySelector('[data-outlet]')
	const cache = { [pageLoadUrl]: { outlet } }

	let url = pageLoadUrl

	const start = () => {
		const fullConfig = Object.assign({}, config, extendedPjax)
		jails.pjax = new Pjax(fullConfig)
		jails.events.on(document, 'pjax:send', (e) => {
			if(e.triggerElement)
				url = e.triggerElement.href
			else 
				url = location.href
		})
	}

	const extendedPjax = {

		selectors: ['head title', 'head meta', '[data-stylesheet]', '[data-script]', '[data-outlet]'],

		switches: {
			'[data-outlet]'(oldel, newel, options) {
				if (url in cache) {
					if (config.transition) {
						config.transition(oldel, () => {
							oldel.parentNode.replaceChild(cache[url].outlet, oldel)
							this.onSwitch()
						})
					} else {
						oldel.parentNode.replaceChild(cache[url].outlet, oldel)
						this.onSwitch()
					}
				} else {
					cache[url] = { outlet: newel }
					if (config.transition) {
						config.transition(oldel, () => {
							oldel.parentNode.replaceChild(newel, oldel)
							this.onSwitch()
						})
					} else {
						oldel.parentNode.replaceChild(newel, oldel)
						this.onSwitch()
					}
				}
			},
			'[data-script]'(oldel, newel) {
				loader({ js: newel.src })
					.then(({ js }) => {
						js.setAttribute('data-script', true)
						oldel.parentNode.replaceChild(js, oldel)
						jails.extends(arch()).start()
						this.onSwitch()
					})
			},
			'[data-stylesheet]'(oldel, newel) {
				newel.onload = () => {
					oldel.parentNode.removeChild(oldel)
					this.onSwitch()
				}
				oldel.parentNode.appendChild(newel)
			}
		}
	}

	pjax
		.then(start)
		.catch((err) => {
			console.error('Jails.pjax.error', err)
		})

}