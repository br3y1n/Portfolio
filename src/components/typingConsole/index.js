import React, { useState, useEffect, useRef } from 'react'
import './typing.scss'
import { chainEvents } from '../../assets/helpers/chainEvents'

const _scrollElement = targetElement => {

    const { offsetParent, offsetTop, offsetHeight } = targetElement

    if (offsetParent && offsetTop !== 0) {
        const
            parent = offsetParent,
            PARENT_HEIGHT = parent.offsetHeight,
            CHILDREN_OFFSET = offsetTop + offsetHeight,
            SCROLLABLE_RANGE = CHILDREN_OFFSET - PARENT_HEIGHT

        if (SCROLLABLE_RANGE > 0)
            parent.scroll({ left: 0, top: SCROLLABLE_RANGE, behavior: 'smooth' })
    }
}

const TypingConsole = props => {

    const
        myRef = useRef(),
        { data } = props,
        [show, setShow] = useState(false),
        [typing, setTyping] = useState(false),
        [currentTyping, setCurrentTyping] = useState('')

    const _processWait = () => {
        const { executionTime, delayNext, callback } = data

        chainEvents([
            [
                () => {
                    setShow(true)
                    _scrollElement(myRef.current)
                },
                executionTime
            ],
            [callback, delayNext]
        ])
    }


    const _processTyping = () => {

        const
            { returnElement, executionTime, callback, delayNext } = data,
            TYPING_TXT = returnElement.childrenElements.childrens[0],
            CHARACTERS = TYPING_TXT.length,
            DELAY = CHARACTERS ? parseInt((executionTime - 50) / CHARACTERS) : 0,
            updateCurrentTyping = CURRENT_TYPING => {
                setTimeout(() => {
                    const
                        CURRENT_LENGHT = CURRENT_TYPING.length,
                        UPDATE_TEXT = `${CURRENT_TYPING}${TYPING_TXT.substr(CURRENT_LENGHT, 1)}`

                    setCurrentTyping(UPDATE_TEXT)

                    if (CURRENT_LENGHT < CHARACTERS)
                        updateCurrentTyping(UPDATE_TEXT)

                }, DELAY)
            }

        updateCurrentTyping(currentTyping)
        setShow(true)
        setTyping(true)
        chainEvents([
            [
                () => {
                    setTyping(false)
                    _scrollElement(myRef.current)
                },
                executionTime
            ],
            [callback, delayNext]
        ])
    }

    const _consoleEffectStart = () => {
        switch (data.executionType) {
            case 'typing':
                _processTyping()
                break

            case 'waitShow':
            default:
                _processWait()
                break
        }
    }

    const _renderElements = () => {
        const
            dataElement = data.returnElement,
            PARENT_ELEMENT = dataElement.parentElement,
            HAS_PARENT_ELEMENT = PARENT_ELEMENT && PARENT_ELEMENT.trim(),
            elements = dataElement.childrenElements.childrens.map((paragraph, key) => {

                const
                    CHILDREN_ELEMENT = dataElement.childrenElements.childrenElement,
                    HAS_CONTENT = paragraph.content && paragraph.content[0],
                    HAS_CHILDREN_ELEMENT = CHILDREN_ELEMENT && CHILDREN_ELEMENT.trim()

                return HAS_CONTENT
                    ? HAS_CHILDREN_ELEMENT
                        ? React.createElement(CHILDREN_ELEMENT.trim(), { key: key }, paragraph.content[0].value)
                        : paragraph.content[0].value
                    : paragraph
            })


        return HAS_PARENT_ELEMENT
            ? React.createElement(
                PARENT_ELEMENT.trim(),
                { className: `${typing ? 'typicalWrapper' : ''} ${show ? 'active' : ''}`, ref: myRef },
                typing ? currentTyping : elements
            )
            : <>{elements}</>
    }


    useEffect(() => { _consoleEffectStart() }, [])


    return _renderElements()
}

export default TypingConsole