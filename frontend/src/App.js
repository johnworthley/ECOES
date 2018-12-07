import React, { Component } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { LayoutRoute, MainLayout } from './components/Market/Layout'
import { Home } from './pages'


class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <LayoutRoute exact path="/" layout={Home} component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App