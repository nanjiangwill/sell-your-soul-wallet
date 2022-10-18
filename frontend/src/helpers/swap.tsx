import { Contract } from "@ethersproject/contracts";
import Swal from "sweetalert2";
import encodedCallConvertion from "./encodedCallConvertion";
import UniswapV2Router02 from "contracts/UniswapV2Router02.json";
import Apple from "contracts/Apple.json";
import Bloom from "contracts/Bloom.json";
import NFTWallet from "contracts/NFTWallet.json";

const swapToken = async (
  signer: any,
  currAddress: any,
  setIsModalOpen: any,
  type: any,
  toast: any
) => {
  try {
    if (signer) {
      const signerAddress = await signer.getAddress();

      const UniswapV2Router02Contract = new Contract(
        UniswapV2Router02.contract,
        UniswapV2Router02.abi,
        signer
      );

      let calldata: any;
      if (type === "addLiquidity") {
        calldata = await encodedCallConvertion(
          signer,
          currAddress,
          UniswapV2Router02.contract,
          "function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline)",
          [
            Apple.contract,
            Bloom.contract,
            100,
            100,
            0,
            0,
            signerAddress,
            100,
            1760762073000,
          ],
          "swap"
        );
      } else if (type === "removeLiquidity") {
        calldata = await encodedCallConvertion(
          signer,
          currAddress,
          UniswapV2Router02.contract,
          "function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline)",
          [
            Apple.contract,
            Bloom.contract,
            100,
            0,
            0,
            signerAddress,
            1760762073000,
          ],
          "swap"
        );
      } else if (type === "swapTokensForExactTokens") {
        calldata = await encodedCallConvertion(
          signer,
          currAddress,
          UniswapV2Router02.contract,
          "function swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)",
          [
            50,
            100,
            [Apple.contract, Bloom.contract],
            signerAddress,
            1760762073000,
          ],
          "swap"
        );
      } else {
        throw new Error("swap function is not defined");
      }

      let NFTWalletInit = calldata[0];
      let actionData = calldata[1];

      const NFTWalletContract = new Contract(
        NFTWalletInit,
        NFTWallet.abi,
        signer
      );

      let swapResult;
      swapResult = await NFTWalletContract.exec(actionData);
      if (setIsModalOpen) {
        setIsModalOpen(false);
      }

      const hash = swapResult.hash;
      const hashUrl = `<a href=https://goerli.arbiscan.io/tx/${hash}>Check Arbitrum Testnet Info (Click with CMD)</a>`;
      Swal.fire({
        title: "Waiting for the result from the blockchain",
        footer: hashUrl,
      });
      Swal.showLoading();

      const receipt = await swapResult.wait();
      Swal.hideLoading();
      if (receipt.status == 1) {
        Swal.update({
          title: "Success!",
          html: `Adding Liquidity Success!`,
          icon: "success",
          showConfirmButton: false,
        });
      } else {
        Swal.close();
        throw new Error("Add Liquidity Failed during transaction");
      }
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
