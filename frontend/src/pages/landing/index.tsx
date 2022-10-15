import Button from "components/button";
import CommonLayout from "components/common-layout";
import styles from "./index.module.scss";
// import { mintNFTWallet } from "helpers/mintNFTWallet";
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
import { SetStateAction, useEffect, useState } from "react";
import mintNFTWallet from "helpers/mintNFTWallet";
import { useAccount, useSigner } from "wagmi";

const NFT_Wallets = [
  {
    id: "1",
    description: "10",
  },
  {
    id: "2",
    description: "20",
  },
  {
    id: "3",
    description: "30",
  },
  {
    id: "4",
    description: "40",
  },
];

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWallet, setCurrentWallet] = useState("");
  const [isTransfer, setIsTransfer] = useState(false);
  const [transferAccount, setTransferAccount] = useState("");

  const toast = useToast();
  const { data: signer } = useSigner();
  const { address } = useAccount();

  function selectNFTWallet(e: string) {
    setIsModalOpen(true);
    setCurrentWallet(e);
  }

  return (
    <CommonLayout className={styles.page}>
      <div className={styles.firstView}>
        <div className={styles.heading}>Sell Your Soul Wallet is ....</div>
        <div className={styles.description}>This is ...</div>
        <div className={styles.cards}>
          <div onClick={() => mintNFTWallet(signer, toast)}>
            <Card className={styles.card}>
              <button className={styles.button5}>+</button>
            </Card>
          </div>
          {NFT_Wallets.map(({ id, description }) => (
            <>
              <div onClick={() => selectNFTWallet(id)}>
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
                  <ModalHeader>{currentWallet}</ModalHeader>
                  <ModalBody>
                    <p>Balance: {description}</p>
                    <br />
                    <Button
                      size="medium"
                      variant="secondary"
                      onClick={() => setIsModalOpen(false)}
                      style={{ margin: 15 }}
                    >
                      Sale
                    </Button>
                    <Button
                      size="medium"
                      variant="secondary"
                      onClick={() => setIsTransfer(true)}
                      style={{ margin: 15 }}
                    >
                      Transfer
                    </Button>
                    <Button
                      size="medium"
                      variant="secondary"
                      onClick={() => setIsModalOpen(false)}
                      style={{ margin: 15 }}
                    >
                      Swap
                    </Button>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      size="medium"
                      variant="secondary"
                      onClick={() => setIsModalOpen(false)}
                      style={{ marginRight: 15 }}
                    >
                      Back
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Modal isOpen={isTransfer} onClose={() => setIsTransfer(false)}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Transfer NFT Wallet</ModalHeader>
                  <ModalBody>
                    <form>
                      <label>
                        To:
                        <input type="text" name="name" />
                      </label>
                    </form>
                    <br></br>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      size="medium"
                      style={{ marginRight: 15 }}
                      onClick={() => setIsTransfer(false)}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="medium"
                      style={{ marginRight: 15 }}
                      onClick={() => setIsTransfer(false)}
                    >
                      Back
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
