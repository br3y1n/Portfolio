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



    //componentWillUnmount() { this.props.hideTerminal() }
    _changeState = state => {
        this.setState({ [state]: true })
        console.log(this.state)
        /*const
            sequence = {
                0: {
                    delay: 1000,
                    state: 'startIntro'
                },
                1: {
                    delay: 200,
                    state: 'startPath'
                },
                2: {
                    delay: 1000,
                    state: 'startCommand'
                },
                3: {
                    delay: 200,
                    state: 'startUserTexT'
                },
                4: {
                    delay: 1000,
                    state: 'startUser'
                },
                5: {
                    delay: 200,
                    state: 'startPasswordText'
                },
                6:
                {
                    delay: 1000,
                    state: 'startPassword'
                },
                7: {
                    delay: 200,
                    state: 'startExecutionText'
                }
            },
            currentSequence = sequence[idx]

        if (currentSequence)
            setTimeout(() => {
                this.setState({ [currentSequence.state]: true })
                this._chainSequence(idx + 1)
            }, currentSequence.delay)*/
    }

    /* componentDidMount() {
         this._chainSequence(0)
     }*/

    render() {

        const
            { terminalLoader, language, className } = this.props,
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
                                    executionTime: 500,
                                    delayNext: 200,
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
                                        delayNext: 200,
                                        executionType: 'waitShow',
                                        callback: () => { console.log('termino') }
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
            logoText
            logoImage {
                sizes {
                    src
                }
            }
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
            logoText
            logoImage {
                sizes {
                    src
                }
            }
        }
    }`}
    render={data => <Terminal terminalLoader={data} {...props} />}
/>
)