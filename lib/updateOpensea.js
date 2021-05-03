const axios = require('axios');

if (process.argv.length !== 4) {
    console.error('process.argv must be 2');
    process.exit(1);
}

const address = process.argv[2];
const numOfToken = process.argv[3];

console.log('address, numOfToken', address, numOfToken)

for (let tokenId = 0; tokenId < numOfToken; tokenId++) {

    axios.get(`https://testnets-api.opensea.io/api/v1/asset/${address}/${tokenId}/?force_update=true`)
        .then(function (response) {
            // handle success
            console.log(`Update metadata of tokenId #${tokenId} successfully`);
        })
        .catch(function (error) {
            // handle error
            console.error(`Update metadata of tokenId #${tokenId} fail. ${error.response.status}: ${error.response.statusText}`);
        })
    
}


