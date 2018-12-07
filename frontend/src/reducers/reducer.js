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


const initialState = {
    identity:false,
    open: false,
    vertical: 'top',
    horizontal: 'center',
};

const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){

        case 'getIdentity': 
            ScatterJS.scatter.connect('ECOES').then(connected => {
            
                // If the user does not have Scatter or it is Locked or Closed this will return false;
                if(!connected) return false;

                const scatter = ScatterJS.scatter;
                console.log('acquiring scatter')

                // Now we need to get an identity from the user.
                // We're also going to require an account that is connected to the network we're using.
                const requiredFields = { accounts:[network] };
                scatter.getIdentity(requiredFields).then(() => {
                    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                    console.log(account);
                    newState.identity = account.name;
                }).catch(error => {
                    // The user rejected this request, or doesn't have the appropriate requirements.
                    console.error(error);
                });
            });

                break;

        default:
    }
    return newState;
};

export default reducer;