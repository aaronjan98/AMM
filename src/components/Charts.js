import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ethers } from 'ethers'

import Loading from './Loading'

import { loadAllSwaps } from '../store/interactions'

const Charts = () => {
  const provider = useSelector(state => state.provider.connection)

  const tokens = useSelector(state => state.tokens.contracts)
  const symbols = useSelector(state => state.tokens.symbols)

  const amm = useSelector(state => state.amm.contract)

  useEffect(() => {
    if (provider && amm) {
      loadAllSwaps(provider, amm)
    }
  }, [provider, amm])

  return <div>Charts</div>
}

export default Charts
