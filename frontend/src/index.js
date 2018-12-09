import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './utils/registerServiceWorker'
import './assets/styles/core.css'
import { Provider } from 'mobx-react'
import eosAgent from './utils/EosAgent'
import accountStore from './store/accountStore'

const stores = {
  accountStore
}

document.addEventListener('scatterLoaded', async scatterExtension => {

  if (window.scatter) {
    eosAgent.initScatter(window.scatter)

    if (window.scatter.identity) {
      await accountStore.login()
    }
  }
})

ReactDOM.render(
  <Provider {...stores}>
        <App />
  </Provider>, 
document.getElementById('root'))
registerServiceWorker()