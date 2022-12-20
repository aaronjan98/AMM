const { expect } = require('chai')
const { ethers } = require('hardhat')
const { tokens } = require('../common/tokens.js')

describe('AMM', () => {
  let accounts, deployer, liquidityProvider

  let token1, token2, amm

  beforeEach(async () => {
    // Setup Accounts
    accounts = await ethers.getSigners()
    deployer = accounts[0]
    liquidityProvider = accounts[1]

    // Deploy Token
    const Token = await ethers.getContractFactory('Token')
    token1 = await Token.deploy('Jan Token', 'JAN', '1000000')
    token2 = await Token.deploy('USD Token', 'USD', '1000000')

    // Send tokens to liquidity provider
    let transaction = await token1
      .connect(deployer)
      .transfer(liquidityProvider.address, tokens(100000))
    await transaction.wait()

    transaction = await token2
      .connect(deployer)
      .transfer(liquidityProvider.address, tokens(100000))
    await transaction.wait()

    // Deploy AMM
    const AMM = await ethers.getContractFactory('AMM')
    amm = await AMM.deploy(token1.address, token2.address)
  })

  describe('Deployment', async () => {
    it('has an address', async () => {
      expect(await amm.address).to.not.equal(0x0)
    })

    it('tracks token1 address', async () => {
      expect(await amm.token1()).to.equal(token1.address)
    })

    it('tracks token2 address', async () => {
      expect(await amm.token2()).to.equal(token2.address)
    })
  })

  describe('Swapping tokens', () => {
    let amount, transaction, result

    it('facilitates swaps', async () => {
      // Deployer approves 100k tokens
      amount = tokens(100000)
      transaction = await token1.connect(deployer).approve(amm.address, amount)
      await transaction.wait()

      transaction = await token2.connect(deployer).approve(amm.address, amount)
      await transaction.wait()

      // Deployer adds liquidity
      transaction = await amm.connect(deployer).addLiquidity(amount, amount)
      await transaction.wait()

      // Check AMM receives tokens
      expect(await token1.balanceOf(amm.address)).to.equal(amount)
      expect(await token2.balanceOf(amm.address)).to.equal(amount)

      // Check amount deposited into pool
      expect(await amm.token1Balance()).to.equal(amount)
      expect(await amm.token2Balance()).to.equal(amount)
      // TODO: write test to check for K

      //
    })
  })
})
