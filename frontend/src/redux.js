import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

ScatterJS.plugins( new ScatterEOS() );

// Networks are used to reference certain blockchains.
// They let you get accounts and help you build signature providers.
const network = {
    blockchain:'eos',
    protocol:'https',
    host:'nodes.get-scatter.com',
    port:443,
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}


const { createStore } = require('redux');

const initialState = {
    identity:false
};

const myReducer = (state = initialState, action) => {
    const newState = {...state};

if(action.type === 'getIdentity'){

console.log('getting identity')
newState = 'chicken'
}
return newState;

if(action.type === 'forgetIdentity'){

    console.log('forgetting identity')
    newState = 'chicken'
    }
    return newState;

}

const store = createStore(myReducer);

store.subscribe(() => {
    console.log('state changed' + JSON.stringify(store.getState()));
})

store.dispatch({type: 'getIdentity'});