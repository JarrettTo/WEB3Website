import {ethers} from "./ethers-5.2.esm.min.js"      //cannot use require so we must first copy the ethers file from the ethers documentation and paste in ethers-5.2.esm.min.js file and import it from there
import {abi, contractAddress} from "./constants.js"
const connectButton=document.getElementById("connectButton");
const fundButton=document.getElementById("fundButton");
connectButton.onclick=connect;
fundButton.onclick=fund;
async function connect(){
    if(window.ethereum!=="undefined"){  //makes sure there is a metamask extension install
        await window.ethereum.request({method:"eth_requestAccounts"})       //requests to sign for metamask
        console.log("SHEESH")
        connectButton.innerHTML="Connected"
    }
    else{
        connectButton.innerHTML="Install Metamask"
    }
}

async function fund(){
    const ethAmount="77";
    console.log(`Funding with ETH Amount: ${ethAmount}`);
    if(window.ethereum!=="undefined"){
        const provider= new ethers.providers.Web3Provider(window.ethereum); //gets the RPC url from our metamask wallet
        const signer= provider.getSigner(); //gets connected wallet
        const contracts= new ethers.Contract(contractAddress,abi,signer); //creates a contract
        const transactionResponse= await contracts.fund({value: ethers.utils.parseEther(ethAmount)});   //fund now works
        transactionResponse.wait(1); 

    }

}