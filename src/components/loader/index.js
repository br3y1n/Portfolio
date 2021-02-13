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
            }
            ES: contentfulTerminalLoader(node_locale: {eq: "es"}) {
                logoText
            }
        }`),
        language = useSelector(({ language }) => language),
        { className, hideLoader } = props,
        { logoText } = terminalLoader[language],
        [showText, setShowText] = useState(false),
        [showLogo, setShowLogo] = useState({ background: false, svg: false }),
        [finish, setFinish] = useState(false)

    useEffect(() => {
        if (className.includes('active') && !showText && !finish) {
            setTimeout(() => {
                setShowLogo({ background: true, svg: false })
                setTimeout(() => {
                    setShowText(true)
                    setShowLogo({ background: true, svg: true })
                    setTimeout(() => {
                        // setFinish(true)
                        // setTimeout(() => { hideLoader() }, 100)
                    }, 1500)
                }, 600)
            }, 1)
        }
    }, [className, showText, finish, hideLoader])


    return (
        <div className={className}>
            <div className="logo-image">
                <div className={`logoContainer ${showLogo.background && !finish ? 'active' : ''}`}>
                    <div className="backBackground"></div>
                    <div className={`middleBackground ${showLogo.background ? 'rotate' : ''}`}></div>
                    <div className={`frontBackground ${showLogo.background ? 'rotate' : ''}`} ></div>
                </div>
                <div className={`svgContainer ${showLogo.svg && !finish ? 'active' : ''}`}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m94.88 145.28c4.81 0 9.47 0.07 14.14-0.03 1.73-0.04 3.48-0.31 5.16-0.73 4.64-1.17 6.9-4.17 6.99-8.99 0.08-4.51-2.09-8.1-6.49-9.02-4.43-0.93-9.05-1-13.6-1.33-2.03-0.15-4.08-0.03-6.37-0.03v-53.06c2.48-0.36 4.86-0.54 7.17-1.08 5.76-1.34 8.64-4.44 9.23-9.61 0.55-4.8-1.45-7.99-6.98-10.86 10.74-16 21.46-31.98 32.15-47.9 31.79 11.15 38.22 63.28 5.13 86.27 2.82 1.66 5.59 3.27 8.34 4.92 15.09 9.09 22.17 22.95 23.33 40.07 0.99 14.64-1.49 28.53-10.68 40.51-9.57 12.47-22.21 19.84-37.88 21.38-9.74 0.96-19.56 1.16-29.63 1.72-0.01-17.68-0.01-34.73-0.01-52.23z" />
                        <path
                            d="m84.84 80.52v116.24h-59.44v-23.86c-5 5.45-9.33 10.16-13.66 14.88-0.16-0.12-0.33-0.25-0.49-0.37 24.27-35.69 48.53-71.37 72.8-107.06 0.26 0.05 0.52 0.11 0.79 0.17z" />
                        <path
                            d="m118.18 2.98c-23.15 34.14-46.3 68.27-69.81 102.95v-82.22c0.65-0.11 1.06-0.25 1.47-0.25 14.73 0.01 29.48-0.45 44.17 0.28 5.67 0.28 8.7-1.51 11.64-5.76 3.71-5.35 7.95-10.33 11.96-15.48 0.19 0.17 0.38 0.32 0.57 0.48z" />
                    </svg>
                </div>
            </div>
            <div className="logo-text">
                <ParticleText className={showText && !finish ? 'active' : ''} text={logoText} height={350} ratio={0.5} lineRange={60} />
            </div>
        </div >
    )
}

export default Loader