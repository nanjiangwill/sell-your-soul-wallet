import Button from "components/button";
import CommonLayout from "components/common-layout";
import styles from "./index.module.scss";
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
import mintNFTWallet from "helpers/mintNFTWallet";
import { useAccount, useSigner, useProvider } from "wagmi";
import { Contract } from "@ethersproject/contracts";
import OwnershipNFT from "contracts/OwnershipNFT.json";
import { useNavigate } from "react-router-dom";
import swapToken from "helpers/swap";
import transferNFTWallet from "helpers/transferNFTWallet";
import testCalldata from "helpers/testCalldata";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWallet, setCurrentWallet] = useState("");
  const [isTransfer, setIsTransfer] = useState(false);
  const [transferAccount, setTransferAccount] = useState("");
  interface NFT_Wallet {
    tokenId: string;
    tokenUri: string;
  }
  const [NFT_Wallets, setNFT_Wallets] = useState<NFT_Wallet[]>([]);

  const provider = useProvider();
  const toast = useToast();
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const OwnershipNFTContract = new Contract(
    OwnershipNFT.contract,
    OwnershipNFT.abi,
    provider
  );

  let navigate = useNavigate();

  useEffect(() => {
    const queryNFT = async () => {
      try {
        let temp_Wallets: NFT_Wallet[] = [];
        var numNFT = await OwnershipNFTContract.balanceOf(address);
        console.log("Current address has " + numNFT + " NFT Wallets");
        var a = numNFT._hex;
        for (var _i = 0; _i < numNFT; _i++) {
          var rawTokenID = await OwnershipNFTContract.tokenOfOwnerByIndex(
            address,
            _i
          );
          var tokenID = rawTokenID._hex;
          var tokenURI = await OwnershipNFTContract.tokenURI(tokenID);
          const temp_Wallet: NFT_Wallet = {
            tokenId: tokenID,
            tokenUri: tokenURI,
          };
          temp_Wallets.push(temp_Wallet);
        }
        console.log("Owned Wallet: ");
        console.log(temp_Wallets);
        setNFT_Wallets(temp_Wallets);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Query failed",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    queryNFT();
  }, []);

  function selectNFTWallet(e: string) {
    setIsModalOpen(true);
    setCurrentWallet(e);
  }

  return (
    <CommonLayout className={styles.page}>
      <div className={styles.firstView}>
        <div className={styles.heading}>Sell-Your-Soul Wallet</div>
        <div className={styles.description}>View the NFT wallets you own</div>
        <div className={styles.cards}>
          <div onClick={() => mintNFTWallet(signer, toast)}>
            <Card className={styles.card}>
              <button className={styles.button5}>Mint New</button>
            </Card>
          </div>
          {NFT_Wallets.map(({ tokenId, tokenUri }) => (
            <div key="{tokenId}">
              <div onClick={() => selectNFTWallet(tokenId)}>
                <Card className={styles.card}>
                  <div className="list-container">
                    <img src={`${tokenUri}`} />
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
                  <ModalHeader
                    onClick={() =>
                      (window.location.href = `https://goerli.arbiscan.io/address/${currentWallet}`)
                    }
                  >
                    {currentWallet}
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <img src={`${tokenUri}`} />
                    </div>
                    <span style={{ fontWeight: "bold", fontSize: "23px" }}>
                      Use Wallet
                    </span>
                    <Button
                      size="medium"
                      variant="secondary"
                      onClick={() => testCalldata(signer)}
                      style={{ margin: 15 }}
                    >
                      Uniswap - Add Liquidity
                    </Button>
                    <Button
                      size="medium"
                      variant="secondary"
                      onClick={() => setIsModalOpen(false)}
                      style={{ margin: 15 }}
                    >
                      Uniswap - Withdraw Liquidity
                    </Button>
                    <Button
                      size="medium"
                      variant="secondary"
                      onClick={() => setIsModalOpen(false)}
                      style={{ margin: 15 }}
                    >
                      Uniswap - Swap Tokens
                    </Button>
                    <span style={{ fontWeight: "bold", fontSize: "23px" }}>
                      Transfer NFT Wallet Ownership
                    </span>
                    <Button
                      size="medium"
                      variant="secondary"
                      onClick={() => {
                        window.location.href =
                          "https://testnet.stratosnft.io/asset/0x9804EcBe8269F7B8e1BBE91FFf0f19b11C897A13" +
                          "/" +
                          BigInt(tokenId);
                      }}
                      style={{ margin: 15 }}
                    >
                      Sell on Stratos
                    </Button>
                    <Button
                      size="medium"
                      variant="secondary"
                      onClick={() => setIsTransfer(true)}
                      style={{ margin: 15 }}
                    >
                      Transfer
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
                        <textarea
                        className={styles.textarea}
                        placeholder="Address of recipient"
                        value={transferAccount}
                        onChange={event => setTransferAccount(event.target.value.replace(/\n/g, ''))}
                      />
                      </label>
                    </form>
                    <br></br>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      size="medium"
                      style={{ marginRight: 15 }}
                      onClick={() => transferNFTWallet(signer, transferAccount, currentWallet, setIsTransfer, setIsModalOpen, toast)}
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
            </div>
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
