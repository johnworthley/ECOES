import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './utils/registerServiceWorker'
import './assets/styles/core.css'
import { Provider } from 'mobx-react'
import eosAgent from './utils/EosAgent'
import accountStore from './store/accountStore'
import AlertTemplate from 'react-alert-template-basic'
import { Provider as AlertProvider } from 'react-alert'

const alertOptions = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}

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
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <App />
        </AlertProvider>
  </Provider>, 
document.getElementById('root'))
registerServiceWorker()