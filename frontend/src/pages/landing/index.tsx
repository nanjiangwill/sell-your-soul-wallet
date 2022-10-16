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
import { SetStateAction, useEffect, useState } from "react";
import mintNFTWallet from "helpers/mintNFTWallet";
import { useAccount, useSigner, useProvider } from "wagmi";
import { Contract } from "@ethersproject/contracts";
import OwnershipNFT from "contracts/OwnershipNFT.json";
import { useNavigate } from "react-router-dom";

const NFT_Wallet = [
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
        console.log("raw");
        console.log(numNFT);
        var a = numNFT._hex;
        console.log(a);
        for (var _i = 0; _i < numNFT; _i++) {
          var rawTokenID = await OwnershipNFTContract.tokenOfOwnerByIndex(
            address,
            _i
          );
          var tokenID = rawTokenID._hex;
          console.log("tokenID");
          console.log(tokenID);
          var deT = parseInt(tokenID, 16);
          console.log(deT);
          var test = BigInt(deT);
          console.log(test);
          var tokenURI = await OwnershipNFTContract.tokenURI(tokenID);
          const temp_Wallet: NFT_Wallet = {
            tokenId: tokenID,
            tokenUri: tokenURI,
          };
          temp_Wallets.push(temp_Wallet);
        }
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
  // const image =
  //   '<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="47.4" height="40.65" viewBox="21 18.5 158 135.5"><path d="M25,50 l150,0 0,100 -150,0 z" stroke-width="4" stroke="black" fill="rgb(128,224,255)" fill-opacity="1" ></path><path d="M25,50 L175,150 M25,150 L175,50" stroke-width="4" stroke="black" fill="black" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><circle cx="100" cy="30" r="7.5" fill="black" ></circle><circle cx="70" cy="30" r="7.5" fill="black" ></circle><circle cx="130" cy="30" r="7.5" fill="black" ></circle></g></svg>';
  const image =
    '<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="background-color:Orange" opacity="0.57">   <style>.title { fill: black; font-family: sans-serif; font-size: 27px; }</style>    <style>.title2 { fill: black; font-family: sans-serif; font-size: 14px; }</style>    <style>.mainText { fill: black; font-family: sans-serif; font-size: 14px; }</style><style>.smolText { fill: black; font-family: sans-serif; font-size: 10px; }</style><text x="31" y="50" class="title">Sell-Your-Soul Wallet</text><text x="15" y="75" class="title2">A tradable and rentable smart contract wallet</text><text x="15" y="120" class="mainText">ETH Balance: 0</text><text x="15" y="150" class="mainText">FOO Balance: </text><text x="15" y="180" class="mainText">BAR Balance: </text><text x="15" y="230" class="mainText">Wallet Address:</text><text x="15" y="245" class="smolText">0xf4d9599afd90b5038b18e3b551bc21a97ed21c37</text><defs><clipPath id="clip0_1_18"><rect width="300" height="300" fill="white"/></clipPath></defs></svg>';
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
            <>
              <div onClick={() => selectNFTWallet(tokenId)}>
                <Card className={styles.card}>
                  <div className="list-container">
                    <img src={`data:image/svg+xml;utf8,${image}`} />
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
                      <img src={`data:image/svg+xml;utf8,${image}`} />
                    </div>
                    <span style={{ fontWeight: "bold", fontSize: "23px" }}>
                      Use Wallet
                    </span>
                    <Button
                      size="medium"
                      variant="secondary"
                      onClick={() => setIsModalOpen(false)}
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
                          "https://testnet.stratosnft.io/asset/0x948F9CDFb30b2646b27e1799F0866225D89269BB" +
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
