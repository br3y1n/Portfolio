import React from "react"
import "./header.scss"
import { useStaticQuery, graphql, Link } from "gatsby"

const Header = props => {
    const
        querys = useStaticQuery(graphql`query {
            ES: allContentfulItemMenu(filter: {node_locale: {eq: "es"}}) {
                edges {
                    node {
                        id
                        itemTarget
                        itemName
                        itemMethod
                        position
                    }
                }
            }
            EN: allContentfulItemMenu(filter: {node_locale: {eq: "en-US"}}) {
                edges {
                    node {
                        id
                        itemTarget
                        itemName
                        itemMethod
                        position
                    }
                }
            }
            downloadES: allContentfulDownload(filter: {node_locale: {eq: "es"}}) {
                edges {
                    node {
                        target
                        fileName
                        file {
                            localFile {
                                publicURL
                            }
                        }
                    }
                }
            }
            downloadEN: allContentfulDownload(filter: {node_locale: {eq: "en-US"}}) {
                edges {
                    node {
                        target
                        fileName
                        file {
                            localFile {
                                publicURL
                            }
                        }
                    }
                }
            }
        }`),
        { edges: itemsMenu } = querys[props.language],
        { edges: downloads } = querys[`download${props.language}`],
        _evaluateLink = link => {
            const
                { id, itemName, itemTarget, itemMethod } = link.node,
                findFile = target => downloads.filter(file => file.node.target === target)[0]

            switch (itemMethod) {
                case 'download':
                    const file = findFile(itemTarget)
                    return file
                        ? <a key={id} href={file.node.file.localFile.publicURL} download={file.node.fileName}>{itemName}</a>
                        : undefined

                case 'goPage':
                default:
                    return <Link to={`/${itemTarget}`} key={id} className={itemTarget === props.target ? 'active' : ''}>{itemName}</Link>
            }
        }

    itemsMenu.sort((itemA, itemB) => itemA.node.position - itemB.node.position)

    return (
        <header>
            <nav>
                {itemsMenu.map(_evaluateLink)}
            </nav>
        </header>
    )
}

export default Header