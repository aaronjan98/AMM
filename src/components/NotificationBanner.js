import { useState } from 'react'

const NotificationBanner = () => {
  const [showBanner, setShowBanner] = useState(true)

  const handleCloseBanner = () => {
    setShowBanner(false)
  }

  return (
    showBanner && (
      <div className="notification-banner">
        <span className="close-btn" onClick={handleCloseBanner}>
          &times;
        </span>
        <span>
          Tokens are required to use the dapp. Request some by emailing me at
          aaronjanovitch@gmail.com{' '}
          <a
            href="https://www.loom.com/share/cbc0c5ce73a144609cc2c13816b89087"
            rel="noreferrer"
            target="_blank"
          >
            Learn more
          </a>
        </span>
      </div>
    )
  )
}

export default NotificationBanner
