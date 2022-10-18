import CommonLayout from "components/common-layout";
import styles from "./index.module.scss";
import Card from "components/card";
import LandingCard from "components/landing-card";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount, useSigner, useProvider } from "wagmi";
import { Contract } from "@ethersproject/contracts";
import { useNavigate } from "react-router-dom";
import OwnershipNFT from "contracts/OwnershipNFT.json";
import mintNFTWallet from "helpers/mintNFTWallet";

const LandingPage = () => {
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

  return (
    <CommonLayout className={styles.page}>
      <div className={styles.firstView}>
        <div className={styles.heading}>Sell-Your-Soul Wallet</div>
        <div className={styles.description}>View the NFT wallets you own</div>
        <div className={styles.cards}>
          <div onClick={() => mintNFTWallet(signer, address, null, toast)}>
            <Card className={styles.card}>
              <button className={styles.button5}>Mint New</button>
            </Card>
          </div>
          {NFT_Wallets.map(({ tokenId, tokenUri }) => (
            <div key="{tokenId}" className={styles.card}>
              <LandingCard tokenId={tokenId} tokenUri={tokenUri} />
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
