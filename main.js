import ChatBox from './chat-box.js'


window.$$ = {
    log: (...args) => {
        if (typeof (console) !== 'undefined' && (window._devmode || window.location.hostname.endsWith('.site'))) {
            console.log(...args)
        }
    },
    qs: (selector, source = document) => {
        return source.querySelector(selector)
    },
    qsa: (selector, source = document) => {
        return [...source.querySelectorAll(selector)]
    },
    isTouch: () => {
        return ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0)
    },
    canHover: () => {
        return window.matchMedia('(hover: hover) and (pointer: fine)').matches
    },
    createElement: (html) => {
        const container = document.createElement('div')
        container.innerHTML = html
        return container.firstElementChild
    },
    insertAfter: (newNode, existingNode) => {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
    },
    getCookie: (name) => {
        const value = `; ${decodeURIComponent(document.cookie)}`
        const parts = value.split(`; ${name}=`)

        if (parts.length === 2) {
            try {
                return JSON.parse(parts.pop().split(';').shift())
            } catch (e) {
            }
        }
    },
    getBreakpoint: () => {
        const style = getComputedStyle(document.documentElement)
        return style.fontFamily
    },
    isBreakpoint: (type) => {
        const style = getComputedStyle(document.documentElement)
        return style.fontFamily === type
    },
    setSessionStorage: (key, val) => {
        sessionStorage.setItem(key, typeof val === 'object' ? JSON.stringify(val) : val)
    },
    getSessionStorage: (key) => {
        let val = sessionStorage.getItem(key)
        try {
            val = JSON.parse(val)
        } catch (e) {
        }
        return val
    },
    removeSessionStorage: (key) => {
        sessionStorage.removeItem(key)
    },
    setLocalStorage: (key, val) => {
        localStorage.setItem(key, typeof val === 'object' ? JSON.stringify(val) : val)
    },
    getLocalStorage: (key) => {
        let val = localStorage.getItem(key)
        try {
            val = JSON.parse(val)
        } catch (e) {
        }
        return val
    },
    removeLocalStorage: (key) => {
        localStorage.removeItem(key)
    },
    getUrlParameter: (param, search = '') => {
        const searchParams = new URLSearchParams(search || window.location.search)
        if (!searchParams.has(param)) {
            return false
        }
        return searchParams.get(param) * 1 || searchParams.get(param)
    },
    scrollTo: (top = 0, left = 0, behavior = 'smooth') => {
        window.scrollTo({
            top: top,
            left: left,
            behavior: behavior
        })
    },
    debounce: (func, delay = 300) => {
        let timer = null
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    },
    throttle: (func, delay = 300) => {
        let timer = null
        return (...args) => {
            if (timer === null) {
                func(...args)
                timer = setTimeout(() => {
                    timer = null
                }, delay)
            }
        }
    }
}


const chatBox = new ChatBox($$.qs('chat-box'))
chatBox.initialize()

let pos = false
const btn = $$.qs('chat-box > button:nth-child(1)')
const btnSelect = $$.qs('chat-box > button:nth-child(2)')
btn.onclick = () => {
    pos = !pos
    chatBox.insertBubble(pos, '<p class="foo">Weit hinten, hinter den Wortbergen, <strong>fern der Länder Vokalien</strong> <u>und</u> Konsonantien leben die Blindtexte. Abgeschieden wohnen sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans.</p>')
}
btnSelect.onclick = () => {
    chatBox.insertBubbleSelect(false, [
        {
            text: 'Option 1',
            nextStep: 1
        },
        {
            text: 'Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien.',
            nextStep: 2
        },
        {
            text: 's ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen.',
            nextStep: 3
        },
        {
            text: 'Option 4',
            nextStep: 4
        }
    ], 30)
}