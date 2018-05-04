import Web3 from 'src/network/Web3Provider'
import uniqid from 'uniqid'
import bip39 from 'bip39'
import {WalletModel, WalletEntryModel} from 'src/models'

export const WALLETS_CREATE = 'wallets/create'
export const WALLETS_SELECT = 'wallets/select'
export const WALLETS_LOAD = 'wallets/load'
export const WALLETS_UPDATE = 'wallets/update'
export const WALLETS_REMOVE = 'wallets/remove'

export const walletCreate = (wallet) => (dispatch) => {
  dispatch({ type: WALLETS_CREATE, wallet })
}

export const walletSelect = (wallet) => (dispatch) => {
  dispatch({ type: WALLETS_SELECT, wallet })
}

export const walletLoad = (wallet) => (dispatch) => {
  dispatch({ type: WALLETS_LOAD, wallet })
}

export const walletUpdate = (wallet, name) => (dispatch) => {
  dispatch({ type: WALLETS_UPDATE, wallet, name })
}

export const walletRemove = (name) => (dispatch) => {
  dispatch({ type: WALLETS_REMOVE, name })
}

export const decryptWallet = (entry, password) => (dispatch) => {
  let web3 = Web3.getWeb3()

  let wallet = web3.eth.accounts.wallet.decrypt(entry.encrypted, password)

  const model = new WalletModel({
    entry,
    wallet,
  })

  dispatch(walletLoad(model))

}

export const createWallet = ({ name, password, privateKey, mnemonic, numberOfAccounts = 0 }) => (dispatch) => {
  let web3 = Web3.getWeb3()
  const wallet = web3.eth.accounts.wallet.create(numberOfAccounts)

  if (privateKey) {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    wallet.add(account)
  }

  if (mnemonic) {
    const account = web3.eth.accounts.privateKeyToAccount(`0x${bip39.mnemonicToSeedHex(mnemonic)}`)
    wallet.add(account)
  }

  const entry = new WalletEntryModel({
    key: uniqid(),
    name,
    encrypted: wallet.encrypt(password),
  })

  dispatch(walletCreate(entry))
}

export const logout = () => (dispatch) => {
  dispatch(walletSelect(null))
}