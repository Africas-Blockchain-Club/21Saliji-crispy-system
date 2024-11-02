import Web3 from 'web3';
import mintContract from './contracts/steveupdate.json'; // Import the JSON file of your contract

const nftContract = web3 => {
    return new web3.eth.Contract(
        mintContract,
        // "0xC63CBb51FBaEC08B34A1924092eCAcF1cD9ae767"
        // "0x5fbcc79dFf5507Cd6F13DFa0C5DD5C05fc047F71"
        "0x9057F96820C42866308BaD07042588B5D4328307"
  
    )
}


export default nftContract
