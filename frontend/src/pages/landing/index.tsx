import Button from "components/button";
import CommonLayout from "components/common-layout";
import styles from "./index.module.scss";
import { mintNFTWallet } from "helpers/mintNFTWallet";
import Card from "components/card";

const NFT_Wallets = [
  {
    id: 1,
    description: "metadata",
  },
  {
    id: 2,
    description: "metadata",
  },
  {
    id: 3,
    description: "metadata",
  },
  {
    id: 4,
    description: "metadata",
  },
];

const LandingPage = () => {
  return (
    <CommonLayout className={styles.page}>
      <div className={styles.firstView}>
        <div className={styles.heading}>Sell Your Soul Wallet is ....</div>
        <div className={styles.description}>This is ...</div>
        {/* <Profile /> */}
        <div className={styles.cards}>
          <div onClick={() => alert("Clicked Mint")}>
            <Card className={styles.card}>
              <button className={styles.button5}>+</button>
            </Card>
          </div>
          {NFT_Wallets.map(({ id, description }) => (
            <>
              <div onClick={() => alert("Hello from here")}>
                <Card className={styles.card}>
                  <label htmlFor="comments" className="font-medium text-black">
                    {id}
                  </label>
                  <p className="text-gray-500">{description}</p>
                </Card>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* <div className={styles.howTo}>
        <div className={styles.heading}>How you can use it?</div>
        <div className={styles.steps}>
          <div className={styles.step}>
            <p>Mint your NFT and get your NFT Wallet</p>
            <p>
              <b>AND</b>
            </p>
            <p>Get your NFT Wallet</p>
          </div>
          <div className={styles.arrow} />
          <div className={styles.step}>
            <p>Buy ERC20/NFT/SBT with Your NFT Wallet</p>
          </div>
          <div className={styles.arrow} />
          <div className={styles.step}>
            <p>Transfer the ownership by just one click!</p>
            <br />
            <p>
              <small>
                (SBT, or Soulbound Tokens, are non-transferrable NFT designed to
                show your permenant credentials)
              </small>
            </p>
          </div>
        </div>
      </div> */}
    </CommonLayout>
  );
};

export default LandingPage;
