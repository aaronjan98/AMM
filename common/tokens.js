const { ethers } = require('hardhat')

const tokens = n => {
  return ethers.utils.parseEther(n.toString())
}

const ether = tokens

const wait = seconds => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = { tokens, ether, wait }
