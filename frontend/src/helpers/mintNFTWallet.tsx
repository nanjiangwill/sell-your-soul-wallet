import { Contract } from "@ethersproject/contracts";
import OwnershipNFT from "contracts/OwnershipNFT.json";

const mintNFTWallet = async (signer: any, toast: any) => {
  try {
    if (signer) {
      const OwnershipNFTContract = new Contract(
        OwnershipNFT.contract,
        OwnershipNFT.abi,
        signer
      );

      const OwnershipNFTContractResponce = await OwnershipNFTContract.mint();
      const receipt = await OwnershipNFTContractResponce.wait();
      console.log(receipt)
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

  return;
};

export default mintNFTWallet;
