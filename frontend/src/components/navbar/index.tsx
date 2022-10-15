import Button from 'components/button'
import classNames from 'classnames'
import { ConnectKitButton } from 'connectkit'
import { buildJazziconDataUrl } from 'helpers/jazzicon'
import { useNavigate } from 'react-router-dom'
import { useAccount, useDisconnect } from 'wagmi'
import styles from './index.module.scss'
import logo from './logo.png'

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Navbar = ({ className, ...props }: NavbarProps) => {
  const navigate = useNavigate() 
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div className={classNames(styles.navbar, className)} {...props}>
      <img
        src={logo}
        className={styles.logo}
        alt="Sell Your Soul Wallet"
        onClick={() => navigate("/")}
      />
      {address ? (
        <div>
          <img
            className={styles.jazzicon}
            src={buildJazziconDataUrl(address)}
            alt={address}
            onClick={() => navigate(`/users/${address}`)}
          />
          <Button onClick={() => disconnect()}>Disconnect</Button>
        </div>
      ) : (
        <ConnectKitButton />
      )}
    </div>
  );
};

export default Navbar;
