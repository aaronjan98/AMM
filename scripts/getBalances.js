const config = require('../src/config.json')

async function main() {
  let accounts, deployer, investor1, investor2, investor3, investor4
  let account, deployerBalance

  // Create the accounts
  accounts = await ethers.getSigners()
  deployer = accounts[0]
  investor1 = accounts[1]
  investor2 = accounts[2]
  investor3 = accounts[3]
  investor4 = accounts[4]

  // print all users balances
  console.log('₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪ Ether token balances ₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪')
  for (let i = 0; i < accounts.length; i++) {
    account = accounts[i].address
    deployerBalance = await ethers.provider.getBalance(account)
    console.log(
      `${i}: ${account} ${await ethers.utils.formatEther(
        deployerBalance.toString()
      )}`
    )
  }

  // Fetch network
  const { chainId } = await ethers.provider.getNetwork()

  // Fetch deployed contracts
  // Le Token
  const le = await ethers.getContractAt('Token', config[chainId].le.address)

  // USD Token
  const usd = await ethers.getContractAt('Token', config[chainId].usd.address)

  // print all users' Le token balances
  console.log('₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪ Le token balances ₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪')
  for (let i = 0; i < accounts.length; i++) {
    account = accounts[i].address
    const tokenBalance = await le.balanceOf(ethers.utils.getAddress(account))
    console.log(
      `${i}: ${account} ${await ethers.utils.formatEther(
        tokenBalance.toString()
      )}`
    )
  }

  // print all users' USD token balances
  console.log('₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪ USD token balances ₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪')
  for (let i = 0; i < accounts.length; i++) {
    account = accounts[i].address
    const tokenBalance = await usd.balanceOf(ethers.utils.getAddress(account))
    console.log(
      `${i}: ${account} ${await ethers.utils.formatEther(
        tokenBalance.toString()
      )}`
    )
  }

  // print all contracts addresses
  console.log('₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪ Contract Addresses ₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪')
  console.log(`Le Token address: ${le.address}`)
  console.log(`USD Token address: ${usd.address}`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
