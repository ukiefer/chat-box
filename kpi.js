/**
 * @module kpi
 *
 * @author Uwe Kiefer <uwe.kiefer.dev@gmail.com>
 */

 class Kpi {
    constructor(el, obj = {}) {
        this.el = el
        this.options = obj
        this.elValue = this.el.querySelector('[data-js-atom="value"]')

        this.intersection = this.intersection.bind(this)
    }
 
    initialize() {
        this.setupValue()

        const observer = new IntersectionObserver(this.intersection)
        observer.observe(this.elValue)
        
        console.log('initialized module kpi', this.el)
    }

    setupValue() {
        const newValue = []
        const value = this.elValue.innerText
        for (const char of value) {
            if (char >= '0' && char <= '9') {
                newValue.push(`<span class="kpi__v" data-v="${char}"><span>${char}</span></span>`)
            } else {
                newValue.push(char)
            }
        }
        this.elValue.innerHTML = `<span aria-hidden="true">${newValue.join('')}</span>`
    }

    intersection(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim')
            } else {
                entry.target.classList.remove('anim')
            }
            
        })
    }
 }
 
 // Returns the constructor
 export default Kpi
 