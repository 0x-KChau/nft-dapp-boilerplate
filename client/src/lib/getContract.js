// check node environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

const getContractInstance = async (web3, contractDefinition) => {

  try {

    // get network ID
    let networkId = await web3.eth.net.getId()

    if (isDev) {
      networkId = 5777; // truffle dev local network id
    }

    // get the deployed address
    const deployedAddress = contractDefinition.networks[networkId].address

    // create the instance
    const instance = new web3.eth.Contract(
      contractDefinition.abi,
      deployedAddress
    )
    return instance;

  } catch (error) {
    console.error(error);
  }
  
}

export default getContractInstance
