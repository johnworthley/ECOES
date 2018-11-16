import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import RealLogo from '../assets/styles/img/logoReal.png';
import Button from '@material-ui/core/Button';
//import SvgIcon from '@material-ui/core/SvgIcon';
//import { connect } from "react-redux";
//import { setIdentity, disableWriter } from '../actions';


/*
const iconStyles = {
  marginRight: 24,
};

const ScatterIcon = props => (
  <SvgIcon {...props}>
    <path d="M88.7924335,133 C84.9771875,133 81.2742102,132.292643 77.6833905,130.877907 C74.0925708,129.463171 70.9085713,127.369394 68.1312967,124.596512 C65.3540221,121.82363 63.1378463,118.40002 61.4827028,114.325581 C59.8275593,110.251142 59,105.525996 59,100.15 C59,95.1701301 59.7013215,90.2752178 61.1039854,85.4651163 C62.5066494,80.6550147 64.4422966,76.3684297 66.9109852,72.6052326 C69.3796737,68.8420354 72.3392503,65.8003992 75.7898036,63.4802326 C79.240357,61.1600659 83.0134664,60 87.1092452,60 C90.0828927,60 92.60765,60.6083273 94.6835926,61.825 C96.7595353,63.0416727 98.4427068,64.5129759 99.7331576,66.2389535 C101.023608,67.9649311 101.963379,69.8182072 102.552498,71.7988372 C103.141617,73.7794673 103.436172,75.5337133 103.436172,77.0616279 C103.436172,78.1934165 103.141617,79.212011 102.552498,80.1174419 C101.963379,81.0228727 101.248031,81.7868186 100.406433,82.4093023 C99.5648346,83.0317861 98.6390903,83.4986419 97.6291722,83.8098837 C96.6192542,84.1211256 95.7215627,84.2484499 94.9360709,84.1918605 C94.1505791,84.135271 93.5193898,83.8523281 93.042484,83.3430233 C92.5655783,82.8337184 92.4112876,82.0697725 92.5796072,81.0511628 C92.355181,80.3155002 92.1447846,79.4100829 91.9484116,78.3348837 C91.7520387,77.2596845 91.4154044,76.2269429 90.9384986,75.2366279 C90.4615929,74.2463129 89.8023507,73.3974842 88.9607523,72.6901163 C88.1191539,71.9827484 86.9689868,71.6290698 85.5102162,71.6290698 C83.9392326,71.6290698 82.4103518,72.3788685 80.923528,73.8784884 C79.4367042,75.3781083 78.1182199,77.4294443 76.9680354,80.0325581 C75.817851,82.6356719 74.8921067,85.663161 74.1907747,89.1151163 C73.4894427,92.5670715 73.138782,96.2453293 73.138782,100.15 C73.138782,103.601955 73.5736013,106.657739 74.443253,109.317442 C75.3129046,111.977145 76.5332039,114.212394 78.1041876,116.023256 C79.6751712,117.834118 81.5406863,119.206391 83.7007888,120.140116 C85.8608913,121.073842 88.2033049,121.540698 90.7281001,121.540698 C94.0944936,121.540698 97.0260173,120.904076 99.5227591,119.630814 C102.019501,118.357552 104.137492,116.674041 105.876795,114.580233 C107.616098,112.486424 109.018741,110.137998 110.084766,107.534884 C111.15079,104.93177 111.936271,102.300401 112.44123,99.6406977 C112.833975,97.716657 113.633482,96.4292668 114.839773,95.7784884 C116.046064,95.1277099 117.28039,94.9720913 118.542787,95.3116279 C119.805185,95.6511645 120.899246,96.3726689 121.825005,97.4761628 C122.750763,98.5796567 123.129476,99.8953412 122.961157,101.423256 C122.73673,103.177528 122.329964,105.186423 121.740845,107.45 C121.151726,109.713577 120.296114,112.005415 119.173983,114.325581 C118.051852,116.645748 116.635182,118.923438 114.923932,121.158721 C113.212682,123.394003 111.122744,125.388751 108.654056,127.143023 C106.185367,128.897296 103.309949,130.31201 100.027716,131.387209 C96.7454819,132.462408 93.0004254,133 88.7924335,133 Z" />
  </SvgIcon>
);

ScatterJS.plugins( new ScatterEOS() ); // Tell ScatterJS which plugins you are using.

const network = {
  blockchain:'eos',
  protocol:'https',
  host:'nodes.get-scatter.com',
  port:443,
  chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}

const theme = createMuiTheme({
  palette: {
    primary: {main: lightGreen[100] },
    secondary: {
      main: lightGreen[500],
    },
  },
});
*/
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuRight: {
    marginLeft: '50em',
    marginRight: -320,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
});

  export class PrimarySearchAppBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };



  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle/>
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      //<MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="title" color="inherit">
            <img
          className={classes.headerImage}
          src={RealLogo}
          width="28px" height="28px"
          style={{display: 'flex', flexDirection:'row', marginRight:8}}
          alt=""
          />
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
            <Typography variant="h6" color inherit>
              {this.props.identity ? "Detach Account" : "Attach Account"}
            </Typography>
            <Button variant="contained" color="primary" onClick={'adf'} className={classes.button}>Scatter Login</Button>
            <Button variant="contained" color="primary" onClick={'afs'} className={classes.button}>Create Post</Button>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
      //</MuiThemeProvider>
    );
  }
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


const mapStateToProps = (state) => {
  return {
    age: state.age
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAgeUp: () => dispatch({ type: "AGE_UP", value: 1 }),
    //onLogout: () => dispatch({ type: "disableWriter" })
  };
};*/


PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);