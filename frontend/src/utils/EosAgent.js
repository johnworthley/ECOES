import Eos from 'eosjs'
import * as Values from '../constants/Values'

const singleton = Symbol()
const singletonEosAgent = Symbol()

const ENDPOINT = Values.NETWORK.protocol + '://' + Values.NETWORK.host + ':' + Values.NETWORK.port

console.log(ENDPOINT)

class EosAgent {
  constructor(eosAgent) {
    if (eosAgent !== singletonEosAgent) {
      throw new Error('Cannot construct singleton')
    }

    this.scatter = null
    this._initialized = false
    this.identity = null
    this.scatterAccount = null

  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new EosAgent(singletonEosAgent)
    }

    return this[singleton]
  }

  initScatter = scatter => {
    this.scatter = scatter
    console.log('initializing')
    this._initialized = true
  }

  isInitScatter = () => {
    return this._initialized
  }

  initEosAgent = id => {
    if (id) {
      this.scatter.useIdentity(id)
      const loginAccount = this.scatter.identity.accounts.find(
        acc => acc.blockchain === Values.NETWORK.blockchain
      )
      this.scatterAccount = loginAccount
      this.identity = id
      this.eos = this.scatter.eos(Values.NETWORK, Eos, Values.CONFIG)
      return true
    }
  }

  initEosAgent = id => {
    if (id) {
      this.scatter.useIdentity(id)
      const loginAccount = this.scatter.identity.accounts.find(
        acc => acc.blockchain === Values.NETWORK.blockchain
      )
      this.scatterAccount = loginAccount
      this.identity = id
      this.eos = this.scatter.eos(Values.NETWORK, Eos, Values.CONFIG)
      return true
    }
  }

  loginWithScatter = async () => {
    if (!this.scatter) {
      return false
    }
    console.log('loginWithScatter')
    let id = await this.scatter.getIdentity(Values.requiredFields)

    return this.initEosAgent(id)
  }

  logout = async () => {
    if (!this.scatter) {
      return
    }

    let res = await this.scatter.forgetIdentity()
    this._initialized = false
    this.identity = null
    this.loginAccount = null
    this.eos = Eos({
      httpEndpoint: ENDPOINT,
      chainId: Values.NETWORK.chainId
    })
  }

  getScatterAccount = () => {
    return this.scatterAccount
  }

  getBlock = async blockNum => {
    if (!this.eos) {
      return
    }

    return await this.eos.getBlock(blockNum)
  }

  getInfo = async () => {
    return this.eos.getInfo({})
  }

  /**
   * query = {
      json: true,
      code: 'code',
      scope: 'scope',
      table: 'table name'
    }
   */
  getTableRows = async query => {
    if (!this.eos) {
      return
    }

    return await this.eos.getTableRows(query)
  }

  getAccount = async accountName => {
    if (!this.eos) {
      return
    }

    return await this.eos.getAccount({ account_name: accountName })
  }

  getKeyAccounts = async publicKey => {
    if (!this.eos) {
      return
    }

    return await this.eos.getKeyAccounts({ public_key: publicKey })
  }

  getCurrencyBalance = async query => {
    if (!this.eos) {
      return
    }

    return await this.eos.getCurrencyBalance(query)
  }

  getCurrencyStats = async query => {
    if (!this.eos) {
      return
    }

    return await this.eos.getCurrencyStats(query)
  }

  getActions = async (account_name, pos, offset) => {
    if (!this.eos) {
      return
    }

    return await this.eos.getActions({
      account_name,
      pos,
      offset
    })
  }

  /**
   * isProxy :
   * 1 : proxy
   * 0 : unproxy
   */
  regproxy = async (accountName, isProxy) => {
    if (!this.eos) {
      return
    }

    return await this.eos.regproxy({
      proxy: accountName,
      isproxy: isProxy
    })
  }

  voteProducer = async (account, producers = [], proxy = '') => {
    if (!this.eos) {
      return
    }

    return await this.eos.voteproducer(account, proxy, producers)
  }

  refund = async owner => {
    if (!this.eos) {
      return
    }

    return await this.eos.refund({
      owner
    })
  }

  createTransaction = async cb => {
    if (!this.eos) {
      return
    }

    return await this.eos.transaction(cb)
    
  }

  transaction = async ( actor, action, data, id) =>{
    if (id) {
      this.scatter.useIdentity(id)
      const loginAccount = this.scatter.identity.accounts.find(
        acc => acc.blockchain === Values.NETWORK.blockchain
      )
      this.scatterAccount = loginAccount
      this.identity = id
      this.eos = this.scatter.eos(Values.NETWORK, Eos, Values.CONFIG)
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

  createTransactionWithContract = async (contract, cb) => {
    if (!this.eos) {
      return
    }

    return await this.eos.transaction(contract, cb)
  }

  signData = (data, pubKey) => {
    if (!this.scatter || !data || !pubKey) return null

    return this.scatter.getArbitrarySignature(pubKey, data, '', false)
  }
}

export default EosAgent.instance