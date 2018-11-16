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
import { connect } from "react-redux";
import { setIdentity, disableWriter, setSigner,loadNetworks, loadAccount } from './sagas/actions';

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
    
    getIdentity = () => {
        this.props.getIdentity()
    }

    forgetIdentity = () => {
      this.props.forgetIdentity()
    }

    render(){
    const {classes, identity} = this.props;
  
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
            {identity ? (
          <Typography variant="h6" color="inherit" className={classes.menuRight}>
          {'Welcome '+ identity + '  '}
          </Typography>
          ) : (
            <Typography variant="h6" color="inherit" className={classes.menuRight}>
            {''}
            </Typography>
          )}
          {identity ? (
            <Button variant="contained" color="primary"
              className="classes.button"
              onClick={this.onLogout}
            >
            Logout</Button>
          ) : (
              <Button variant="contained" color="primary"
              className="classes.button"
              onClick={this.onLogin}
             >
            Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
    </MuiThemeProvider>
  );
}
}


const mapStateToProps = (state) => {
    return {
      identity: state.identity
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: () => dispatch(setIdentity()),
        onLogout: () => dispatch(disableWriter()),
    };
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles)(ButtonAppBar))