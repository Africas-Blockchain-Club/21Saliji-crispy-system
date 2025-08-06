const { ethers } = require("hardhat");

async function mint() {
    const[address1] = await ethers.getSigners();
    
    const yournft = await ethers.getContractAt("StevenUniverse", "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9");

    // const tx= await yournft.ownerMint(address1, 1, 1);
    
    // await tx.wait();
    console.log(address1);
    // console.log(tx);

}

mint().catch((error)=>{
    console.error(error); 
    process.exit(1);
});