import React, { useState, useEffect, useRef } from 'react'
import './typing.scss'

const TypingConsole = props => {
    const
        myRef = useRef(null),
        { data } = props,
        [show, setShow] = useState(false),
        [typing, setTyping] = useState(false),
        [currentTyping, setCurrentTyping] = useState(''),
        _scrollElement = targetElement => {
            const
                { offsetParent, offsetTop, offsetHeight } = targetElement

            if (offsetParent && offsetTop !== 0) {
                const
                    parent = offsetParent,
                    PARENT_HEIGHT = parent.offsetHeight,
                    CHILDREN_OFFSET = offsetTop + offsetHeight,
                    SCROLLABLE_RANGE = CHILDREN_OFFSET - PARENT_HEIGHT

                if (SCROLLABLE_RANGE > 0) {
                    parent.scroll({ left: 0, top: SCROLLABLE_RANGE, behavior: 'smooth' })
                }

            }
        },
        _processWait = () => {
            setTimeout(() => {
                setShow(true)
                _scrollElement(myRef.current)
                setTimeout(() => { data.callback() }, data.delayNext)
            }, data.executionTime)
        },
        _processTyping = () => {
            const
                TYPING_TXT = data.returnElement.childrenElements.childrens[0],
                CHARACTERS = TYPING_TXT.length,
                DELAY = CHARACTERS ? parseInt((data.executionTime - 300) / CHARACTERS) : 0,
                updateCurrentTyping = CURRENT_TYPING => {
                    setTimeout(() => {
                        const
                            CURRENT_LENGHT = CURRENT_TYPING.length,
                            UPDATE_TEXT = `${CURRENT_TYPING}${TYPING_TXT.substr(CURRENT_LENGHT, 1)}`

                        _scrollElement(myRef.current)
                        setCurrentTyping(UPDATE_TEXT)

                        if (CURRENT_LENGHT < CHARACTERS)
                            updateCurrentTyping(UPDATE_TEXT)

                    }, DELAY)
                }

            updateCurrentTyping(currentTyping)
            setShow(true)
            setTyping(true)
            setTimeout(() => {
                setTyping(false)
                setTimeout(() => { data.callback() }, data.delayNext)
            }, data.executionTime)
        },
        _renderElements = () => {
            const
                dataElement = data.returnElement,
                elements = dataElement.childrenElements.childrens.map((paragraph, key) => {
                    const
                        CHILDREN_ELEMENT = dataElement.childrenElements.childrenElement

                    return paragraph.content && paragraph.content[0]
                        ? CHILDREN_ELEMENT && CHILDREN_ELEMENT.trim()
                            ? React.createElement(CHILDREN_ELEMENT.trim(), { key: key }, paragraph.content[0].value)
                            : paragraph.content[0].value
                        : paragraph
                }),
                PARENT_ELEMENT = dataElement.parentElement

            return PARENT_ELEMENT && PARENT_ELEMENT.trim()
                ? React.createElement(
                    PARENT_ELEMENT.trim(),
                    { className: `${typing ? 'typicalWrapper' : ''} ${show ? 'active' : ''}`, ref: myRef },
                    typing
                        ? currentTyping
                        : elements)
                : <>{elements}</>
        }

    useEffect(() => {
        switch (data.executionType) {
            case 'typing':
                _processTyping()
                break

            case 'waitShow':
            default:
                _processWait()
                break
        }
    }, [data.executionType])

    
    return _renderElements()
}

export default TypingConsole