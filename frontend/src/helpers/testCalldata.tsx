import { Contract } from "@ethersproject/contracts";
import NFTWallet from "contracts/NFTWallet.json";
import OwnershipNFT from "contracts/OwnershipNFT.json";
import { BigNumber, ethers } from "ethers";
const testCalldata = async (
    signer: any,
    ) => {
        const NFTWalletContract = new Contract(
            "0x6cba0f45da0fadcfc1146d4c7ef87e952830ff4b",
            NFTWallet.abi,
            signer
        );

        const OwnershipNFTContract = new Contract(
            OwnershipNFT.contract,
            OwnershipNFT.abi,
            signer
        );
        // get data
        const result1 = await OwnershipNFTContract.balanceOf("0xc4530619ca5114587671301505a0b8ed41c51580")
        console.log(result1)
        const result = await OwnershipNFTContract.tokenOfOwnerByIndex("0xc4530619ca5114587671301505a0b8ed41c51580", 1)
        console.log(result)

        // exec
        // // // let ABI = ['function mint()'];
        // let ABI = ['function transferFrom(address from, address to, uint256 tokenId)'];
        // let iface = new ethers.utils.Interface(ABI);
        // let calldata = iface.encodeFunctionData("transferFrom", ["0xd33c88aae8c1ade62a289f7607c18b93f3720e26", "0xc4530619ca5114587671301505a0b8ed41c51580", BigNumber.from("0x2b0b46b6e1dbe5b227042e9929846bef6014e523")]);
        // console.log(calldata)
        // // let ABI = ['function transferFrom(address from, address to, uint256 tokenId)'];
        // // let iface = new ethers.utils.Interface(ABI);
        // // let calldata = iface.encodeFunctionData("transferFrom", ["0x5c9CB0115DdE2CCD8819E0AC9a01CAFE30Be8Ba8", "0xD00BA44b6d6e6f37DCdA75df508057b76b533842", BigNumber.from("0x5be58e99e845b72f465dd921543c7b3fe42e01f1")]); 
        // // let calldata = iface.encodeFunctionData("balanceOf", ["0x5c9CB0115DdE2CCD8819E0AC9a01CAFE30Be8Ba8"]);
        // ABI = ['function exec(tuple(address, bytes)[] actions)'];
        // iface = new ethers.utils.Interface(ABI);
        // calldata = iface.encodeFunctionData("exec", [[[OwnershipNFT.contract, calldata]]]);
        // console.log(calldata);
        // // const aaa = await NFTWalletContract.exec([["0xd33c88aae8c1ade62a289f7607c18b93f3720e26", calldata]])
        // // console.log(aaa)
        // // const bbb = await aaa.wait()
        // // console.log(bbb)



        
    
    // const result = await OwnershipNFTContract.balanceOf("0x6cba0f45da0fadcfc1146d4c7ef87e952830ff4b")
    // console.log(result)
    // const hash = result.hash;
    // console.log(hash)
    // let transferedOne = await OwnershipNFTContract.tokenOfOwnerByIndex("0x6cba0f45da0fadcfc1146d4c7ef87e952830ff4b", 0)


    // 0x5c9CB0115DdE2CCD8819E0AC9a01CAFE30Be8Ba8
        // 0x6cba0f45da0fadcfc1146d4c7ef87e952830ff4b
            // 0xd33c88aae8c1ade62a289f7607c18b93f3720e26
                // 0x4757f4deab9a34e340b42282a85d5d455a8d37e3
            // 0xc4530619ca5114587671301505a0b8ed41c51580
                // 0x9bcc2344216512091ad26b2cda13ab4d103cf36e
                // 0x2b0b46b6e1dbe5b227042e9929846bef6014e523 (going)
        // 0xdc4ff38744e85c6f6b52032a2cfb32991b46eb6c
        // 0xa1812d0f75db8730598092f26795e10a434169f5
        // 0x5be58e99e845b72f465dd921543c7b3fe42e01f1

        // let ABI = ['function transferFrom(address from, address to, uint256 tokenId)']
        // let iface = new ethers.utils.Interface(ABI);
        // let calldata = iface.encodeFunctionData("transferFrom", ["0x6cba0f45da0fadcfc1146d4c7ef87e952830ff4b", "0x5c9CB0115DdE2CCD8819E0AC9a01CAFE30Be8Ba8", transferedOne]);

        // let ABI2 = ["function exec(Action[] calldata actions)"]
        // let iface2 = new ethers.utils.Interface(ABI2);
        // const myStructData = ethers.utils.AbiCoder.prototype.encode(
        //     ['address', 'bytes'],
        //     ["0x6cba0f45da0fadcfc1146d4c7ef87e952830ff4b", calldata]
        //   );
        // let calldata2 = iface2.encodeFunctionData("exec", [myStructData]);
        // const result = await NFTWalletContract.exec(
        //     [[OwnershipNFT.contract, calldata]]
        // );
        // console.log(result)
        // const hash = result.hash;
        // console.log(hash)
        // const receipt = await result.wait();
        // console.log(receipt);


    }

export default testCalldata
