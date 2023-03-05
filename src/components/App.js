import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

// Components
import Navigation from './Navigation'
import Tabs from './Tabs'
import Swap from './Swap'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import Charts from './Charts'
import NotificationBanner from './NotificationBanner'

import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens,
  loadAMM,
} from '../store/interactions'

function App() {
  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = await loadProvider()

    // Fetch current network's chainId
    const chainId = await loadNetwork(provider)

    // Reload page when network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })

    // Fetch current account from Metamask when changed
    window.ethereum.on('accountsChanged', async () => {
      await loadAccount()
    })

    // Initiate Contracts
    await loadTokens(provider, chainId)
    await loadAMM(provider, chainId)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <Container>
      <NotificationBanner />

      <HashRouter>
        <Navigation />

        <hr />

        <Tabs />

        <Routes>
          <Route exact path="/" element={<Swap />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </HashRouter>
    </Container>
  )
}

export default App
