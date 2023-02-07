import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { ethers } from 'ethers'

import Alert from './Alert'

import { swap, loadBalances } from '../store/interactions'

const Swap = () => {
  const [inputToken, setInputToken] = useState(null)
  const [outputToken, setOutputToken] = useState(null)
  const [inputAmount, setInputAmount] = useState(0)
  const [outputAmount, setOutputAmount] = useState(0)

  const [price, setPrice] = useState(0)

  const [showAlert, setShowAlert] = useState(false)

  const provider = useSelector(state => state.provider.connection)
  const account = useSelector(state => state.provider.account)

  const tokens = useSelector(state => state.tokens.contracts)
  const symbols = useSelector(state => state.tokens.symbols)
  const balances = useSelector(state => state.tokens.balances)

  const amm = useSelector(state => state.amm.contract)
  const isSwapping = useSelector(state => state.amm.swapping.isSwapping)
  const isSuccess = useSelector(state => state.amm.swapping.isSuccess)
  const transactionHash = useSelector(
    state => state.amm.swapping.transactionHash
  )

  const inputHandler = async e => {
    if (!inputToken || !outputToken) {
      window.alert('Please select token')
      return
    }

    if (inputToken === outputToken) {
      window.alert('Invalid token pair')
      return
    }

    if (inputToken === 'LE') {
      setInputAmount(e.target.value)

      const _token1Amount = ethers.utils.parseEther(e.target.value)
      const result = await amm.calculateToken1Swap(_token1Amount)
      const _token2Amount = ethers.utils.formatEther(result)

      setOutputAmount(_token2Amount.toString())
    } else {
      setInputAmount(e.target.value)

      const _token2Amount = ethers.utils.parseEther(e.target.value)
      const result = await amm.calculateToken2Swap(_token2Amount)
      const _token1Amount = ethers.utils.formatEther(result)

      setOutputAmount(_token1Amount.toString())
    }
  }

  const swapHandler = async e => {
    e.preventDefault()

    setShowAlert(false)

    if (inputToken === outputToken) {
      window.alert('Invalid Token Pair')
      return
    }

    const _inputAmount = ethers.utils.parseEther(inputAmount)

    // Swap token depending upon which one we're doing...
    if (inputToken === 'LE') {
      await swap(provider, amm, tokens[0], inputToken, _inputAmount)
    } else {
      await swap(provider, amm, tokens[1], inputToken, _inputAmount)
    }

    await loadBalances(amm, tokens, account)
    await getPrice()

    setShowAlert(true)
  }

  const getPrice = async () => {
    if (inputToken === outputToken) {
      setPrice(0)
      return
    }

    if (inputToken === 'LE') {
      setPrice((await amm.token2Balance()) / (await amm.token1Balance()))
    } else {
      setPrice((await amm.token1Balance()) / (await amm.token2Balance()))
    }
  }

  useEffect(() => {
    if (inputToken && outputToken) {
      getPrice()
    }
  }, [inputToken, outputToken])

  // reset input after successful swap
  useEffect(() => {
    if (isSuccess) {
      setInputAmount(0)
      setOutputAmount(0)
    }
  }, [isSuccess])

  return (
    <div className="card-container">
      <Card style={{ width: '450px' }} className="mx-auto px-4 bisque">
        {account ? (
          <Form
            onSubmit={swapHandler}
            style={{ maxWidth: '450px', margin: '50px auto' }}
          >
            <Row className="my-3">
              <div className="d-flex justify-content-between">
                <Form.Label>
                  <strong>Input:</strong>
                </Form.Label>
                <Form.Text muted>
                  Balance:
                  {inputToken === symbols[0]
                    ? balances[0]
                    : inputToken === symbols[1]
                    ? balances[1]
                    : 0}
                </Form.Text>
              </div>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="0.0"
                  min="0.0"
                  step="any"
                  value={inputAmount === 0 ? '' : inputAmount}
                  onChange={e => inputHandler(e)}
                  disabled={!inputToken}
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={inputToken ? inputToken : 'Select Token'}
                >
                  <Dropdown.Item
                    onClick={e => setInputToken(e.target.innerHTML)}
                  >
                    LE
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={e => setInputToken(e.target.innerHTML)}
                  >
                    USD
                  </Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Row>

            <Row className="my-4">
              <div className="d-flex justify-content-between">
                <Form.Label>
                  <strong>Output:</strong>
                </Form.Label>
                <Form.Text muted>
                  Balance:
                  {outputToken === symbols[0]
                    ? balances[0]
                    : outputToken === symbols[1]
                    ? balances[1]
                    : 0}
                </Form.Text>
              </div>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="0.0"
                  value={outputAmount === 0 ? '' : outputAmount}
                  disabled
                />
                <DropdownButton
                  variant="outline-secondary"
                  title="Select Token"
                  title={outputToken ? outputToken : 'Select Token'}
                >
                  <Dropdown.Item
                    onClick={e => setOutputToken(e.target.innerHTML)}
                  >
                    LE
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={e => setOutputToken(e.target.innerHTML)}
                  >
                    USD
                  </Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Row>

            <Row className="my-3">
              {isSwapping ? (
                <Spinner
                  animation="border"
                  style={{ display: 'block', margin: '0 auto' }}
                />
              ) : (
                <Button type="submit">Swap</Button>
              )}
              <Form.Text muted>Exchange Rate: {price}</Form.Text>
            </Row>
          </Form>
        ) : (
          <p
            className="d-flex justify-content-center align-items-center"
            style={{ height: '300px' }}
          >
            Please connect wallet.
          </p>
        )}
      </Card>

      {isSwapping ? (
        <Alert
          message={'Swap Pending...'}
          transactionHash={null}
          variant={'info'}
          setShowAlert={setShowAlert}
        />
      ) : isSuccess && showAlert ? (
        <Alert
          message={'Swap Successful'}
          transactionHash={transactionHash}
          variant={'success'}
          setShowAlert={setShowAlert}
        />
      ) : !isSuccess && showAlert ? (
        <Alert
          message={'Swap Failed'}
          transactionHash={null}
          variant={'danger'}
          setShowAlert={setShowAlert}
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default Swap
