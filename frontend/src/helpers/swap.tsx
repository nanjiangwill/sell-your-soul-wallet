import { Contract } from "@ethersproject/contracts";
import OwnershipNFT from "contracts/OwnershipNFT.json";
import NFTWallet from "contracts/NFTWallet.json";
import Swal from "sweetalert2";
import encodedCallConvertion from "./encodedCallConvertion";

const swapToken = async (
  OwnershipNFTContract: any,
  signer: any,
  currAddress: any,
  inputAddress: any,
  inputFunctionName: any,
  inputCalldata: any,
  toast: any
) => {
  try {
    if (signer) {
      // TODO: swap logic
      const NFTWalletContract = new Contract(
        currAddress,
        NFTWallet.abi,
        signer
      );

      const NFTWalletContractResponce = await NFTWalletContract.exec(
        encodedCallConvertion(
          signer,
          currAddress,
          inputAddress,
          inputFunctionName,
          inputCalldata
        )
      );

      const hash = NFTWalletContractResponce.hash;
      //   const hashUrl = `<a href=https://goerli.arbiscan.io/tx/${hash}>Check Arbitrum Testnet Info(Click with CMD)</a>`;
      //   Swal.fire({
      //     title: "Waiting for the Swap result from the blockchain",
      //     footer: hashUrl,
      //   });
      //   Swal.showLoading();
      const receipt = await NFTWalletContractResponce.wait();
      //   Swal.hideLoading();
      //   if (receipt.status == 1) {
      //     Swal.update({
      //       title: "Success!",
      //       html: `Swap is successful!`,
      //       icon: "success",
      //       showConfirmButton: false,
      //     });
      //   } else {
      //     Swal.close();
      //     throw new Error("Swap Failed during transaction");
      //   }
    }
  } catch (error: any) {
    toast({
      title: "Swap failed",
      description: error.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
};

export default swapToken;
