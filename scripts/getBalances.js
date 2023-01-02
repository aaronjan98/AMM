const config = require('../src/config.json')

async function main() {
  let accounts, deployer, investor1, investor2, investor3, investor4

  // Create the accounts
  accounts = await ethers.getSigners()
  deployer = accounts[0]
  investor1 = accounts[1]
  investor2 = accounts[2]
  investor3 = accounts[3]
  investor4 = accounts[4]

  // print all users balances
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
  // console.log(`Le Token fetched: ${le.address}\n`)

  // USD Token
  const usd = await ethers.getContractAt('Token', config[chainId].usd.address)
  // console.log(`USD Token fetched: ${usd.address}\n`)

  console.log('♥ ´¨`•.¸¸.♫│▌▌▌│▌▌│▌▌▌│▌▌│▌▌▌♫´¨`*•.¸¸♥')

  // print all users' Le token balances
  for (let i = 0; i < accounts.length; i++) {
    account = accounts[i].address
    const tokenBalance = await le.balanceOf(ethers.utils.getAddress(account))
    console.log(
      `${i}: ${account} ${await ethers.utils.formatEther(
        tokenBalance.toString()
      )}`
    )
  }

  console.log('₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
