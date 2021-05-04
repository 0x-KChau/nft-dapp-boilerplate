const fs = require('fs');

if (process.argv.length !== 4) {
    console.error('process.argv: network name, and number of Tokens are needed');
    process.exit(1);
}

const networkName = process.argv[2]
const numOfToken = process.argv[3]

// console.log('numOfToken', numOfToken);

for (let index = 0; index <= parseInt(numOfToken); index++) {
    const filePath = __dirname + `/tmp/${networkName}/${index}`;
    // console.log('index', index, filePath);

    fs.writeFile(filePath, `{
        "name": "SHIBA #${index}",
        "description": "SHIBA as the name implies, one of the most coolest dog in the universe. This project aims to bring adorable SHIBAs to the Ethereum network with only limited 1000 unit.",
        "external_url": "https://shibanft.io",
        "attributes": [
            {
                "trait_type": "Shiba Type",
                "value": N/A
            },
            {
                "trait_type": "Headwear",
                "value": N/A
            },
            {
                "trait_type": "Bodyware",
                "value": N/A
            },
            {
                "trait_type": "Tail",
                "value": N/A
            },
            {
                "trait_type": "Props",
                "value": N/A
            },
            {
                "trait_type": "Costume",
                "value": N/A
            },
            {
                "trait_type": "Accessories",
                "value": N/A
            },
            {
                "trait_type": "Background",
                "value": N/A
            },
        ],
        "image": "https://gateway.pinata.cloud/ipfs/Qma2H11jrMYES8MtQHxLmnZRo7G4Ky94sx7dVog78bcdDw/0.gif"
    }`, { flag: 'wx' }, function (err) {
        if (err) throw err;
        console.log(`Metadata of token #${index} is saved`);
    });
}
