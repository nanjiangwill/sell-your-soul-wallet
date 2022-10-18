import styles from "./index.module.scss";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useProvider, useSigner } from "wagmi";
import { Contract } from "@ethersproject/contracts";
import Button from "components/button";
import Card from "components/card";

import OwnershipNFT from "contracts/OwnershipNFT.json";
import mintNFTWallet from "helpers/mintNFTWallet";
import transferNFTWallet from "helpers/transferNFTWallet";
import swapToken from "helpers/swap";

export interface LandingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tokenId: string;
  tokenUri: string;
}

interface NFT_Wallet {
  tokenId: string;
  tokenUri: string;
}

const LandingCard = ({
  className,
  tokenId,
  tokenUri,
  ...props
}: LandingCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWallet, setCurrentWallet] = useState("");
  const [isTransfer, setIsTransfer] = useState(false);
  const [transferAccount, setTransferAccount] = useState("");
  const toast = useToast();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const [ownedNFTWallets, setOwnedNFTWallets] = useState<NFT_Wallet[]>([]);
  const OwnershipNFTContract = new Contract(
    OwnershipNFT.contract,
    OwnershipNFT.abi,
    provider
  );

  useEffect(() => {
    const queryOwnedWallet = async () => {
      try {
        let temp_Wallets: NFT_Wallet[] = [];
        var numNFT = await OwnershipNFTContract.balanceOf(tokenId);
        console.log("Current address has " + numNFT + " NFT Wallets");
        var a = numNFT._hex;
        for (var _i = 0; _i < numNFT; _i++) {
          var rawTokenID = await OwnershipNFTContract.tokenOfOwnerByIndex(
            tokenId,
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
        setOwnedNFTWallets(temp_Wallets);
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
    queryOwnedWallet();
  }, [isModalOpen]);
  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          setIsModalOpen(true);
          setCurrentWallet(tokenId);
        }}
      >
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
              onClick={() =>
                swapToken(
                  signer,
                  currentWallet,
                  setIsModalOpen,
                  "addLiquidity",
                  toast
                )
              }
              style={{ margin: 15 }}
            >
              Uniswap - Add Liquidity
            </Button>
            <Button
              size="medium"
              variant="secondary"
              onClick={() =>
                swapToken(
                  signer,
                  currentWallet,
                  setIsModalOpen,
                  "removeLiquidity",
                  toast
                )
              }
              style={{ margin: 15 }}
            >
              Uniswap - Withdraw Liquidity
            </Button>
            <Button
              size="medium"
              variant="secondary"
              onClick={() =>
                swapToken(
                  signer,
                  currentWallet,
                  setIsModalOpen,
                  "swapTokensForExactTokens",
                  toast
                )
              }
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
            <span style={{ fontWeight: "bold", fontSize: "23px" }}>
              Owned NFT Wallets
            </span>
            <br></br>
            {/* <div className={styles.cards}> */}
            {ownedNFTWallets.map(({ tokenId, tokenUri }) => (
              <div key="{tokenId}" className={styles.smallcard}>
                <LandingCard tokenId={tokenId} tokenUri={tokenUri} />
              </div>
            ))}
            <div
              onClick={() =>
                mintNFTWallet(signer, currentWallet, setIsModalOpen, toast)
              }
            >
              <Card className={styles.smallcard}>
                <button className={styles.button5}>Mint New</button>
              </Card>
              {/* </div> */}
            </div>
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
                  onChange={(event) =>
                    setTransferAccount(event.target.value.replace(/\n/g, ""))
                  }
                />
              </label>
            </form>
            <br></br>
          </ModalBody>
          <ModalFooter>
            <Button
              size="medium"
              style={{ marginRight: 15 }}
              onClick={() =>
                transferNFTWallet(
                  signer,
                  transferAccount,
                  currentWallet,
                  setIsTransfer,
                  setIsModalOpen,
                  toast
                )
              }
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
  );
};

export default LandingCard;
