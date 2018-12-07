import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './utils/registerServiceWorker'
import './assets/styles/core.css'
import { Provider } from 'mobx-react'
import eosAgent from './EosAgent'
import accountStore from './store/accountStore';
import eosioStore from './store/eosioStore'
import noticeStore from './store/noticeStore'
import { IntlProvider, addLocaleData } from 'react-intl'
import initLocale, { getUserLocale } from 'react-intl-locale'
import en from 'react-intl/locale-data/en'
import ko from 'react-intl/locale-data/ko'
import locale from './locales/locale'

import * as Utils from './utils/Utils'
import * as Values from './constants/Values'

initLocale('en-US', Values.supportLanguage.slice())
addLocaleData([...en, ...ko])

const lang = Utils.getJsonFromUrl().ln

let i18nLang

if (lang) {
  i18nLang = lang.split('-')[0]
  localStorage.setItem('locale', lang)
} else {
  const savedLocale = localStorage.getItem('locale')

  if (savedLocale) {
    i18nLang = savedLocale.split('-')[0]
  } else {
    const userLocale = getUserLocale()
    i18nLang = userLocale.split('-')[0]
  }
}

const stores = {
  accountStore,
  eosioStore,
  noticeStore
}

document.addEventListener('scatterLoaded', async scatterExtension => {

  if (window.scatter) {
    console.log('window.scatter exists')
    eosAgent.initScatter(window.scatter)
    console.log('window.scatter is... ')
    console.log(window.scatter)

    if (window.scatter.identity) {
      //eosAgent.initEosAgent(window.scatter.identity)
      console.log('awaiting window.scatter.identity')
      await accountStore.login()
    }
  }
})

ReactDOM.render(
  <Provider {...stores}>
      <IntlProvider key={i18nLang} locale={i18nLang} messages={locale[i18nLang]}>
        <App />
    </IntlProvider>
  </Provider>, 
document.getElementById('root'))
registerServiceWorker()