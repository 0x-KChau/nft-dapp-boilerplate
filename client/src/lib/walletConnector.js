import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider';
import detectEthereumProvider from '@metamask/detect-provider'
import contractNFT from './contracts/NFT.json'
import getContract from './getContract'


export const connectWallet = async () => {

    // const walletconnect = await JSON.parse(localStorage.getItem('walletconnect'));
    // console.log('walletconnect', walletconnect);

    let provider = await detectEthereumProvider();
    let accounts;
    let web3;
    
    if (provider) {
      web3 = new Web3(provider);
      accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    } else {
      //  Create WalletConnect Provider
      provider = new WalletConnectProvider({
        // infuraId: process.env.INFURA_ID,
        rpc: {
          5777: 'http://127.0.0.1:9545',
          1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.MAINNET_ID}`,
          3: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ROPSTEN_ID}`,
          4: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.RINKEBY_ID}`,
        },
      });
      // Enable session (triggers QR Code modal)
      await provider.enable();
      web3 = new Web3(provider);
      accounts = await web3.eth.getAccounts();
    }

    const contract = await getContract(web3, contractNFT);

    return { accounts, contract, web3 };
}
