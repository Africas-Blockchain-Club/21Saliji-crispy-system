import Web3 from 'web3';
import mintContract from './contracts/mohtore.json'; // Import the JSON file of your contract

const nftContract = web3 => {
    return new web3.eth.Contract(
        mintContract,  
        // "0xA9aae2CDae58fef266991eD3fFaB7F6C7eDC6A18"
        // "0xd37FCC24689BFDd0722A580AA49EF76BaAaF13E0"
        "0x938fC3B6DA9801D01bA292eA1784Da79113ce4e6"
    )
}


export default nftContract
