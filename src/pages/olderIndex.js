import React, { Component } from "react"
import Layout from '../layouts'
import Terminal from '../components/terminal'
import Loader from '../components/loader'
import { navigate } from "gatsby"
import "./loaderPage.scss"

class LoaderPage extends Component {
  /*state = {
    showTerminal: false,
    showLoader: false
  }

  _hideTerminal = () => {
    this.setState({ showTerminal: false })
    setTimeout(() => { this.setState({ showLoader: true }) }, 500)
  }

  _hideLoader = () => {
    navigate('/home')
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ showTerminal: true }) }, 1)
  }*/

  render() {
    /*const
      terminal = {
        showTerminal: this.state.showTerminal,
        hideTerminal: this._hideTerminal
      },
      loader = {
        showLoader: this.state.showLoader,
        hideLoader: this._hideLoader
      }*/

    return (
     /* <Layout notShowHeader>
        <LoaderContent terminal={terminal} loader={loader} />
      </Layout >*/
      <div>Test</div>
    )
  }
}


/*export const LoaderContent = props => {
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
}*/

export default LoaderPage



