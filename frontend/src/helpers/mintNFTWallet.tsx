import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import OwnershipNFT from "contracts/OwnershipNFT.json";
import NFTWallet from "contracts/NFTWallet.json";
import encodedCallConvertion from "./encodedCallConvertion";
import Swal from "sweetalert2";

const mintNFTWallet = async (
  signer: any,
  currAddress: any,
  setIsModalOpen: any,
  toast: any
) => {
  try {
    if (signer) {
      const signerAddress = await signer.getAddress();
      const abiCoder = new ethers.utils.AbiCoder();
      const OwnershipNFTContract = new Contract(
        OwnershipNFT.contract,
        OwnershipNFT.abi,
        signer
      );

      let mintResult;
      if (currAddress === signerAddress) {
        mintResult = await await OwnershipNFTContract.mint();
      } else {
        const calldata: any = await encodedCallConvertion(
          signer,
          currAddress,
          OwnershipNFT.contract,
          "function mint()",
          [],
          "mint"
        );
        let NFTWalletInit = calldata[0];
        let actionData = calldata[1];

        const NFTWalletContract = new Contract(
          NFTWalletInit,
          NFTWallet.abi,
          signer
        );
        mintResult = await NFTWalletContract.exec(actionData);
      }
      if (setIsModalOpen) {
        setIsModalOpen(false);
      }

      const hash = mintResult.hash;
      const hashUrl = `<a href=https://goerli.arbiscan.io/tx/${hash}>Check Arbitrum Testnet Info (Click with CMD)</a>`;
      Swal.fire({
        title: "Waiting for the result from the blockchain",
        footer: hashUrl,
      });
      Swal.showLoading();

      const receipt = await mintResult.wait();
      Swal.hideLoading();
      if (receipt.status == 1) {
        let tokenId;
        if (currAddress === signerAddress) {
          tokenId = receipt.events[0].args.tokenId._hex;
        } else {
          const topicLength = receipt.logs[0].topics.length;
          tokenId = abiCoder.decode(
            ["address"],
            receipt.events[0].topics[topicLength - 1]
          );
        }
        Swal.update({
          title: "Success!",
          html: `Your NFT Wallet is ready! <br> NFT Wallet Address: ${tokenId} <br> inside NFT Wallet: ${currAddress}`,
          icon: "success",
          showConfirmButton: false,
        });
      } else {
        Swal.close();
        throw new Error("Mint Failed during transaction");
      }
    }
  } catch (error: any) {
    toast({
      title: "mint NFT/NFT Wallet failed",
      description: error.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
};

export default mintNFTWallet;
