const {ethers} = require("hardhat");

async function main() {
    // const MyNFT = ethers.getContractFactory("StevenUniverse");
    const MyC = await ethers.deployContract("StevenUniverse")
    // const myNft = MyC.deploy();
    await MyC.waitForDeployment();

    console.log(`Contract is deployed to: ${MyC.target}`);
    
}

main().catch((error)=>{
    console.error(error);
    process.exitCode = 1;
})