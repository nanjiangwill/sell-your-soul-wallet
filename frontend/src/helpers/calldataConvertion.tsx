import { ethers } from "ethers";

const calldataConvertion = async (
    OwnershipNFTContract: any,
    signerAddress: any,
    currAddress: any,
    inputAddress: any,
    inputFunctionName: any,
    inputCalldata: any
  ) => {
    let functionABI = [inputFunctionName];
    let functionName = inputFunctionName.split(' ', 2)[1]
    functionName = functionName.split('(', 1)[0]
    let ifaceFunction = new ethers.utils.Interface(functionABI);
    let calldataFunction = ifaceFunction.encodeFunctionData(
        functionName,
        inputCalldata
    );
    let actionData = [[inputAddress, calldataFunction]];
  
    let exerABI = ["function exec(Action[] calldata actions)"];
    let iface = new ethers.utils.Interface(exerABI);
    let ownerOfResult = await OwnershipNFTContract.ownerOf(currAddress);
    while (ownerOfResult != signerAddress) {
      actionData = [
        [ownerOfResult, iface.encodeFunctionData("exec", actionData)],
      ];
      console.log(ownerOfResult)
      ownerOfResult = await OwnershipNFTContract.ownerOf(ownerOfResult);
    }
    return actionData;
  };

export default calldataConvertion;