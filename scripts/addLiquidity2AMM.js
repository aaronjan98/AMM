const config = require('../src/config.json')
const { tokens, ether, shares } = require('../common/tokens.js')

async function main() {
  console.log(`Fetching accounts & network \n`)

  // Fetch accounts
  const accounts = await ethers.getSigners()
  const deployer = accounts[0]

  // Fetch network
  const { chainId } = await ethers.provider.getNetwork()
  console.log(`Fetching token and transferring to accounts...\n`)

  // Fetch Le Token
  const le = await ethers.getContractAt('Token', config[chainId].le.address)
  console.log(`Le Token fetched: ${le.address}\n`)

  // Fetch USD Token
  const usd = await ethers.getContractAt('Token', config[chainId].usd.address)
  console.log(`USD Token fetched: ${usd.address}\n`)

  /****** Adding Liquidity ******/

  let amount = tokens(100)

  console.log(`Fetching AMM...\n`)

  // Fetch AMM
  const amm = await ethers.getContractAt('AMM', config[chainId].amm.address)
  console.log(`AMM fetched: ${amm.address}\n`)

  // Approve tokens for depositing
  transaction = await le.connect(deployer).approve(amm.address, amount)
  await transaction.wait()

  transaction = await usd.connect(deployer).approve(amm.address, amount)
  await transaction.wait()

  // Deployer adds liquidity
  console.log(`Adding liquidity...\n`)
  transaction = await amm.connect(deployer).addLiquidity(amount, amount)
  await transaction.wait()

  console.log(`Finished.\n`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
