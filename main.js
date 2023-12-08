import Kpi from './kpi.js'

// get all kpis
for (const $el of [].concat(...document.querySelectorAll('.kpi'))) {
    const module = new Kpi($el)
    module.initialize()
}