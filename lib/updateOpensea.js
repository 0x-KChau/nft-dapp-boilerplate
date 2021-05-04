const axios = require('axios');

if (process.argv.length !== 4) {
    console.error('process.argv: asset address, and number of Tokens are needed.');
    process.exit(1);
}

const assetAddress = process.argv[2];
const numOfToken = process.argv[3];

console.log('assetAddress, numOfToken', assetAddress, numOfToken)

for (let tokenId = 0; tokenId < numOfToken; tokenId++) {

    axios.get(`https://testnets-api.opensea.io/api/v1/asset/${assetAddress}/${tokenId}/?force_update=true`)
        .then(function (response) {
            // handle success
            console.log(`Update metadata of tokenId #${tokenId} successfully`);
        })
        .catch(function (error) {
            // handle error
            console.error(`Update metadata of tokenId #${tokenId} fail. ${error.response.status}: ${error.response.statusText}`);
        })
    
}


