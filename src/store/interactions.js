import { ethers } from 'ethers'
import { setProvider, setNetwork, setAccount } from './reducers/provider'
import { setContracts, setSymbols } from './reducers/tokens'

import TOKEN_ABI from '../abis/Token.json'
import AMM_ABI from '../abis/AMM.json'
import config from '../config.json'

export const loadProvider = dispatch => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  dispatch(setProvider(provider))

  return provider
}

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork()
  dispatch(setNetwork(chainId))

  return chainId
}

export const loadAccount = async dispatch => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  })
  const account = ethers.utils.getAddress(accounts[0])
  dispatch(setAccount(account))

  return account
}

/******* Load Contracts *******/
export const loadTokens = async (provider, chainId, dispatch) => {
  const le = new ethers.Contract(
    config[chainId].le.address,
    TOKEN_ABI,
    provider
  )

  const usd = new ethers.Contract(
    config[chainId].usd.address,
    TOKEN_ABI,
    provider
  )

  dispatch(setContracts([le, usd]))
  dispatch(setSymbols([await le.symbol(), await usd.symbol()]))
}
