import { BigNumber, ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import OwnershipNFT from "contracts/OwnershipNFT.json";

const encodedCallConvertion = async (
  signer: any,
  currAddress: any,
  inputAddress: any,
  inputFunctionName: any,
  inputCalldata: any,
  type: any
) => {
  const OwnershipNFTContract = new Contract(
    OwnershipNFT.contract,
    OwnershipNFT.abi,
    signer
  );
  const signerAddress = await signer.getAddress();

  let functionABI = [inputFunctionName];
  let functionName = inputFunctionName.split(" ", 2)[1];
  functionName = functionName.split("(", 1)[0];
  let ifaceFunction = new ethers.utils.Interface(functionABI);
  let calldataFunction = ifaceFunction.encodeFunctionData(
    functionName,
    inputCalldata
  );
  let actionDataDir = [[inputAddress, calldataFunction]];

  let exerABI = ["function exec(tuple(address, bytes)[] actions)"];
  let iface = new ethers.utils.Interface(exerABI);
  let ownerOfResult = await OwnershipNFTContract.ownerOf(currAddress);

  let actionData;
  if (type === "mint" || type === "swap") {
    actionData = [
      [currAddress, iface.encodeFunctionData("exec", [actionDataDir])],
    ];
  } else if (type === "transfer") {
    actionData = actionDataDir;
  }
  if (ownerOfResult === signerAddress) {
    return [currAddress, actionDataDir];
  } else {
    while (ownerOfResult !== signerAddress) {
      if (
        (await OwnershipNFTContract.ownerOf(ownerOfResult)) == signerAddress
      ) {
        return [ownerOfResult, actionData];
      } else {
        actionData = [
          [ownerOfResult, iface.encodeFunctionData("exec", [actionData])],
        ];
        ownerOfResult = await OwnershipNFTContract.ownerOf(ownerOfResult);
      }
    }
  }
};

export default encodedCallConvertion;
