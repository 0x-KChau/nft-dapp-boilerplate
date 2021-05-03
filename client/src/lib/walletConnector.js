import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider';
import contractShibas from './contracts/Shibas.json'

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  // infuraId: process.env.PROJECTID,
  rpc: {
    31337: 'http://127.0.0.1:8545',
    3: 'https://eth-ropsten.alchemyapi.io',
    4: 'https://www.rinkeby.io',
  },
});

export const connectWallet = async () => {
    //  Enable session (triggers QR Code modal)
    await provider.enable();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const contract = await getContract(web3, contractShibas);

    console.log('accounts, contract, web3', accounts, contract, web3)

    return { accounts, contract, web3 };
}
