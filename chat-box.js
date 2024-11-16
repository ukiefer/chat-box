/**
 * @module chat-box
 *
 * @author Uwe Kiefer <uwe.kiefer.dev@gmail.com>
 */

 class ChatBox {
    constructor(el, obj = {}) {
        this.el = el
        this.options = obj

        this.elChat = $$.qs('.chat-box', this.el)
        this.elOuter = this.elChat.parentElement
        this.step = 0
    }

    // static values
    static get SPEED() { return 60 }
    static get STEPS() { return '111001111011011011100110' }

 
    initialize() {
        this.addEvents()
        console.log('initialized module chat-box', this.el)
    }

    addEvents() {
        this.elChat.addEventListener('click', ({target}) => {
            if (target.dataset.next) {
                this.onSelect(target)
            }
        })
    }

    addSpans(text) {
        let index = 0
        let newText = ''
        const regex = /<[^>]*>/g
        const match = text.match(regex)
        const split = text.split(regex)

        if (split.length > 1) {
            split.shift()
        }
        split.forEach((t) => {
            const newPart = []
            const part = t.split(' ')
            part.forEach((word) => {
                if (word.trim() !== '') {
                    newPart.push(`<span class="h">${word}</span>`)
                } else {
                    newPart.push(word)
                }
            })
            newText += match ? match[index] : ''
            newText += newPart.join(' ')
            index += 1
        })
        return newText
    }

    hideOption(option) {
        option.style.maxHeight = `${option.clientHeight}px`
        option.classList.add('fade-out')
        option.addEventListener('transitionend', () => {
            option.remove()
        }, {once: true})
        setTimeout(() => {
            option.classList.add('go')
        }, 1)
    }

    insertBubble(position, text, speed = ChatBox.SPEED) {
        this.elChat.append($$.createElement(`
            <div class="chat-box__message ${position ? 'left' : 'right'}">
                ${this.addSpans(text)}
            </div>`
        ))
        this.showItems(speed)
    }

    insertBubbleSelect(position, options, speed = ChatBox.SPEED) {
        let o = ''
        options.forEach((option) => {
            o += `
                <div class="chat-box__option h">
                    <div class="chat-box__option-inner">
                        <button data-next="${option.nextStep}">${this.addSpans(option.text)}</button>
                    </div>
                </div>
            `
        })
        this.elChat.append($$.createElement(`
            <div class="chat-box__select ${position ? 'left' : 'right'}">
                ${o}
            </div>`
        ))

        this.showItems(speed)
    }

    nextIntervalStep() {
        this.step += 1
        if (this.step >= 24) {
            this.step = 0
        }
        return ChatBox.STEPS[this.step] === '1'
    }

    onSelect(target) {
        target.setAttribute('disabled', '')
        const option = target.closest('.chat-box__option')
        const siblings = [...option.parentNode.children].filter(node => node != option)
        const interval = setInterval(() => {
            if (siblings.length) {
                this.hideOption(siblings.shift())
            } else {
                clearInterval(interval)
                //TODO trigger next step
            }
        }, ChatBox.SPEED)
    }

    showItems(speed) {
        console.log('speed', speed)
        const items = $$.qsa('.h', this.elChat)
        const length = items.length
        let i = 0
        const interval = setInterval(() => {
            if (this.nextIntervalStep()) {
                items[i].classList.remove('h')
                this.scrollToBottom()
                i += 1
                if (i >= length) {
                    clearInterval(interval)
                }
            }
        }, speed)
    }

    scrollToBottom() {
        this.elOuter.scrollTo({
            top: this.elChat.scrollHeight,
            left: 0,
            behavior: 'smooth'
        })
    }
 }
 
 // Returns the constructor
 export default ChatBox
 