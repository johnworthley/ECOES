import React from 'react';
import { RouteComponentProps } from "react-router-dom"
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
import "./some.css";
import { requestScatterIdentity } from "./store/actions"


const theme = createMuiTheme({
    palette: {
      primary: {main: lightGreen[100] },
      secondary: {
        main: lightGreen[500],
      },
    },
  });

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
};

function ButtonAppBar(props) {
  const { classes } = this.props;
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
          <Button variant="contained" color="primary" onClick={this.doSignIn} className={classes.button}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
          </MuiThemeProvider>
  );
}
/*
//scatter wallet integration
function activateScatter (){
    ScatterJS.scatter.connect('ECOES').then(connected => {
  
      // If the user does not have Scatter or it is Locked or Closed this will return false;
      if(!connected) return false;
  
      const scatter = ScatterJS.scatter;
  
      // Now we need to get an identity from the user.
      // We're also going to require an account that is connected to the network we're using.
      const requiredFields = { accounts:[network] };
      scatter.getIdentity(requiredFields).then(() => {
      const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
      console.log(account.name);

      });
    });
}
*/

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onLogin: PropTypes.object.isRequired,
};

const doSignIn = async () => {
    const { dispatchRequestScatterIdentity } = this.props
    const res = await dispatchRequestScatterIdentity()
  }

const mapStateToProps = (state) => {
    return {
        scatter: state.scatter,
        identity: state.identity,
        };
  };
  
const mapDispatchToProps = (dispatch) => {
    return {
        dispatchRequestScatterIdentity: requestScatterIdentity,
    };
};

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles)(ButtonAppBar));
