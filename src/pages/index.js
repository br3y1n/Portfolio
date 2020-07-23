import React from "react"
//import { graphql } from "gatsby"
import Layout from '../layout'

const LoaderPage = ({ data }) => {
  return <Layout/>
}
/*

export const query = graphql`
    query {
      terminalLoaderEN: contentfulTerminalLoader(node_locale: {eq: "en-US"}){
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
      terminalLoaderES: contentfulTerminalLoader(node_locale: {eq: "es"}) {
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
    }`*/

export default LoaderPage



