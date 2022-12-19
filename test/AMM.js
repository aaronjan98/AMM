const { expect } = require('chai')
const { ethers } = require('hardhat')
const { tokens } = require('../common/tokens.js')

describe('AMM', () => {
  let accounts, deployer, token1, token2, amm

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    deployer = accounts[0]

    const Token = await ethers.getContractFactory('Token')
    token1 = Token.deploy('Jan Token', 'JAN', '1000000')
    token2 = Token.deploy('USD Token', 'USD', '1000000')

    const AMM = await ethers.getContractFactory('AMM')
    amm = await AMM.deploy()
  })

  describe('Success', async () => {
    it('has an address', async () => {
      expect(await amm.address).to.not.equal(0x0)
    })
  })
})
