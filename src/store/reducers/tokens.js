import { createSlice } from '@reduxjs/toolkit'

export const tokens = createSlice({
  name: 'tokens',
  initialState: {
    contracts: [],
    symbols: [],
    balances: [0, 0],
  },
  reducers: {
    setContracts: (state, action) => {
      state.contracts = action.payload
    },
    setSymbols: (state, action) => {
      state.symbols = action.payload
    },
  },
})

export const { setContracts, setSymbols } = tokens.actions

export default tokens.reducer
