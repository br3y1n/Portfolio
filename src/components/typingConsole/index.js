import React, { Component } from "react"
import './typing.scss'

class TypingConsole extends Component {

    state = {
        show: false,
        typing: false,
        currentTyping: ''
    }

    componentDidMount() {
        switch (this.props.data.executionType) {
            case 'typing':
                this._processTyping()
                break

            case 'waitShow':
            default:
                this._processWait()
                break
        }
    }

    _processWait = () => {
        setTimeout(() => {
            this.setState({ show: true })
            setTimeout(() => { this.props.data.callback() }, this.props.data.delayNext)
        }, this.props.data.executionTime)
    }

    _processTyping = () => {
        const
            TYPING_TXT = this.props.data.returnElement.childrenElements.childrens[0],
            CHARACTERS = TYPING_TXT.length,
            DELAY = CHARACTERS ? parseInt((this.props.data.executionTime - 300) / CHARACTERS) : 0,
            updateCurrentTyping = () => {
                setTimeout(() => {
                    this.setState(prevState => {
                        const
                            CURRENT_TXT = prevState.currentTyping,
                            CURRENT_LENGHT = CURRENT_TXT.length,
                            UPDATE_TEXT = `${CURRENT_TXT}${TYPING_TXT.substr(CURRENT_LENGHT, 1)}`

                        if (CURRENT_LENGHT < CHARACTERS)
                            updateCurrentTyping()

                        return { currentTyping: UPDATE_TEXT }
                    })
                }, DELAY)
            }

        updateCurrentTyping()
        this.setState({ show: true, typing: true })
        setTimeout(() => {
            this.setState({ typing: false })
            setTimeout(() => { this.props.data.callback() }, this.props.data.delayNext)
        }, this.props.data.executionTime)
    }

    _renderElements = () => {
        const
            data = this.props.data.returnElement,
            elements = data.childrenElements.childrens.map((paragraph, key) => {
                const
                    CHILDREN_ELEMENT = data.childrenElements.childrenElement

                return paragraph.content && paragraph.content[0]
                    ? CHILDREN_ELEMENT && CHILDREN_ELEMENT.trim()
                        ? React.createElement(CHILDREN_ELEMENT.trim(), { key: key }, paragraph.content[0].value)
                        : paragraph.content[0].value
                    : paragraph
            }),
            PARENT_ELEMENT = data.parentElement

        return PARENT_ELEMENT && PARENT_ELEMENT.trim()
            ? React.createElement(
                PARENT_ELEMENT.trim(),
                { className: `${this.state.typing ? 'typicalWrapper' : ''} ${this.state.show ? 'active' : ''}` },
                this.state.typing
                    ? this.state.currentTyping
                    : elements)
            : <>{elements}</>
    }

    render() {
        return this._renderElements()
    }

}

export default TypingConsole