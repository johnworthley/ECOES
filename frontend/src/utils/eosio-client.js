import { Api, JsonRpc, JsSignatureProvider } from 'eosjs2'
import ScatterJS from "scatterjs-core"
import ScatterEOS from "scatterjs-plugin-eosjs2"
import Eos from "eosjs"
import * as Values from '../constants/Values'



const endpoint = "https://user-api.eoseoul.io:443"; // Jungle


const network = {
	blockchain: "eos",
	protocol: "https",
	host: "user-api.eoseoul.io",
	port: 443,
	chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
};


export default class EOSIOClient {
  constructor (contractAccount) {
    this.contractAccount = contractAccount;
    console.log('contractAccount is '+contractAccount)

		// Don't forget to tell ScatterJS which plugins you are using.
		ScatterJS.plugins(new ScatterEOS());

		// Can implement this into Redux using dispatch(setScatter(ScatterJS.scatter));
		try {
			ScatterJS.scatter.connect(this.contractAccount).then(connected => {
				// User does not have Scatter Desktop, Mobile or Classic installed.
				if (!connected) return console.log("Issue Connecting");

				const scatter = ScatterJS.scatter;

				const requiredFields = {
					accounts: [network]
				};
				scatter.getIdentity(requiredFields).then(() => {
					// Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
					// the user for their account name beforehand. They could still give you a different account.
					this.account = scatter.identity.accounts.find(
						x => x.blockchain === "eos"
					);

					// Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
          const rpc = new JsonRpc(endpoint)

          console.log('rpc is '+rpc)

          this.eos = scatter.eos(network, Api, { rpc });
          
          //this.eos = ScatterJS.scatter.eos(network, Eos);
          //this.eos = this.scatter.eos(Values.NETWORK, Eos, Values.CONFIG)


				});

				window.ScatterJS = null;
			});
		} catch (error) {
			console.log(error);
		}
	}

  transaction = (actor, action, data) => {
    return this.eos.transact({
      actions: [
        {
          account: this.contractAccount,
          name: action,
          authorization: [
            {
              actor,
              permission: 'active'
            }
          ],
          data: {
            ...data
          }
        }
      ]
    }, {
      blocksBehind: 3,
      expireSeconds: 30
    })
  }
}
