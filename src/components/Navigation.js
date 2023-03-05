import { useSelector } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Blockies from 'react-blockies'

import { ReactComponent as Logo } from '../assets/flower.svg'
import { ReactComponent as RightArrow } from '../assets/arrow-up-right.svg'

import { loadAccount, loadBalances } from '../store/interactions'

import config from '../config.json'
const { ethereum } = window

const Navigation = () => {
  const chainId = useSelector(state => state.provider.chainId)
  const account = useSelector(state => state.provider.account)
  const tokens = useSelector(state => state.tokens.contracts)
  const amm = useSelector(state => state.amm.contract)

  const connectHandler = async () => {
    const account = await loadAccount()
    await loadBalances(amm, tokens, account)
  }

  const networkHandler = async e => {
    try {
      // Switch to the selected network
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: e.target.value }],
      })
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: e.target.value,
                rpcUrls: ['http://127.0.0.1:9001'],
              },
            ],
          })
        } catch (error) {
          console.error("AJ's Error: failed to add chain to MetaMask", error)
        }
      } else {
        console.log(
          `AJ - ${switchError.code}: failed to switch networks `,
          switchError
        )
      }
    }
  }

  return (
    <Navbar className="my-3">
      <Logo alt="logo" className="d-inline-block align-top mx-3" />
      <Navbar.Brand style={{ color: '#0d6efd' }} href="#">
        Calyx AMM
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="nav" />
      <Navbar.Collapse className="justify-content-end">
        <a
          className="demo"
          href="https://www.loom.com/share/cbc0c5ce73a144609cc2c13816b89087"
          rel="noreferrer"
          target="_blank"
        >
          Demo
          <RightArrow />
        </a>
        <div className="d-flex justify-content-end">
          <Form.Select
            aria-label="Network Selector"
            value={config[chainId] ? `0x${chainId.toString(16)}` : `0`}
            onChange={networkHandler}
            style={{ maxWidth: '200px', marginRight: '20px' }}
            className="bisque"
          >
            <option value="0" disabled>
              Select Network
            </option>
            <option value={`0x${(31337).toString(16)}`}>Localhost 9001</option>
            <option value="0x5">Goerli</option>
          </Form.Select>

          {account ? (
            <Navbar.Text className="d-flex align-items-center">
              {account.slice(0, 5) + '...' + account.slice(38, 42)}
              <Blockies
                seed={account}
                size={10}
                scale={3}
                color="#2187D0"
                bgColor="#F1F2F9"
                spotColor="#767F92"
                className="identicon mx-2"
              />
            </Navbar.Text>
          ) : (
            <Button onClick={connectHandler}>Connect</Button>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
