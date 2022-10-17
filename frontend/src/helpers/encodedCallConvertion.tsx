import { ethers } from "ethers";
import OwnershipNFT from "contracts/OwnershipNFT.json";
import { Contract } from "@ethersproject/contracts";

const encodedCallConvertion = async (
    signer: any,
    currAddress: any,
    inputAddress: any,
    inputFunctionName: any,
    inputCalldata: any
  ) => {
    const OwnershipNFTContract = new Contract(
        OwnershipNFT.contract,
        OwnershipNFT.abi,
        signer
    );
    const signerAddress = await signer.getAddress();

    let functionABI = [inputFunctionName];
    let functionName = inputFunctionName.split(' ', 2)[1]
    functionName = functionName.split('(', 1)[0]
    let ifaceFunction = new ethers.utils.Interface(functionABI);
    let calldataFunction = ifaceFunction.encodeFunctionData(
        functionName,
        inputCalldata
    );
    let actionData = [[inputAddress, calldataFunction]];

    let exerABI = ["function exec(tuple(address, bytes)[] actions)"];
    let iface = new ethers.utils.Interface(exerABI);
    let ownerOfResult = await OwnershipNFTContract.ownerOf(currAddress);
    if (ownerOfResult === signerAddress) {
        return [currAddress, actionData];
    } else {
        while (ownerOfResult != signerAddress) {
            actionData = [
                [ownerOfResult, iface.encodeFunctionData("exec", [actionData])],
            ];
            ownerOfResult = await OwnershipNFTContract.ownerOf(ownerOfResult);
            if (await OwnershipNFTContract.ownerOf(ownerOfResult) == signerAddress) {
                return [ownerOfResult, actionData];
            }
        }
    }
  };

export default encodedCallConvertion;