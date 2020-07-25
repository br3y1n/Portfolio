import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"
import "./terminal.scss"
import TypingConsole from "../typingConsole"

class Terminal extends Component {

    state = {
        startIntro: true,
        startPath: false,
        startCommand: false,
        startUserTexT: false,
        startUser: false,
        startPasswordText: false,
        startPassword: false,
        startExecutionText: false
    }

    _changeState = state => {
        this.setState({ [state]: true })
    }

    render() {

        const
            { terminalLoader, language, className, hideTerminal } = this.props,
            { title, command, intro, path, userText, passwordText, user, password, executionText } = terminalLoader[language]

        return (
            <div className={className}>
                <div className="terminal-header"><p>{title}</p></div>
                <div className="terminal-content">
                    <div className="terminal-legal">

                        {this.state.startIntro &&
                            <TypingConsole
                                data={{
                                    returnElement: {
                                        parentElement: 'p',
                                        childrenElements: {
                                            childrens: intro.content,
                                            childrenElement: 'span'
                                        },
                                    },
                                    executionTime: 700,
                                    delayNext: 300,
                                    executionType: 'waitShow',
                                    callback: this._changeState.bind(this, 'startPath')
                                }}
                            />
                        }

                    </div>
                    <div className="terminal-code">

                        <p>
                            {this.state.startPath &&
                                <TypingConsole
                                    data={{
                                        returnElement: {
                                            parentElement: 'span',
                                            childrenElements: {
                                                childrens: [path]
                                            },
                                        },
                                        executionTime: 100,
                                        delayNext: 200,
                                        executionType: 'waitShow',
                                        callback: this._changeState.bind(this, 'startCommand')
                                    }}
                                />
                            }

                            {this.state.startCommand &&
                                <TypingConsole
                                    data={{
                                        returnElement: {
                                            parentElement: 'span',
                                            childrenElements: {
                                                childrens: [command]
                                            },
                                        },
                                        executionTime: 1000,
                                        delayNext: 200,
                                        executionType: 'typing',
                                        callback: this._changeState.bind(this, 'startUserTexT')
                                    }}
                                />
                            }

                        </p>

                        <p className="ident">
                            {this.state.startUserTexT &&
                                <TypingConsole
                                    data={{
                                        returnElement: {
                                            parentElement: 'span',
                                            childrenElements: {
                                                childrens: [userText]
                                            },
                                        },
                                        executionTime: 100,
                                        delayNext: 200,
                                        executionType: 'waitShow',
                                        callback: this._changeState.bind(this, 'startUser')
                                    }}
                                />
                            }

                            {this.state.startUser &&
                                <TypingConsole
                                    data={{
                                        returnElement: {
                                            parentElement: 'span',
                                            childrenElements: {
                                                childrens: [user]
                                            },
                                        },
                                        executionTime: 800,
                                        delayNext: 200,
                                        executionType: 'typing',
                                        callback: this._changeState.bind(this, 'startPasswordText')
                                    }}
                                />
                            }
                        </p>

                        <p className="ident">
                            {this.state.startPasswordText &&
                                <TypingConsole
                                    data={{
                                        returnElement: {
                                            parentElement: 'span',
                                            childrenElements: {
                                                childrens: [passwordText]
                                            },
                                        },
                                        executionTime: 100,
                                        delayNext: 200,
                                        executionType: 'waitShow',
                                        callback: this._changeState.bind(this, 'startPassword')
                                    }}
                                />
                            }

                            {this.state.startPassword &&
                                <TypingConsole
                                    data={{
                                        returnElement: {
                                            parentElement: 'span',
                                            childrenElements: {
                                                childrens: [password]
                                            },
                                        },
                                        executionTime: 800,
                                        delayNext: 200,
                                        executionType: 'typing',
                                        callback: this._changeState.bind(this, 'startExecutionText')
                                    }}
                                />
                            }
                        </p>

                        <p>
                            {this.state.startExecutionText &&
                                <TypingConsole
                                    data={{
                                        returnElement: {
                                            parentElement: 'span',
                                            childrenElements: {
                                                childrens: [executionText]
                                            },
                                        },
                                        executionTime: 500,
                                        delayNext: 1200,
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
}

export default props => (<StaticQuery
    query={graphql`query {
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
    }`}
    render={data => <Terminal terminalLoader={data} {...props} />}
/>
)