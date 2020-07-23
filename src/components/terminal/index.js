import React from "react"
import { graphql, useStaticQuery } from "gatsby"

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
        }`),
        { title, command } = terminalLoader[props.language]

    //console.log(terminalLoader[props.language])

    return (
        <div>
            <h1>{title}</h1>
            <h2>{command}</h2>
        </div>
    )
}


export default Terminal