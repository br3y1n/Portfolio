import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useStaticQuery, graphql } from "gatsby"
import ParticleText from '../particleText'
import "./loader.scss"

const Loader = props => {
    const
        terminalLoader = useStaticQuery(graphql`query {
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
        }`),
        language = useSelector(({ language }) => language),
        { className, hideLoader } = props,
        { logoText, logoImage: { localFile: { publicURL } } } = terminalLoader[language],
        [showText, setShowText] = useState(false),
        [showLogo, setShowLogo] = useState(false),
        [finish, setFinish] = useState(false)

    useEffect(() => {
        if (className.includes('active') && !showText && !finish) {
            setShowText(true)
            setTimeout(() => {
                setShowLogo(true)
                setTimeout(() => {
                    setFinish(true)
                    setTimeout(() => { hideLoader() }, 500)
                }, 2000)
            }, 800)
        }
    }, [className])


    return (
        <div className={className}>
            <div className="logo-text">
                {showText && <ParticleText finish={finish} text={logoText} height={350} ratio={0.65} lineRange={40} />}
            </div>
            <div className="logo-image">
                <img className={showLogo && !finish ? 'active' : ''} src={publicURL}></img>
            </div>
        </div>
    )
}

export default Loader