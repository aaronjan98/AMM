import { useSelector, useDispatch } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Blockies from 'react-blockies'

import logo from '../logo.png'

import { loadAccount } from '../store/interactions'

const Navigation = () => {
  const account = useSelector(state => state.provider.account)

  const dispatch = useDispatch()

  const connectHandler = async () => {
    await loadAccount(dispatch)
  }

  return (
    <Navbar className="my-3">
      <img
        alt="logo"
        src={logo}
        width="40"
        height="40"
        className="d-inline-block align-top mx-3"
      />
      <Navbar.Brand href="#">AJ's Template</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
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
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
