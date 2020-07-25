import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"
import ParticleText from '../particleText'
import "./loader.scss"

class Loader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showText: false,
            showLogo: false,
            finish: false
        }
    }

    componentDidUpdate() {
        if (this.props.className.includes('active') && !this.state.showText && !this.state.finish) {
            this.setState({ showText: true })

            setTimeout(() => {
                this.setState({ showLogo: true })
                setTimeout(() => {
                    this.setState({ finish: true })
                    setTimeout(() => {
                        this.props.hideLoader()
                    }, 500)
                }, 2000)
            }, 800)
        }

    }

    render() {

        const
            { terminalLoader, language, className, hideLoader } = this.props,
            { logoText, logoImage: { localFile: { publicURL } } } = terminalLoader[language]

        return (
            <div className={className}>
                <div className="logo-text">
                    {this.state.showText && <ParticleText finish={this.state.finish} text={logoText} height={350} ratio={1} lineRange={40} />}
                </div>
                <div className="logo-image">
                    <img className={this.state.showLogo && !this.state.finish ? 'active' : ''} src={publicURL}></img>
                </div>
            </div>
        )
    }
}

export default props => (<StaticQuery
    query={graphql`query {
        EN: contentfulTerminalLoader(node_locale: {eq: "en-US"}){
            logoText
            logoImage {
                localFile {
                    publicURL
                }
            }
        }
        ES: contentfulTerminalLoader(node_locale: {eq: "es"}) {
            logoText
            logoImage {
                localFile {
                    publicURL
                }
            }
        }
    }`}
    render={data => <Loader terminalLoader={data} {...props} />}
/>
)