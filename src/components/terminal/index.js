import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useStaticQuery, graphql } from "gatsby"
import TypingConsole from "../typingConsole"
import "./terminal.scss"

const Terminal = props => {
    const
        terminalLoader = useStaticQuery(graphql`query {
            EN: contentfulTerminalLoader(node_locale: {eq: "en-US"}){
                title
                intro {
                    content {
                        content {
                            value
                        }
                    }
                }
                path
                command
                userText
                passwordText
                user
                password
                executionText
            }
            ES: contentfulTerminalLoader(node_locale: {eq: "es"}) {
                title
                intro {
                    content {
                        content {
                            value
                        }
                    }
                }
                path
                command
                userText
                passwordText
                user
                password
                executionText
            }
        }`),
        [starts, updateStarts] = useState({
            startIntro: true,
            startPath: false,
            startCommand: false,
            startUserTexT: false,
            startUser: false,
            startPasswordText: false,
            startPassword: false,
            startExecutionText: false
        }),
        language = useSelector(({ language }) => language),
        { hideTerminal, className } = props,
        { title, command, intro, path, userText, passwordText, user, password, executionText } = terminalLoader[language]

    const _changeState = useCallback(state => {
        updateStarts({ ...starts, [state]: true })
    }, [starts])

    return (
        <div className={className}>
            <div className="terminal-header"><p>{title}</p></div>
            <div className="terminal-content">
                <div className="terminal-legal">

                    {starts.startIntro &&
                        <TypingConsole
                            data={{
                                returnElement: {
                                    parentElement: 'p',
                                    childrenElements: {
                                        childrens: intro.content,
                                        childrenElement: 'span'
                                    },
                                },
                                executionTime: 600,
                                delayNext: 50,
                                executionType: 'waitShow',
                                callback: _changeState.bind(undefined, 'startPath')
                            }}
                        />
                    }

                </div>
                <div className="terminal-code">

                    <p>
                        {starts.startPath &&
                            <TypingConsole
                                data={{
                                    returnElement: {
                                        parentElement: 'span',
                                        childrenElements: {
                                            childrens: [path]
                                        },
                                    },
                                    executionTime: 50,
                                    delayNext: 50,
                                    executionType: 'waitShow',
                                    callback: _changeState.bind(undefined, 'startCommand')
                                }}
                            />
                        }

                        {starts.startCommand &&
                            <TypingConsole
                                data={{
                                    returnElement: {
                                        parentElement: 'span',
                                        childrenElements: {
                                            childrens: [command]
                                        },
                                    },
                                    executionTime: 800,
                                    delayNext: 50,
                                    executionType: 'typing',
                                    callback: _changeState.bind(undefined, 'startUserTexT')
                                }}
                            />
                        }

                    </p>

                    <p className="ident">
                        {starts.startUserTexT &&
                            <TypingConsole
                                data={{
                                    returnElement: {
                                        parentElement: 'span',
                                        childrenElements: {
                                            childrens: [userText]
                                        },
                                    },
                                    executionTime: 50,
                                    delayNext: 50,
                                    executionType: 'waitShow',
                                    callback: _changeState.bind(undefined, 'startUser')
                                }}
                            />
                        }

                        {starts.startUser &&
                            <TypingConsole
                                data={{
                                    returnElement: {
                                        parentElement: 'span',
                                        childrenElements: {
                                            childrens: [user]
                                        },
                                    },
                                    executionTime: 300,
                                    delayNext: 50,
                                    executionType: 'typing',
                                    callback: _changeState.bind(undefined, 'startPasswordText')
                                }}
                            />
                        }
                    </p>

                    <p className="ident">
                        {starts.startPasswordText &&
                            <TypingConsole
                                data={{
                                    returnElement: {
                                        parentElement: 'span',
                                        childrenElements: {
                                            childrens: [passwordText]
                                        },
                                    },
                                    executionTime: 50,
                                    delayNext: 50,
                                    executionType: 'waitShow',
                                    callback: _changeState.bind(undefined, 'startPassword')
                                }}
                            />
                        }

                        {starts.startPassword &&
                            <TypingConsole
                                data={{
                                    returnElement: {
                                        parentElement: 'span',
                                        childrenElements: {
                                            childrens: [password]
                                        },
                                    },
                                    executionTime: 300,
                                    delayNext: 50,
                                    executionType: 'typing',
                                    callback: _changeState.bind(undefined, 'startExecutionText')
                                }}
                            />
                        }
                    </p>

                    <p>
                        {starts.startExecutionText &&
                            <TypingConsole
                                data={{
                                    returnElement: {
                                        parentElement: 'span',
                                        childrenElements: {
                                            childrens: [executionText]
                                        },
                                    },
                                    executionTime: 100,
                                    delayNext: 200,
                                    executionType: 'waitShow',
                                    callback: hideTerminal
                                }}
                            />
                        }
                    </p>

                </div>

            </div>
        </div>
    )

}

export default Terminal