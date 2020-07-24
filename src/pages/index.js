import React, { Component } from "react"
import Layout from '../layouts'
import Terminal from '../components/terminal'
import Loader from '../components/loader'
import { navigate } from "gatsby"
import "./loaderPage.scss"

class LoaderPage extends Component {
  state = {
    showTerminal: true,
    showLoader: false
  }

  _hideTerminal = () => {
    this.setState({ showTerminal: false })
  }

  _hideLoader = () => {
    navigate('/home')
  }

  render() {
    const
      terminal = {
        showTerminal: this.state.showTerminal,
        hideTerminal: this._hideTerminal
      },
      loader = {
        showLoader: this.state.showLoader,
        hideLoader: this._hideLoader
      }

    return (
      <Layout notShowHeader>
        <LoaderContent terminal={terminal} loader={loader} />
      </Layout >
    )
  }
}


export const LoaderContent = props => {
  return (
    <div className="loader-page">
      {<Terminal
        className={`terminal ${props.terminal.showTerminal ? 'active' : ''}`}
        hideTerminal={props.terminal.hideTerminal}
        language={props.language}
      />}

      {<Loader
        className={`loader ${props.loader.showLoader ? 'active' : ''}`}
        hideLoader={props.loader.hideLoader}
        language={props.language}
      />}
    </div>
  )
}

export default LoaderPage



