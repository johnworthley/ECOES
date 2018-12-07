import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SCATTER_ERROR_LOCKED } from '../constants/Values'
import { withAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

//import { Dropdown } from 'react-bootstrap'

import * as Utils from '../utils/Utils'

const CustomSwal = withReactContent(Swal)

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuRight: {
    marginLeft: '30em',
    marginRight: 70,
  },
};


class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props)

    this.selectedLocale = localStorage.getItem('locale')
  
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      location: window.location.pathname
    }

    this.props.history.listen(async (location, action) => {
      this.setState({
        location: window.location.pathname
      })
    })
  }

  
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  
    onLoginClick = async () => {
      console.log('in onLoginClick ')
      try {
        const { accountStore } = this.props
        console.log('account store is ...')
        console.log(accountStore)
  
        const result = await accountStore.login()
        console.log('result is...')
        console.log(result)

        if (!result) {
          CustomSwal.fire({
            onOpen: () => {
              CustomSwal.clickConfirm()
            }
          }).then(() => {
            return CustomSwal.fire(<p>Please Install Scatter.</p>)
          })
        }
      } catch (e) {
        // todo - error handle
        // 423 Locked
        if (e.code === SCATTER_ERROR_LOCKED) {
          this.props.alert.show('Scatter is locked.')
        }
      }
    }

  render(){
    const { classes, accountStore } = this.props

    const theme = createMuiTheme({
        palette: {
          primary: {main: lightGreen[100] },
          secondary: {
            main: lightGreen[500],
          },
        },
      });
      
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              ECOES
            </Typography> 
            {accountStore.isLogin ? (
              <Typography variant="h6" color="inherit" className={classes.menuRight}>
                {'Welcome ' + accountStore.loginAccountInfo.account_name + '  '}
              </Typography>
            ) : (
              <Button variant="contained" color="primary"
              className="classes.button"
              onClick={this.onLoginClick}
            > 
              Login
            </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
      </MuiThemeProvider>
    );
  } 
}

/*
<Link className="ripple" to="/" style={{ color: 'white' }}>
  <Button variant="contained" color="primary"
    className="classes.button"
    onClick={this.onLoginClick}
  > 
    Login
  </Button>
</Link>
*/


ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  withAlert(
    compose(
      inject('accountStore'),
      withStyles(styles),
      observer
    )(ButtonAppBar)
  )
)