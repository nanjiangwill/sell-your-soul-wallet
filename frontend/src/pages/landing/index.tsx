import Button from "components/button";
import CommonLayout from "components/common-layout";
import styles from "./index.module.scss";
import { mintNFTWallet } from "helpers/mintNFTWallet";
import Card from "components/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const NFT_Wallets = [
  {
    id: 1,
    description: "metadata1",
  },
  {
    id: 2,
    description: "metadata2",
  },
  {
    id: 3,
    description: "metadata3",
  },
  {
    id: 4,
    description: "metadata4",
  },
];

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
              <div onClick={() => setIsModalOpen(true)}>
                <Card className={styles.card}>
                  <div className="list-container">
                    <div className={styles.heading}>{id}</div>
                    <p className="text-gray-500">{description}</p>
                  </div>
                </Card>
              </div>
              <Modal
                size="xl"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{id}</ModalHeader>
                  <ModalBody>
                    <p>{description}</p>
                    <br />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      size="medium"
                      variant="secondary"
                      onClick={() => setIsModalOpen(false)}
                      style={{ marginRight: 15 }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
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
