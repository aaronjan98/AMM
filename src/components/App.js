import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'
import { ethers } from 'ethers'

// Components
import Navigation from './Navigation'
import Loading from './Loading'

import { loadAccount, loadProvider } from '../store/interactions'

// ABIs: Import your contract ABIs here
// import TOKEN_ABI from '../abis/Token.json'

// Config: Import your network config here
// import config from '../config.json';

function App() {
  let account = '0x0...'

  const [balance, setBalance] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = await loadProvider(dispatch)

    // Fetch accounts
    await loadAccount(dispatch)

    // Fetch account balance
    let balance = await provider.getBalance(account)
    balance = ethers.utils.formatUnits(balance, 18)
    setBalance(balance)

    setIsLoading(false)
  }

  useEffect(() => {
    if (isLoading) {
      loadBlockchainData()
    }
  }, [isLoading])

  return (
    <Container>
      <Navigation account={account} />

      <h1 className="my-4 text-center">React Hardhat Template</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <p className="text-center">
            <strong>Your ETH Balance:</strong> {balance} ETH
          </p>
          <p className="text-center">Edit App.js to add your code here.</p>
        </>
      )}
    </Container>
  )
}

export default App
