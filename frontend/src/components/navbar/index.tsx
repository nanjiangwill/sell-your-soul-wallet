import classNames from 'classnames'
import { ConnectKitButton } from 'connectkit'
import { buildJazziconDataUrl } from 'helpers/jazzicon'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import styles from './index.module.scss'
import logo from './logo.png'

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Navbar = ({ className, ...props }: NavbarProps) => {
  const navigate = useNavigate()

  const { address } = useAccount()

  return (
    <div className={classNames(styles.navbar, className)} {...props}>
      <img
        src={logo}
        className={styles.logo}
        alt="Sell Your Soul Wallet"
        onClick={() => navigate('/')}
      />
      {address ? (
        <img
          className={styles.jazzicon}
          src={buildJazziconDataUrl(address)}
          alt={address}
          // onClick={() => navigate(`/users/${address}`)}
        />
      ) : (
        <ConnectKitButton />
      )}
    </div>
  )
}

export default Navbar
