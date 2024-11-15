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
        this.steps = '111001111011011011100110'
    }

    // static values
    static get SPEED() { return 60 }
    static get STEPS() { return '111001111011011011100110' }

 
    initialize() {
        console.log('initialized module chat-box', this.el)
    }

    addSpans(text) {
        let index = 0
        let newText = ''
        const regex = /<[^>]*>/g
        const match = text.match(regex)
        const split = text.split(regex)
        split.shift()
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
            newText += match[index]
            newText += newPart.join(' ')
            index += 1
        })
        return newText
    }

    insertBubble(position, text) {
        this.elChat.append($$.createElement(`
            <div class="chat-box__message ${position ? 'left' : 'right'}">
                ${this.addSpans(text)}
            </div>`
        ))
        this.showWords()
    }

    nextStep() {
        this.step += 1
        if (this.step >= 24) {
            this.step = 0
        }
        return ChatBox.STEPS[this.step] === '1'
    }

    showWords() {
        const words = $$.qsa('span.h', this.elChat)
        const length = words.length
        let i = 0
        const interval = setInterval(() => {
            if (this.nextStep()) {
                words[i].classList.remove('h')
                this.scrollToBottom()
                i += 1
                if (i >= length) {
                    clearInterval(interval)
                }
            }
            // this.step += 1
            // if (this.step >= 24) {
            //     this.step = 0
            // }
        }, ChatBox.SPEED)
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
 