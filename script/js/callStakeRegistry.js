const { ethers, upgrades } = require("hardhat");
const {stakeRegistryAbi} = require("./abi/stakeRegistryAbi");

// Connect to the Ethereum network
const provider = new ethers.JsonRpcProvider(`https://rpc-holesky.rockx.com`);

// Replace with your own private key (ensure this is kept secret in real applications)
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Replace with the address of your smart contract
const contractAddress = process.env.STAKE_REGISTRY_ADDRESS;
if(!contractAddress){
    throw new Error('STAKE_REGISTRY_ADDRESS is empty!')
}

// Create a contract instance
const contract = new ethers.Contract(contractAddress, stakeRegistryAbi, wallet);

async function call() {
    try {
        const caller = await wallet.getAddress()
        console.log(`caller is:${caller}`)
        const strategy = await contract.strategyParamsByIndex(0,11)
        console.log(`strategy is: ${strategy}`);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

// call
call();